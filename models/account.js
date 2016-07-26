var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Did = require('./dids');

const ADMIN_DOMAINS = ['agilityfeat.com', 'voxbone.com'];

var accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  temporary_password: String,
  first_name: {
    type: String,
    required: true
  },
  temporary: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  did: Number,
  didId: Number,
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verifyAccountToken: String,
  verifyAccountExpires: Date,
  password: String,
  created_at: Date,
  updated_at: Date,
  company: String,
  sip_uris: [String]
});

accountSchema.pre('save', function (next) {
  self = this;
  now = new Date();
  self.updated_at = now;

  if (!self.created_at)
    self.created_at = now;

  Did.findOne({
    assigned: {
      $ne: true
    }
  }, function (err, foundDid) {
    if (err) {
      next(err);
    } else if (!self.did || !self.didId) {
      if (foundDid) {
        self.did = foundDid.did;
        self.didId = foundDid.didId;
        foundDid.assigned = true;
        foundDid.save();
        next();
      } else {
        next(new Error('NoDIDsAvailable'));
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

accountSchema.methods.getSipURIs = function () {
  var Widget = require('./widget');
  var defaultSips = require('../routes/utils').defaultSipUris();
  var account = this;

  // if user has no sip_uris, check for old version generated widgets
  // and get the sips that are store on those widgets
  if (this.sip_uris.length === 0) {
    Widget
      .distinct('sip_uri', {_account: this._id})
      .exec(function (err, sips) {
        var diff = sips.filter(function (x) {return defaultSips.indexOf(x) < 0; });
        account.sip_uris = diff;
        account.save();
      });
  }

  return defaultSips.concat(this.sip_uris);
};

accountSchema.methods.getSipURIsWithNewSipUri = function () {
  var sip_uris = this.getSipURIs();

  if (process.env.BYPASS_ADDING_SIP_URI === 'false')
    sip_uris = sip_uris.concat('Add a new SIP URI');

  return sip_uris;
};

accountSchema.methods.saveSipURI = function (sipURI) {
  if (this.sip_uris.indexOf(sipURI) === -1) {
    this.sip_uris.push(sipURI);
    this.save();
  }
};

accountSchema.methods.removeSipURI = function (sipURI) {
  var index = this.sip_uris.indexOf(sipURI);
  if (index > -1) {
    this.sip_uris.splice(index, 1);
    this.save();
  }
};

accountSchema.methods.showWizard = function () {
  var utils = require('../routes/utils');

  if (process.env.BYPASS_ADDING_SIP_URI === 'true')
    return false;

  return utils.defaultSipUris().length === this.getSipURIs().length;
};


var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
