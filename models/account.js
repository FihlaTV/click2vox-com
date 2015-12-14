var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const ADMIN_DOMAINS = ['agilityfeat.com', 'voxbone.com'];

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  temporary: { type: Boolean, default: true },
  temporary_password: String,
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  first_name: String,
  didId: Number,
  did: Number
});

accountSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

accountSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

accountSchema.methods.isAdmin = function() {
  var domain = this.email.replace(/.*@/, "");
  return ADMIN_DOMAINS.indexOf(domain) > -1;
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
