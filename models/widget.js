var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pjson = require('../package.json');
var version = pjson.version.split('.').join('');

var widgetSchema = new Schema({
  _account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  configuration_name: String,
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
  send_digits: String,
  hide_widget: {
    type: Boolean,
    default: false
  },
  show_text_html: String,
  link_button_to_a_page: String,
  incompatible_browser_configuration: String,
  created_at: Date,
  updated_at: Date
});

widgetSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

widgetSchema.methods.generateDivHtmlCode = function() {
  var utils = require("../routes/utils.js");
  var jade = require("jade");

  var script = process.env.APP_URL + utils.click2voxJsFileName;

  var params = {
    script: script,
    id: this.id,
    label: this.button_label || process.env.DEFAULT_BUTTON_LABEL,
    redirect_url: this.link_button_to_a_page || 'https://voxbone.com',
    did: this._account.did,
    the_widget: this
  };

  var html = jade.renderFile('./views/voxbone_widget_div.jade', params);

  return html;
}

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

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
