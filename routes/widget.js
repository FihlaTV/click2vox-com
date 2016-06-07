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
  var params = req.parameters;
  var widgetData = params
    .permit(
      'configuration_name', 'button_label', 'button_style',
      'background_style', 'sip_uri', 'caller_id', 'context',
      'dial_pad', 'send_digits', 'hide_widget', 'updated_at',
      'link_button_to_a_page', 'show_text_html',
      'incompatible_browser_configuration'
    );

  var result = { message: "", errors: null };
  widgetData['_account'] = req.user._id;

  Widget.create(widgetData, function (err, widget) {
    if (err) throw err;
    result['redirect'] = '/widget/' + widget._id + '/edit';
    res.status(200).json(result);
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

  Widget.findOneAndUpdate({
    _account: req.user._id,
    _id: req.params.id
  },
  updateData).populate('_account').exec(
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

    if (params.shouldProvision) {
      utils.provisionSIP(req.user, params.sip_uri, function (err, data) {
        if (err) {
          console.log('Error while provisioning demo sip uri: ', err);
          result.errors = err;
          return res.status(data.errors.httpStatusCode || 500).json(result);
        } else {
          result.message = 'Success';
          return successResponse();
        }
      });
    } else {
      return successResponse();
    }
  });
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
