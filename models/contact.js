var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  company: String,
  name: String,
  email: String,
  reference: String,
  created_at: Date,
  updated_at: Date
});

contactSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
