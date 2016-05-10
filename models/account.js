var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Did = require('./dids');

const ADMIN_DOMAINS = ['agilityfeat.com', 'voxbone.com'];

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  temporary_password: String,
  first_name: { type: String, required: true },
  temporary: { type: Boolean, default: true },
  admin: { type: Boolean, default: false },
  did: Number,
  didId: Number,
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  password: String,
  created_at: Date,
  updated_at: Date,
  company: String
});

accountSchema.pre('save', function (next) {
  self = this;
  now = new Date();
  self.updated_at = now;

  if (!self.created_at)
    self.created_at = now;

  Did.findOne({ assigned: {$ne: true} }, function (err, foundDid) {
    if(err) {
      next(err);
    } else if (!self.did || !self.didId) {
      if (foundDid) {
        self.did = foundDid.did;
        self.didId = foundDid.didId;
        foundDid.assigned = true;
        foundDid.save();
        next();
      } else {
        next(new Error('NoDidsAvailable'));
      }
    } else {
      next();
    }
  });
});

accountSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

accountSchema.methods.isAdmin = function () {
  var domain = this.email.replace(/.*@/, "");
  return ADMIN_DOMAINS.indexOf(domain) > -1;
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
