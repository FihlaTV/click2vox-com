// This module is to put all the functionality related to
// user account and profile stuff

var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');

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
  var defaultBtnLabel = process.env.DEFAULT_BUTTON_LABEL || 'Call Sales';

  Widget.find({_account: req.user._id}, function (err, widgets) {
    res.render('account/widget-list', {
      widgets: widgets,
      defaultBtnLabel: defaultBtnLabel
    });
  });
});

module.exports = router;
