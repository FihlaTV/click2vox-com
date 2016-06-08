// This module is to put all the functionality related to
// user account and profile stuff

var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var express = require('express');
var router = express.Router();

var recaptcha = require('express-recaptcha');
recaptcha.init(
  process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  process.env.GOOGLE_RECAPTCHA_SECRET_KEY
);

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');
var emails = require('./emails');

// GET edit user profile
router.get('/edit', utils.isLoggedIn, function (req, res) {
  Account
    .findOne({_id: req.user._id})
    .exec(function (err, user) {
      res.render('account/edit', { user: user });
    });
});

router.post('/edit', utils.isLoggedIn, function (req, res) {
  var formData = req.body;
  var result = { message: "Succesfully saved", errors: true };

  Account.findOne({_id: req.user._id}, function (err, theAccount) {
    if (!theAccount) {
      result.message = "Account does not exist";
      return res.status(400).json(result);
    }

    theAccount.first_name = formData.name;
    theAccount.company = formData.company;
    theAccount.save(function (err) {
      if (err) throw err;

      result.errors = false;
      req.logIn(theAccount, function (err) {
        res.status(200).json(result);
      });
    });
  });
});

// ---- edit profile ----

router.get('/widgets', utils.isLoggedIn, function (req, res) {
  Widget
    .aggregate([
      {$match: {_account: req.user._id}},
      {$sort: {updated_at: -1}},
      {$group: {
        _id: '$sip_uri',
        widgets: {$push: {
          button_label: "$button_label",
          button_style: "$button_style",
          configuration_name: "$configuration_name",
          sip_uri: '$sip_uri',
          _id: '$_id'
        }}
      }},
      {$sort: {_id: 1}},
    ], function (err, result) {
      if (result.length > 0) {
        var widgets = result[0].widgets;

        widgets.forEach(function(widget) {
          widget.divCode = utils.widgetDivHtmlCode(widget, req.user.did);
        });
      }

      res.render('account/widget-list', {
        title: title,
        widgetsData: result,
        defaultBtnLabel: utils.defaultBtnLabel
      });
    });
});

// ---- sign up user ----

router.get('/signup', recaptcha.middleware.render, function (req, res, next) {
  req.logout();
  req.session.destroy();
  res.render('signup', {
    title: title,
    email: req.query.email,
    temp_password: req.query.password,
    captcha: req.recaptcha
  });
});

// POST /signup fetch the account with that email, set the new password and temporary to false.
router.post('/signup', recaptcha.middleware.verify, function (req, res, next) {
  var formData = req.body;
  var result = { message: "", errors: true, redirect: "", email: formData.email };

  // making some validations no matter if account exists or not
  if (formData.password !== formData.confirmation) {
    result.message = "Validation failed. Password and Confirmation do not match";
    return res.status(400).json(result);
  }

  if (formData.password && formData.password.trim() < 8) {
    result.message = "Validation failed. Password policies are not satisfied";
    return res.status(400).json(result);
  }

  if (req.recaptcha.error) {
    console.log(req.recaptcha);
    result.message = "Wrong Captcha! Try it again";
    return res.status(400).json(result);
  }

  Account.findOne({ email: formData.email }, function (err, theAccount) {
    // if account has password, it means was already registered. If not,
    // it was created while invite functionality was working.
    if (theAccount) {
      if (theAccount.password) {
        result.message = "Account already registered";
        return res.status(400).json(result);
      }
      theAccount.verified = true;
    } else {
      theAccount = new Account(
        {
          email: formData.email,
          verified: false
        }
      );
    }
    result.errors = false;

    theAccount.password = theAccount.generateHash(formData.password);
    theAccount.first_name = formData.name;
    theAccount.company = formData.company;
    theAccount.temporary = false;

    theAccount.save(function (err) {
      if (err) {
        if (err.message != 'NoDidsAvailable')
          throw err;
        else {
          console.log('*** NoDidsAvailable ***');
          result.message = "Cannot signup at the moment (No Dids Available)";
          return res.status(400).json(result);
        }
      }

      result.verified = theAccount.verified;

      if (result.verified) {
        req.logIn(theAccount, function (err) {
          result.redirect = "/sip/new";
          res.status(200).json(result);
        });
      } else {
        emails.sendPasswordReset(req, res, theAccount.email, 'verify');
      }
    });
  });
});

router.get('/verify/:token', function (req, res, next) {
  req.logout();
  req.session.destroy();
  Account.findOne({ verifyAccountToken: req.params.token, verifyAccountExpires: { $gt: Date.now() } }, function (err, account) {
    if (account) {
      if (account.verified) {
        renderLogin(res, "Account verification was already done. Please login", null);
      } else {
        account.verified = true;
        account.save(function (err) {
          renderLogin(res, "Account verification succedeed. Please login", null);
        });
      }
    } else {
      renderLogin(res, "Account verification token is invalid or has expired.", "TokenInvalidOrExpired");
    }
  });
});

function renderLogin(res, message, error) {
  return res.render('login', {
    title: title,
    error: error,
    message: message
  });
}

module.exports = router;
