var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  temporary: { type: Boolean, default: true },
  voxbone_password: String,
  forgotten_pasword: String,
  created_at: Date,
  updated_at: Date
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
