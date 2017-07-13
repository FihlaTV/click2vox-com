var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var utils = require('../routes/utils');
var Did = require('./dids');

var ADMIN_DOMAINS = ['agilityfeat.com', 'voxbone.com'];

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
  last_name: {
    type: String,
    required: false
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
  forgotten_pasword: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verifyAccountToken: String,
  verifyAccountExpires: Date,
  password: String,
  created_at: Date,
  updated_at: Date,
  company: String,
  phone: String,
  customer_type: String,
  create_date: String,
  uri_type: String,
  google_id: String,
  google_token: String,
  github_id: String,
  github_token: String,
  windowslive_token: String,
  windowslive_id: String,
  slack_token: String,
  slack_id: String,
  linkedin_token: String,
  linkedin_id: String,
  voxbone_token: String,
  voxbone_id: String,
  sip_uris: [String],
  referrer: String,
  sip_uris_limit: {
    type: Number,
    default: 1
  },
  upgrade_request: Boolean,
  upgrade_request_timestamp: Date
});

accountSchema.pre('save', function(next) {
  self = this;
  now = new Date();
  self.updated_at = now;

  if (!self.created_at) {
    self.created_at = now;
    self.create_date = moment().format("DD/MM/YYYY");
    self.uri_type = 'none';
  }

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

accountSchema.methods.getFullName = function() {
  return this.first_name + ' ' + this.last_name;
};

accountSchema.methods.getSipURIs = function() {
  var defaultSips = require('../routes/utils').defaultSipUris();
  return defaultSips.concat(this.sip_uris);
};

accountSchema.methods.getSipURIsWithNewSipUri = function() {
  var sip_uris = this.getSipURIs();

  if (process.env.BYPASS_ADDING_SIP_URI === 'false' && !this.sipsLimitReached())
    sip_uris = sip_uris.concat('Add a new SIP URI');

  return sip_uris;
};

accountSchema.methods.saveSipURI = function(sipURI) {

  if (utils.defaultSipUris().indexOf(sipURI) === -1) {
    this.uri_type = "custom";
    if (this.sip_uris.indexOf(sipURI) === -1) {
      this.sip_uris.push(sipURI);
    }
  } else if (this.sip_uris.length === 0) {
    this.uri_type = "default";
  }

  this.save();
};

accountSchema.methods.removeSipURI = function(sipURI) {
  var index = this.sip_uris.indexOf(sipURI);
  if (index > -1) {
    this.sip_uris.splice(index, 1);

    if (this.sip_uris.length === 0)
      this.uri_type = "default";

    this.save();
  }
};

accountSchema.methods.showWizard = function() {
  if (process.env.BYPASS_ADDING_SIP_URI === 'true')
    return false;

  return utils.defaultSipUris().length === this.getSipURIs().length;
};

accountSchema.methods.sipsLimitReached = function() {
  var current_limit = this.sip_uris_limit;

  if (current_limit === 1 && this.upgrade_request_timestamp && this.upgrade_request_timestamp <= new Date())
    current_limit = 5;

  return (this.sip_uris.length >= current_limit);
};

accountSchema.methods.buttonsLimitReachedForSipUri = function(sipUri, callback) {
  var Widget = require('./widget');
  Widget
    .find({ _account: this._id, sip_uri: sipUri }, function(err, result) {
      callback(result.length >= process.env.BUTTONS_PER_SIP_URI_LIMIT);
    });
};

accountSchema.methods.getDidFor = function(sipUri, callback) {
  var self = this;

  if (utils.defaultSipUris().indexOf(sipUri) > -1) {
    var demoSips = require('../config/demo-sips.json');
    var data = demoSips[sipUri];
    return callback({
      did: data[0],
      didId: data[1]
    });
  }

  Did
    .findOne({ sip_uri: sipUri, assigned: true })
    .exec(function(err, foundDid) {
      if (foundDid) {
        return callback(foundDid);
      } else {
        Did.findOne({
          assigned: false
        }, function(err, foundDid) {
          if (foundDid) {
            foundDid.assigned = true;
            foundDid.sip_uri = sipUri;
            foundDid.save(function(err, doc, numAffected) {
              return callback(doc);
            });
          } else {
            return callback(null);
          }
        });
      }
    });
};

accountSchema.statics.updateSipUrisLimit = function(callback) {
  Account.update({
      "sip_uris_limit": 1,
      "upgrade_request_timestamp": { $lte: new Date() },
      "upgrade_request": true
    }, {
      $set: { sip_uris_limit: 5 }
    }, {
      "multi": true
    },
    callback
  );
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
