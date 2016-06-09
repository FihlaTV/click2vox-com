// This module is to put all the functionality related to
// Widgets management

var express = require('express');
var router = express.Router();

var async = require('async');

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');

router.get('/new', utils.isLoggedIn, function (req, res, next) {
  Widget
    .find({_account: req.user._id})
    .exec(function (err, widgets) {
      res.render('widget/new', {
        defaultBtnLabel: utils.defaultBtnLabel,
        userSipUris: req.user.getSipURIs(),
        showWizard: (widgets.length === 0),
        addedSip: req.query.sip
      });
    });
});

router.post('/new', utils.isLoggedIn, function (req, res, next) {
  var currentUser = req.user;
  var params = req.parameters;
  var widgetData = params
    .permit(
      'configuration_name', 'button_label', 'button_style',
      'background_style', 'sip_uri', 'caller_id', 'context',
      'dial_pad', 'send_digits', 'hide_widget', 'updated_at',
      'link_button_to_a_page', 'show_text_html',
      'incompatible_browser_configuration', 'new_sip_uri'
    );

  var result = { message: "", errors: null };
  widgetData['_account'] = currentUser._id;

  // allow new sips if paid user or not sip_uris registered
  if (widgetData.new_sip_uri) {
    if (currentUser.sip_uris.length === 0 || currentUser.paid) {
      currentUser.saveSipURI(widgetData.new_sip_uri);
      widgetData.sip_uri = widgetData.new_sip_uri;
    } else {
      result.errors = 'To add a new SIP URI you will need to upgrade to a paid account';
      return res.status(401).json(result);
    }
  }

  utils.provisionSIP(currentUser, widgetData.sip_uri, function (err) {
    if (err) {
      console.log('Error while provisioning demo sip uri: ', err);
      if (widgetData.new_sip_uri) currentUser.removeSipURI(widgetData.new_sip_uri);
      result.errors = 'An error occurred while saving your SIP URI. Please try again';
      return res.status(err.httpStatusCode || 500).json(result);
    } else {
      Widget.create(widgetData, function (err, widget) {
        if (err) throw err;
        result['redirect'] = '/widget/' + widget._id + '/edit';
        return res.status(200).json(result);
      });
    }
  });
});

router.get('/:id/edit', utils.isLoggedIn, function (req, res, next) {
  async.parallel({
    user: function (callback) {
      Account
        .findOne({_id: req.user._id})
        .exec(callback);
    },
    widget: function(callback){
      Widget
        .findOne({
          _account: req.user._id,
          _id: req.params.id
        })
        .populate('_account')
        .exec(callback);
    }
  },
  function (err, result) {
    if (!result.widget) return utils.objectNotFound(res, req, next);
    result['defaultBtnLabel'] = utils.defaultBtnLabel;
    result['widget_code'] = result.widget.generateDivHtmlCode();
    res.render('widget/edit', result);
  });
});

router.post('/:id/edit', utils.isLoggedIn, function (req, res, next) {
  var params = req.parameters;
  var updateData = params
    .merge({updated_at: new Date()})
    .permit(
      'configuration_name', 'button_label', 'button_style',
      'background_style', 'sip_uri', 'caller_id', 'context',
      'dial_pad', 'send_digits', 'hide_widget', 'updated_at',
      'link_button_to_a_page', 'show_text_html',
      'incompatible_browser_configuration'
    );

  console.log(updateData);

  var result = { message: "", errors: null };

  Widget
    .findOneAndUpdate({
      _account: req.user._id,
      _id: req.params.id
    }, updateData)
    .populate('_account')
    .exec(
      function (err, widget) {
        var successResponse = function () {
          if (params.type === 'iframe') {
            result.widget_code = widget.generateHtmlCode();
          } else {
            result.widget_code = widget.generateDivHtmlCode();
          }
          result.widget_id = widget.id;
          result.widget = widget;
          return res.status(200).json(result);
        };

        utils.provisionSIP(req.user, params.sip_uri, function (err) {
          console.log('Provisioning...');
          if (err) {
            console.log('Error while provisioning demo sip uri: ', err);
            result.errors = 'An error occurred while saving your SIP URI. Please try again';
            return res.status(err.httpStatusCode || 500).json(result);
          } else {
            result.message = 'Success';
            return successResponse();
          }
        });
      }
    );
});

router.get('/demo', function (req, res, next) {
  var demoEmail = process.env.DEMO_USER_EMAIL || 'demo.widget@click2vox.com';
  var demoSip = process.env.DEMO_SIP_URI || 'echo@ivrs';

  var renderResponse = function (account) {
    res.render('widget/demo', {
      defaultBtnLabel: utils.defaultBtnLabel,
      demoSipUris: utils.defaultSipUris(),
      demoSip: demoSip,
      demoUser: account,
      title: 'Create sample call button'
    });
  };

  // check if demo user exists
  Account.findOne({
    email: demoEmail
  }, function (err, account) {
    if (!account) {
      account = new Account({
        email: demoEmail,
        verified: true,
        temporary: false,
        first_name: 'Demo User'
      });
      account.save();

      // let provision the default sip uri with demo account
      utils.provisionSIP(account, demoSip, function (err, result) {
        if (err) console.log('Error while provisioning demo sip uri: ', err);
        renderResponse(account);
      });
    } else
      renderResponse(account);
  });
});

module.exports = router;
