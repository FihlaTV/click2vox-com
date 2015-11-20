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

module.exports = function(passport, voxbone){

  router.get('/ping', function(req, res, next){
    res.json({ 'ping': Date.now(), 'version': pjson.version });
  });

  // Redirects if not HTTPS
  router.get('*',function(req,res,next){
    if(process.env.FORCE_HTTPS == 'true' && process.env.APP_URL && req.headers['x-forwarded-proto'] != 'https')
      res.redirect(process.env.APP_URL + req.url);
    else
      next();
  })

  router.get('/login', function(req, res, next){
    res.render('login', { title: title, email: req.query.email, account: accountLoggedIn(req), message: req.flash('loginMessage') });
  });

  router.post('/login', function(req, res, next){
    var formData = req.body;
    passport.authenticate('local-login', function(err, account, info) {
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

    Account.findOne({ email: formData.email }, function(err, the_account){

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
    res.redirect('/');
  });

  router.get('/widget', isLoggedIn, function(req, res, next) {
    voxrtc_config = voxbone.generate();

    Account
      .findOne({_id: req.user._id})
      .exec(function(err, the_account) {
        res.render('widget', { title: title, did: the_account.did, account: accountLoggedIn(req) });
      });
  });

  router.get('/', function(req, res, next) {
    res.render('login', { title: title, account: accountLoggedIn(req) });
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
        Account.findOne({ email: req.body.email }, function(err, account) {
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
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
          }
        });

        var mailOptions = {
          to: account.email,
          from: process.env.SENDGRID_FROM,
          subject: 'Voxbone Widget Generator - Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'https://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          html: "<h2> Password Reset </h2> <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/> Please click on the following link, or paste this into your browser to complete the process: <br/> http://"+ req.headers.host + "/reset/" + token +"<br/> If you did not request this, please ignore this email and your password will remain unchanged. </p>"
        };

        smtpTransport.sendMail(mailOptions, function(err) {
          if(err){
            console.log(err);
            done(err, 'done');
          }else{
            var result = { message: "An e-mail has been sent to " + account.email + " with further instructions. Please check your inbox.", errors: null }
            res.status(200).json(result);
          }
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
      res.render('reset', { title: title, account: accountLoggedIn(req), the_account: req.user, token:req.params.token });
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
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
          }
        });
        var mailOptions = {
          to: account.email,
          from: process.env.SENDGRID_FROM,
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + account.email + ' has just been changed.\n',
          html: "<h2> Hello </h2> <p> This is a confirmation that the password for your account " +account.email+" has just been changed.</p>"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
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
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function accountLoggedIn(req) {
    return req.isAuthenticated();
  }

  router.post('/sip_provisioning', function(req, res, next){
    async.waterfall([
      function(done){
        //step 1 Find the account
        Account.findOne({ email: req.user.email }, function(err, the_account){
          done(err, the_account);
        });
      },

      function(account, done){
        //step 1a Check if DID is already linked

        var url = "https://api.voxbone.com/ws-voxbone/services/rest/inventory/did?e164Pattern="+account.did+"&pageNumber=0&pageSize=1";

        request.get(url,
            { 'auth': {
                'user' : process.env.VOXBONE_MARKETING_USERNAME,
                'pass' : process.env.VOXBONE_MARKETING_PASSWORD
              },
              headers: {
                'Content-type' : 'application/json',
                'Accept'       : 'application/json'
              }
            },
            function(err, response, body){
              var response_body = JSON.parse(body);
              // console.log(response_body);
              var voice_uri_id = response_body.dids[0].voiceUriId;
              done(err, account, voice_uri_id);
            }
          );
      },

      function(account, voice_uri_id, done){
        //step 1b Create the voice uri
        var put_data = {
          "voiceUri" : {
            "voiceUriId"       : voice_uri_id.toString() || null,
            "backupUriId"      : null,
            "voiceUriProtocol" : "SIP",
            "uri"              : req.body.sip_uri || "echo@ivrs",
            "description"      : "Voice URI for: " + req.user.email + " from promotional widget generator."
          }
        };

        var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri";
        request.put(url,
          { 'auth': {
              'user' : process.env.VOXBONE_MARKETING_USERNAME,
              'pass' : process.env.VOXBONE_MARKETING_PASSWORD
            },
            headers: {
              'Content-type' : 'application/json',
              'Accept'       : 'application/json'
            },
            body: JSON.stringify(put_data)
          },
          function(err, response, body){
            var response_body = JSON.parse(body);
            if(response_body['httpStatusCode']){
              console.log(body);
              done({ message: "Could not create the voice uri for SIP URI: " + req.body.sip_uri + " and user: " + req.user.email + " . Probably already exists. View previous logs for more details." });
            }else{
              //success
              var didID = account.didID;
              // var voice_uri_id = response_body['voiceUri']['voiceUriId'];
              var post_data = { "didIds" : [ didID ], "voiceUriId" : voice_uri_id };
              done(err, post_data, didID);
            }
          }
        );
      },

      function(post_data, didID, done){
        //step 2 link the voice uri id
        var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/configuration";
        request.post(url,
            { 'auth': {
                'user' : process.env.VOXBONE_MARKETING_USERNAME,
                'pass' : process.env.VOXBONE_MARKETING_PASSWORD
              },
              headers: {
                'Content-type' : 'application/json',
                'Accept'       : 'application/json'
              },
              body: JSON.stringify(post_data)
            },
            function(err, response, body){
              done(err, didID);
            }
          );
      }
      ],
      function(err, result){
        var result = {message: "", errors: null};
        if(err){
          console.log("An error ocurred: ");
          console.log(err);
          result.errors = err;
          return res.status(500).json(result);
        }else{
          console.log(result);
          result.message = "Success";
          return res.status(200).json(result);
        }
      }
    );
  });

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function accountLoggedIn(req) {
    return req.isAuthenticated();
  }

  return router;
}
