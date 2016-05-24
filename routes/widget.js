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
        showWizard: (widgets.length === 0)
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
    result['widget_code'] = result.widget.generateHtmlCode();
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

  var result = { message: "", errors: null, redirect: '/account/widgets' };

  Widget.findOneAndUpdate({
    _account: req.user._id,
    _id: req.params.id
  },
  updateData,
  function (err, widget) {
    if (err) throw err;
    result.widget_code = widget.generateHtmlCode();
    result.widget_id = widget.id;
    res.status(200).json(result);
  });

});

module.exports = router;