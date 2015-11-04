var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  temporary: { type: Boolean, default: true },
  voxbone_password: String,
  forgotten_pasword: String,
  created_at: Date,
  updated_at: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});


accountSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
