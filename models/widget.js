var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var Schema = mongoose.Schema;
var pjson = require('../package.json');
var version = pjson.version.split('.').join('');

var widgetSchema = new Schema({
  _account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  configuration_name: String,
  button_color: String,
  frame_color: String,
  button_label: String,
  button_style: String,
  background_style: String,
  sip_uri: String,
  caller_id: String,
  context: String,
  dial_pad: {
    type: Boolean,
    default: true
  },
  show_frame: {
    type: Boolean,
    default: true
  },
  show_branding: {
    type: Boolean,
    default: true
  },
  test_setup: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Boolean,
    default: true
  },
  send_digits: String,
  hide_widget: {
    type: Boolean,
    default: false
  },
  ringback: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String,
    default: "bottom-right"
  },
  https_popup: {
    type: Boolean,
    default: true
  },
  show_text_html: String,
  link_button_to_a_page: String,
  incompatible_browser_configuration: String,
  created_at: Date,
  updated_at: Date,
  did: Schema.Types.Long,
  didId: Number
});

widgetSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

widgetSchema.methods.generateDivHtmlCode = function() {
  var utils = require("../routes/utils.js");
  return utils.widgetDivHtmlCode(this, this.didToCall());
};

widgetSchema.methods.generateHtmlCode = function() {
  var app_url = process.env.APP_URL || 'http://widget.voxbone.com';

  var html = '';
  html += '<div class="voxButton" id="voxButton_' + this.id + '">';

  html += '<link rel="stylesheet" href="' + app_url + '/stylesheets/widget.css?v=' + version + '">';
  html += '<script src="' + app_url + '/javascripts/widget.js?v=' + version + '"></script>';

  var iframe_styles = 'width="300" height="183" frameBorder="0" scrolling="no"';
  html += '<iframe id="call_button_frame" ' + iframe_styles + ' src="' + app_url + '/voxbone_widget/' + this.id + '">';
  html += '</iframe>';

  html += '<div id="control"></div>';

  html += '</div>';

  return html;
};

widgetSchema.methods.didToCall = function () {
  var utils = require("../routes/utils.js");
  var defaultSipUris = utils.defaultSipUris();
  var self = this;

  if (defaultSipUris.indexOf(this.sip_uri) === -1) {
    return (this.did) ? this.did : this._account.did;
  } else {
    var demoSips = require('../config/demo-sips.json');
    return demoSips[this.sip_uri][0];
  }
};

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
