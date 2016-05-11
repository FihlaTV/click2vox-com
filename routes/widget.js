// This module is to put all the functionality related to
// Widgets management

var express = require('express');
var router = express.Router();

var async = require('async');

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');

router.get('/:id/edit', utils.isLoggedIn, function (req, res, next) {
  var defaultBtnLabel = process.env.DEFAULT_BUTTON_LABEL || 'Call Sales';

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
  function (err, results) {
    if (!results.widget) return utils.objectNotFound(res, req, next);
    results['defaultBtnLabel'] = defaultBtnLabel;
    res.render('widget/edit', results);
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
      'link_button_to_a_page', 'show_text_html'
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