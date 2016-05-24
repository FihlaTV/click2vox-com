var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var express = require('express');
var router = express.Router();

// - Require Models
var Account = require('../models/account');
var Widget = require('../models/widget');
var Rating = require('../models/rating');
var ObjectId = require('mongoose').Types.ObjectId;

var async = require('async');
var crypto = require('crypto');
var request = require('request');

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

var utils = require('./utils');
var emails = require('./emails');

module.exports = function (passport, voxbone) {

  router.get('/signup', function (req, res) {
    res.redirect('/account/signup?email=' + (req.query.email || ""));
  });

  router.get('/ping', function (req, res, next) {
    res.json({ 'ping': Date.now(), 'version': pjson.version });
  });

  router.get('/stats', function (req, res) {
    async.waterfall([
      function (callback) {
        var o = {};
        o.map = function () { emit(this.email.replace(/.*@/, ""), 1); };
        o.reduce = function (k, v) { return v.length; };
        o.limit = 500;

        if (req.query.unfiltered === null) {
          o.query = {
            "temporary": false,
            "email": new RegExp('^((?!(voxbone|agilityfeat|testrtc)).)*$', "i")
          };
        }

        var getAccounts = Account.mapReduce(o, function (err, accounts) {
          callback(null, accounts);
        });
      },
      function (accounts, callback) {
        // console.log(accounts);
        var parsedResults = accounts.map(function (x) {
          var r = {};
          var sip_uris = [];
          r.domain_name = x._id;
          r.accounts_number = x.value;
          r.unique_sip_uris = '-';
          r.widgets_number = '-';
          r.call_reports = '-';
          return r;
        });

        callback(null, parsedResults);
      },
      function (rows, callback) {
        var text = [];
        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
          Account.find({'email': new RegExp(rows[i].domain_name, 'i')}).lean().exec(function (err, docs) {
            row.accounts = docs;
          });
          text.push(row);
        }

        // rows.map(function (row) {
        //   var getAccounts = Account.find({'email': new RegExp(row.domain_name, 'i')});
        //   getAccounts.then(function (accounts) {
        //     var getWidgets = Widget.find({ _account: new ObjectId(accounts[0]._id) });
        //     getWidgets.then(function (widgets) {
        //       // rows.widgets_number += 1;
        //       // console.log(rows);
        //       // callback(null, rows);
        //       // console.log(widgets);
        //       console.log(rows);
        //       if (widget.sip_uri != 'echo@ivrs' && widget.sip_uri != 'digits@ivrs')
        //         sip_uris.push(widget.sip_uri);
        //       callback(null, rows);
        //     });
        //   });
        // });

        callback(null, rows);
      }], function (err, results) {
        // results = [{ domain_name: 'domain name 1', accounts_number: 1, widgets_number: 2, unique_sip_uris: 3, call_reports: 4 }];
        res.render('stats', { title: title, data: results });
      }
    );
  });

  // router.get('/stats', function (req, res, next) {

  //   if (req.isAuthenticated()) {
  //     Account.findOne({ email: new RegExp(req.user.email, "i") }, {}, function (err, account) {
  //       if (err || !account)
  //         return res.render('forgot', { title: title, message: "lalalla", errors: err })

  //       var show_stats = req.isAuthenticated() && account.isAdmin()
  //       if (show_stats)
  //         res.render('stats', { title: title, data: getStatisticsData() });
  //       else
  //         res.redirect('/');
  //     });
  //   } else
  //     res.redirect('/');
  // });

  // Redirects if not HTTPS
  router.get('*', function (req, res, next) {
    if (process.env.FORCE_HTTPS == 'true' && process.env.APP_URL && req.headers['x-forwarded-proto'] != 'https')
      res.redirect(process.env.APP_URL + req.url);
    else
      next();
  });

  router.get('/login', utils.redirectToWidgetIfLoggedIn, function (req, res, next) {
    res.render('login', { title: title, email: req.query.email, message: req.flash('loginMessage') });
  });

  router.post('/login', function (req, res, next) {
    var formData = req.body;
    var result;

    passport.authenticate('local-login', function (err, account, info) {

      if (err) return console.log('Error:', err);

      if (account === false) {
        result = { message: "Email or password incorrect", errors: err, email: formData.email };
        console.log("Entered incorrect authentication, response should be: 401");
        console.log(result);
        return res.status(401).json(result);
      } else if (!account.verified) {
        result = { message: "Unverified account:", email: formData.email };
        console.log(result);
        return res.status(403).json(result);
      } else {
        result = { message: "", errors: null, redirect: '/account/widgets', email: formData.email };

        if (utils.defaultSipUris().length === account.getSipURIs().length) {
          result['redirect'] = '/sip/new';
        }

        req.logIn(account, function (err) {
          return res.status(200).json(result);
        });
      }
    })(req, res, next);
  });

  router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

  router.get('/token_config', function (req, res) {
    voxrtc_config = voxbone.generate();
    res.send(voxrtc_config);
  });

  router.get('/widget', utils.isLoggedIn, function (req, res, next) {
    Account
      .findOne({_id: req.user._id})
      .exec(function (err, the_account) {
        res.render('widget', {
          title: title,
          did: the_account.did,
          email: the_account.email,
          defaultBtnLabel: utils.defaultBtnLabel
        });
      });
  });

  router.get('/', utils.redirectToWidgetIfLoggedIn, function (req, res, next) {
    res.render('home', { title: title, email: req.query.email});
  });

  router.get('/forgot', function (req, res, next) {
    res.render('forgot', { title: title, email: req.query.email });
  });

  router.post('/forgot', function (req, res, next) {
    emails.sendPasswordReset(req, res, req.body.email, 'forgot');
  });

  router.get('/reset/:token', function (req, res) {
    Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, account) {
      if (!account) {
        return res.render('forgot', {
          title: title, message: "Password reset token is invalid or has expired.", errors: err });
      }
      res.render('reset', {
        title: title,
        the_account: req.user,
        token: req.params.token,
        email: req.query.email
      });
    });
  });

  router.post('/reset/:token', function (req, res) {
    async.waterfall([
      function (done) {
        Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, account) {
          var result;
          if (!account) {
            result = { message: "Password reset token is invalid or has expired.", errors: err };
            return res.status(400).json(result);
          }

          if (req.body.password !== req.body.confirmation) {
            result = { message: "Password and confirmation do not match.", errors: true };
            return res.status(400).json(result);
          }
          account.password = account.generateHash(req.body.password);
          account.resetPasswordToken = undefined;
          account.resetPasswordExpires = undefined;

          account.save(function (err) {
            req.logIn(account, function (err) {
              done(err, account);
            });
          });
        });
      },
      function (account, done) {

        var email = new sendgrid.Email({to: account.email});
        email.from = process.env.SENDGRID_FROM;
        email.replyto = process.env.SENDGRID_FROM;
        email.subject = 'Voxbone Widget Generator - Your password has been changed';

        email.html = ' ';

        email.addFilter('templates', 'enable', 1);
        email.addFilter('templates', 'template_id', process.env.SENDGRID_PASSWORD_CHANGED_TEMPLATE);

        sendgrid.send(email, function (err, json) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
          // console.log(json);
        });
      }
    ], function (err) {
      var result;
      if (err) {
        result = { message: "An error has ocurred.", errors: err };
        return res.status(400).json(result);
      }else{
        result = { message: "Your password has been changed.", errors: null, redirect: '/account/widgets' };
        return res.status(200).json(result);
      }
    });
  });

  router.get('/voxbone_widget/:id', function (req, res) {
    var searchForWidget = { _id: new ObjectId(req.params.id) };

    Widget
      .findOne(searchForWidget)
      .populate('_account')
      .exec(function (err, the_widget) {

        if (!the_widget || err) {
          var result = { message: "Widget not found", errors: null };
          return res.status(404).json(result);
        } else if (the_widget && the_widget._account && the_widget._account.did) {
          res.render('voxbone_widget', { layout: false, title: title, did: the_widget._account.did, the_widget: the_widget });
        }

        res.end("");
    });
  });

  router.post('/voxbone_widget', function (req, res, next) {
    var formData = req.body;
    var result = { message: "", errors: null, redirect: '/voxbone_widget' };

    var a_widget = new Widget({
      _account: req.user._id,
      configuration_name: req.body.configuration_name,
      button_label: req.body.button_label,
      button_style: req.body.button_style,
      background_style: req.body.background_style,
      sip_uri: req.body.sip_uri,
      caller_id: req.body.caller_id,
      context: req.body.context,
      dial_pad: req.body.dial_pad,
      send_digits: req.body.send_digits,
      hide_widget: req.body.hide_widget,
      link_button_to_a_page: req.body.link_button_to_a_page,
      show_text_html: req.body.show_text_html
    });

    a_widget.save(function (err) {
      if (err) throw err;
      result.widget_code = a_widget.generateHtmlCode();
      result.widget_id = a_widget.id;
      res.status(200).json(result);
    });
  });

  router.post('/rating', function (req, res, next) {
    var formData = req.body;
    var result = { message: "", errors: null };

    var searchFor = { _id: new ObjectId(req.body.token) };

    Widget.findOne(searchFor, function (err, the_widget) {

      var a_rating = new Rating({
        rate: req.body.rate,
        comment: req.body.comment,
        url: req.body.url,
        _widget: the_widget._id
      });

      a_rating.save(function (err) {
        if (err) {
          result.errors = err;
          res.status(500).json(result);
        } else {
          res.status(200).json(result);
        }
      });
    });
  });

  router.post('/sip_provisioning', function (req, res, next) {
    Account
      .findOne({_id: req.user._id})
      .exec(function (err, account) {

        if (account) {
          utils.provisionSIP(
            account, req.body.sip_uri,
            function (err, result) {
              result = { errors: null };
              if (err) {
                console.log('An error ocurred: ', err);
                result.errors = err;
                return res.status(result.errors.httpStatusCode || 500).json(result);
              } else {
                result.message = 'Success';
                return res.status(200).json(result);
              }
            });
        } else {
          var result = { message: 'Account not found', errors: null };
          return res.status(404).json(result);
        }
      }
    );
  });

  return router;
};
