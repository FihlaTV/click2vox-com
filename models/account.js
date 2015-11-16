var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  temporary: { type: Boolean, default: true },
  temporary_password: String,
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  didID: Number,
  did: Number,
  voiceUriID: Number
});

accountSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
