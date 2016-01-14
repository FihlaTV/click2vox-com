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
var nodemailer = require('nodemailer');
var request = require('request');

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = function(passport, voxbone){

  router.get('/ping', function(req, res, next){
    res.json({ 'ping': Date.now(), 'version': pjson.version });
  });

  router.get('/stats', function(req, res) {
    async.waterfall([
      function(callback){
        var o = {};
        o.map = function() { emit(this.email.replace(/.*@/, ""), 1) }
        o.reduce = function(k, v) { return v.length };
        o.limit = 500;

        if (req.query.unfiltered == null){
          o.query = {
            "temporary": false,
            "email": new RegExp('^((?!(voxbone|agilityfeat|testrtc)).)*$', "i")
          };
        }

        var getAccounts = Account.mapReduce(o, function (err, accounts) {
          callback(null, accounts)
        });
      },
      function(accounts, callback){
        // console.log(accounts);
        var parsedResults = accounts.map(function(x) {
          var r = {};
          var sip_uris = [];
          r.domain_name = x._id;
          r.accounts_number = x.value;
          r.unique_sip_uris = '-';
          r.widgets_number = '-';
          r.call_reports = '-';
          return r;
        });

        callback(null, parsedResults)
      },
      function(rows, callback){
        // console.log(rows);

        var text = [];
        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
          Account.find({'email': new RegExp(rows[i].domain_name, 'i')}).lean().exec(function(err,docs){
            row.accounts = docs;
          });
          text.push(row);
        }

        // rows.map(function(row){
        //   var getAccounts = Account.find({'email': new RegExp(row.domain_name, 'i')});
        //   getAccounts.then(function(accounts){
        //     var getWidgets = Widget.find({ _account: new ObjectId(accounts[0]._id) });
        //     getWidgets.then(function(widgets){
        //       // rows.widgets_number += 1;
        //       // console.log(rows);
        //       // callback(null, rows);
        //       // console.log(widgets);
        //       console.log(rows);
        //       if(widget.sip_uri != 'echo@ivrs' && widget.sip_uri != 'digits@ivrs')
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
    )
  });

  // router.get('/stats', function(req, res, next){

  //   if(req.isAuthenticated()) {
  //     Account.findOne({ email: new RegExp(req.user.email, "i") }, {}, function(err, account){
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
  router.get('*',function(req,res,next){
    if(process.env.FORCE_HTTPS == 'true' && process.env.APP_URL && req.headers['x-forwarded-proto'] != 'https')
      res.redirect(process.env.APP_URL + req.url);
    else
      next();
  })

  router.get('/login', redirectToWidgetIfLoggedIn, function(req, res, next){
    res.render('login', { title: title, email: req.query.email, account: accountLoggedIn(req), message: req.flash('loginMessage') });
  });

  router.post('/login', function(req, res, next){
    var formData = req.body;
    passport.authenticate('local-login', function(err, account, info) {

      if(err) return console.log('Error:', err);

      if(account === false){
        var result = { message: "Email or password incorrect", errors: err, email: formData.email }
        console.log("Entered incorrect authentication, response should be: 401");
        console.log(result);
        return res.status(401).json(result);
      }
      else{
        var result = { message: "", errors: null, redirect: '/widget', email: formData.email }
        req.logIn(account, function(err) {
          return res.status(200).json(result);
        });
      }
    })(req, res, next);
  });

  router.get('/signup', function(req, res, next){
    req.logout();
    req.session.destroy();
    if (req.query.email && req.query.password){
      res.render('signup', { title: title, email: req.query.email, temp_password: req.query.password, account: accountLoggedIn(req) });
    } else {
      res.render('login', { title: title, account: accountLoggedIn(req) });
    };
  });

  //POST /signup fetch the account with that email, set the new password and temporary to false.
  router.post('/signup', function(req, res, next){
    var formData = req.body;
    var result = { message: "", errors: true, redirect: "", email: formData.email }
    var bypass_account_check = (process.env.BYPASS_PRE_EXISTING_ACCOUNTS_CHECK === "true");

    Account.findOne({ email: new RegExp(formData.email, "i") }, function(err, the_account){

      if (!bypass_account_check) {
        console.log('-' +bypass_account_check+'-');
        console.log('Checking existing account for ' + formData.email);
        if(!the_account){
          result.message = "Account not allowed to register";
          return res.status(400).json(result);
        };

        if(the_account.temporary_password != formData.temporary_password){
          result.message = "Account not allowed to register";
          return res.status(400).json(result);
        };

        if(the_account.password){
          result.message = "Account already registered";
          return res.status(400).json(result);
        };

        if(formData.password !== formData.confirmation){
          result.message = "Validation failed. Password and Confirmation do not match";
          return res.status(400).json(result);
        };

        if(formData.password && formData.password.trim() < 8){
          result.message = "Validation failed. Password policies are not satisfied";
          return res.status(400).json(result);
        };
      } else {
        console.log('Bypassing account check for ' + formData.email);
        the_account = new Account({
          email: formData.email
        });
      };

      result.errors = false;
      result.redirect = "/widget";

      the_account.password = the_account.generateHash(formData.password);
      the_account.temporary = false;
      the_account.save(function(err){
        if(err) throw err;
        req.logIn(the_account, function(err) {
          res.status(200).json(result);
        });
      });
    });
  });

  router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

  router.get('/widget', isLoggedIn, function(req, res, next) {
    voxrtc_config = voxbone.generate();

    Account
      .findOne({_id: req.user._id})
      .exec(function(err, the_account) {
        res.render('widget', { title: title, did: the_account.did, account: accountLoggedIn(req), email: the_account.email });
      });
  });

  router.get('/', redirectToWidgetIfLoggedIn, function(req, res, next) {
    res.render('login', { title: title, account: accountLoggedIn(req), email: req.query.email});
  });

  router.get('/forgot', function(req, res, next){
    res.render('forgot', { title: title, email: req.query.email, account: accountLoggedIn(req) });
  });

  router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        Account.findOne({ email: new RegExp(req.body.email, "i") }, function(err, account) {
          if (!account) {
            var result = { message: "No account with that email address exists.", errors: err }
            return res.status(404).json(result);
          }

          account.resetPasswordToken = token;
          account.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          account.save(function(err) {
            done(err, token, account);
          });
        });
      },
      function(token, account, done) {
        var email = new sendgrid.Email({to: account.email});
        email.from = process.env.SENDGRID_FROM;
        email.replyto = process.env.SENDGRID_FROM;
        email.subject = 'Voxbone Widget Generator - Password Reset';

        email.html = ' ';

        email.addFilter('templates', 'enable', 1);
        email.addFilter('templates', 'template_id', process.env.SENDGRID_PASSWORD_RESET_TEMPLATE);

        email.addSubstitution('-button_link-', 'https://' + req.headers.host + '/reset/' + token);

        sendgrid.send(email, function(err, json) {
          var result = { message: "An e-mail has been sent to " + account.email + " with further instructions. Please check your inbox.", errors: null }
          res.status(200).json(result);
          // console.log(json);
        });
      }
    ], function(err) {
      if (err) return next(err);
      var result = { message: "There was an error", errors: err }
      res.status(500).json(result);
    });
  });

  router.get('/reset/:token', function(req, res) {
    Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, account) {
      if (!account) {
        return res.render('forgot', { title: title, message: "Password reset token is invalid or has expired.", errors: err })
      }
      res.render('reset', { title: title, account: accountLoggedIn(req), the_account: req.user, token:req.params.token, email: req.query.email });
    });
  });

  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, account) {
          if (!account) {
            var result = { message: "Password reset token is invalid or has expired.", errors: err }
            return res.status(400).json(result);
          }

          if(req.body.password !== req.body.confirmation){
            var result = { message: "Password and confirmation do not match.", errors: true }
            return res.status(400).json(result);
          }
          account.password = account.generateHash(req.body.password);
          account.resetPasswordToken = undefined;
          account.resetPasswordExpires = undefined;

          account.save(function(err) {
            req.logIn(account, function(err) {
              done(err, account);
            });
          });
        });
      },
      function(account, done) {

        var email = new sendgrid.Email({to: account.email});
        email.from = process.env.SENDGRID_FROM;
        email.replyto = process.env.SENDGRID_FROM;
        email.subject = 'Voxbone Widget Generator - Your password has been changed';

        email.html = ' ';

        email.addFilter('templates', 'enable', 1);
        email.addFilter('templates', 'template_id', process.env.SENDGRID_PASSWORD_CHANGED_TEMPLATE);

        sendgrid.send(email, function(err, json) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
          // console.log(json);
        });
      }
    ], function(err) {
      if (err){
        var result = { message: "An error has ocurred.", errors: err }
        return res.status(400).json(result);
      }else{
        var result = { message: "Your password has been changed.", errors: null, redirect: '/widget' }
        return res.status(200).json(result);
      }
    });
  });

  router.get('/voxbone_widget/:id', function (req, res) {
    voxrtc_config = voxbone.generate();

    var searchForWidget = { _id: new ObjectId(req.params.id) };

    Widget
      .findOne(searchForWidget)
      .populate('_account')
      .exec(function(err, the_widget) {

        if (!the_widget || err) {

          var result = { message: "Widget not found", errors: null }
          return res.status(404).json(result);

        } else if (the_widget && the_widget._account && the_widget._account.did) {
          res.render('voxbone_widget', { layout: false, title: title, did: the_widget._account.did, the_widget: the_widget });
        };

        res.end("");
    });
  });

  router.post('/voxbone_widget', function(req, res, next){
    var formData = req.body;
    var result = { message: "", errors: null, redirect: '/voxbone_widget' }

    var a_widget = new Widget({
      _account: req.user._id,
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

    a_widget.save(function(err) {
      if (err) throw err;
      result.widget_code = a_widget.generateHtmlCode();
      result.widget_id = a_widget.id;
      res.status(200).json(result);
    });
  });

  router.post('/rating', function(req, res, next){
    var formData = req.body;
    var result = { message: "", errors: null }

    var searchFor = { _id: new ObjectId(req.body.token) };

    Widget.findOne(searchFor, function(err, the_widget) {

      var a_rating = new Rating({
        rate: req.body.rate,
        comment: req.body.comment,
        url: req.body.url,
        _widget: the_widget._id
      });

      a_rating.save(function(err) {
        if (err) {
          result.errors = err;
          res.status(500).json(result);
        } else {
          res.status(200).json(result);
        }
      });
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  function redirectToWidgetIfLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      res.redirect('/widget');
    return next();
  }

  function accountLoggedIn(req) {
    return req.isAuthenticated();
  }

  function getApiCredentials() {
    return {
      'user' : process.env.VOXBONE_API_USERNAME,
      'pass' : process.env.VOXBONE_API_PASSWORD
    };
  }

  function getJsonHeaders() {
    return {
      'Content-type' : 'application/json',
      'Accept'       : 'application/json'
    };
  }

  router.post('/sip_provisioning', function(req, res, next){
    async.waterfall([
      function(done){
        //step 1 Find the account
        Account.findOne({ email: new RegExp(req.user.email, "i") }, function(err, the_account){
          done(err, the_account);
        });
      },

      function(account, done){
        //step 1a Check if SIP is already linked
        //if so, return the corresponding VoiceUriId

        var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri?pageNumber=0&pageSize=1000"

        request.get(url,
          { auth: getApiCredentials(), headers: getJsonHeaders() },
          function(err, response, body){

            if(err) return console.log('Error:', err);

            var response_body = JSON.parse(body);
            var voice_uris = response_body.voiceUris;
            var voice_uri = voice_uris.filter(function(vu){
              return vu.uri == req.body.sip_uri;
            });

            var voice_uri_id;
            if (voice_uri[0])
              voice_uri_id = voice_uri[0].voiceUriId;

            done(err, account, voice_uri_id);
          }
        );
      },

      function(account, voice_uri_id, done){
        //step 1b Create / Update the voice uri
        var put_data = {
          "voiceUri" : {
            "voiceUriId"       : voice_uri_id,
            "backupUriId"      : null,
            "voiceUriProtocol" : "SIP",
            "uri"              : req.body.sip_uri,
            "description"      : "Voice URI for: " + req.user.email + " from promotional widget generator."
          }
        };

        console.log(put_data);
        var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri";
        request.put(url,
          {
            auth: getApiCredentials(),
            headers: getJsonHeaders(),
            body: JSON.stringify(put_data)
          },
          function(err, response, body){
            if(err){
              if(err.code === 'ETIMEDOUT' || err.connect === true)
                done({ httpStatusCode: 503, comeback_errors: "Timeout", message: "Timeout - Could not create the voice uri for SIP URI: " + req.body.sip_uri + " and user: " + req.user.email + " . Probably already exists. View previous logs for more details." });
              else
                console.log('Error:', err);

              return;
            }

            var response_body = JSON.parse(body);
            if(response_body['httpStatusCode']){
              done({ httpStatusCode: response_body['httpStatusCode'], comeback_errors: response_body.errors[0], message: "Could not create the voice uri for SIP URI: " + req.body.sip_uri + " and user: " + req.user.email + " . Probably already exists. View previous logs for more details." });
            } else {
              //success
              var post_data = { "didIds" : [ account.didId ], "voiceUriId" : voice_uri_id };
              done(err, post_data);
            }
          }
        );
      },

      function(post_data, done){
        //step 2 link the voice uri id
        var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/configuration";
        request.post(url,
          { auth: getApiCredentials(),
            headers: getJsonHeaders(),
            body: JSON.stringify(post_data)
          },
          function(err, response, body){
            done(err);
          }
        );
      }
      ],
      function(err, result){
        result = { errors: null };
        if (err) {
          console.log("An error ocurred: ");
          console.log(err);
          result.errors = err;
          return res.status(result.errors.httpStatusCode || 500).json(result);
        } else {
          // console.log(result);
          result.message = "Success";
          return res.status(200).json(result);
        }
      }
    );
  });

  return router;
}
