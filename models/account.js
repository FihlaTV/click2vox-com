var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Did = require('./dids');

const ADMIN_DOMAINS = ['agilityfeat.com', 'voxbone.com'];

var accountSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  temporary_password: { type: String, required: true },
  first_name: { type: String, required: true },
  temporary: { type: Boolean, default: true },
  did: Number,
  didId: Number,
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  password: String,
  created_at: Date,
  updated_at: Date
});

accountSchema.pre('save', function(next){
  self = this
  now = new Date();
  self.updated_at = now;

  if (!self.created_at)
    self.created_at = now;

  Did.findOne({ assigned: false }, function(err, found_did){
    if(err) {
      next(err);
    } else if (found_did && !self.did && !self.didId) {
      self.temporary = true;
      self.did = found_did.did;
      self.didId = found_did.didId;
      found_did.assigned = true
      found_did.save()
      next();
    } else {
      next();
    }
  });
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
