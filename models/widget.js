var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var widgetSchema = new Schema({
  button_label: String,
  button_style: String,
  sip_uri: String,
  caller_id: String,
  context: String,
  dial_pad: { type: Boolean, default: true },
  send_digits: String,
  hide_widget: { type: Boolean, default: false },
  show_text_html: String,
  link_button_to_a_page: String,
  created_at: Date,
  updated_at: Date
});

widgetSchema.methods.generateHtmlCode = function() {

  var app_url = process.env.APP_URL ? process.env.APP_URL : 'http://widget.voxbone.com';
  var html = '<div class="voxButton" ';
  html += 'id="voxButton_' + this.id + '" ';
  html += 'href="' + app_url + '/voxbone_widget/' + this.id + '" ';
  html += 'onclick="initCall(voxButton_' + this.id + ')" ';
  html += 'hidden="hidden">';
  html += '</div>';

  html += '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"><\/script>';
  html += '<script src="//webrtc.voxbone.com/js/jssip-0.7.9-vox.js"><\/script>';
  html += '<script src="//webrtc.voxbone.com/js/voxbone-0.0.3.js"><\/script>';
  html += '<script src="' +  app_url + '/javascripts/widget.js"><\/script>';

  return html;
};

widgetSchema.methods.generateButtonCode = function() {

  var html = '';
  html += '<div id="voxbone-widget">';
  html += ' <div class="widget-box style-b">';
  html += '   <button id="launch_call" class="btn-style mdi-communication-call">';
  html += '     <span class="ng-binding">' + this.button_label + '</span>';
  html += '   </button>';
  html += '   <div class="widget-footer"><a href="#">powered by:</a></div>';
  html += ' </div>';
  html += '</div>';

  return html;
};

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
