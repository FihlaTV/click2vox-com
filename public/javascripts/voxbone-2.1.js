/*
 * @license Voxbone v2.1.6
 * Copyright 2017 Voxbone. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 /**
 * @license JsSIP v2.0.6
 * the Javascript SIP library
 * Copyright: 2012-2016 José Luis Millán <jmillan@aliax.net> (https://github.com/jmillan)
 * Homepage: http://jssip.net
 * License: MIT
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JsSIP = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pkg = require('../package.json');

var C = {
  USER_AGENT: pkg.title + ' ' + pkg.version,

  // SIP scheme
  SIP:  'sip',
  SIPS: 'sips',

  // End and Failure causes
  causes: {
    // Generic error causes
    CONNECTION_ERROR:         'Connection Error',
    REQUEST_TIMEOUT:          'Request Timeout',
    SIP_FAILURE_CODE:         'SIP Failure Code',
    INTERNAL_ERROR:           'Internal Error',

    // SIP error causes
    BUSY:                     'Busy',
    REJECTED:                 'Rejected',
    REDIRECTED:               'Redirected',
    UNAVAILABLE:              'Unavailable',
    NOT_FOUND:                'Not Found',
    ADDRESS_INCOMPLETE:       'Address Incomplete',
    INCOMPATIBLE_SDP:         'Incompatible SDP',
    MISSING_SDP:              'Missing SDP',
    AUTHENTICATION_ERROR:     'Authentication Error',

    // Session error causes
    BYE:                      'Terminated',
    WEBRTC_ERROR:             'WebRTC Error',
    CANCELED:                 'Canceled',
    NO_ANSWER:                'No Answer',
    EXPIRES:                  'Expires',
    NO_ACK:                   'No ACK',
    DIALOG_ERROR:             'Dialog Error',
    USER_DENIED_MEDIA_ACCESS: 'User Denied Media Access',
    BAD_MEDIA_DESCRIPTION:    'Bad Media Description',
    RTP_TIMEOUT:              'RTP Timeout'
  },

  SIP_ERROR_CAUSES: {
    REDIRECTED: [300,301,302,305,380],
    BUSY: [486,600],
    REJECTED: [403,603],
    NOT_FOUND: [404,604],
    UNAVAILABLE: [480,410,408,430],
    ADDRESS_INCOMPLETE: [484, 424],
    INCOMPATIBLE_SDP: [488,606],
    AUTHENTICATION_ERROR:[401,407]
  },

  // SIP Methods
  ACK:        'ACK',
  BYE:        'BYE',
  CANCEL:     'CANCEL',
  INFO:       'INFO',
  INVITE:     'INVITE',
  MESSAGE:    'MESSAGE',
  NOTIFY:     'NOTIFY',
  OPTIONS:    'OPTIONS',
  REGISTER:   'REGISTER',
  REFER:      'REFER',
  UPDATE:     'UPDATE',
  SUBSCRIBE:  'SUBSCRIBE',

  /* SIP Response Reasons
   * DOC: http://www.iana.org/assignments/sip-parameters
   * Copied from https://github.com/versatica/OverSIP/blob/master/lib/oversip/sip/constants.rb#L7
   */
  REASON_PHRASE: {
    100: 'Trying',
    180: 'Ringing',
    181: 'Call Is Being Forwarded',
    182: 'Queued',
    183: 'Session Progress',
    199: 'Early Dialog Terminated',  // draft-ietf-sipcore-199
    200: 'OK',
    202: 'Accepted',  // RFC 3265
    204: 'No Notification',  //RFC 5839
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Moved Temporarily',
    305: 'Use Proxy',
    380: 'Alternative Service',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    410: 'Gone',
    412: 'Conditional Request Failed',  // RFC 3903
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Unsupported URI Scheme',
    417: 'Unknown Resource-Priority',  // RFC 4412
    420: 'Bad Extension',
    421: 'Extension Required',
    422: 'Session Interval Too Small',  // RFC 4028
    423: 'Interval Too Brief',
    424: 'Bad Location Information',  // RFC 6442
    428: 'Use Identity Header',  // RFC 4474
    429: 'Provide Referrer Identity',  // RFC 3892
    430: 'Flow Failed',  // RFC 5626
    433: 'Anonymity Disallowed',  // RFC 5079
    436: 'Bad Identity-Info',  // RFC 4474
    437: 'Unsupported Certificate',  // RFC 4744
    438: 'Invalid Identity Header',  // RFC 4744
    439: 'First Hop Lacks Outbound Support',  // RFC 5626
    440: 'Max-Breadth Exceeded',  // RFC 5393
    469: 'Bad Info Package',  // draft-ietf-sipcore-info-events
    470: 'Consent Needed',  // RFC 5360
    478: 'Unresolvable Destination',  // Custom code copied from Kamailio.
    480: 'Temporarily Unavailable',
    481: 'Call/Transaction Does Not Exist',
    482: 'Loop Detected',
    483: 'Too Many Hops',
    484: 'Address Incomplete',
    485: 'Ambiguous',
    486: 'Busy Here',
    487: 'Request Terminated',
    488: 'Not Acceptable Here',
    489: 'Bad Event',  // RFC 3265
    491: 'Request Pending',
    493: 'Undecipherable',
    494: 'Security Agreement Required',  // RFC 3329
    500: 'JsSIP Internal Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Server Time-out',
    505: 'Version Not Supported',
    513: 'Message Too Large',
    580: 'Precondition Failure',  // RFC 3312
    600: 'Busy Everywhere',
    603: 'Decline',
    604: 'Does Not Exist Anywhere',
    606: 'Not Acceptable'
  },

  ALLOWED_METHODS: 'INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO',
  ACCEPTED_BODY_TYPES: 'application/sdp, application/dtmf-relay',
  MAX_FORWARDS: 69,
  SESSION_EXPIRES: 90,
  MIN_SESSION_EXPIRES: 60
};


module.exports = C;

},{"../package.json":40}],2:[function(require,module,exports){
module.exports = Dialog;


var C = {
  // Dialog states
  STATUS_EARLY:       1,
  STATUS_CONFIRMED:   2
};

/**
 * Expose C object.
 */
Dialog.C = C;


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:Dialog');
var SIPMessage = require('./SIPMessage');
var JsSIP_C = require('./Constants');
var Transactions = require('./Transactions');
var Dialog_RequestSender = require('./Dialog/RequestSender');


// RFC 3261 12.1
function Dialog(owner, message, type, state) {
  var contact;

  this.uac_pending_reply = false;
  this.uas_pending_reply = false;

  if(!message.hasHeader('contact')) {
    return {
      error: 'unable to create a Dialog without Contact header field'
    };
  }

  if(message instanceof SIPMessage.IncomingResponse) {
    state = (message.status_code < 200) ? C.STATUS_EARLY : C.STATUS_CONFIRMED;
  } else {
    // Create confirmed dialog if state is not defined
    state = state || C.STATUS_CONFIRMED;
  }

  contact = message.parseHeader('contact');

  // RFC 3261 12.1.1
  if(type === 'UAS') {
    this.id = {
      call_id: message.call_id,
      local_tag: message.to_tag,
      remote_tag: message.from_tag,
      toString: function() {
        return this.call_id + this.local_tag + this.remote_tag;
      }
    };
    this.state = state;
    this.remote_seqnum = message.cseq;
    this.local_uri = message.parseHeader('to').uri;
    this.remote_uri = message.parseHeader('from').uri;
    this.remote_target = contact.uri;
    this.route_set = message.getHeaders('record-route');
  }
  // RFC 3261 12.1.2
  else if(type === 'UAC') {
    this.id = {
      call_id: message.call_id,
      local_tag: message.from_tag,
      remote_tag: message.to_tag,
      toString: function() {
        return this.call_id + this.local_tag + this.remote_tag;
      }
    };
    this.state = state;
    this.local_seqnum = message.cseq;
    this.local_uri = message.parseHeader('from').uri;
    this.remote_uri = message.parseHeader('to').uri;
    this.remote_target = contact.uri;
    this.route_set = message.getHeaders('record-route').reverse();
  }

  this.owner = owner;
  owner.ua.dialogs[this.id.toString()] = this;
  debug('new ' + type + ' dialog created with status ' + (this.state === C.STATUS_EARLY ? 'EARLY': 'CONFIRMED'));
}


Dialog.prototype = {
  update: function(message, type) {
    this.state = C.STATUS_CONFIRMED;

    debug('dialog '+ this.id.toString() +'  changed to CONFIRMED state');

    if(type === 'UAC') {
      // RFC 3261 13.2.2.4
      this.route_set = message.getHeaders('record-route').reverse();
    }
  },

  terminate: function() {
    debug('dialog ' + this.id.toString() + ' deleted');
    delete this.owner.ua.dialogs[this.id.toString()];
  },

  // RFC 3261 12.2.1.1
  createRequest: function(method, extraHeaders, body) {
    var cseq, request;
    extraHeaders = extraHeaders && extraHeaders.slice() || [];

    if(!this.local_seqnum) { this.local_seqnum = Math.floor(Math.random() * 10000); }

    cseq = (method === JsSIP_C.CANCEL || method === JsSIP_C.ACK) ? this.local_seqnum : this.local_seqnum += 1;

    request = new SIPMessage.OutgoingRequest(
      method,
      this.remote_target,
      this.owner.ua, {
        'cseq': cseq,
        'call_id': this.id.call_id,
        'from_uri': this.local_uri,
        'from_tag': this.id.local_tag,
        'to_uri': this.remote_uri,
        'to_tag': this.id.remote_tag,
        'route_set': this.route_set
      }, extraHeaders, body);

    request.dialog = this;

    return request;
  },

  // RFC 3261 12.2.2
  checkInDialogRequest: function(request) {
    var self = this;

    if(!this.remote_seqnum) {
      this.remote_seqnum = request.cseq;
    } else if(request.cseq < this.remote_seqnum) {
        //Do not try to reply to an ACK request.
        if (request.method !== JsSIP_C.ACK) {
          request.reply(500);
        }
        return false;
    } else if(request.cseq > this.remote_seqnum) {
      this.remote_seqnum = request.cseq;
    }

    // RFC3261 14.2 Modifying an Existing Session -UAS BEHAVIOR-
    if (request.method === JsSIP_C.INVITE || (request.method === JsSIP_C.UPDATE && request.body)) {
      if (this.uac_pending_reply === true) {
        request.reply(491);
      } else if (this.uas_pending_reply === true) {
        var retryAfter = (Math.random() * 10 | 0) + 1;
        request.reply(500, null, ['Retry-After:'+ retryAfter]);
        return false;
      } else {
        this.uas_pending_reply = true;
        request.server_transaction.on('stateChanged', function stateChanged(){
          if (this.state === Transactions.C.STATUS_ACCEPTED ||
              this.state === Transactions.C.STATUS_COMPLETED ||
              this.state === Transactions.C.STATUS_TERMINATED) {

            request.server_transaction.removeListener('stateChanged', stateChanged);
            self.uas_pending_reply = false;
          }
        });
      }

      // RFC3261 12.2.2 Replace the dialog`s remote target URI if the request is accepted
      if(request.hasHeader('contact')) {
        request.server_transaction.on('stateChanged', function(){
          if (this.state === Transactions.C.STATUS_ACCEPTED) {
            self.remote_target = request.parseHeader('contact').uri;
          }
        });
      }
    }
    else if (request.method === JsSIP_C.NOTIFY) {
      // RFC6665 3.2 Replace the dialog`s remote target URI if the request is accepted
      if(request.hasHeader('contact')) {
        request.server_transaction.on('stateChanged', function(){
          if (this.state === Transactions.C.STATUS_COMPLETED) {
            self.remote_target = request.parseHeader('contact').uri;
          }
        });
      }
    }

    return true;
  },

  sendRequest: function(applicant, method, options) {
    options = options || {};

    var
      extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
      body = options.body || null,
      request = this.createRequest(method, extraHeaders, body),
      request_sender = new Dialog_RequestSender(this, applicant, request);

      request_sender.send();

      // Return the instance of OutgoingRequest
      return request;
  },

  receiveRequest: function(request) {
    //Check in-dialog request
    if(!this.checkInDialogRequest(request)) {
      return;
    }

    this.owner.receiveRequest(request);
  }
};

},{"./Constants":1,"./Dialog/RequestSender":3,"./SIPMessage":18,"./Transactions":21,"debug":33}],3:[function(require,module,exports){
module.exports = DialogRequestSender;

/**
 * Dependencies.
 */
var JsSIP_C = require('../Constants');
var Transactions = require('../Transactions');
var RTCSession = require('../RTCSession');
var RequestSender = require('../RequestSender');


function DialogRequestSender(dialog, applicant, request) {

  this.dialog = dialog;
  this.applicant = applicant;
  this.request = request;

  // RFC3261 14.1 Modifying an Existing Session. UAC Behavior.
  this.reattempt = false;
  this.reattemptTimer = null;
}


DialogRequestSender.prototype = {
  send: function() {
    var
      self = this,
      request_sender = new RequestSender(this, this.dialog.owner.ua);

    request_sender.send();

    // RFC3261 14.2 Modifying an Existing Session -UAC BEHAVIOR-
    if ((this.request.method === JsSIP_C.INVITE || (this.request.method === JsSIP_C.UPDATE && this.request.body)) &&
        request_sender.clientTransaction.state !== Transactions.C.STATUS_TERMINATED) {
      this.dialog.uac_pending_reply = true;
      request_sender.clientTransaction.on('stateChanged', function stateChanged(){
        if (this.state === Transactions.C.STATUS_ACCEPTED ||
            this.state === Transactions.C.STATUS_COMPLETED ||
            this.state === Transactions.C.STATUS_TERMINATED) {

          request_sender.clientTransaction.removeListener('stateChanged', stateChanged);
          self.dialog.uac_pending_reply = false;
        }
      });
    }
  },

  onRequestTimeout: function() {
    this.applicant.onRequestTimeout();
  },

  onTransportError: function() {
    this.applicant.onTransportError();
  },

  receiveResponse: function(response) {
    var self = this;

    // RFC3261 12.2.1.2 408 or 481 is received for a request within a dialog.
    if (response.status_code === 408 || response.status_code === 481) {
      this.applicant.onDialogError(response);
    } else if (response.method === JsSIP_C.INVITE && response.status_code === 491) {
      if (this.reattempt) {
        this.applicant.receiveResponse(response);
      } else {
        this.request.cseq.value = this.dialog.local_seqnum += 1;
        this.reattemptTimer = setTimeout(function() {
          if (self.applicant.owner.status !== RTCSession.C.STATUS_TERMINATED) {
            self.reattempt = true;
            self.request_sender.send();
          }
        }, 1000);
      }
    } else {
      this.applicant.receiveResponse(response);
    }
  }
};

},{"../Constants":1,"../RTCSession":11,"../RequestSender":17,"../Transactions":21}],4:[function(require,module,exports){
module.exports = DigestAuthentication;


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:DigestAuthentication');
var debugerror = require('debug')('JsSIP:ERROR:DigestAuthentication');
debugerror.log = console.warn.bind(console);
var Utils = require('./Utils');


function DigestAuthentication(credentials) {
  this.credentials = credentials;
  this.cnonce = null;
  this.nc = 0;
  this.ncHex = '00000000';
  this.algorithm = null;
  this.realm = null;
  this.nonce = null;
  this.opaque = null;
  this.stale = null;
  this.qop = null;
  this.method = null;
  this.uri = null;
  this.ha1 = null;
  this.response = null;
}


DigestAuthentication.prototype.get = function(parameter) {
  switch (parameter) {
    case 'realm':
      return this.realm;

    case 'ha1':
      return this.ha1;

    default:
      debugerror('get() | cannot get "%s" parameter', parameter);
      return undefined;
  }
};


/**
* Performs Digest authentication given a SIP request and the challenge
* received in a response to that request.
* Returns true if auth was successfully generated, false otherwise.
*/
DigestAuthentication.prototype.authenticate = function(request, challenge) {
  var ha2, hex;

  this.algorithm = challenge.algorithm;
  this.realm = challenge.realm;
  this.nonce = challenge.nonce;
  this.opaque = challenge.opaque;
  this.stale = challenge.stale;

  if (this.algorithm) {
    if (this.algorithm !== 'MD5') {
      debugerror('authenticate() | challenge with Digest algorithm different than "MD5", authentication aborted');
      return false;
    }
  } else {
    this.algorithm = 'MD5';
  }

  if (!this.nonce) {
    debugerror('authenticate() | challenge without Digest nonce, authentication aborted');
    return false;
  }

  if (!this.realm) {
    debugerror('authenticate() | challenge without Digest realm, authentication aborted');
    return false;
  }

  // If no plain SIP password is provided.
  if (!this.credentials.password) {
    // If ha1 is not provided we cannot authenticate.
    if (!this.credentials.ha1) {
      debugerror('authenticate() | no plain SIP password nor ha1 provided, authentication aborted');
      return false;
    }

    // If the realm does not match the stored realm we cannot authenticate.
    if (this.credentials.realm !== this.realm) {
      debugerror('authenticate() | no plain SIP password, and stored `realm` does not match the given `realm`, cannot authenticate [stored:"%s", given:"%s"]', this.credentials.realm, this.realm);
      return false;
    }
  }

  // 'qop' can contain a list of values (Array). Let's choose just one.
  if (challenge.qop) {
    if (challenge.qop.indexOf('auth') > -1) {
      this.qop = 'auth';
    } else if (challenge.qop.indexOf('auth-int') > -1) {
      this.qop = 'auth-int';
    } else {
      // Otherwise 'qop' is present but does not contain 'auth' or 'auth-int', so abort here.
      debugerror('authenticate() | challenge without Digest qop different than "auth" or "auth-int", authentication aborted');
      return false;
    }
  } else {
    this.qop = null;
  }

  // Fill other attributes.

  this.method = request.method;
  this.uri = request.ruri;
  this.cnonce = Utils.createRandomToken(12);
  this.nc += 1;
  hex = Number(this.nc).toString(16);
  this.ncHex = '00000000'.substr(0, 8-hex.length) + hex;

  // nc-value = 8LHEX. Max value = 'FFFFFFFF'.
  if (this.nc === 4294967296) {
    this.nc = 1;
    this.ncHex = '00000001';
  }

  // Calculate the Digest "response" value.

  // If we have plain SIP password then regenerate ha1.
  if (this.credentials.password) {
    // HA1 = MD5(A1) = MD5(username:realm:password)
    this.ha1 = Utils.calculateMD5(this.credentials.username + ':' + this.realm + ':' + this.credentials.password);
    //
  // Otherwise reuse the stored ha1.
  } else {
    this.ha1 = this.credentials.ha1;
  }

  if (this.qop === 'auth') {
    // HA2 = MD5(A2) = MD5(method:digestURI)
    ha2 = Utils.calculateMD5(this.method + ':' + this.uri);
    // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
    this.response = Utils.calculateMD5(this.ha1 + ':' + this.nonce + ':' + this.ncHex + ':' + this.cnonce + ':auth:' + ha2);

  } else if (this.qop === 'auth-int') {
    // HA2 = MD5(A2) = MD5(method:digestURI:MD5(entityBody))
    ha2 = Utils.calculateMD5(this.method + ':' + this.uri + ':' + Utils.calculateMD5(this.body ? this.body : ''));
    // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
    this.response = Utils.calculateMD5(this.ha1 + ':' + this.nonce + ':' + this.ncHex + ':' + this.cnonce + ':auth-int:' + ha2);

  } else if (this.qop === null) {
    // HA2 = MD5(A2) = MD5(method:digestURI)
    ha2 = Utils.calculateMD5(this.method + ':' + this.uri);
    // response = MD5(HA1:nonce:HA2)
    this.response = Utils.calculateMD5(this.ha1 + ':' + this.nonce + ':' + ha2);
  }

  debug('authenticate() | response generated');

  return true;
};


/**
* Return the Proxy-Authorization or WWW-Authorization header value.
*/
DigestAuthentication.prototype.toString = function() {
  var auth_params = [];

  if (!this.response) {
    throw new Error('response field does not exist, cannot generate Authorization header');
  }

  auth_params.push('algorithm=' + this.algorithm);
  auth_params.push('username="' + this.credentials.username + '"');
  auth_params.push('realm="' + this.realm + '"');
  auth_params.push('nonce="' + this.nonce + '"');
  auth_params.push('uri="' + this.uri + '"');
  auth_params.push('response="' + this.response + '"');
  if (this.opaque) {
    auth_params.push('opaque="' + this.opaque + '"');
  }
  if (this.qop) {
    auth_params.push('qop=' + this.qop);
    auth_params.push('cnonce="' + this.cnonce + '"');
    auth_params.push('nc=' + this.ncHex);
  }

  return 'Digest ' + auth_params.join(', ');
};

},{"./Utils":25,"debug":33}],5:[function(require,module,exports){
/**
 * @namespace Exceptions
 * @memberOf JsSIP
 */
var Exceptions = {
  /**
   * Exception thrown when a valid parameter is given to the JsSIP.UA constructor.
   * @class ConfigurationError
   * @memberOf JsSIP.Exceptions
   */
  ConfigurationError: (function(){
    var exception = function(parameter, value) {
      this.code = 1;
      this.name = 'CONFIGURATION_ERROR';
      this.parameter = parameter;
      this.value = value;
      this.message = (!this.value)? 'Missing parameter: '+ this.parameter : 'Invalid value '+ JSON.stringify(this.value) +' for parameter "'+ this.parameter +'"';
    };
    exception.prototype = new Error();
    return exception;
  }()),

  InvalidStateError: (function(){
    var exception = function(status) {
      this.code = 2;
      this.name = 'INVALID_STATE_ERROR';
      this.status = status;
      this.message = 'Invalid status: '+ status;
    };
    exception.prototype = new Error();
    return exception;
  }()),

  NotSupportedError: (function(){
    var exception = function(message) {
      this.code = 3;
      this.name = 'NOT_SUPPORTED_ERROR';
      this.message = message;
    };
    exception.prototype = new Error();
    return exception;
  }()),

  NotReadyError: (function(){
    var exception = function(message) {
      this.code = 4;
      this.name = 'NOT_READY_ERROR';
      this.message = message;
    };
    exception.prototype = new Error();
    return exception;
  }())
};


module.exports = Exceptions;

},{}],6:[function(require,module,exports){
module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "CRLF": parse_CRLF,
        "DIGIT": parse_DIGIT,
        "ALPHA": parse_ALPHA,
        "HEXDIG": parse_HEXDIG,
        "WSP": parse_WSP,
        "OCTET": parse_OCTET,
        "DQUOTE": parse_DQUOTE,
        "SP": parse_SP,
        "HTAB": parse_HTAB,
        "alphanum": parse_alphanum,
        "reserved": parse_reserved,
        "unreserved": parse_unreserved,
        "mark": parse_mark,
        "escaped": parse_escaped,
        "LWS": parse_LWS,
        "SWS": parse_SWS,
        "HCOLON": parse_HCOLON,
        "TEXT_UTF8_TRIM": parse_TEXT_UTF8_TRIM,
        "TEXT_UTF8char": parse_TEXT_UTF8char,
        "UTF8_NONASCII": parse_UTF8_NONASCII,
        "UTF8_CONT": parse_UTF8_CONT,
        "LHEX": parse_LHEX,
        "token": parse_token,
        "token_nodot": parse_token_nodot,
        "separators": parse_separators,
        "word": parse_word,
        "STAR": parse_STAR,
        "SLASH": parse_SLASH,
        "EQUAL": parse_EQUAL,
        "LPAREN": parse_LPAREN,
        "RPAREN": parse_RPAREN,
        "RAQUOT": parse_RAQUOT,
        "LAQUOT": parse_LAQUOT,
        "COMMA": parse_COMMA,
        "SEMI": parse_SEMI,
        "COLON": parse_COLON,
        "LDQUOT": parse_LDQUOT,
        "RDQUOT": parse_RDQUOT,
        "comment": parse_comment,
        "ctext": parse_ctext,
        "quoted_string": parse_quoted_string,
        "quoted_string_clean": parse_quoted_string_clean,
        "qdtext": parse_qdtext,
        "quoted_pair": parse_quoted_pair,
        "SIP_URI_noparams": parse_SIP_URI_noparams,
        "SIP_URI": parse_SIP_URI,
        "uri_scheme": parse_uri_scheme,
        "uri_scheme_sips": parse_uri_scheme_sips,
        "uri_scheme_sip": parse_uri_scheme_sip,
        "userinfo": parse_userinfo,
        "user": parse_user,
        "user_unreserved": parse_user_unreserved,
        "password": parse_password,
        "hostport": parse_hostport,
        "host": parse_host,
        "hostname": parse_hostname,
        "domainlabel": parse_domainlabel,
        "toplabel": parse_toplabel,
        "IPv6reference": parse_IPv6reference,
        "IPv6address": parse_IPv6address,
        "h16": parse_h16,
        "ls32": parse_ls32,
        "IPv4address": parse_IPv4address,
        "dec_octet": parse_dec_octet,
        "port": parse_port,
        "uri_parameters": parse_uri_parameters,
        "uri_parameter": parse_uri_parameter,
        "transport_param": parse_transport_param,
        "user_param": parse_user_param,
        "method_param": parse_method_param,
        "ttl_param": parse_ttl_param,
        "maddr_param": parse_maddr_param,
        "lr_param": parse_lr_param,
        "other_param": parse_other_param,
        "pname": parse_pname,
        "pvalue": parse_pvalue,
        "paramchar": parse_paramchar,
        "param_unreserved": parse_param_unreserved,
        "headers": parse_headers,
        "header": parse_header,
        "hname": parse_hname,
        "hvalue": parse_hvalue,
        "hnv_unreserved": parse_hnv_unreserved,
        "Request_Response": parse_Request_Response,
        "Request_Line": parse_Request_Line,
        "Request_URI": parse_Request_URI,
        "absoluteURI": parse_absoluteURI,
        "hier_part": parse_hier_part,
        "net_path": parse_net_path,
        "abs_path": parse_abs_path,
        "opaque_part": parse_opaque_part,
        "uric": parse_uric,
        "uric_no_slash": parse_uric_no_slash,
        "path_segments": parse_path_segments,
        "segment": parse_segment,
        "param": parse_param,
        "pchar": parse_pchar,
        "scheme": parse_scheme,
        "authority": parse_authority,
        "srvr": parse_srvr,
        "reg_name": parse_reg_name,
        "query": parse_query,
        "SIP_Version": parse_SIP_Version,
        "INVITEm": parse_INVITEm,
        "ACKm": parse_ACKm,
        "OPTIONSm": parse_OPTIONSm,
        "BYEm": parse_BYEm,
        "CANCELm": parse_CANCELm,
        "REGISTERm": parse_REGISTERm,
        "SUBSCRIBEm": parse_SUBSCRIBEm,
        "NOTIFYm": parse_NOTIFYm,
        "REFERm": parse_REFERm,
        "Method": parse_Method,
        "Status_Line": parse_Status_Line,
        "Status_Code": parse_Status_Code,
        "extension_code": parse_extension_code,
        "Reason_Phrase": parse_Reason_Phrase,
        "Allow_Events": parse_Allow_Events,
        "Call_ID": parse_Call_ID,
        "Contact": parse_Contact,
        "contact_param": parse_contact_param,
        "name_addr": parse_name_addr,
        "display_name": parse_display_name,
        "contact_params": parse_contact_params,
        "c_p_q": parse_c_p_q,
        "c_p_expires": parse_c_p_expires,
        "delta_seconds": parse_delta_seconds,
        "qvalue": parse_qvalue,
        "generic_param": parse_generic_param,
        "gen_value": parse_gen_value,
        "Content_Disposition": parse_Content_Disposition,
        "disp_type": parse_disp_type,
        "disp_param": parse_disp_param,
        "handling_param": parse_handling_param,
        "Content_Encoding": parse_Content_Encoding,
        "Content_Length": parse_Content_Length,
        "Content_Type": parse_Content_Type,
        "media_type": parse_media_type,
        "m_type": parse_m_type,
        "discrete_type": parse_discrete_type,
        "composite_type": parse_composite_type,
        "extension_token": parse_extension_token,
        "x_token": parse_x_token,
        "m_subtype": parse_m_subtype,
        "m_parameter": parse_m_parameter,
        "m_value": parse_m_value,
        "CSeq": parse_CSeq,
        "CSeq_value": parse_CSeq_value,
        "Expires": parse_Expires,
        "Event": parse_Event,
        "event_type": parse_event_type,
        "From": parse_From,
        "from_param": parse_from_param,
        "tag_param": parse_tag_param,
        "Max_Forwards": parse_Max_Forwards,
        "Min_Expires": parse_Min_Expires,
        "Name_Addr_Header": parse_Name_Addr_Header,
        "Proxy_Authenticate": parse_Proxy_Authenticate,
        "challenge": parse_challenge,
        "other_challenge": parse_other_challenge,
        "auth_param": parse_auth_param,
        "digest_cln": parse_digest_cln,
        "realm": parse_realm,
        "realm_value": parse_realm_value,
        "domain": parse_domain,
        "URI": parse_URI,
        "nonce": parse_nonce,
        "nonce_value": parse_nonce_value,
        "opaque": parse_opaque,
        "stale": parse_stale,
        "algorithm": parse_algorithm,
        "qop_options": parse_qop_options,
        "qop_value": parse_qop_value,
        "Proxy_Require": parse_Proxy_Require,
        "Record_Route": parse_Record_Route,
        "rec_route": parse_rec_route,
        "Reason": parse_Reason,
        "reason_param": parse_reason_param,
        "reason_cause": parse_reason_cause,
        "Require": parse_Require,
        "Route": parse_Route,
        "route_param": parse_route_param,
        "Subscription_State": parse_Subscription_State,
        "substate_value": parse_substate_value,
        "subexp_params": parse_subexp_params,
        "event_reason_value": parse_event_reason_value,
        "Subject": parse_Subject,
        "Supported": parse_Supported,
        "To": parse_To,
        "to_param": parse_to_param,
        "Via": parse_Via,
        "via_param": parse_via_param,
        "via_params": parse_via_params,
        "via_ttl": parse_via_ttl,
        "via_maddr": parse_via_maddr,
        "via_received": parse_via_received,
        "via_branch": parse_via_branch,
        "response_port": parse_response_port,
        "sent_protocol": parse_sent_protocol,
        "protocol_name": parse_protocol_name,
        "transport": parse_transport,
        "sent_by": parse_sent_by,
        "via_host": parse_via_host,
        "via_port": parse_via_port,
        "ttl": parse_ttl,
        "WWW_Authenticate": parse_WWW_Authenticate,
        "Session_Expires": parse_Session_Expires,
        "s_e_expires": parse_s_e_expires,
        "s_e_params": parse_s_e_params,
        "s_e_refresher": parse_s_e_refresher,
        "extension_header": parse_extension_header,
        "header_value": parse_header_value,
        "message_body": parse_message_body,
        "uuid_URI": parse_uuid_URI,
        "uuid": parse_uuid,
        "hex4": parse_hex4,
        "hex8": parse_hex8,
        "hex12": parse_hex12,
        "Refer_To": parse_Refer_To,
        "Replaces": parse_Replaces,
        "call_id": parse_call_id,
        "replaces_param": parse_replaces_param,
        "to_tag": parse_to_tag,
        "from_tag": parse_from_tag,
        "early_flag": parse_early_flag
      };
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "CRLF";
      }
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      function padLeft(input, padding, length) {
        var result = input;
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        return result;
      }
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        rightmostFailuresExpected.push(failure);
      }
      function parse_CRLF() {
        var result0;
        if (input.substr(pos, 2) === "\r\n") {
          result0 = "\r\n";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\r\\n\"");
          }
        }
        return result0;
      }
      function parse_DIGIT() {
        var result0;
        if (/^[0-9]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
        return result0;
      }
      function parse_ALPHA() {
        var result0;
        if (/^[a-zA-Z]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z]");
          }
        }
        return result0;
      }
      function parse_HEXDIG() {
        var result0;
        if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9a-fA-F]");
          }
        }
        return result0;
      }
      function parse_WSP() {
        var result0;
        result0 = parse_SP();
        if (result0 === null) {
          result0 = parse_HTAB();
        }
        return result0;
      }
      function parse_OCTET() {
        var result0;
        if (/^[\0-\xFF]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\0-\\xFF]");
          }
        }
        return result0;
      }
      function parse_DQUOTE() {
        var result0;
        if (/^["]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\"]");
          }
        }
        return result0;
      }
      function parse_SP() {
        var result0;
        if (input.charCodeAt(pos) === 32) {
          result0 = " ";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        return result0;
      }
      function parse_HTAB() {
        var result0;
        if (input.charCodeAt(pos) === 9) {
          result0 = "\t";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\t\"");
          }
        }
        return result0;
      }
      function parse_alphanum() {
        var result0;
        if (/^[a-zA-Z0-9]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z0-9]");
          }
        }
        return result0;
      }
      function parse_reserved() {
        var result0;
        if (input.charCodeAt(pos) === 59) {
          result0 = ";";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\";\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 47) {
            result0 = "/";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 63) {
              result0 = "?";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"?\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 58) {
                result0 = ":";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\":\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 64) {
                  result0 = "@";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"@\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 38) {
                    result0 = "&";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"&\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 61) {
                      result0 = "=";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"=\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 43) {
                        result0 = "+";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"+\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 36) {
                          result0 = "$";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"$\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.charCodeAt(pos) === 44) {
                            result0 = ",";
                            pos++;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\",\"");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_unreserved() {
        var result0;
        result0 = parse_alphanum();
        if (result0 === null) {
          result0 = parse_mark();
        }
        return result0;
      }
      function parse_mark() {
        var result0;
        if (input.charCodeAt(pos) === 45) {
          result0 = "-";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"-\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 95) {
            result0 = "_";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"_\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 46) {
              result0 = ".";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 33) {
                result0 = "!";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"!\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 126) {
                  result0 = "~";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"~\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 42) {
                    result0 = "*";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"*\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 39) {
                      result0 = "'";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"'\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 40) {
                        result0 = "(";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"(\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 41) {
                          result0 = ")";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\")\"");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_escaped() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 37) {
          result0 = "%";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"%\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_HEXDIG();
          if (result1 !== null) {
            result2 = parse_HEXDIG();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, escaped) {return escaped.join(''); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_LWS() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        pos2 = pos;
        result0 = [];
        result1 = parse_WSP();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_WSP();
        }
        if (result0 !== null) {
          result1 = parse_CRLF();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos2;
          }
        } else {
          result0 = null;
          pos = pos2;
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result2 = parse_WSP();
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_WSP();
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return " "; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_SWS() {
        var result0;
        result0 = parse_LWS();
        result0 = result0 !== null ? result0 : "";
        return result0;
      }
      function parse_HCOLON() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse_SP();
        if (result1 === null) {
          result1 = parse_HTAB();
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_SP();
          if (result1 === null) {
            result1 = parse_HTAB();
          }
        }
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ':'; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_TEXT_UTF8_TRIM() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result1 = parse_TEXT_UTF8char();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_TEXT_UTF8char();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = [];
          result3 = parse_LWS();
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_LWS();
          }
          if (result2 !== null) {
            result3 = parse_TEXT_UTF8char();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = [];
            result3 = parse_LWS();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_LWS();
            }
            if (result2 !== null) {
              result3 = parse_TEXT_UTF8char();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_TEXT_UTF8char() {
        var result0;
        if (/^[!-~]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[!-~]");
          }
        }
        if (result0 === null) {
          result0 = parse_UTF8_NONASCII();
        }
        return result0;
      }
      function parse_UTF8_NONASCII() {
        var result0;
        if (/^[\x80-\uFFFF]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\x80-\\uFFFF]");
          }
        }
        return result0;
      }
      function parse_UTF8_CONT() {
        var result0;
        if (/^[\x80-\xBF]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\x80-\\xBF]");
          }
        }
        return result0;
      }
      function parse_LHEX() {
        var result0;
        result0 = parse_DIGIT();
        if (result0 === null) {
          if (/^[a-f]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[a-f]");
            }
          }
        }
        return result0;
      }
      function parse_token() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_alphanum();
        if (result1 === null) {
          if (input.charCodeAt(pos) === 45) {
            result1 = "-";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          if (result1 === null) {
            if (input.charCodeAt(pos) === 46) {
              result1 = ".";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result1 === null) {
              if (input.charCodeAt(pos) === 33) {
                result1 = "!";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"!\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 37) {
                  result1 = "%";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"%\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 42) {
                    result1 = "*";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"*\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 95) {
                      result1 = "_";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"_\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 43) {
                        result1 = "+";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"+\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 96) {
                          result1 = "`";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"`\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 39) {
                            result1 = "'";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"'\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 126) {
                              result1 = "~";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"~\"");
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_alphanum();
            if (result1 === null) {
              if (input.charCodeAt(pos) === 45) {
                result1 = "-";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 46) {
                  result1 = ".";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\".\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 33) {
                    result1 = "!";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"!\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 37) {
                      result1 = "%";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"%\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 42) {
                        result1 = "*";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"*\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 95) {
                          result1 = "_";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"_\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 43) {
                            result1 = "+";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"+\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 96) {
                              result1 = "`";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"`\"");
                              }
                            }
                            if (result1 === null) {
                              if (input.charCodeAt(pos) === 39) {
                                result1 = "'";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"'\"");
                                }
                              }
                              if (result1 === null) {
                                if (input.charCodeAt(pos) === 126) {
                                  result1 = "~";
                                  pos++;
                                } else {
                                  result1 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"~\"");
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_token_nodot() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_alphanum();
        if (result1 === null) {
          if (input.charCodeAt(pos) === 45) {
            result1 = "-";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          if (result1 === null) {
            if (input.charCodeAt(pos) === 33) {
              result1 = "!";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"!\"");
              }
            }
            if (result1 === null) {
              if (input.charCodeAt(pos) === 37) {
                result1 = "%";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"%\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 42) {
                  result1 = "*";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"*\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 95) {
                    result1 = "_";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"_\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 43) {
                      result1 = "+";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"+\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 96) {
                        result1 = "`";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"`\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 39) {
                          result1 = "'";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"'\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 126) {
                            result1 = "~";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"~\"");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_alphanum();
            if (result1 === null) {
              if (input.charCodeAt(pos) === 45) {
                result1 = "-";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 33) {
                  result1 = "!";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"!\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 37) {
                    result1 = "%";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"%\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 42) {
                      result1 = "*";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"*\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 95) {
                        result1 = "_";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"_\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 43) {
                          result1 = "+";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"+\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 96) {
                            result1 = "`";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"`\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 39) {
                              result1 = "'";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"'\"");
                              }
                            }
                            if (result1 === null) {
                              if (input.charCodeAt(pos) === 126) {
                                result1 = "~";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"~\"");
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_separators() {
        var result0;
        if (input.charCodeAt(pos) === 40) {
          result0 = "(";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"(\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 41) {
            result0 = ")";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\")\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 60) {
              result0 = "<";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"<\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 62) {
                result0 = ">";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\">\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 64) {
                  result0 = "@";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"@\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 44) {
                    result0 = ",";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\",\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 59) {
                      result0 = ";";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\";\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 58) {
                        result0 = ":";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 92) {
                          result0 = "\\";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"\\\\\"");
                          }
                        }
                        if (result0 === null) {
                          result0 = parse_DQUOTE();
                          if (result0 === null) {
                            if (input.charCodeAt(pos) === 47) {
                              result0 = "/";
                              pos++;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"/\"");
                              }
                            }
                            if (result0 === null) {
                              if (input.charCodeAt(pos) === 91) {
                                result0 = "[";
                                pos++;
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"[\"");
                                }
                              }
                              if (result0 === null) {
                                if (input.charCodeAt(pos) === 93) {
                                  result0 = "]";
                                  pos++;
                                } else {
                                  result0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"]\"");
                                  }
                                }
                                if (result0 === null) {
                                  if (input.charCodeAt(pos) === 63) {
                                    result0 = "?";
                                    pos++;
                                  } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"?\"");
                                    }
                                  }
                                  if (result0 === null) {
                                    if (input.charCodeAt(pos) === 61) {
                                      result0 = "=";
                                      pos++;
                                    } else {
                                      result0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"=\"");
                                      }
                                    }
                                    if (result0 === null) {
                                      if (input.charCodeAt(pos) === 123) {
                                        result0 = "{";
                                        pos++;
                                      } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"{\"");
                                        }
                                      }
                                      if (result0 === null) {
                                        if (input.charCodeAt(pos) === 125) {
                                          result0 = "}";
                                          pos++;
                                        } else {
                                          result0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"}\"");
                                          }
                                        }
                                        if (result0 === null) {
                                          result0 = parse_SP();
                                          if (result0 === null) {
                                            result0 = parse_HTAB();
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_word() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_alphanum();
        if (result1 === null) {
          if (input.charCodeAt(pos) === 45) {
            result1 = "-";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          if (result1 === null) {
            if (input.charCodeAt(pos) === 46) {
              result1 = ".";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result1 === null) {
              if (input.charCodeAt(pos) === 33) {
                result1 = "!";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"!\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 37) {
                  result1 = "%";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"%\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 42) {
                    result1 = "*";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"*\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 95) {
                      result1 = "_";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"_\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 43) {
                        result1 = "+";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"+\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 96) {
                          result1 = "`";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"`\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 39) {
                            result1 = "'";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"'\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 126) {
                              result1 = "~";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"~\"");
                              }
                            }
                            if (result1 === null) {
                              if (input.charCodeAt(pos) === 40) {
                                result1 = "(";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"(\"");
                                }
                              }
                              if (result1 === null) {
                                if (input.charCodeAt(pos) === 41) {
                                  result1 = ")";
                                  pos++;
                                } else {
                                  result1 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\")\"");
                                  }
                                }
                                if (result1 === null) {
                                  if (input.charCodeAt(pos) === 60) {
                                    result1 = "<";
                                    pos++;
                                  } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"<\"");
                                    }
                                  }
                                  if (result1 === null) {
                                    if (input.charCodeAt(pos) === 62) {
                                      result1 = ">";
                                      pos++;
                                    } else {
                                      result1 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\">\"");
                                      }
                                    }
                                    if (result1 === null) {
                                      if (input.charCodeAt(pos) === 58) {
                                        result1 = ":";
                                        pos++;
                                      } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result1 === null) {
                                        if (input.charCodeAt(pos) === 92) {
                                          result1 = "\\";
                                          pos++;
                                        } else {
                                          result1 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"\\\\\"");
                                          }
                                        }
                                        if (result1 === null) {
                                          result1 = parse_DQUOTE();
                                          if (result1 === null) {
                                            if (input.charCodeAt(pos) === 47) {
                                              result1 = "/";
                                              pos++;
                                            } else {
                                              result1 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"/\"");
                                              }
                                            }
                                            if (result1 === null) {
                                              if (input.charCodeAt(pos) === 91) {
                                                result1 = "[";
                                                pos++;
                                              } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"[\"");
                                                }
                                              }
                                              if (result1 === null) {
                                                if (input.charCodeAt(pos) === 93) {
                                                  result1 = "]";
                                                  pos++;
                                                } else {
                                                  result1 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\"]\"");
                                                  }
                                                }
                                                if (result1 === null) {
                                                  if (input.charCodeAt(pos) === 63) {
                                                    result1 = "?";
                                                    pos++;
                                                  } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"?\"");
                                                    }
                                                  }
                                                  if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 123) {
                                                      result1 = "{";
                                                      pos++;
                                                    } else {
                                                      result1 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"{\"");
                                                      }
                                                    }
                                                    if (result1 === null) {
                                                      if (input.charCodeAt(pos) === 125) {
                                                        result1 = "}";
                                                        pos++;
                                                      } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                          matchFailed("\"}\"");
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_alphanum();
            if (result1 === null) {
              if (input.charCodeAt(pos) === 45) {
                result1 = "-";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 46) {
                  result1 = ".";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\".\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 33) {
                    result1 = "!";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"!\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 37) {
                      result1 = "%";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"%\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 42) {
                        result1 = "*";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"*\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 95) {
                          result1 = "_";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"_\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 43) {
                            result1 = "+";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"+\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 96) {
                              result1 = "`";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"`\"");
                              }
                            }
                            if (result1 === null) {
                              if (input.charCodeAt(pos) === 39) {
                                result1 = "'";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"'\"");
                                }
                              }
                              if (result1 === null) {
                                if (input.charCodeAt(pos) === 126) {
                                  result1 = "~";
                                  pos++;
                                } else {
                                  result1 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"~\"");
                                  }
                                }
                                if (result1 === null) {
                                  if (input.charCodeAt(pos) === 40) {
                                    result1 = "(";
                                    pos++;
                                  } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"(\"");
                                    }
                                  }
                                  if (result1 === null) {
                                    if (input.charCodeAt(pos) === 41) {
                                      result1 = ")";
                                      pos++;
                                    } else {
                                      result1 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\")\"");
                                      }
                                    }
                                    if (result1 === null) {
                                      if (input.charCodeAt(pos) === 60) {
                                        result1 = "<";
                                        pos++;
                                      } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"<\"");
                                        }
                                      }
                                      if (result1 === null) {
                                        if (input.charCodeAt(pos) === 62) {
                                          result1 = ">";
                                          pos++;
                                        } else {
                                          result1 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\">\"");
                                          }
                                        }
                                        if (result1 === null) {
                                          if (input.charCodeAt(pos) === 58) {
                                            result1 = ":";
                                            pos++;
                                          } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result1 === null) {
                                            if (input.charCodeAt(pos) === 92) {
                                              result1 = "\\";
                                              pos++;
                                            } else {
                                              result1 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"\\\\\"");
                                              }
                                            }
                                            if (result1 === null) {
                                              result1 = parse_DQUOTE();
                                              if (result1 === null) {
                                                if (input.charCodeAt(pos) === 47) {
                                                  result1 = "/";
                                                  pos++;
                                                } else {
                                                  result1 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\"/\"");
                                                  }
                                                }
                                                if (result1 === null) {
                                                  if (input.charCodeAt(pos) === 91) {
                                                    result1 = "[";
                                                    pos++;
                                                  } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"[\"");
                                                    }
                                                  }
                                                  if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 93) {
                                                      result1 = "]";
                                                      pos++;
                                                    } else {
                                                      result1 = null;
                                                      if (reportFailures === 0) {
                                                        matchFailed("\"]\"");
                                                      }
                                                    }
                                                    if (result1 === null) {
                                                      if (input.charCodeAt(pos) === 63) {
                                                        result1 = "?";
                                                        pos++;
                                                      } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                          matchFailed("\"?\"");
                                                        }
                                                      }
                                                      if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 123) {
                                                          result1 = "{";
                                                          pos++;
                                                        } else {
                                                          result1 = null;
                                                          if (reportFailures === 0) {
                                                            matchFailed("\"{\"");
                                                          }
                                                        }
                                                        if (result1 === null) {
                                                          if (input.charCodeAt(pos) === 125) {
                                                            result1 = "}";
                                                            pos++;
                                                          } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                              matchFailed("\"}\"");
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_STAR() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 42) {
            result1 = "*";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"*\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "*"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_SLASH() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 47) {
            result1 = "/";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "/"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_EQUAL() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 61) {
            result1 = "=";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "="; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_LPAREN() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 40) {
            result1 = "(";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"(\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "("; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_RPAREN() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 41) {
            result1 = ")";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\")\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ")"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_RAQUOT() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 62) {
          result0 = ">";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\">\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_SWS();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ">"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_LAQUOT() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 60) {
            result1 = "<";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"<\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "<"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_COMMA() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 44) {
            result1 = ",";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\",\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ","; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_SEMI() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 59) {
            result1 = ";";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\";\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ";"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_COLON() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_SWS();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return ":"; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_LDQUOT() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          result1 = parse_DQUOTE();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "\""; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_RDQUOT() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_DQUOTE();
        if (result0 !== null) {
          result1 = parse_SWS();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {return "\""; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_comment() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_LPAREN();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_ctext();
          if (result2 === null) {
            result2 = parse_quoted_pair();
            if (result2 === null) {
              result2 = parse_comment();
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_ctext();
            if (result2 === null) {
              result2 = parse_quoted_pair();
              if (result2 === null) {
                result2 = parse_comment();
              }
            }
          }
          if (result1 !== null) {
            result2 = parse_RPAREN();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_ctext() {
        var result0;
        if (/^[!-']/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[!-']");
          }
        }
        if (result0 === null) {
          if (/^[*-[]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[*-[]");
            }
          }
          if (result0 === null) {
            if (/^[\]-~]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("[\\]-~]");
              }
            }
            if (result0 === null) {
              result0 = parse_UTF8_NONASCII();
              if (result0 === null) {
                result0 = parse_LWS();
              }
            }
          }
        }
        return result0;
      }
      function parse_quoted_string() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          result1 = parse_DQUOTE();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_qdtext();
            if (result3 === null) {
              result3 = parse_quoted_pair();
            }
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_qdtext();
              if (result3 === null) {
                result3 = parse_quoted_pair();
              }
            }
            if (result2 !== null) {
              result3 = parse_DQUOTE();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_quoted_string_clean() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SWS();
        if (result0 !== null) {
          result1 = parse_DQUOTE();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_qdtext();
            if (result3 === null) {
              result3 = parse_quoted_pair();
            }
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_qdtext();
              if (result3 === null) {
                result3 = parse_quoted_pair();
              }
            }
            if (result2 !== null) {
              result3 = parse_DQUOTE();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                                return input.substring(pos-1, offset+1); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_qdtext() {
        var result0;
        result0 = parse_LWS();
        if (result0 === null) {
          if (input.charCodeAt(pos) === 33) {
            result0 = "!";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"!\"");
            }
          }
          if (result0 === null) {
            if (/^[#-[]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("[#-[]");
              }
            }
            if (result0 === null) {
              if (/^[\]-~]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("[\\]-~]");
                }
              }
              if (result0 === null) {
                result0 = parse_UTF8_NONASCII();
              }
            }
          }
        }
        return result0;
      }
      function parse_quoted_pair() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        if (input.charCodeAt(pos) === 92) {
          result0 = "\\";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\\\\"");
          }
        }
        if (result0 !== null) {
          if (/^[\0-\t]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[\\0-\\t]");
            }
          }
          if (result1 === null) {
            if (/^[\x0B-\f]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[\\x0B-\\f]");
              }
            }
            if (result1 === null) {
              if (/^[\x0E-]/.test(input.charAt(pos))) {
                result1 = input.charAt(pos);
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("[\\x0E-]");
                }
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_SIP_URI_noparams() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_uri_scheme();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_userinfo();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_hostport();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            try {
                                data.uri = new URI(data.scheme, data.user, data.host, data.port);
                                delete data.scheme;
                                delete data.user;
                                delete data.host;
                                delete data.host_type;
                                delete data.port;
                              } catch(e) {
                                data = -1;
                              }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_SIP_URI() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_uri_scheme();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_userinfo();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_hostport();
              if (result3 !== null) {
                result4 = parse_uri_parameters();
                if (result4 !== null) {
                  result5 = parse_headers();
                  result5 = result5 !== null ? result5 : "";
                  if (result5 !== null) {
                    result0 = [result0, result1, result2, result3, result4, result5];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            var header;
                            try {
                                data.uri = new URI(data.scheme, data.user, data.host, data.port, data.uri_params, data.uri_headers);
                                delete data.scheme;
                                delete data.user;
                                delete data.host;
                                delete data.host_type;
                                delete data.port;
                                delete data.uri_params;
                                if (startRule === 'SIP_URI') { data = data.uri;}
                              } catch(e) {
                                data = -1;
                              }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_uri_scheme() {
        var result0;
        result0 = parse_uri_scheme_sips();
        if (result0 === null) {
          result0 = parse_uri_scheme_sip();
        }
        return result0;
      }
      function parse_uri_scheme_sips() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 4).toLowerCase() === "sips") {
          result0 = input.substr(pos, 4);
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"sips\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, scheme) {
                            data.scheme = scheme.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_uri_scheme_sip() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 3).toLowerCase() === "sip") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"sip\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, scheme) {
                            data.scheme = scheme.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_userinfo() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_user();
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_password();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 64) {
              result2 = "@";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"@\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.user = decodeURIComponent(input.substring(pos-1, offset));})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_user() {
        var result0, result1;
        result1 = parse_unreserved();
        if (result1 === null) {
          result1 = parse_escaped();
          if (result1 === null) {
            result1 = parse_user_unreserved();
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_unreserved();
            if (result1 === null) {
              result1 = parse_escaped();
              if (result1 === null) {
                result1 = parse_user_unreserved();
              }
            }
          }
        } else {
          result0 = null;
        }
        return result0;
      }
      function parse_user_unreserved() {
        var result0;
        if (input.charCodeAt(pos) === 38) {
          result0 = "&";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"&\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 61) {
            result0 = "=";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 43) {
              result0 = "+";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"+\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 36) {
                result0 = "$";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"$\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 44) {
                  result0 = ",";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\",\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 59) {
                    result0 = ";";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\";\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 63) {
                      result0 = "?";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"?\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 47) {
                        result0 = "/";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"/\"");
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_password() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result0 = [];
        result1 = parse_unreserved();
        if (result1 === null) {
          result1 = parse_escaped();
          if (result1 === null) {
            if (input.charCodeAt(pos) === 38) {
              result1 = "&";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"&\"");
              }
            }
            if (result1 === null) {
              if (input.charCodeAt(pos) === 61) {
                result1 = "=";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 43) {
                  result1 = "+";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"+\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 36) {
                    result1 = "$";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"$\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 44) {
                      result1 = ",";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\",\"");
                      }
                    }
                  }
                }
              }
            }
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_unreserved();
          if (result1 === null) {
            result1 = parse_escaped();
            if (result1 === null) {
              if (input.charCodeAt(pos) === 38) {
                result1 = "&";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"&\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 61) {
                  result1 = "=";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"=\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 43) {
                    result1 = "+";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"+\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 36) {
                      result1 = "$";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"$\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 44) {
                        result1 = ",";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\",\"");
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.password = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_hostport() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_host();
        if (result0 !== null) {
          pos1 = pos;
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_port();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos1;
            }
          } else {
            result1 = null;
            pos = pos1;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_host() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_hostname();
        if (result0 === null) {
          result0 = parse_IPv4address();
          if (result0 === null) {
            result0 = parse_IPv6reference();
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.host = input.substring(pos, offset).toLowerCase();
                            return data.host; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_hostname() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        pos2 = pos;
        result1 = parse_domainlabel();
        if (result1 !== null) {
          if (input.charCodeAt(pos) === 46) {
            result2 = ".";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos2;
          }
        } else {
          result1 = null;
          pos = pos2;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos2 = pos;
          result1 = parse_domainlabel();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 46) {
              result2 = ".";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
        }
        if (result0 !== null) {
          result1 = parse_toplabel();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 46) {
              result2 = ".";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          data.host_type = 'domain';
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_domainlabel() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_alphanum();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_alphanum();
          if (result2 === null) {
            if (input.charCodeAt(pos) === 45) {
              result2 = "-";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"-\"");
              }
            }
            if (result2 === null) {
              if (input.charCodeAt(pos) === 95) {
                result2 = "_";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"_\"");
                }
              }
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_alphanum();
            if (result2 === null) {
              if (input.charCodeAt(pos) === 45) {
                result2 = "-";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result2 === null) {
                if (input.charCodeAt(pos) === 95) {
                  result2 = "_";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"_\"");
                  }
                }
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_toplabel() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_ALPHA();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_alphanum();
          if (result2 === null) {
            if (input.charCodeAt(pos) === 45) {
              result2 = "-";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"-\"");
              }
            }
            if (result2 === null) {
              if (input.charCodeAt(pos) === 95) {
                result2 = "_";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"_\"");
                }
              }
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_alphanum();
            if (result2 === null) {
              if (input.charCodeAt(pos) === 45) {
                result2 = "-";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result2 === null) {
                if (input.charCodeAt(pos) === 95) {
                  result2 = "_";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"_\"");
                  }
                }
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_IPv6reference() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 91) {
          result0 = "[";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_IPv6address();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 93) {
              result2 = "]";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"]\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.host_type = 'IPv6';
                            return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_IPv6address() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_h16();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_h16();
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 58) {
                result3 = ":";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\":\"");
                }
              }
              if (result3 !== null) {
                result4 = parse_h16();
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 58) {
                    result5 = ":";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\":\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse_h16();
                    if (result6 !== null) {
                      if (input.charCodeAt(pos) === 58) {
                        result7 = ":";
                        pos++;
                      } else {
                        result7 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result7 !== null) {
                        result8 = parse_h16();
                        if (result8 !== null) {
                          if (input.charCodeAt(pos) === 58) {
                            result9 = ":";
                            pos++;
                          } else {
                            result9 = null;
                            if (reportFailures === 0) {
                              matchFailed("\":\"");
                            }
                          }
                          if (result9 !== null) {
                            result10 = parse_h16();
                            if (result10 !== null) {
                              if (input.charCodeAt(pos) === 58) {
                                result11 = ":";
                                pos++;
                              } else {
                                result11 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\":\"");
                                }
                              }
                              if (result11 !== null) {
                                result12 = parse_ls32();
                                if (result12 !== null) {
                                  result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12];
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 === null) {
          pos1 = pos;
          if (input.substr(pos, 2) === "::") {
            result0 = "::";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"::\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_h16();
            if (result1 !== null) {
              if (input.charCodeAt(pos) === 58) {
                result2 = ":";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\":\"");
                }
              }
              if (result2 !== null) {
                result3 = parse_h16();
                if (result3 !== null) {
                  if (input.charCodeAt(pos) === 58) {
                    result4 = ":";
                    pos++;
                  } else {
                    result4 = null;
                    if (reportFailures === 0) {
                      matchFailed("\":\"");
                    }
                  }
                  if (result4 !== null) {
                    result5 = parse_h16();
                    if (result5 !== null) {
                      if (input.charCodeAt(pos) === 58) {
                        result6 = ":";
                        pos++;
                      } else {
                        result6 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result6 !== null) {
                        result7 = parse_h16();
                        if (result7 !== null) {
                          if (input.charCodeAt(pos) === 58) {
                            result8 = ":";
                            pos++;
                          } else {
                            result8 = null;
                            if (reportFailures === 0) {
                              matchFailed("\":\"");
                            }
                          }
                          if (result8 !== null) {
                            result9 = parse_h16();
                            if (result9 !== null) {
                              if (input.charCodeAt(pos) === 58) {
                                result10 = ":";
                                pos++;
                              } else {
                                result10 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\":\"");
                                }
                              }
                              if (result10 !== null) {
                                result11 = parse_ls32();
                                if (result11 !== null) {
                                  result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11];
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 === null) {
            pos1 = pos;
            if (input.substr(pos, 2) === "::") {
              result0 = "::";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"::\"");
              }
            }
            if (result0 !== null) {
              result1 = parse_h16();
              if (result1 !== null) {
                if (input.charCodeAt(pos) === 58) {
                  result2 = ":";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":\"");
                  }
                }
                if (result2 !== null) {
                  result3 = parse_h16();
                  if (result3 !== null) {
                    if (input.charCodeAt(pos) === 58) {
                      result4 = ":";
                      pos++;
                    } else {
                      result4 = null;
                      if (reportFailures === 0) {
                        matchFailed("\":\"");
                      }
                    }
                    if (result4 !== null) {
                      result5 = parse_h16();
                      if (result5 !== null) {
                        if (input.charCodeAt(pos) === 58) {
                          result6 = ":";
                          pos++;
                        } else {
                          result6 = null;
                          if (reportFailures === 0) {
                            matchFailed("\":\"");
                          }
                        }
                        if (result6 !== null) {
                          result7 = parse_h16();
                          if (result7 !== null) {
                            if (input.charCodeAt(pos) === 58) {
                              result8 = ":";
                              pos++;
                            } else {
                              result8 = null;
                              if (reportFailures === 0) {
                                matchFailed("\":\"");
                              }
                            }
                            if (result8 !== null) {
                              result9 = parse_ls32();
                              if (result9 !== null) {
                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 === null) {
              pos1 = pos;
              if (input.substr(pos, 2) === "::") {
                result0 = "::";
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"::\"");
                }
              }
              if (result0 !== null) {
                result1 = parse_h16();
                if (result1 !== null) {
                  if (input.charCodeAt(pos) === 58) {
                    result2 = ":";
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\":\"");
                    }
                  }
                  if (result2 !== null) {
                    result3 = parse_h16();
                    if (result3 !== null) {
                      if (input.charCodeAt(pos) === 58) {
                        result4 = ":";
                        pos++;
                      } else {
                        result4 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result4 !== null) {
                        result5 = parse_h16();
                        if (result5 !== null) {
                          if (input.charCodeAt(pos) === 58) {
                            result6 = ":";
                            pos++;
                          } else {
                            result6 = null;
                            if (reportFailures === 0) {
                              matchFailed("\":\"");
                            }
                          }
                          if (result6 !== null) {
                            result7 = parse_ls32();
                            if (result7 !== null) {
                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 === null) {
                pos1 = pos;
                if (input.substr(pos, 2) === "::") {
                  result0 = "::";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"::\"");
                  }
                }
                if (result0 !== null) {
                  result1 = parse_h16();
                  if (result1 !== null) {
                    if (input.charCodeAt(pos) === 58) {
                      result2 = ":";
                      pos++;
                    } else {
                      result2 = null;
                      if (reportFailures === 0) {
                        matchFailed("\":\"");
                      }
                    }
                    if (result2 !== null) {
                      result3 = parse_h16();
                      if (result3 !== null) {
                        if (input.charCodeAt(pos) === 58) {
                          result4 = ":";
                          pos++;
                        } else {
                          result4 = null;
                          if (reportFailures === 0) {
                            matchFailed("\":\"");
                          }
                        }
                        if (result4 !== null) {
                          result5 = parse_ls32();
                          if (result5 !== null) {
                            result0 = [result0, result1, result2, result3, result4, result5];
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
                if (result0 === null) {
                  pos1 = pos;
                  if (input.substr(pos, 2) === "::") {
                    result0 = "::";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"::\"");
                    }
                  }
                  if (result0 !== null) {
                    result1 = parse_h16();
                    if (result1 !== null) {
                      if (input.charCodeAt(pos) === 58) {
                        result2 = ":";
                        pos++;
                      } else {
                        result2 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result2 !== null) {
                        result3 = parse_ls32();
                        if (result3 !== null) {
                          result0 = [result0, result1, result2, result3];
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                  if (result0 === null) {
                    pos1 = pos;
                    if (input.substr(pos, 2) === "::") {
                      result0 = "::";
                      pos += 2;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"::\"");
                      }
                    }
                    if (result0 !== null) {
                      result1 = parse_ls32();
                      if (result1 !== null) {
                        result0 = [result0, result1];
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                    if (result0 === null) {
                      pos1 = pos;
                      if (input.substr(pos, 2) === "::") {
                        result0 = "::";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"::\"");
                        }
                      }
                      if (result0 !== null) {
                        result1 = parse_h16();
                        if (result1 !== null) {
                          result0 = [result0, result1];
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                      if (result0 === null) {
                        pos1 = pos;
                        result0 = parse_h16();
                        if (result0 !== null) {
                          if (input.substr(pos, 2) === "::") {
                            result1 = "::";
                            pos += 2;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"::\"");
                            }
                          }
                          if (result1 !== null) {
                            result2 = parse_h16();
                            if (result2 !== null) {
                              if (input.charCodeAt(pos) === 58) {
                                result3 = ":";
                                pos++;
                              } else {
                                result3 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\":\"");
                                }
                              }
                              if (result3 !== null) {
                                result4 = parse_h16();
                                if (result4 !== null) {
                                  if (input.charCodeAt(pos) === 58) {
                                    result5 = ":";
                                    pos++;
                                  } else {
                                    result5 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\":\"");
                                    }
                                  }
                                  if (result5 !== null) {
                                    result6 = parse_h16();
                                    if (result6 !== null) {
                                      if (input.charCodeAt(pos) === 58) {
                                        result7 = ":";
                                        pos++;
                                      } else {
                                        result7 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result7 !== null) {
                                        result8 = parse_h16();
                                        if (result8 !== null) {
                                          if (input.charCodeAt(pos) === 58) {
                                            result9 = ":";
                                            pos++;
                                          } else {
                                            result9 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result9 !== null) {
                                            result10 = parse_ls32();
                                            if (result10 !== null) {
                                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                        if (result0 === null) {
                          pos1 = pos;
                          result0 = parse_h16();
                          if (result0 !== null) {
                            pos2 = pos;
                            if (input.charCodeAt(pos) === 58) {
                              result1 = ":";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\":\"");
                              }
                            }
                            if (result1 !== null) {
                              result2 = parse_h16();
                              if (result2 !== null) {
                                result1 = [result1, result2];
                              } else {
                                result1 = null;
                                pos = pos2;
                              }
                            } else {
                              result1 = null;
                              pos = pos2;
                            }
                            result1 = result1 !== null ? result1 : "";
                            if (result1 !== null) {
                              if (input.substr(pos, 2) === "::") {
                                result2 = "::";
                                pos += 2;
                              } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"::\"");
                                }
                              }
                              if (result2 !== null) {
                                result3 = parse_h16();
                                if (result3 !== null) {
                                  if (input.charCodeAt(pos) === 58) {
                                    result4 = ":";
                                    pos++;
                                  } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\":\"");
                                    }
                                  }
                                  if (result4 !== null) {
                                    result5 = parse_h16();
                                    if (result5 !== null) {
                                      if (input.charCodeAt(pos) === 58) {
                                        result6 = ":";
                                        pos++;
                                      } else {
                                        result6 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result6 !== null) {
                                        result7 = parse_h16();
                                        if (result7 !== null) {
                                          if (input.charCodeAt(pos) === 58) {
                                            result8 = ":";
                                            pos++;
                                          } else {
                                            result8 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result8 !== null) {
                                            result9 = parse_ls32();
                                            if (result9 !== null) {
                                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                          if (result0 === null) {
                            pos1 = pos;
                            result0 = parse_h16();
                            if (result0 !== null) {
                              pos2 = pos;
                              if (input.charCodeAt(pos) === 58) {
                                result1 = ":";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\":\"");
                                }
                              }
                              if (result1 !== null) {
                                result2 = parse_h16();
                                if (result2 !== null) {
                                  result1 = [result1, result2];
                                } else {
                                  result1 = null;
                                  pos = pos2;
                                }
                              } else {
                                result1 = null;
                                pos = pos2;
                              }
                              result1 = result1 !== null ? result1 : "";
                              if (result1 !== null) {
                                pos2 = pos;
                                if (input.charCodeAt(pos) === 58) {
                                  result2 = ":";
                                  pos++;
                                } else {
                                  result2 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                  }
                                }
                                if (result2 !== null) {
                                  result3 = parse_h16();
                                  if (result3 !== null) {
                                    result2 = [result2, result3];
                                  } else {
                                    result2 = null;
                                    pos = pos2;
                                  }
                                } else {
                                  result2 = null;
                                  pos = pos2;
                                }
                                result2 = result2 !== null ? result2 : "";
                                if (result2 !== null) {
                                  if (input.substr(pos, 2) === "::") {
                                    result3 = "::";
                                    pos += 2;
                                  } else {
                                    result3 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"::\"");
                                    }
                                  }
                                  if (result3 !== null) {
                                    result4 = parse_h16();
                                    if (result4 !== null) {
                                      if (input.charCodeAt(pos) === 58) {
                                        result5 = ":";
                                        pos++;
                                      } else {
                                        result5 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result5 !== null) {
                                        result6 = parse_h16();
                                        if (result6 !== null) {
                                          if (input.charCodeAt(pos) === 58) {
                                            result7 = ":";
                                            pos++;
                                          } else {
                                            result7 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result7 !== null) {
                                            result8 = parse_ls32();
                                            if (result8 !== null) {
                                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                            if (result0 === null) {
                              pos1 = pos;
                              result0 = parse_h16();
                              if (result0 !== null) {
                                pos2 = pos;
                                if (input.charCodeAt(pos) === 58) {
                                  result1 = ":";
                                  pos++;
                                } else {
                                  result1 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                  }
                                }
                                if (result1 !== null) {
                                  result2 = parse_h16();
                                  if (result2 !== null) {
                                    result1 = [result1, result2];
                                  } else {
                                    result1 = null;
                                    pos = pos2;
                                  }
                                } else {
                                  result1 = null;
                                  pos = pos2;
                                }
                                result1 = result1 !== null ? result1 : "";
                                if (result1 !== null) {
                                  pos2 = pos;
                                  if (input.charCodeAt(pos) === 58) {
                                    result2 = ":";
                                    pos++;
                                  } else {
                                    result2 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\":\"");
                                    }
                                  }
                                  if (result2 !== null) {
                                    result3 = parse_h16();
                                    if (result3 !== null) {
                                      result2 = [result2, result3];
                                    } else {
                                      result2 = null;
                                      pos = pos2;
                                    }
                                  } else {
                                    result2 = null;
                                    pos = pos2;
                                  }
                                  result2 = result2 !== null ? result2 : "";
                                  if (result2 !== null) {
                                    pos2 = pos;
                                    if (input.charCodeAt(pos) === 58) {
                                      result3 = ":";
                                      pos++;
                                    } else {
                                      result3 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                      }
                                    }
                                    if (result3 !== null) {
                                      result4 = parse_h16();
                                      if (result4 !== null) {
                                        result3 = [result3, result4];
                                      } else {
                                        result3 = null;
                                        pos = pos2;
                                      }
                                    } else {
                                      result3 = null;
                                      pos = pos2;
                                    }
                                    result3 = result3 !== null ? result3 : "";
                                    if (result3 !== null) {
                                      if (input.substr(pos, 2) === "::") {
                                        result4 = "::";
                                        pos += 2;
                                      } else {
                                        result4 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"::\"");
                                        }
                                      }
                                      if (result4 !== null) {
                                        result5 = parse_h16();
                                        if (result5 !== null) {
                                          if (input.charCodeAt(pos) === 58) {
                                            result6 = ":";
                                            pos++;
                                          } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result6 !== null) {
                                            result7 = parse_ls32();
                                            if (result7 !== null) {
                                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                              if (result0 === null) {
                                pos1 = pos;
                                result0 = parse_h16();
                                if (result0 !== null) {
                                  pos2 = pos;
                                  if (input.charCodeAt(pos) === 58) {
                                    result1 = ":";
                                    pos++;
                                  } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\":\"");
                                    }
                                  }
                                  if (result1 !== null) {
                                    result2 = parse_h16();
                                    if (result2 !== null) {
                                      result1 = [result1, result2];
                                    } else {
                                      result1 = null;
                                      pos = pos2;
                                    }
                                  } else {
                                    result1 = null;
                                    pos = pos2;
                                  }
                                  result1 = result1 !== null ? result1 : "";
                                  if (result1 !== null) {
                                    pos2 = pos;
                                    if (input.charCodeAt(pos) === 58) {
                                      result2 = ":";
                                      pos++;
                                    } else {
                                      result2 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                      }
                                    }
                                    if (result2 !== null) {
                                      result3 = parse_h16();
                                      if (result3 !== null) {
                                        result2 = [result2, result3];
                                      } else {
                                        result2 = null;
                                        pos = pos2;
                                      }
                                    } else {
                                      result2 = null;
                                      pos = pos2;
                                    }
                                    result2 = result2 !== null ? result2 : "";
                                    if (result2 !== null) {
                                      pos2 = pos;
                                      if (input.charCodeAt(pos) === 58) {
                                        result3 = ":";
                                        pos++;
                                      } else {
                                        result3 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result3 !== null) {
                                        result4 = parse_h16();
                                        if (result4 !== null) {
                                          result3 = [result3, result4];
                                        } else {
                                          result3 = null;
                                          pos = pos2;
                                        }
                                      } else {
                                        result3 = null;
                                        pos = pos2;
                                      }
                                      result3 = result3 !== null ? result3 : "";
                                      if (result3 !== null) {
                                        pos2 = pos;
                                        if (input.charCodeAt(pos) === 58) {
                                          result4 = ":";
                                          pos++;
                                        } else {
                                          result4 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\":\"");
                                          }
                                        }
                                        if (result4 !== null) {
                                          result5 = parse_h16();
                                          if (result5 !== null) {
                                            result4 = [result4, result5];
                                          } else {
                                            result4 = null;
                                            pos = pos2;
                                          }
                                        } else {
                                          result4 = null;
                                          pos = pos2;
                                        }
                                        result4 = result4 !== null ? result4 : "";
                                        if (result4 !== null) {
                                          if (input.substr(pos, 2) === "::") {
                                            result5 = "::";
                                            pos += 2;
                                          } else {
                                            result5 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\"::\"");
                                            }
                                          }
                                          if (result5 !== null) {
                                            result6 = parse_ls32();
                                            if (result6 !== null) {
                                              result0 = [result0, result1, result2, result3, result4, result5, result6];
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                                if (result0 === null) {
                                  pos1 = pos;
                                  result0 = parse_h16();
                                  if (result0 !== null) {
                                    pos2 = pos;
                                    if (input.charCodeAt(pos) === 58) {
                                      result1 = ":";
                                      pos++;
                                    } else {
                                      result1 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                      }
                                    }
                                    if (result1 !== null) {
                                      result2 = parse_h16();
                                      if (result2 !== null) {
                                        result1 = [result1, result2];
                                      } else {
                                        result1 = null;
                                        pos = pos2;
                                      }
                                    } else {
                                      result1 = null;
                                      pos = pos2;
                                    }
                                    result1 = result1 !== null ? result1 : "";
                                    if (result1 !== null) {
                                      pos2 = pos;
                                      if (input.charCodeAt(pos) === 58) {
                                        result2 = ":";
                                        pos++;
                                      } else {
                                        result2 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result2 !== null) {
                                        result3 = parse_h16();
                                        if (result3 !== null) {
                                          result2 = [result2, result3];
                                        } else {
                                          result2 = null;
                                          pos = pos2;
                                        }
                                      } else {
                                        result2 = null;
                                        pos = pos2;
                                      }
                                      result2 = result2 !== null ? result2 : "";
                                      if (result2 !== null) {
                                        pos2 = pos;
                                        if (input.charCodeAt(pos) === 58) {
                                          result3 = ":";
                                          pos++;
                                        } else {
                                          result3 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\":\"");
                                          }
                                        }
                                        if (result3 !== null) {
                                          result4 = parse_h16();
                                          if (result4 !== null) {
                                            result3 = [result3, result4];
                                          } else {
                                            result3 = null;
                                            pos = pos2;
                                          }
                                        } else {
                                          result3 = null;
                                          pos = pos2;
                                        }
                                        result3 = result3 !== null ? result3 : "";
                                        if (result3 !== null) {
                                          pos2 = pos;
                                          if (input.charCodeAt(pos) === 58) {
                                            result4 = ":";
                                            pos++;
                                          } else {
                                            result4 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result4 !== null) {
                                            result5 = parse_h16();
                                            if (result5 !== null) {
                                              result4 = [result4, result5];
                                            } else {
                                              result4 = null;
                                              pos = pos2;
                                            }
                                          } else {
                                            result4 = null;
                                            pos = pos2;
                                          }
                                          result4 = result4 !== null ? result4 : "";
                                          if (result4 !== null) {
                                            pos2 = pos;
                                            if (input.charCodeAt(pos) === 58) {
                                              result5 = ":";
                                              pos++;
                                            } else {
                                              result5 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                              }
                                            }
                                            if (result5 !== null) {
                                              result6 = parse_h16();
                                              if (result6 !== null) {
                                                result5 = [result5, result6];
                                              } else {
                                                result5 = null;
                                                pos = pos2;
                                              }
                                            } else {
                                              result5 = null;
                                              pos = pos2;
                                            }
                                            result5 = result5 !== null ? result5 : "";
                                            if (result5 !== null) {
                                              if (input.substr(pos, 2) === "::") {
                                                result6 = "::";
                                                pos += 2;
                                              } else {
                                                result6 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\"::\"");
                                                }
                                              }
                                              if (result6 !== null) {
                                                result7 = parse_h16();
                                                if (result7 !== null) {
                                                  result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                } else {
                                                  result0 = null;
                                                  pos = pos1;
                                                }
                                              } else {
                                                result0 = null;
                                                pos = pos1;
                                              }
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                  if (result0 === null) {
                                    pos1 = pos;
                                    result0 = parse_h16();
                                    if (result0 !== null) {
                                      pos2 = pos;
                                      if (input.charCodeAt(pos) === 58) {
                                        result1 = ":";
                                        pos++;
                                      } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\":\"");
                                        }
                                      }
                                      if (result1 !== null) {
                                        result2 = parse_h16();
                                        if (result2 !== null) {
                                          result1 = [result1, result2];
                                        } else {
                                          result1 = null;
                                          pos = pos2;
                                        }
                                      } else {
                                        result1 = null;
                                        pos = pos2;
                                      }
                                      result1 = result1 !== null ? result1 : "";
                                      if (result1 !== null) {
                                        pos2 = pos;
                                        if (input.charCodeAt(pos) === 58) {
                                          result2 = ":";
                                          pos++;
                                        } else {
                                          result2 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\":\"");
                                          }
                                        }
                                        if (result2 !== null) {
                                          result3 = parse_h16();
                                          if (result3 !== null) {
                                            result2 = [result2, result3];
                                          } else {
                                            result2 = null;
                                            pos = pos2;
                                          }
                                        } else {
                                          result2 = null;
                                          pos = pos2;
                                        }
                                        result2 = result2 !== null ? result2 : "";
                                        if (result2 !== null) {
                                          pos2 = pos;
                                          if (input.charCodeAt(pos) === 58) {
                                            result3 = ":";
                                            pos++;
                                          } else {
                                            result3 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\":\"");
                                            }
                                          }
                                          if (result3 !== null) {
                                            result4 = parse_h16();
                                            if (result4 !== null) {
                                              result3 = [result3, result4];
                                            } else {
                                              result3 = null;
                                              pos = pos2;
                                            }
                                          } else {
                                            result3 = null;
                                            pos = pos2;
                                          }
                                          result3 = result3 !== null ? result3 : "";
                                          if (result3 !== null) {
                                            pos2 = pos;
                                            if (input.charCodeAt(pos) === 58) {
                                              result4 = ":";
                                              pos++;
                                            } else {
                                              result4 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                              }
                                            }
                                            if (result4 !== null) {
                                              result5 = parse_h16();
                                              if (result5 !== null) {
                                                result4 = [result4, result5];
                                              } else {
                                                result4 = null;
                                                pos = pos2;
                                              }
                                            } else {
                                              result4 = null;
                                              pos = pos2;
                                            }
                                            result4 = result4 !== null ? result4 : "";
                                            if (result4 !== null) {
                                              pos2 = pos;
                                              if (input.charCodeAt(pos) === 58) {
                                                result5 = ":";
                                                pos++;
                                              } else {
                                                result5 = null;
                                                if (reportFailures === 0) {
                                                  matchFailed("\":\"");
                                                }
                                              }
                                              if (result5 !== null) {
                                                result6 = parse_h16();
                                                if (result6 !== null) {
                                                  result5 = [result5, result6];
                                                } else {
                                                  result5 = null;
                                                  pos = pos2;
                                                }
                                              } else {
                                                result5 = null;
                                                pos = pos2;
                                              }
                                              result5 = result5 !== null ? result5 : "";
                                              if (result5 !== null) {
                                                pos2 = pos;
                                                if (input.charCodeAt(pos) === 58) {
                                                  result6 = ":";
                                                  pos++;
                                                } else {
                                                  result6 = null;
                                                  if (reportFailures === 0) {
                                                    matchFailed("\":\"");
                                                  }
                                                }
                                                if (result6 !== null) {
                                                  result7 = parse_h16();
                                                  if (result7 !== null) {
                                                    result6 = [result6, result7];
                                                  } else {
                                                    result6 = null;
                                                    pos = pos2;
                                                  }
                                                } else {
                                                  result6 = null;
                                                  pos = pos2;
                                                }
                                                result6 = result6 !== null ? result6 : "";
                                                if (result6 !== null) {
                                                  if (input.substr(pos, 2) === "::") {
                                                    result7 = "::";
                                                    pos += 2;
                                                  } else {
                                                    result7 = null;
                                                    if (reportFailures === 0) {
                                                      matchFailed("\"::\"");
                                                    }
                                                  }
                                                  if (result7 !== null) {
                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                  } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                  }
                                                } else {
                                                  result0 = null;
                                                  pos = pos1;
                                                }
                                              } else {
                                                result0 = null;
                                                pos = pos1;
                                              }
                                            } else {
                                              result0 = null;
                                              pos = pos1;
                                            }
                                          } else {
                                            result0 = null;
                                            pos = pos1;
                                          }
                                        } else {
                                          result0 = null;
                                          pos = pos1;
                                        }
                                      } else {
                                        result0 = null;
                                        pos = pos1;
                                      }
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          data.host_type = 'IPv6';
                          return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_h16() {
        var result0, result1, result2, result3;
        var pos0;
        pos0 = pos;
        result0 = parse_HEXDIG();
        if (result0 !== null) {
          result1 = parse_HEXDIG();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_HEXDIG();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_HEXDIG();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_ls32() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_h16();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_h16();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          result0 = parse_IPv4address();
        }
        return result0;
      }
      function parse_IPv4address() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_dec_octet();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 46) {
            result1 = ".";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_dec_octet();
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 46) {
                result3 = ".";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\".\"");
                }
              }
              if (result3 !== null) {
                result4 = parse_dec_octet();
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 46) {
                    result5 = ".";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\".\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse_dec_octet();
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.host_type = 'IPv4';
                            return input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_dec_octet() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 2) === "25") {
          result0 = "25";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"25\"");
          }
        }
        if (result0 !== null) {
          if (/^[0-5]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[0-5]");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.charCodeAt(pos) === 50) {
            result0 = "2";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"2\"");
            }
          }
          if (result0 !== null) {
            if (/^[0-4]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[0-4]");
              }
            }
            if (result1 !== null) {
              result2 = parse_DIGIT();
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            if (input.charCodeAt(pos) === 49) {
              result0 = "1";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"1\"");
              }
            }
            if (result0 !== null) {
              result1 = parse_DIGIT();
              if (result1 !== null) {
                result2 = parse_DIGIT();
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              if (/^[1-9]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("[1-9]");
                }
              }
              if (result0 !== null) {
                result1 = parse_DIGIT();
                if (result1 !== null) {
                  result0 = [result0, result1];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
              if (result0 === null) {
                result0 = parse_DIGIT();
              }
            }
          }
        }
        return result0;
      }
      function parse_port() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_DIGIT();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_DIGIT();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_DIGIT();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_DIGIT();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result4 = parse_DIGIT();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, port) {
                            port = parseInt(port.join(''));
                            data.port = port;
                            return port; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_uri_parameters() {
        var result0, result1, result2;
        var pos0;
        result0 = [];
        pos0 = pos;
        if (input.charCodeAt(pos) === 59) {
          result1 = ";";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\";\"");
          }
        }
        if (result1 !== null) {
          result2 = parse_uri_parameter();
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos0;
          }
        } else {
          result1 = null;
          pos = pos0;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos0 = pos;
          if (input.charCodeAt(pos) === 59) {
            result1 = ";";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\";\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_uri_parameter();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos0;
            }
          } else {
            result1 = null;
            pos = pos0;
          }
        }
        return result0;
      }
      function parse_uri_parameter() {
        var result0;
        result0 = parse_transport_param();
        if (result0 === null) {
          result0 = parse_user_param();
          if (result0 === null) {
            result0 = parse_method_param();
            if (result0 === null) {
              result0 = parse_ttl_param();
              if (result0 === null) {
                result0 = parse_maddr_param();
                if (result0 === null) {
                  result0 = parse_lr_param();
                  if (result0 === null) {
                    result0 = parse_other_param();
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_transport_param() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 10).toLowerCase() === "transport=") {
          result0 = input.substr(pos, 10);
          pos += 10;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"transport=\"");
          }
        }
        if (result0 !== null) {
          if (input.substr(pos, 3).toLowerCase() === "udp") {
            result1 = input.substr(pos, 3);
            pos += 3;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"udp\"");
            }
          }
          if (result1 === null) {
            if (input.substr(pos, 3).toLowerCase() === "tcp") {
              result1 = input.substr(pos, 3);
              pos += 3;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"tcp\"");
              }
            }
            if (result1 === null) {
              if (input.substr(pos, 4).toLowerCase() === "sctp") {
                result1 = input.substr(pos, 4);
                pos += 4;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\"sctp\"");
                }
              }
              if (result1 === null) {
                if (input.substr(pos, 3).toLowerCase() === "tls") {
                  result1 = input.substr(pos, 3);
                  pos += 3;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"tls\"");
                  }
                }
                if (result1 === null) {
                  result1 = parse_token();
                }
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, transport) {
                              if(!data.uri_params) data.uri_params={};
                              data.uri_params['transport'] = transport.toLowerCase(); })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_user_param() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 5).toLowerCase() === "user=") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"user=\"");
          }
        }
        if (result0 !== null) {
          if (input.substr(pos, 5).toLowerCase() === "phone") {
            result1 = input.substr(pos, 5);
            pos += 5;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"phone\"");
            }
          }
          if (result1 === null) {
            if (input.substr(pos, 2).toLowerCase() === "ip") {
              result1 = input.substr(pos, 2);
              pos += 2;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"ip\"");
              }
            }
            if (result1 === null) {
              result1 = parse_token();
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, user) {
                              if(!data.uri_params) data.uri_params={};
                              data.uri_params['user'] = user.toLowerCase(); })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_method_param() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 7).toLowerCase() === "method=") {
          result0 = input.substr(pos, 7);
          pos += 7;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"method=\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_Method();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, method) {
                              if(!data.uri_params) data.uri_params={};
                              data.uri_params['method'] = method; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_ttl_param() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 4).toLowerCase() === "ttl=") {
          result0 = input.substr(pos, 4);
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"ttl=\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_ttl();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, ttl) {
                              if(!data.params) data.params={};
                              data.params['ttl'] = ttl; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_maddr_param() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 6).toLowerCase() === "maddr=") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"maddr=\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_host();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, maddr) {
                              if(!data.uri_params) data.uri_params={};
                              data.uri_params['maddr'] = maddr; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_lr_param() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 2).toLowerCase() === "lr") {
          result0 = input.substr(pos, 2);
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"lr\"");
          }
        }
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 61) {
            result1 = "=";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                              if(!data.uri_params) data.uri_params={};
                              data.uri_params['lr'] = undefined; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_other_param() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_pname();
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 61) {
            result1 = "=";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_pvalue();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, param, value) {
                              if(!data.uri_params) data.uri_params = {};
                              if (typeof value === 'undefined'){
                                value = undefined;
                              }
                              else {
                                value = value[1];
                              }
                              data.uri_params[param.toLowerCase()] = value;})(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_pname() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_paramchar();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_paramchar();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, pname) {return pname.join(''); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_pvalue() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_paramchar();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_paramchar();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, pvalue) {return pvalue.join(''); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_paramchar() {
        var result0;
        result0 = parse_param_unreserved();
        if (result0 === null) {
          result0 = parse_unreserved();
          if (result0 === null) {
            result0 = parse_escaped();
          }
        }
        return result0;
      }
      function parse_param_unreserved() {
        var result0;
        if (input.charCodeAt(pos) === 91) {
          result0 = "[";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 93) {
            result0 = "]";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"]\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 47) {
              result0 = "/";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"/\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 58) {
                result0 = ":";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\":\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 38) {
                  result0 = "&";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"&\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 43) {
                    result0 = "+";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"+\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 36) {
                      result0 = "$";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"$\"");
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_headers() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        pos0 = pos;
        if (input.charCodeAt(pos) === 63) {
          result0 = "?";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"?\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_header();
          if (result1 !== null) {
            result2 = [];
            pos1 = pos;
            if (input.charCodeAt(pos) === 38) {
              result3 = "&";
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("\"&\"");
              }
            }
            if (result3 !== null) {
              result4 = parse_header();
              if (result4 !== null) {
                result3 = [result3, result4];
              } else {
                result3 = null;
                pos = pos1;
              }
            } else {
              result3 = null;
              pos = pos1;
            }
            while (result3 !== null) {
              result2.push(result3);
              pos1 = pos;
              if (input.charCodeAt(pos) === 38) {
                result3 = "&";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"&\"");
                }
              }
              if (result3 !== null) {
                result4 = parse_header();
                if (result4 !== null) {
                  result3 = [result3, result4];
                } else {
                  result3 = null;
                  pos = pos1;
                }
              } else {
                result3 = null;
                pos = pos1;
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_header() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_hname();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 61) {
            result1 = "=";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_hvalue();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, hname, hvalue) {
                              hname = hname.join('').toLowerCase();
                              hvalue = hvalue.join('');
                              if(!data.uri_headers) data.uri_headers = {};
                              if (!data.uri_headers[hname]) {
                                data.uri_headers[hname] = [hvalue];
                              } else {
                                data.uri_headers[hname].push(hvalue);
                              }})(pos0, result0[0], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_hname() {
        var result0, result1;
        result1 = parse_hnv_unreserved();
        if (result1 === null) {
          result1 = parse_unreserved();
          if (result1 === null) {
            result1 = parse_escaped();
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_hnv_unreserved();
            if (result1 === null) {
              result1 = parse_unreserved();
              if (result1 === null) {
                result1 = parse_escaped();
              }
            }
          }
        } else {
          result0 = null;
        }
        return result0;
      }
      function parse_hvalue() {
        var result0, result1;
        result0 = [];
        result1 = parse_hnv_unreserved();
        if (result1 === null) {
          result1 = parse_unreserved();
          if (result1 === null) {
            result1 = parse_escaped();
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_hnv_unreserved();
          if (result1 === null) {
            result1 = parse_unreserved();
            if (result1 === null) {
              result1 = parse_escaped();
            }
          }
        }
        return result0;
      }
      function parse_hnv_unreserved() {
        var result0;
        if (input.charCodeAt(pos) === 91) {
          result0 = "[";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[\"");
          }
        }
        if (result0 === null) {
          if (input.charCodeAt(pos) === 93) {
            result0 = "]";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"]\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 47) {
              result0 = "/";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"/\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 63) {
                result0 = "?";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"?\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 58) {
                  result0 = ":";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 43) {
                    result0 = "+";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"+\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 36) {
                      result0 = "$";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"$\"");
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_Request_Response() {
        var result0;
        result0 = parse_Status_Line();
        if (result0 === null) {
          result0 = parse_Request_Line();
        }
        return result0;
      }
      function parse_Request_Line() {
        var result0, result1, result2, result3, result4;
        var pos0;
        pos0 = pos;
        result0 = parse_Method();
        if (result0 !== null) {
          result1 = parse_SP();
          if (result1 !== null) {
            result2 = parse_Request_URI();
            if (result2 !== null) {
              result3 = parse_SP();
              if (result3 !== null) {
                result4 = parse_SIP_Version();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Request_URI() {
        var result0;
        result0 = parse_SIP_URI();
        if (result0 === null) {
          result0 = parse_absoluteURI();
        }
        return result0;
      }
      function parse_absoluteURI() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_scheme();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 58) {
            result1 = ":";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_hier_part();
            if (result2 === null) {
              result2 = parse_opaque_part();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_hier_part() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_net_path();
        if (result0 === null) {
          result0 = parse_abs_path();
        }
        if (result0 !== null) {
          pos1 = pos;
          if (input.charCodeAt(pos) === 63) {
            result1 = "?";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"?\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_query();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos1;
            }
          } else {
            result1 = null;
            pos = pos1;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_net_path() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 2) === "//") {
          result0 = "//";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"//\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_authority();
          if (result1 !== null) {
            result2 = parse_abs_path();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_abs_path() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        if (input.charCodeAt(pos) === 47) {
          result0 = "/";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"/\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_path_segments();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_opaque_part() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_uric_no_slash();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_uric();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_uric();
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_uric() {
        var result0;
        result0 = parse_reserved();
        if (result0 === null) {
          result0 = parse_unreserved();
          if (result0 === null) {
            result0 = parse_escaped();
          }
        }
        return result0;
      }
      function parse_uric_no_slash() {
        var result0;
        result0 = parse_unreserved();
        if (result0 === null) {
          result0 = parse_escaped();
          if (result0 === null) {
            if (input.charCodeAt(pos) === 59) {
              result0 = ";";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\";\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 63) {
                result0 = "?";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"?\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 58) {
                  result0 = ":";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 64) {
                    result0 = "@";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"@\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 38) {
                      result0 = "&";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"&\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 61) {
                        result0 = "=";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"=\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 43) {
                          result0 = "+";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"+\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.charCodeAt(pos) === 36) {
                            result0 = "$";
                            pos++;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"$\"");
                            }
                          }
                          if (result0 === null) {
                            if (input.charCodeAt(pos) === 44) {
                              result0 = ",";
                              pos++;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\",\"");
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_path_segments() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_segment();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          if (input.charCodeAt(pos) === 47) {
            result2 = "/";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_segment();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            if (input.charCodeAt(pos) === 47) {
              result2 = "/";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"/\"");
              }
            }
            if (result2 !== null) {
              result3 = parse_segment();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_segment() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = [];
        result1 = parse_pchar();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_pchar();
        }
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          if (input.charCodeAt(pos) === 59) {
            result2 = ";";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\";\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            if (input.charCodeAt(pos) === 59) {
              result2 = ";";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\";\"");
              }
            }
            if (result2 !== null) {
              result3 = parse_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_param() {
        var result0, result1;
        result0 = [];
        result1 = parse_pchar();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_pchar();
        }
        return result0;
      }
      function parse_pchar() {
        var result0;
        result0 = parse_unreserved();
        if (result0 === null) {
          result0 = parse_escaped();
          if (result0 === null) {
            if (input.charCodeAt(pos) === 58) {
              result0 = ":";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\":\"");
              }
            }
            if (result0 === null) {
              if (input.charCodeAt(pos) === 64) {
                result0 = "@";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"@\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 38) {
                  result0 = "&";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"&\"");
                  }
                }
                if (result0 === null) {
                  if (input.charCodeAt(pos) === 61) {
                    result0 = "=";
                    pos++;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"=\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 43) {
                      result0 = "+";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"+\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.charCodeAt(pos) === 36) {
                        result0 = "$";
                        pos++;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"$\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 44) {
                          result0 = ",";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\",\"");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_scheme() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ALPHA();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_ALPHA();
          if (result2 === null) {
            result2 = parse_DIGIT();
            if (result2 === null) {
              if (input.charCodeAt(pos) === 43) {
                result2 = "+";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"+\"");
                }
              }
              if (result2 === null) {
                if (input.charCodeAt(pos) === 45) {
                  result2 = "-";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"-\"");
                  }
                }
                if (result2 === null) {
                  if (input.charCodeAt(pos) === 46) {
                    result2 = ".";
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\".\"");
                    }
                  }
                }
              }
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_ALPHA();
            if (result2 === null) {
              result2 = parse_DIGIT();
              if (result2 === null) {
                if (input.charCodeAt(pos) === 43) {
                  result2 = "+";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"+\"");
                  }
                }
                if (result2 === null) {
                  if (input.charCodeAt(pos) === 45) {
                    result2 = "-";
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"-\"");
                    }
                  }
                  if (result2 === null) {
                    if (input.charCodeAt(pos) === 46) {
                      result2 = ".";
                      pos++;
                    } else {
                      result2 = null;
                      if (reportFailures === 0) {
                        matchFailed("\".\"");
                      }
                    }
                  }
                }
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.scheme= input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_authority() {
        var result0;
        result0 = parse_srvr();
        if (result0 === null) {
          result0 = parse_reg_name();
        }
        return result0;
      }
      function parse_srvr() {
        var result0, result1;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_userinfo();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 64) {
            result1 = "@";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"@\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_hostport();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        result0 = result0 !== null ? result0 : "";
        return result0;
      }
      function parse_reg_name() {
        var result0, result1;
        result1 = parse_unreserved();
        if (result1 === null) {
          result1 = parse_escaped();
          if (result1 === null) {
            if (input.charCodeAt(pos) === 36) {
              result1 = "$";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"$\"");
              }
            }
            if (result1 === null) {
              if (input.charCodeAt(pos) === 44) {
                result1 = ",";
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("\",\"");
                }
              }
              if (result1 === null) {
                if (input.charCodeAt(pos) === 59) {
                  result1 = ";";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\";\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\":\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 64) {
                      result1 = "@";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"@\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 38) {
                        result1 = "&";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"&\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 61) {
                          result1 = "=";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"=\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 43) {
                            result1 = "+";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"+\"");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_unreserved();
            if (result1 === null) {
              result1 = parse_escaped();
              if (result1 === null) {
                if (input.charCodeAt(pos) === 36) {
                  result1 = "$";
                  pos++;
                } else {
                  result1 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"$\"");
                  }
                }
                if (result1 === null) {
                  if (input.charCodeAt(pos) === 44) {
                    result1 = ",";
                    pos++;
                  } else {
                    result1 = null;
                    if (reportFailures === 0) {
                      matchFailed("\",\"");
                    }
                  }
                  if (result1 === null) {
                    if (input.charCodeAt(pos) === 59) {
                      result1 = ";";
                      pos++;
                    } else {
                      result1 = null;
                      if (reportFailures === 0) {
                        matchFailed("\";\"");
                      }
                    }
                    if (result1 === null) {
                      if (input.charCodeAt(pos) === 58) {
                        result1 = ":";
                        pos++;
                      } else {
                        result1 = null;
                        if (reportFailures === 0) {
                          matchFailed("\":\"");
                        }
                      }
                      if (result1 === null) {
                        if (input.charCodeAt(pos) === 64) {
                          result1 = "@";
                          pos++;
                        } else {
                          result1 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"@\"");
                          }
                        }
                        if (result1 === null) {
                          if (input.charCodeAt(pos) === 38) {
                            result1 = "&";
                            pos++;
                          } else {
                            result1 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"&\"");
                            }
                          }
                          if (result1 === null) {
                            if (input.charCodeAt(pos) === 61) {
                              result1 = "=";
                              pos++;
                            } else {
                              result1 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"=\"");
                              }
                            }
                            if (result1 === null) {
                              if (input.charCodeAt(pos) === 43) {
                                result1 = "+";
                                pos++;
                              } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"+\"");
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          result0 = null;
        }
        return result0;
      }
      function parse_query() {
        var result0, result1;
        result0 = [];
        result1 = parse_uric();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_uric();
        }
        return result0;
      }
      function parse_SIP_Version() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 3).toLowerCase() === "sip") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"SIP\"");
          }
        }
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 47) {
            result1 = "/";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result1 !== null) {
            result3 = parse_DIGIT();
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                result3 = parse_DIGIT();
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 46) {
                result3 = ".";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\".\"");
                }
              }
              if (result3 !== null) {
                result5 = parse_DIGIT();
                if (result5 !== null) {
                  result4 = [];
                  while (result5 !== null) {
                    result4.push(result5);
                    result5 = parse_DIGIT();
                  }
                } else {
                  result4 = null;
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.sip_version = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_INVITEm() {
        var result0;
        if (input.substr(pos, 6) === "INVITE") {
          result0 = "INVITE";
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"INVITE\"");
          }
        }
        return result0;
      }
      function parse_ACKm() {
        var result0;
        if (input.substr(pos, 3) === "ACK") {
          result0 = "ACK";
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"ACK\"");
          }
        }
        return result0;
      }
      function parse_OPTIONSm() {
        var result0;
        if (input.substr(pos, 7) === "OPTIONS") {
          result0 = "OPTIONS";
          pos += 7;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"OPTIONS\"");
          }
        }
        return result0;
      }
      function parse_BYEm() {
        var result0;
        if (input.substr(pos, 3) === "BYE") {
          result0 = "BYE";
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"BYE\"");
          }
        }
        return result0;
      }
      function parse_CANCELm() {
        var result0;
        if (input.substr(pos, 6) === "CANCEL") {
          result0 = "CANCEL";
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"CANCEL\"");
          }
        }
        return result0;
      }
      function parse_REGISTERm() {
        var result0;
        if (input.substr(pos, 8) === "REGISTER") {
          result0 = "REGISTER";
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"REGISTER\"");
          }
        }
        return result0;
      }
      function parse_SUBSCRIBEm() {
        var result0;
        if (input.substr(pos, 9) === "SUBSCRIBE") {
          result0 = "SUBSCRIBE";
          pos += 9;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"SUBSCRIBE\"");
          }
        }
        return result0;
      }
      function parse_NOTIFYm() {
        var result0;
        if (input.substr(pos, 6) === "NOTIFY") {
          result0 = "NOTIFY";
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"NOTIFY\"");
          }
        }
        return result0;
      }
      function parse_REFERm() {
        var result0;
        if (input.substr(pos, 5) === "REFER") {
          result0 = "REFER";
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"REFER\"");
          }
        }
        return result0;
      }
      function parse_Method() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_INVITEm();
        if (result0 === null) {
          result0 = parse_ACKm();
          if (result0 === null) {
            result0 = parse_OPTIONSm();
            if (result0 === null) {
              result0 = parse_BYEm();
              if (result0 === null) {
                result0 = parse_CANCELm();
                if (result0 === null) {
                  result0 = parse_REGISTERm();
                  if (result0 === null) {
                    result0 = parse_SUBSCRIBEm();
                    if (result0 === null) {
                      result0 = parse_NOTIFYm();
                      if (result0 === null) {
                        result0 = parse_REFERm();
                        if (result0 === null) {
                          result0 = parse_token();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.method = input.substring(pos, offset);
                            return data.method; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Status_Line() {
        var result0, result1, result2, result3, result4;
        var pos0;
        pos0 = pos;
        result0 = parse_SIP_Version();
        if (result0 !== null) {
          result1 = parse_SP();
          if (result1 !== null) {
            result2 = parse_Status_Code();
            if (result2 !== null) {
              result3 = parse_SP();
              if (result3 !== null) {
                result4 = parse_Reason_Phrase();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Status_Code() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_extension_code();
        if (result0 !== null) {
          result0 = (function(offset, status_code) {
                          data.status_code = parseInt(status_code.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_extension_code() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_DIGIT();
        if (result0 !== null) {
          result1 = parse_DIGIT();
          if (result1 !== null) {
            result2 = parse_DIGIT();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Reason_Phrase() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result0 = [];
        result1 = parse_reserved();
        if (result1 === null) {
          result1 = parse_unreserved();
          if (result1 === null) {
            result1 = parse_escaped();
            if (result1 === null) {
              result1 = parse_UTF8_NONASCII();
              if (result1 === null) {
                result1 = parse_UTF8_CONT();
                if (result1 === null) {
                  result1 = parse_SP();
                  if (result1 === null) {
                    result1 = parse_HTAB();
                  }
                }
              }
            }
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_reserved();
          if (result1 === null) {
            result1 = parse_unreserved();
            if (result1 === null) {
              result1 = parse_escaped();
              if (result1 === null) {
                result1 = parse_UTF8_NONASCII();
                if (result1 === null) {
                  result1 = parse_UTF8_CONT();
                  if (result1 === null) {
                    result1 = parse_SP();
                    if (result1 === null) {
                      result1 = parse_HTAB();
                    }
                  }
                }
              }
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          data.reason_phrase = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Allow_Events() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_event_type();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_event_type();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_event_type();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Call_ID() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_word();
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 64) {
            result1 = "@";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"@\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_word();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                      data = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Contact() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        result0 = parse_STAR();
        if (result0 === null) {
          pos1 = pos;
          result0 = parse_contact_param();
          if (result0 !== null) {
            result1 = [];
            pos2 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_contact_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
            while (result2 !== null) {
              result1.push(result2);
              pos2 = pos;
              result2 = parse_COMMA();
              if (result2 !== null) {
                result3 = parse_contact_param();
                if (result3 !== null) {
                  result2 = [result2, result3];
                } else {
                  result2 = null;
                  pos = pos2;
                }
              } else {
                result2 = null;
                pos = pos2;
              }
            }
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                                var idx, length;
                                length = data.multi_header.length;
                                for (idx = 0; idx < length; idx++) {
                                  if (data.multi_header[idx].parsed === null) {
                                    data = null;
                                    break;
                                  }
                                }
                                if (data !== null) {
                                  data = data.multi_header;
                                } else {
                                  data = -1;
                                }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_contact_param() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SIP_URI_noparams();
        if (result0 === null) {
          result0 = parse_name_addr();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_contact_params();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_contact_params();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                                var header;
                                if(!data.multi_header) data.multi_header = [];
                                try {
                                  header = new NameAddrHeader(data.uri, data.display_name, data.params);
                                  delete data.uri;
                                  delete data.display_name;
                                  delete data.params;
                                } catch(e) {
                                  header = null;
                                }
                                data.multi_header.push( { 'possition': pos,
                                                          'offset': offset,
                                                          'parsed': header
                                                        });})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_name_addr() {
        var result0, result1, result2, result3;
        var pos0;
        pos0 = pos;
        result0 = parse_display_name();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_LAQUOT();
          if (result1 !== null) {
            result2 = parse_SIP_URI();
            if (result2 !== null) {
              result3 = parse_RAQUOT();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_display_name() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_LWS();
          if (result2 !== null) {
            result3 = parse_token();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_LWS();
            if (result2 !== null) {
              result3 = parse_token();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 === null) {
          result0 = parse_quoted_string();
        }
        if (result0 !== null) {
          result0 = (function(offset, display_name) {
                                display_name = input.substring(pos, offset).trim();
                                if (display_name[0] === '\"') {
                                  display_name = display_name.substring(1, display_name.length-1);
                                }
                                data.display_name = display_name; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_contact_params() {
        var result0;
        result0 = parse_c_p_q();
        if (result0 === null) {
          result0 = parse_c_p_expires();
          if (result0 === null) {
            result0 = parse_generic_param();
          }
        }
        return result0;
      }
      function parse_c_p_q() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 1).toLowerCase() === "q") {
          result0 = input.substr(pos, 1);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"q\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_qvalue();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, q) {
                                if(!data.params) data.params = {};
                                data.params['q'] = q; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_c_p_expires() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 7).toLowerCase() === "expires") {
          result0 = input.substr(pos, 7);
          pos += 7;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"expires\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_delta_seconds();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, expires) {
                                if(!data.params) data.params = {};
                                data.params['expires'] = expires; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_delta_seconds() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_DIGIT();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_DIGIT();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, delta_seconds) {
                                return parseInt(delta_seconds.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_qvalue() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 48) {
          result0 = "0";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"0\"");
          }
        }
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 46) {
            result1 = ".";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_DIGIT();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_DIGIT();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result4 = parse_DIGIT();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result1 = [result1, result2, result3, result4];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                                return parseFloat(input.substring(pos, offset)); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_generic_param() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          pos2 = pos;
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_gen_value();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, param, value) {
                                if(!data.params) data.params = {};
                                if (typeof value === 'undefined'){
                                  value = undefined;
                                }
                                else {
                                  value = value[1];
                                }
                                data.params[param.toLowerCase()] = value;})(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_gen_value() {
        var result0;
        result0 = parse_token();
        if (result0 === null) {
          result0 = parse_host();
          if (result0 === null) {
            result0 = parse_quoted_string();
          }
        }
        return result0;
      }
      function parse_Content_Disposition() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_disp_type();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_disp_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_disp_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_disp_type() {
        var result0;
        if (input.substr(pos, 6).toLowerCase() === "render") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"render\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 7).toLowerCase() === "session") {
            result0 = input.substr(pos, 7);
            pos += 7;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"session\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 4).toLowerCase() === "icon") {
              result0 = input.substr(pos, 4);
              pos += 4;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"icon\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 5).toLowerCase() === "alert") {
                result0 = input.substr(pos, 5);
                pos += 5;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"alert\"");
                }
              }
              if (result0 === null) {
                result0 = parse_token();
              }
            }
          }
        }
        return result0;
      }
      function parse_disp_param() {
        var result0;
        result0 = parse_handling_param();
        if (result0 === null) {
          result0 = parse_generic_param();
        }
        return result0;
      }
      function parse_handling_param() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 8).toLowerCase() === "handling") {
          result0 = input.substr(pos, 8);
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"handling\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            if (input.substr(pos, 8).toLowerCase() === "optional") {
              result2 = input.substr(pos, 8);
              pos += 8;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"optional\"");
              }
            }
            if (result2 === null) {
              if (input.substr(pos, 8).toLowerCase() === "required") {
                result2 = input.substr(pos, 8);
                pos += 8;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"required\"");
                }
              }
              if (result2 === null) {
                result2 = parse_token();
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Content_Encoding() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_token();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_token();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Content_Length() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_DIGIT();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_DIGIT();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, length) {
                                data = parseInt(length.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Content_Type() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_media_type();
        if (result0 !== null) {
          result0 = (function(offset) {
                                data = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_media_type() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_m_type();
        if (result0 !== null) {
          result1 = parse_SLASH();
          if (result1 !== null) {
            result2 = parse_m_subtype();
            if (result2 !== null) {
              result3 = [];
              pos1 = pos;
              result4 = parse_SEMI();
              if (result4 !== null) {
                result5 = parse_m_parameter();
                if (result5 !== null) {
                  result4 = [result4, result5];
                } else {
                  result4 = null;
                  pos = pos1;
                }
              } else {
                result4 = null;
                pos = pos1;
              }
              while (result4 !== null) {
                result3.push(result4);
                pos1 = pos;
                result4 = parse_SEMI();
                if (result4 !== null) {
                  result5 = parse_m_parameter();
                  if (result5 !== null) {
                    result4 = [result4, result5];
                  } else {
                    result4 = null;
                    pos = pos1;
                  }
                } else {
                  result4 = null;
                  pos = pos1;
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_m_type() {
        var result0;
        result0 = parse_discrete_type();
        if (result0 === null) {
          result0 = parse_composite_type();
        }
        return result0;
      }
      function parse_discrete_type() {
        var result0;
        if (input.substr(pos, 4).toLowerCase() === "text") {
          result0 = input.substr(pos, 4);
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"text\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 5).toLowerCase() === "image") {
            result0 = input.substr(pos, 5);
            pos += 5;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"image\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 5).toLowerCase() === "audio") {
              result0 = input.substr(pos, 5);
              pos += 5;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"audio\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 5).toLowerCase() === "video") {
                result0 = input.substr(pos, 5);
                pos += 5;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"video\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 11).toLowerCase() === "application") {
                  result0 = input.substr(pos, 11);
                  pos += 11;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"application\"");
                  }
                }
                if (result0 === null) {
                  result0 = parse_extension_token();
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_composite_type() {
        var result0;
        if (input.substr(pos, 7).toLowerCase() === "message") {
          result0 = input.substr(pos, 7);
          pos += 7;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"message\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 9).toLowerCase() === "multipart") {
            result0 = input.substr(pos, 9);
            pos += 9;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"multipart\"");
            }
          }
          if (result0 === null) {
            result0 = parse_extension_token();
          }
        }
        return result0;
      }
      function parse_extension_token() {
        var result0;
        result0 = parse_token();
        if (result0 === null) {
          result0 = parse_x_token();
        }
        return result0;
      }
      function parse_x_token() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 2).toLowerCase() === "x-") {
          result0 = input.substr(pos, 2);
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"x-\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_token();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_m_subtype() {
        var result0;
        result0 = parse_extension_token();
        if (result0 === null) {
          result0 = parse_token();
        }
        return result0;
      }
      function parse_m_parameter() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_m_value();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_m_value() {
        var result0;
        result0 = parse_token();
        if (result0 === null) {
          result0 = parse_quoted_string();
        }
        return result0;
      }
      function parse_CSeq() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_CSeq_value();
        if (result0 !== null) {
          result1 = parse_LWS();
          if (result1 !== null) {
            result2 = parse_Method();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_CSeq_value() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_DIGIT();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_DIGIT();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, cseq_value) {
                          data.value=parseInt(cseq_value.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Expires() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_delta_seconds();
        if (result0 !== null) {
          result0 = (function(offset, expires) {data = expires; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Event() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_event_type();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_generic_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_generic_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, event_type) {
                               data.event = event_type.join('').toLowerCase(); })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_event_type() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token_nodot();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          if (input.charCodeAt(pos) === 46) {
            result2 = ".";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result2 !== null) {
            result3 = parse_token_nodot();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            if (input.charCodeAt(pos) === 46) {
              result2 = ".";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result2 !== null) {
              result3 = parse_token_nodot();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_From() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SIP_URI_noparams();
        if (result0 === null) {
          result0 = parse_name_addr();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_from_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_from_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                        var tag = data.tag;
                        try {
                          data = new NameAddrHeader(data.uri, data.display_name, data.params);
                          if (tag) {data.setParam('tag',tag)}
                        } catch(e) {
                          data = -1;
                        }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_from_param() {
        var result0;
        result0 = parse_tag_param();
        if (result0 === null) {
          result0 = parse_generic_param();
        }
        return result0;
      }
      function parse_tag_param() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 3).toLowerCase() === "tag") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"tag\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, tag) {data.tag = tag; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Max_Forwards() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result1 = parse_DIGIT();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_DIGIT();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, forwards) {
                          data = parseInt(forwards.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Min_Expires() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_delta_seconds();
        if (result0 !== null) {
          result0 = (function(offset, min_expires) {data = min_expires; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Name_Addr_Header() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse_display_name();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_display_name();
        }
        if (result0 !== null) {
          result1 = parse_LAQUOT();
          if (result1 !== null) {
            result2 = parse_SIP_URI();
            if (result2 !== null) {
              result3 = parse_RAQUOT();
              if (result3 !== null) {
                result4 = [];
                pos2 = pos;
                result5 = parse_SEMI();
                if (result5 !== null) {
                  result6 = parse_generic_param();
                  if (result6 !== null) {
                    result5 = [result5, result6];
                  } else {
                    result5 = null;
                    pos = pos2;
                  }
                } else {
                  result5 = null;
                  pos = pos2;
                }
                while (result5 !== null) {
                  result4.push(result5);
                  pos2 = pos;
                  result5 = parse_SEMI();
                  if (result5 !== null) {
                    result6 = parse_generic_param();
                    if (result6 !== null) {
                      result5 = [result5, result6];
                    } else {
                      result5 = null;
                      pos = pos2;
                    }
                  } else {
                    result5 = null;
                    pos = pos2;
                  }
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                              try {
                                data = new NameAddrHeader(data.uri, data.display_name, data.params);
                              } catch(e) {
                                data = -1;
                              }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Proxy_Authenticate() {
        var result0;
        result0 = parse_challenge();
        return result0;
      }
      function parse_challenge() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        if (input.substr(pos, 6).toLowerCase() === "digest") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"Digest\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_LWS();
          if (result1 !== null) {
            result2 = parse_digest_cln();
            if (result2 !== null) {
              result3 = [];
              pos1 = pos;
              result4 = parse_COMMA();
              if (result4 !== null) {
                result5 = parse_digest_cln();
                if (result5 !== null) {
                  result4 = [result4, result5];
                } else {
                  result4 = null;
                  pos = pos1;
                }
              } else {
                result4 = null;
                pos = pos1;
              }
              while (result4 !== null) {
                result3.push(result4);
                pos1 = pos;
                result4 = parse_COMMA();
                if (result4 !== null) {
                  result5 = parse_digest_cln();
                  if (result5 !== null) {
                    result4 = [result4, result5];
                  } else {
                    result4 = null;
                    pos = pos1;
                  }
                } else {
                  result4 = null;
                  pos = pos1;
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          result0 = parse_other_challenge();
        }
        return result0;
      }
      function parse_other_challenge() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = parse_LWS();
          if (result1 !== null) {
            result2 = parse_auth_param();
            if (result2 !== null) {
              result3 = [];
              pos1 = pos;
              result4 = parse_COMMA();
              if (result4 !== null) {
                result5 = parse_auth_param();
                if (result5 !== null) {
                  result4 = [result4, result5];
                } else {
                  result4 = null;
                  pos = pos1;
                }
              } else {
                result4 = null;
                pos = pos1;
              }
              while (result4 !== null) {
                result3.push(result4);
                pos1 = pos;
                result4 = parse_COMMA();
                if (result4 !== null) {
                  result5 = parse_auth_param();
                  if (result5 !== null) {
                    result4 = [result4, result5];
                  } else {
                    result4 = null;
                    pos = pos1;
                  }
                } else {
                  result4 = null;
                  pos = pos1;
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_auth_param() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 === null) {
              result2 = parse_quoted_string();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_digest_cln() {
        var result0;
        result0 = parse_realm();
        if (result0 === null) {
          result0 = parse_domain();
          if (result0 === null) {
            result0 = parse_nonce();
            if (result0 === null) {
              result0 = parse_opaque();
              if (result0 === null) {
                result0 = parse_stale();
                if (result0 === null) {
                  result0 = parse_algorithm();
                  if (result0 === null) {
                    result0 = parse_qop_options();
                    if (result0 === null) {
                      result0 = parse_auth_param();
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_realm() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 5).toLowerCase() === "realm") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"realm\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_realm_value();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_realm_value() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_quoted_string_clean();
        if (result0 !== null) {
          result0 = (function(offset, realm) { data.realm = realm; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_domain() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        pos0 = pos;
        if (input.substr(pos, 6).toLowerCase() === "domain") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"domain\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_LDQUOT();
            if (result2 !== null) {
              result3 = parse_URI();
              if (result3 !== null) {
                result4 = [];
                pos1 = pos;
                result6 = parse_SP();
                if (result6 !== null) {
                  result5 = [];
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse_SP();
                  }
                } else {
                  result5 = null;
                }
                if (result5 !== null) {
                  result6 = parse_URI();
                  if (result6 !== null) {
                    result5 = [result5, result6];
                  } else {
                    result5 = null;
                    pos = pos1;
                  }
                } else {
                  result5 = null;
                  pos = pos1;
                }
                while (result5 !== null) {
                  result4.push(result5);
                  pos1 = pos;
                  result6 = parse_SP();
                  if (result6 !== null) {
                    result5 = [];
                    while (result6 !== null) {
                      result5.push(result6);
                      result6 = parse_SP();
                    }
                  } else {
                    result5 = null;
                  }
                  if (result5 !== null) {
                    result6 = parse_URI();
                    if (result6 !== null) {
                      result5 = [result5, result6];
                    } else {
                      result5 = null;
                      pos = pos1;
                    }
                  } else {
                    result5 = null;
                    pos = pos1;
                  }
                }
                if (result4 !== null) {
                  result5 = parse_RDQUOT();
                  if (result5 !== null) {
                    result0 = [result0, result1, result2, result3, result4, result5];
                  } else {
                    result0 = null;
                    pos = pos0;
                  }
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_URI() {
        var result0;
        result0 = parse_absoluteURI();
        if (result0 === null) {
          result0 = parse_abs_path();
        }
        return result0;
      }
      function parse_nonce() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 5).toLowerCase() === "nonce") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"nonce\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_nonce_value();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_nonce_value() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_quoted_string_clean();
        if (result0 !== null) {
          result0 = (function(offset, nonce) { data.nonce=nonce; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_opaque() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 6).toLowerCase() === "opaque") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"opaque\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_quoted_string_clean();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, opaque) { data.opaque=opaque; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_stale() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        if (input.substr(pos, 5).toLowerCase() === "stale") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"stale\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            pos1 = pos;
            if (input.substr(pos, 4).toLowerCase() === "true") {
              result2 = input.substr(pos, 4);
              pos += 4;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"true\"");
              }
            }
            if (result2 !== null) {
              result2 = (function(offset) { data.stale=true; })(pos1);
            }
            if (result2 === null) {
              pos = pos1;
            }
            if (result2 === null) {
              pos1 = pos;
              if (input.substr(pos, 5).toLowerCase() === "false") {
                result2 = input.substr(pos, 5);
                pos += 5;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"false\"");
                }
              }
              if (result2 !== null) {
                result2 = (function(offset) { data.stale=false; })(pos1);
              }
              if (result2 === null) {
                pos = pos1;
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_algorithm() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 9).toLowerCase() === "algorithm") {
          result0 = input.substr(pos, 9);
          pos += 9;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"algorithm\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            if (input.substr(pos, 3).toLowerCase() === "md5") {
              result2 = input.substr(pos, 3);
              pos += 3;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"MD5\"");
              }
            }
            if (result2 === null) {
              if (input.substr(pos, 8).toLowerCase() === "md5-sess") {
                result2 = input.substr(pos, 8);
                pos += 8;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"MD5-sess\"");
                }
              }
              if (result2 === null) {
                result2 = parse_token();
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, algorithm) {
                              data.algorithm=algorithm.toUpperCase(); })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_qop_options() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1, pos2;
        pos0 = pos;
        if (input.substr(pos, 3).toLowerCase() === "qop") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"qop\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_LDQUOT();
            if (result2 !== null) {
              pos1 = pos;
              result3 = parse_qop_value();
              if (result3 !== null) {
                result4 = [];
                pos2 = pos;
                if (input.charCodeAt(pos) === 44) {
                  result5 = ",";
                  pos++;
                } else {
                  result5 = null;
                  if (reportFailures === 0) {
                    matchFailed("\",\"");
                  }
                }
                if (result5 !== null) {
                  result6 = parse_qop_value();
                  if (result6 !== null) {
                    result5 = [result5, result6];
                  } else {
                    result5 = null;
                    pos = pos2;
                  }
                } else {
                  result5 = null;
                  pos = pos2;
                }
                while (result5 !== null) {
                  result4.push(result5);
                  pos2 = pos;
                  if (input.charCodeAt(pos) === 44) {
                    result5 = ",";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\",\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse_qop_value();
                    if (result6 !== null) {
                      result5 = [result5, result6];
                    } else {
                      result5 = null;
                      pos = pos2;
                    }
                  } else {
                    result5 = null;
                    pos = pos2;
                  }
                }
                if (result4 !== null) {
                  result3 = [result3, result4];
                } else {
                  result3 = null;
                  pos = pos1;
                }
              } else {
                result3 = null;
                pos = pos1;
              }
              if (result3 !== null) {
                result4 = parse_RDQUOT();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_qop_value() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 8).toLowerCase() === "auth-int") {
          result0 = input.substr(pos, 8);
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"auth-int\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 4).toLowerCase() === "auth") {
            result0 = input.substr(pos, 4);
            pos += 4;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"auth\"");
            }
          }
          if (result0 === null) {
            result0 = parse_token();
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, qop_value) {
                                data.qop || (data.qop=[]);
                                data.qop.push(qop_value.toLowerCase()); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Proxy_Require() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_token();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_token();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Record_Route() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_rec_route();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_rec_route();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_rec_route();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          var idx, length;
                          length = data.multi_header.length;
                          for (idx = 0; idx < length; idx++) {
                            if (data.multi_header[idx].parsed === null) {
                              data = null;
                              break;
                            }
                          }
                          if (data !== null) {
                            data = data.multi_header;
                          } else {
                            data = -1;
                          }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_rec_route() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_name_addr();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_generic_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_generic_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          var header;
                          if(!data.multi_header) data.multi_header = [];
                          try {
                            header = new NameAddrHeader(data.uri, data.display_name, data.params);
                            delete data.uri;
                            delete data.display_name;
                            delete data.params;
                          } catch(e) {
                            header = null;
                          }
                          data.multi_header.push( { 'possition': pos,
                                                    'offset': offset,
                                                    'parsed': header
                                                  });})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Reason() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 3).toLowerCase() === "sip") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"SIP\"");
          }
        }
        if (result0 === null) {
          result0 = parse_token();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_reason_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_reason_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, protocol) {
                          data.protocol = protocol.toLowerCase();
                          if (!data.params) data.params = {};
                          if (data.params.text && data.params.text[0] === '"') {
                            var text = data.params.text;
                            data.text = text.substring(1, text.length-1);
                            delete data.params.text;
                          }
                        })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_reason_param() {
        var result0;
        result0 = parse_reason_cause();
        if (result0 === null) {
          result0 = parse_generic_param();
        }
        return result0;
      }
      function parse_reason_cause() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 5).toLowerCase() === "cause") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"cause\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result3 = parse_DIGIT();
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                result3 = parse_DIGIT();
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, cause) {
                          data.cause = parseInt(cause.join(''));
                        })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Require() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_token();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_token();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Route() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_route_param();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_route_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_route_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_route_param() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_name_addr();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_generic_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_generic_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Subscription_State() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_substate_value();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_subexp_params();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_subexp_params();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_substate_value() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 6).toLowerCase() === "active") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"active\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 7).toLowerCase() === "pending") {
            result0 = input.substr(pos, 7);
            pos += 7;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"pending\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 10).toLowerCase() === "terminated") {
              result0 = input.substr(pos, 10);
              pos += 10;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"terminated\"");
              }
            }
            if (result0 === null) {
              result0 = parse_token();
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                                data.state = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_subexp_params() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 6).toLowerCase() === "reason") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"reason\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_event_reason_value();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, reason) {
                                if (typeof reason !== 'undefined') data.reason = reason; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          if (input.substr(pos, 7).toLowerCase() === "expires") {
            result0 = input.substr(pos, 7);
            pos += 7;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"expires\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_EQUAL();
            if (result1 !== null) {
              result2 = parse_delta_seconds();
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, expires) {
                                  if (typeof expires !== 'undefined') data.expires = expires; })(pos0, result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 11).toLowerCase() === "retry_after") {
              result0 = input.substr(pos, 11);
              pos += 11;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"retry_after\"");
              }
            }
            if (result0 !== null) {
              result1 = parse_EQUAL();
              if (result1 !== null) {
                result2 = parse_delta_seconds();
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = (function(offset, retry_after) {
                                    if (typeof retry_after !== 'undefined') data.retry_after = retry_after; })(pos0, result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              result0 = parse_generic_param();
            }
          }
        }
        return result0;
      }
      function parse_event_reason_value() {
        var result0;
        if (input.substr(pos, 11).toLowerCase() === "deactivated") {
          result0 = input.substr(pos, 11);
          pos += 11;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"deactivated\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 9).toLowerCase() === "probation") {
            result0 = input.substr(pos, 9);
            pos += 9;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"probation\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 8).toLowerCase() === "rejected") {
              result0 = input.substr(pos, 8);
              pos += 8;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"rejected\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 7).toLowerCase() === "timeout") {
                result0 = input.substr(pos, 7);
                pos += 7;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"timeout\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 6).toLowerCase() === "giveup") {
                  result0 = input.substr(pos, 6);
                  pos += 6;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"giveup\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 10).toLowerCase() === "noresource") {
                    result0 = input.substr(pos, 10);
                    pos += 10;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"noresource\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 9).toLowerCase() === "invariant") {
                      result0 = input.substr(pos, 9);
                      pos += 9;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"invariant\"");
                      }
                    }
                    if (result0 === null) {
                      result0 = parse_token();
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_Subject() {
        var result0;
        result0 = parse_TEXT_UTF8_TRIM();
        result0 = result0 !== null ? result0 : "";
        return result0;
      }
      function parse_Supported() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_token();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_token();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        result0 = result0 !== null ? result0 : "";
        return result0;
      }
      function parse_To() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SIP_URI_noparams();
        if (result0 === null) {
          result0 = parse_name_addr();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_to_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_to_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                      var tag = data.tag;
                      try {
                        data = new NameAddrHeader(data.uri, data.display_name, data.params);
                        if (tag) {data.setParam('tag',tag)}
                      } catch(e) {
                        data = -1;
                      }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_to_param() {
        var result0;
        result0 = parse_tag_param();
        if (result0 === null) {
          result0 = parse_generic_param();
        }
        return result0;
      }
      function parse_Via() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_via_param();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_COMMA();
          if (result2 !== null) {
            result3 = parse_via_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_COMMA();
            if (result2 !== null) {
              result3 = parse_via_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_via_param() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_sent_protocol();
        if (result0 !== null) {
          result1 = parse_LWS();
          if (result1 !== null) {
            result2 = parse_sent_by();
            if (result2 !== null) {
              result3 = [];
              pos1 = pos;
              result4 = parse_SEMI();
              if (result4 !== null) {
                result5 = parse_via_params();
                if (result5 !== null) {
                  result4 = [result4, result5];
                } else {
                  result4 = null;
                  pos = pos1;
                }
              } else {
                result4 = null;
                pos = pos1;
              }
              while (result4 !== null) {
                result3.push(result4);
                pos1 = pos;
                result4 = parse_SEMI();
                if (result4 !== null) {
                  result5 = parse_via_params();
                  if (result5 !== null) {
                    result4 = [result4, result5];
                  } else {
                    result4 = null;
                    pos = pos1;
                  }
                } else {
                  result4 = null;
                  pos = pos1;
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_via_params() {
        var result0;
        result0 = parse_via_ttl();
        if (result0 === null) {
          result0 = parse_via_maddr();
          if (result0 === null) {
            result0 = parse_via_received();
            if (result0 === null) {
              result0 = parse_via_branch();
              if (result0 === null) {
                result0 = parse_response_port();
                if (result0 === null) {
                  result0 = parse_generic_param();
                }
              }
            }
          }
        }
        return result0;
      }
      function parse_via_ttl() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 3).toLowerCase() === "ttl") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"ttl\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_ttl();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, via_ttl_value) {
                              data.ttl = via_ttl_value; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_via_maddr() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 5).toLowerCase() === "maddr") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"maddr\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_host();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, via_maddr) {
                              data.maddr = via_maddr; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_via_received() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 8).toLowerCase() === "received") {
          result0 = input.substr(pos, 8);
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"received\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_IPv4address();
            if (result2 === null) {
              result2 = parse_IPv6address();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, via_received) {
                              data.received = via_received; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_via_branch() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 6).toLowerCase() === "branch") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"branch\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, via_branch) {
                              data.branch = via_branch; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_response_port() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 5).toLowerCase() === "rport") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"rport\"");
          }
        }
        if (result0 !== null) {
          pos2 = pos;
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_DIGIT();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_DIGIT();
            }
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                              if(typeof response_port !== 'undefined')
                                data.rport = response_port.join(''); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_sent_protocol() {
        var result0, result1, result2, result3, result4;
        var pos0;
        pos0 = pos;
        result0 = parse_protocol_name();
        if (result0 !== null) {
          result1 = parse_SLASH();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result3 = parse_SLASH();
              if (result3 !== null) {
                result4 = parse_transport();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_protocol_name() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 3).toLowerCase() === "sip") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"SIP\"");
          }
        }
        if (result0 === null) {
          result0 = parse_token();
        }
        if (result0 !== null) {
          result0 = (function(offset, via_protocol) {
                              data.protocol = via_protocol; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_transport() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 3).toLowerCase() === "udp") {
          result0 = input.substr(pos, 3);
          pos += 3;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"UDP\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 3).toLowerCase() === "tcp") {
            result0 = input.substr(pos, 3);
            pos += 3;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"TCP\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 3).toLowerCase() === "tls") {
              result0 = input.substr(pos, 3);
              pos += 3;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"TLS\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 4).toLowerCase() === "sctp") {
                result0 = input.substr(pos, 4);
                pos += 4;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"SCTP\"");
                }
              }
              if (result0 === null) {
                result0 = parse_token();
              }
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, via_transport) {
                              data.transport = via_transport; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_sent_by() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_via_host();
        if (result0 !== null) {
          pos1 = pos;
          result1 = parse_COLON();
          if (result1 !== null) {
            result2 = parse_via_port();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos1;
            }
          } else {
            result1 = null;
            pos = pos1;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_via_host() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_IPv4address();
        if (result0 === null) {
          result0 = parse_IPv6reference();
          if (result0 === null) {
            result0 = parse_hostname();
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                              data.host = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_via_port() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_DIGIT();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_DIGIT();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_DIGIT();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_DIGIT();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result4 = parse_DIGIT();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, via_sent_by_port) {
                              data.port = parseInt(via_sent_by_port.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_ttl() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_DIGIT();
        if (result0 !== null) {
          result1 = parse_DIGIT();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_DIGIT();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, ttl) {
                              return parseInt(ttl.join('')); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_WWW_Authenticate() {
        var result0;
        result0 = parse_challenge();
        return result0;
      }
      function parse_Session_Expires() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_s_e_expires();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_s_e_params();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_s_e_params();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_s_e_expires() {
        var result0;
        var pos0;
        pos0 = pos;
        result0 = parse_delta_seconds();
        if (result0 !== null) {
          result0 = (function(offset, expires) { data.expires = expires; })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_s_e_params() {
        var result0;
        result0 = parse_s_e_refresher();
        if (result0 === null) {
          result0 = parse_generic_param();
        }
        return result0;
      }
      function parse_s_e_refresher() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 9).toLowerCase() === "refresher") {
          result0 = input.substr(pos, 9);
          pos += 9;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"refresher\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            if (input.substr(pos, 3).toLowerCase() === "uac") {
              result2 = input.substr(pos, 3);
              pos += 3;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"uac\"");
              }
            }
            if (result2 === null) {
              if (input.substr(pos, 3).toLowerCase() === "uas") {
                result2 = input.substr(pos, 3);
                pos += 3;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"uas\"");
                }
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, s_e_refresher_value) { data.refresher = s_e_refresher_value.toLowerCase(); })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_extension_header() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_token();
        if (result0 !== null) {
          result1 = parse_HCOLON();
          if (result1 !== null) {
            result2 = parse_header_value();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_header_value() {
        var result0, result1;
        result0 = [];
        result1 = parse_TEXT_UTF8char();
        if (result1 === null) {
          result1 = parse_UTF8_CONT();
          if (result1 === null) {
            result1 = parse_LWS();
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_TEXT_UTF8char();
          if (result1 === null) {
            result1 = parse_UTF8_CONT();
            if (result1 === null) {
              result1 = parse_LWS();
            }
          }
        }
        return result0;
      }
      function parse_message_body() {
        var result0, result1;
        result0 = [];
        result1 = parse_OCTET();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_OCTET();
        }
        return result0;
      }
      function parse_uuid_URI() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 5) === "uuid:") {
          result0 = "uuid:";
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"uuid:\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_uuid();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_uuid() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_hex8();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 45) {
            result1 = "-";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_hex4();
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 45) {
                result3 = "-";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"-\"");
                }
              }
              if (result3 !== null) {
                result4 = parse_hex4();
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 45) {
                    result5 = "-";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"-\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = parse_hex4();
                    if (result6 !== null) {
                      if (input.charCodeAt(pos) === 45) {
                        result7 = "-";
                        pos++;
                      } else {
                        result7 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"-\"");
                        }
                      }
                      if (result7 !== null) {
                        result8 = parse_hex12();
                        if (result8 !== null) {
                          result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, uuid) {
                          data = input.substring(pos+5, offset); })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_hex4() {
        var result0, result1, result2, result3;
        var pos0;
        pos0 = pos;
        result0 = parse_HEXDIG();
        if (result0 !== null) {
          result1 = parse_HEXDIG();
          if (result1 !== null) {
            result2 = parse_HEXDIG();
            if (result2 !== null) {
              result3 = parse_HEXDIG();
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_hex8() {
        var result0, result1;
        var pos0;
        pos0 = pos;
        result0 = parse_hex4();
        if (result0 !== null) {
          result1 = parse_hex4();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_hex12() {
        var result0, result1, result2;
        var pos0;
        pos0 = pos;
        result0 = parse_hex4();
        if (result0 !== null) {
          result1 = parse_hex4();
          if (result1 !== null) {
            result2 = parse_hex4();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_Refer_To() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_SIP_URI_noparams();
        if (result0 === null) {
          result0 = parse_name_addr();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_generic_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_generic_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                        try {
                          data = new NameAddrHeader(data.uri, data.display_name, data.params);
                        } catch(e) {
                          data = -1;
                        }})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_Replaces() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        pos0 = pos;
        result0 = parse_call_id();
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          result2 = parse_SEMI();
          if (result2 !== null) {
            result3 = parse_replaces_param();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            result2 = parse_SEMI();
            if (result2 !== null) {
              result3 = parse_replaces_param();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      function parse_call_id() {
        var result0, result1, result2;
        var pos0, pos1, pos2;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_word();
        if (result0 !== null) {
          pos2 = pos;
          if (input.charCodeAt(pos) === 64) {
            result1 = "@";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"@\"");
            }
          }
          if (result1 !== null) {
            result2 = parse_word();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                          data.call_id = input.substring(pos, offset); })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_replaces_param() {
        var result0;
        result0 = parse_to_tag();
        if (result0 === null) {
          result0 = parse_from_tag();
          if (result0 === null) {
            result0 = parse_early_flag();
            if (result0 === null) {
              result0 = parse_generic_param();
            }
          }
        }
        return result0;
      }
      function parse_to_tag() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 6) === "to-tag") {
          result0 = "to-tag";
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"to-tag\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, to_tag) {
                            data.to_tag = to_tag; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_from_tag() {
        var result0, result1, result2;
        var pos0, pos1;
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 8) === "from-tag") {
          result0 = "from-tag";
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"from-tag\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_EQUAL();
          if (result1 !== null) {
            result2 = parse_token();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, from_tag) {
                            data.from_tag = from_tag; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function parse_early_flag() {
        var result0;
        var pos0;
        pos0 = pos;
        if (input.substr(pos, 10) === "early-only") {
          result0 = "early-only";
          pos += 10;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"early-only\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {
                            data.early_only = true; })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      function cleanupExpected(expected) {
        expected.sort();
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        var line = 1;
        var column = 1;
        var seenCR = false;
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        return { line: line, column: column };
      }
        var URI = require('./URI');
        var NameAddrHeader = require('./NameAddrHeader');
        var data = {};
      var result = parseFunctions[startRule]();
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
        return -1;
      }
      return data;
    },
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  /* Thrown when a parser encounters a syntax error. */
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      foundHumanized = found ? quote(found) : "end of input";
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  result.SyntaxError.prototype = Error.prototype;
  return result;
})();
},{"./NameAddrHeader":9,"./URI":24}],7:[function(require,module,exports){
/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP');
var pkg = require('../package.json');

debug('version %s', pkg.version);

var rtcninja = require('rtcninja');
var C = require('./Constants');
var Exceptions = require('./Exceptions');
var Utils = require('./Utils');
var UA = require('./UA');
var URI = require('./URI');
var NameAddrHeader = require('./NameAddrHeader');
var Grammar = require('./Grammar');
var WebSocketInterface = require('./WebSocketInterface');


/**
 * Expose the JsSIP module.
 */
var JsSIP = module.exports = {
  C: C,
  Exceptions: Exceptions,
  Utils: Utils,
  UA: UA,
  URI: URI,
  NameAddrHeader: NameAddrHeader,
  WebSocketInterface: WebSocketInterface,
  Grammar: Grammar,
  // Expose the debug module.
  debug: require('debug'),
  // Expose the rtcninja module.
  rtcninja: rtcninja
};


Object.defineProperties(JsSIP, {
  name: {
    get: function() { return pkg.title; }
  },

  version: {
    get: function() { return pkg.version; }
  }
});

},{"../package.json":40,"./Constants":1,"./Exceptions":5,"./Grammar":6,"./NameAddrHeader":9,"./UA":23,"./URI":24,"./Utils":25,"./WebSocketInterface":26,"debug":33,"rtcninja":43}],8:[function(require,module,exports){
module.exports = Message;


/**
 * Dependencies.
 */
var util = require('util');
var events = require('events');
var JsSIP_C = require('./Constants');
var SIPMessage = require('./SIPMessage');
var Utils = require('./Utils');
var RequestSender = require('./RequestSender');
var Transactions = require('./Transactions');
var Exceptions = require('./Exceptions');


function Message(ua) {
  this.ua = ua;

  // Custom message empty object for high level use
  this.data = {};

  events.EventEmitter.call(this);
}

util.inherits(Message, events.EventEmitter);


Message.prototype.send = function(target, body, options) {
  var request_sender, event, contentType, eventHandlers, extraHeaders,
    originalTarget = target;

  if (target === undefined || body === undefined) {
    throw new TypeError('Not enough arguments');
  }

  // Check target validity
  target = this.ua.normalizeTarget(target);
  if (!target) {
    throw new TypeError('Invalid target: '+ originalTarget);
  }

  // Get call options
  options = options || {};
  extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [];
  eventHandlers = options.eventHandlers || {};
  contentType = options.contentType || 'text/plain';

  this.content_type = contentType;

  // Set event handlers
  for (event in eventHandlers) {
    this.on(event, eventHandlers[event]);
  }

  this.closed = false;
  this.ua.applicants[this] = this;

  extraHeaders.push('Content-Type: '+ contentType);

  this.request = new SIPMessage.OutgoingRequest(JsSIP_C.MESSAGE, target, this.ua, null, extraHeaders);

  if(body) {
    this.request.body = body;
    this.content = body;
  } else {
    this.content = null;
  }

  request_sender = new RequestSender(this, this.ua);

  this.newMessage('local', this.request);

  request_sender.send();
};

Message.prototype.receiveResponse = function(response) {
  var cause;

  if(this.closed) {
    return;
  }
  switch(true) {
    case /^1[0-9]{2}$/.test(response.status_code):
      // Ignore provisional responses.
      break;

    case /^2[0-9]{2}$/.test(response.status_code):
      delete this.ua.applicants[this];
      this.emit('succeeded', {
        originator: 'remote',
        response: response
      });
      break;

    default:
      delete this.ua.applicants[this];
      cause = Utils.sipErrorCause(response.status_code);
      this.emit('failed', {
        originator: 'remote',
        response: response,
        cause: cause
      });
      break;
  }
};


Message.prototype.onRequestTimeout = function() {
  if(this.closed) {
    return;
  }
  this.emit('failed', {
    originator: 'system',
    cause: JsSIP_C.causes.REQUEST_TIMEOUT
  });
};

Message.prototype.onTransportError = function() {
  if(this.closed) {
    return;
  }
  this.emit('failed', {
    originator: 'system',
    cause: JsSIP_C.causes.CONNECTION_ERROR
  });
};

Message.prototype.close = function() {
  this.closed = true;
  delete this.ua.applicants[this];
};

Message.prototype.init_incoming = function(request) {
  var transaction;

  this.request = request;
  this.content_type = request.getHeader('Content-Type');

  if (request.body) {
    this.content = request.body;
  } else {
    this.content = null;
  }

  this.newMessage('remote', request);

  transaction = this.ua.transactions.nist[request.via_branch];

  if (transaction && (transaction.state === Transactions.C.STATUS_TRYING || transaction.state === Transactions.C.STATUS_PROCEEDING)) {
    request.reply(200);
  }
};

/**
 * Accept the incoming Message
 * Only valid for incoming Messages
 */
Message.prototype.accept = function(options) {
  options = options || {};

  var
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    body = options.body;

  if (this.direction !== 'incoming') {
    throw new Exceptions.NotSupportedError('"accept" not supported for outgoing Message');
  }

  this.request.reply(200, null, extraHeaders, body);
};

/**
 * Reject the incoming Message
 * Only valid for incoming Messages
 */
Message.prototype.reject = function(options) {
  options = options || {};

  var
    status_code = options.status_code || 480,
    reason_phrase = options.reason_phrase,
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    body = options.body;

  if (this.direction !== 'incoming') {
    throw new Exceptions.NotSupportedError('"reject" not supported for outgoing Message');
  }

  if (status_code < 300 || status_code >= 700) {
    throw new TypeError('Invalid status_code: '+ status_code);
  }

  this.request.reply(status_code, reason_phrase, extraHeaders, body);
};

/**
 * Internal Callbacks
 */

Message.prototype.newMessage = function(originator, request) {
  if (originator === 'remote') {
    this.direction = 'incoming';
    this.local_identity = request.to;
    this.remote_identity = request.from;
  } else if (originator === 'local'){
    this.direction = 'outgoing';
    this.local_identity = request.from;
    this.remote_identity = request.to;
  }

  this.ua.newMessage({
    originator: originator,
    message: this,
    request: request
  });
};

},{"./Constants":1,"./Exceptions":5,"./RequestSender":17,"./SIPMessage":18,"./Transactions":21,"./Utils":25,"events":28,"util":32}],9:[function(require,module,exports){
module.exports = NameAddrHeader;


/**
 * Dependencies.
 */
var URI = require('./URI');
var Grammar = require('./Grammar');


function NameAddrHeader(uri, display_name, parameters) {
  var param;

  // Checks
  if(!uri || !(uri instanceof URI)) {
    throw new TypeError('missing or invalid "uri" parameter');
  }

  // Initialize parameters
  this.uri = uri;
  this.parameters = {};

  for (param in parameters) {
    this.setParam(param, parameters[param]);
  }

  Object.defineProperties(this, {
    display_name: {
      get: function() { return display_name; },
      set: function(value) {
        display_name = (value === 0) ? '0' : value;
      }
    }
  });
}

NameAddrHeader.prototype = {
  setParam: function(key, value) {
    if (key) {
      this.parameters[key.toLowerCase()] = (typeof value === 'undefined' || value === null) ? null : value.toString();
    }
  },

  getParam: function(key) {
    if(key) {
      return this.parameters[key.toLowerCase()];
    }
  },

  hasParam: function(key) {
    if(key) {
      return (this.parameters.hasOwnProperty(key.toLowerCase()) && true) || false;
    }
  },

  deleteParam: function(parameter) {
    var value;
    parameter = parameter.toLowerCase();
    if (this.parameters.hasOwnProperty(parameter)) {
      value = this.parameters[parameter];
      delete this.parameters[parameter];
      return value;
    }
  },

  clearParams: function() {
    this.parameters = {};
  },

  clone: function() {
    return new NameAddrHeader(
      this.uri.clone(),
      this.display_name,
      JSON.parse(JSON.stringify(this.parameters)));
  },

  toString: function() {
    var body, parameter;

    body  = (this.display_name || this.display_name === 0) ? '"' + this.display_name + '" ' : '';
    body += '<' + this.uri.toString() + '>';

    for (parameter in this.parameters) {
      body += ';' + parameter;

      if (this.parameters[parameter] !== null) {
        body += '='+ this.parameters[parameter];
      }
    }

    return body;
  }
};


/**
  * Parse the given string and returns a NameAddrHeader instance or undefined if
  * it is an invalid NameAddrHeader.
  */
NameAddrHeader.parse = function(name_addr_header) {
  name_addr_header = Grammar.parse(name_addr_header,'Name_Addr_Header');

  if (name_addr_header !== -1) {
    return name_addr_header;
  } else {
    return undefined;
  }
};

},{"./Grammar":6,"./URI":24}],10:[function(require,module,exports){
var Parser = {};

module.exports = Parser;


/**
 * Dependencies.
 */
var debugerror = require('debug')('JsSIP:ERROR:Parser');
debugerror.log = console.warn.bind(console);
var Grammar = require('./Grammar');
var SIPMessage = require('./SIPMessage');


/**
 * Extract and parse every header of a SIP message.
 */
function getHeader(data, headerStart) {
  var
    // 'start' position of the header.
    start = headerStart,
    // 'end' position of the header.
    end = 0,
    // 'partial end' position of the header.
    partialEnd = 0;

  //End of message.
  if (data.substring(start, start + 2).match(/(^\r\n)/)) {
    return -2;
  }

  while(end === 0) {
    // Partial End of Header.
    partialEnd = data.indexOf('\r\n', start);

    // 'indexOf' returns -1 if the value to be found never occurs.
    if (partialEnd === -1) {
      return partialEnd;
    }

    if(!data.substring(partialEnd + 2, partialEnd + 4).match(/(^\r\n)/) && data.charAt(partialEnd + 2).match(/(^\s+)/)) {
      // Not the end of the message. Continue from the next position.
      start = partialEnd + 2;
    } else {
      end = partialEnd;
    }
  }

  return end;
}

function parseHeader(message, data, headerStart, headerEnd) {
  var header, idx, length, parsed,
    hcolonIndex = data.indexOf(':', headerStart),
    headerName = data.substring(headerStart, hcolonIndex).trim(),
    headerValue = data.substring(hcolonIndex + 1, headerEnd).trim();

  // If header-field is well-known, parse it.
  switch(headerName.toLowerCase()) {
    case 'via':
    case 'v':
      message.addHeader('via', headerValue);
      if(message.getHeaders('via').length === 1) {
        parsed = message.parseHeader('Via');
        if(parsed) {
          message.via = parsed;
          message.via_branch = parsed.branch;
        }
      } else {
        parsed = 0;
      }
      break;
    case 'from':
    case 'f':
      message.setHeader('from', headerValue);
      parsed = message.parseHeader('from');
      if(parsed) {
        message.from = parsed;
        message.from_tag = parsed.getParam('tag');
      }
      break;
    case 'to':
    case 't':
      message.setHeader('to', headerValue);
      parsed = message.parseHeader('to');
      if(parsed) {
        message.to = parsed;
        message.to_tag = parsed.getParam('tag');
      }
      break;
    case 'record-route':
      parsed = Grammar.parse(headerValue, 'Record_Route');

      if (parsed === -1) {
        parsed = undefined;
      }

      length = parsed.length;
      for (idx = 0; idx < length; idx++) {
        header = parsed[idx];
        message.addHeader('record-route', headerValue.substring(header.possition, header.offset));
        message.headers['Record-Route'][message.getHeaders('record-route').length - 1].parsed = header.parsed;
      }
      break;
    case 'call-id':
    case 'i':
      message.setHeader('call-id', headerValue);
      parsed = message.parseHeader('call-id');
      if(parsed) {
        message.call_id = headerValue;
      }
      break;
    case 'contact':
    case 'm':
      parsed = Grammar.parse(headerValue, 'Contact');

      if (parsed === -1) {
        parsed = undefined;
      }

      length = parsed.length;
      for (idx = 0; idx < length; idx++) {
        header = parsed[idx];
        message.addHeader('contact', headerValue.substring(header.possition, header.offset));
        message.headers.Contact[message.getHeaders('contact').length - 1].parsed = header.parsed;
      }
      break;
    case 'content-length':
    case 'l':
      message.setHeader('content-length', headerValue);
      parsed = message.parseHeader('content-length');
      break;
    case 'content-type':
    case 'c':
      message.setHeader('content-type', headerValue);
      parsed = message.parseHeader('content-type');
      break;
    case 'cseq':
      message.setHeader('cseq', headerValue);
      parsed = message.parseHeader('cseq');
      if(parsed) {
        message.cseq = parsed.value;
      }
      if(message instanceof SIPMessage.IncomingResponse) {
        message.method = parsed.method;
      }
      break;
    case 'max-forwards':
      message.setHeader('max-forwards', headerValue);
      parsed = message.parseHeader('max-forwards');
      break;
    case 'www-authenticate':
      message.setHeader('www-authenticate', headerValue);
      parsed = message.parseHeader('www-authenticate');
      break;
    case 'proxy-authenticate':
      message.setHeader('proxy-authenticate', headerValue);
      parsed = message.parseHeader('proxy-authenticate');
      break;
    case 'session-expires':
    case 'x':
      message.setHeader('session-expires', headerValue);
      parsed = message.parseHeader('session-expires');
      if (parsed) {
        message.session_expires = parsed.expires;
        message.session_expires_refresher = parsed.refresher;
      }
      break;
    case 'refer-to':
    case 'r':
      message.setHeader('refer-to', headerValue);
      parsed = message.parseHeader('refer-to');
      if(parsed) {
        message.refer_to = parsed;
      }
      break;
    case 'replaces':
      message.setHeader('replaces', headerValue);
      parsed = message.parseHeader('replaces');
      if(parsed) {
        message.replaces = parsed;
      }
      break;
    case 'event':
    case 'o':
      message.setHeader('event', headerValue);
      parsed = message.parseHeader('event');
      if(parsed) {
        message.event = parsed;
      }
      break;
    default:
      // Do not parse this header.
      message.setHeader(headerName, headerValue);
      parsed = 0;
  }

  if (parsed === undefined) {
    return {
      error: 'error parsing header "'+ headerName +'"'
    };
  } else {
    return true;
  }
}


/**
 * Parse SIP Message
 */
Parser.parseMessage = function(data, ua) {
  var message, firstLine, contentLength, bodyStart, parsed,
    headerStart = 0,
    headerEnd = data.indexOf('\r\n');

  if(headerEnd === -1) {
    debugerror('parseMessage() | no CRLF found, not a SIP message');
    return;
  }

  // Parse first line. Check if it is a Request or a Reply.
  firstLine = data.substring(0, headerEnd);
  parsed = Grammar.parse(firstLine, 'Request_Response');

  if(parsed === -1) {
    debugerror('parseMessage() | error parsing first line of SIP message: "' + firstLine + '"');
    return;
  } else if(!parsed.status_code) {
    message = new SIPMessage.IncomingRequest(ua);
    message.method = parsed.method;
    message.ruri = parsed.uri;
  } else {
    message = new SIPMessage.IncomingResponse();
    message.status_code = parsed.status_code;
    message.reason_phrase = parsed.reason_phrase;
  }

  message.data = data;
  headerStart = headerEnd + 2;

  /* Loop over every line in data. Detect the end of each header and parse
  * it or simply add to the headers collection.
  */
  while(true) {
    headerEnd = getHeader(data, headerStart);

    // The SIP message has normally finished.
    if(headerEnd === -2) {
      bodyStart = headerStart + 2;
      break;
    }
    // data.indexOf returned -1 due to a malformed message.
    else if(headerEnd === -1) {
      debugerror('parseMessage() | malformed message');
      return;
    }

    parsed = parseHeader(message, data, headerStart, headerEnd);

    if(parsed !== true) {
      debugerror('parseMessage() |', parsed.error);
      return;
    }

    headerStart = headerEnd + 2;
  }

  /* RFC3261 18.3.
   * If there are additional bytes in the transport packet
   * beyond the end of the body, they MUST be discarded.
   */
  if(message.hasHeader('content-length')) {
    contentLength = message.getHeader('content-length');
    message.body = data.substr(bodyStart, contentLength);
  } else {
    message.body = data.substring(bodyStart);
  }

  return message;
};

},{"./Grammar":6,"./SIPMessage":18,"debug":33}],11:[function(require,module,exports){
module.exports = RTCSession;


var C = {
  // RTCSession states
  STATUS_NULL:               0,
  STATUS_INVITE_SENT:        1,
  STATUS_1XX_RECEIVED:       2,
  STATUS_INVITE_RECEIVED:    3,
  STATUS_WAITING_FOR_ANSWER: 4,
  STATUS_ANSWERED:           5,
  STATUS_WAITING_FOR_ACK:    6,
  STATUS_CANCELED:           7,
  STATUS_TERMINATED:         8,
  STATUS_CONFIRMED:          9
};

/**
 * Expose C object.
 */
RTCSession.C = C;


/**
 * Dependencies.
 */
var util = require('util');
var events = require('events');
var debug = require('debug')('JsSIP:RTCSession');
var debugerror = require('debug')('JsSIP:ERROR:RTCSession');
debugerror.log = console.warn.bind(console);
var rtcninja = require('rtcninja');
var sdp_transform = require('sdp-transform');
var JsSIP_C = require('./Constants');
var Exceptions = require('./Exceptions');
var Transactions = require('./Transactions');
var Utils = require('./Utils');
var Timers = require('./Timers');
var SIPMessage = require('./SIPMessage');
var Dialog = require('./Dialog');
var RequestSender = require('./RequestSender');
var RTCSession_Request = require('./RTCSession/Request');
var RTCSession_DTMF = require('./RTCSession/DTMF');
var RTCSession_ReferNotifier = require('./RTCSession/ReferNotifier');
var RTCSession_ReferSubscriber = require('./RTCSession/ReferSubscriber');


/**
 * Local variables.
 */
var holdMediaTypes = ['audio', 'video'];


function RTCSession(ua) {
  debug('new');

  this.ua = ua;
  this.status = C.STATUS_NULL;
  this.dialog = null;
  this.earlyDialogs = {};
  this.connection = null;  // The rtcninja.RTCPeerConnection instance (public attribute).

  // RTCSession confirmation flag
  this.is_confirmed = false;

  // is late SDP being negotiated
  this.late_sdp = false;

  // Default rtcOfferConstraints and rtcAnswerConstrainsts (passed in connect() or answer()).
  this.rtcOfferConstraints = null;
  this.rtcAnswerConstraints = null;

  // Local MediaStream.
  this.localMediaStream = null;
  this.localMediaStreamLocallyGenerated = false;

  // Flag to indicate PeerConnection ready for new actions.
  this.rtcReady = true;

  // SIP Timers
  this.timers = {
    ackTimer: null,
    expiresTimer: null,
    invite2xxTimer: null,
    userNoAnswerTimer: null
  };

  // Session info
  this.direction = null;
  this.local_identity = null;
  this.remote_identity = null;
  this.start_time = null;
  this.end_time = null;
  this.tones = null;

  // Mute/Hold state
  this.audioMuted = false;
  this.videoMuted = false;
  this.localHold = false;
  this.remoteHold = false;

  // Session Timers (RFC 4028)
  this.sessionTimers = {
    enabled: this.ua.configuration.session_timers,
    defaultExpires: JsSIP_C.SESSION_EXPIRES,
    currentExpires: null,
    running: false,
    refresher: false,
    timer: null  // A setTimeout.
  };

  // Map of ReferSubscriber instances indexed by the REFER's CSeq number
  this.referSubscribers = {};

  // Custom session empty object for high level use
  this.data = {};

  events.EventEmitter.call(this);
}

util.inherits(RTCSession, events.EventEmitter);


/**
 * User API
 */


RTCSession.prototype.isInProgress = function() {
  switch(this.status) {
    case C.STATUS_NULL:
    case C.STATUS_INVITE_SENT:
    case C.STATUS_1XX_RECEIVED:
    case C.STATUS_INVITE_RECEIVED:
    case C.STATUS_WAITING_FOR_ANSWER:
      return true;
    default:
      return false;
  }
};


RTCSession.prototype.isEstablished = function() {
  switch(this.status) {
    case C.STATUS_ANSWERED:
    case C.STATUS_WAITING_FOR_ACK:
    case C.STATUS_CONFIRMED:
      return true;
    default:
      return false;
  }
};


RTCSession.prototype.isEnded = function() {
  switch(this.status) {
    case C.STATUS_CANCELED:
    case C.STATUS_TERMINATED:
      return true;
    default:
      return false;
  }
};


RTCSession.prototype.isMuted = function() {
  return {
    audio: this.audioMuted,
    video: this.videoMuted
  };
};


RTCSession.prototype.isOnHold = function() {
  return {
    local: this.localHold,
    remote: this.remoteHold
  };
};


/**
 * Check if RTCSession is ready for an outgoing re-INVITE or UPDATE with SDP.
 */
 RTCSession.prototype.isReadyToReOffer = function() {
  if (! this.rtcReady) {
    debug('isReadyToReOffer() | internal WebRTC status not ready');
    return false;
  }

  // No established yet.
  if (! this.dialog) {
    debug('isReadyToReOffer() | session not established yet');
    return false;
  }

  // Another INVITE transaction is in progress
  if (this.dialog.uac_pending_reply === true || this.dialog.uas_pending_reply === true) {
    debug('isReadyToReOffer() | there is another INVITE/UPDATE transaction in progress');
    return false;
  }

  return true;
};



RTCSession.prototype.connect = function(target, options, initCallback) {
  debug('connect()');

  options = options || {};

  var event, requestParams,
    originalTarget = target,
    eventHandlers = options.eventHandlers || {},
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    mediaConstraints = options.mediaConstraints || {audio: true, video: true},
    mediaStream = options.mediaStream || null,
    pcConfig = options.pcConfig || {iceServers:[]},
    rtcConstraints = options.rtcConstraints || null,
    rtcOfferConstraints = options.rtcOfferConstraints || null;

  this.rtcOfferConstraints = rtcOfferConstraints;
  this.rtcAnswerConstraints = options.rtcAnswerConstraints || null;

  // Session Timers.
  if (this.sessionTimers.enabled) {
    if (Utils.isDecimal(options.sessionTimersExpires)) {
      if (options.sessionTimersExpires >= JsSIP_C.MIN_SESSION_EXPIRES) {
        this.sessionTimers.defaultExpires = options.sessionTimersExpires;
      }
      else {
        this.sessionTimers.defaultExpires = JsSIP_C.SESSION_EXPIRES;
      }
    }
  }

  this.data = options.data || this.data;

  if (target === undefined) {
    throw new TypeError('Not enough arguments');
  }

  // Check WebRTC support.
  if (! rtcninja.hasWebRTC()) {
    throw new Exceptions.NotSupportedError('WebRTC not supported');
  }

  // Check target validity
  target = this.ua.normalizeTarget(target);
  if (!target) {
    throw new TypeError('Invalid target: '+ originalTarget);
  }

  // Check Session Status
  if (this.status !== C.STATUS_NULL) {
    throw new Exceptions.InvalidStateError(this.status);
  }

  // Set event handlers
  for (event in eventHandlers) {
    this.on(event, eventHandlers[event]);
  }

  // Session parameter initialization
  this.from_tag = Utils.newTag();

  // Set anonymous property
  this.anonymous = options.anonymous || false;

  // OutgoingSession specific parameters
  this.isCanceled = false;

  requestParams = {from_tag: this.from_tag};

  this.contact = this.ua.contact.toString({
    anonymous: this.anonymous,
    outbound: true
  });

  if (this.anonymous) {
    requestParams.from_display_name = 'Anonymous';
    requestParams.from_uri = 'sip:anonymous@anonymous.invalid';

    extraHeaders.push('P-Preferred-Identity: '+ this.ua.configuration.uri.toString());
    extraHeaders.push('Privacy: id');
  }

  extraHeaders.push('Contact: '+ this.contact);
  extraHeaders.push('Content-Type: application/sdp');
  if (this.sessionTimers.enabled) {
    extraHeaders.push('Session-Expires: ' + this.sessionTimers.defaultExpires);
  }

  this.request = new SIPMessage.OutgoingRequest(JsSIP_C.INVITE, target, this.ua, requestParams, extraHeaders);

  this.id = this.request.call_id + this.from_tag;

  // Create a new rtcninja.RTCPeerConnection instance.
  createRTCConnection.call(this, pcConfig, rtcConstraints);

  // Save the session into the ua sessions collection.
  this.ua.sessions[this.id] = this;

  // Set internal properties
  this.direction = 'outgoing';
  this.local_identity = this.request.from;
  this.remote_identity = this.request.to;

  // User explicitly provided a newRTCSession callback for this session
  if (initCallback) {
    initCallback(this);
  } else {
    newRTCSession.call(this, 'local', this.request);
  }

  sendInitialRequest.call(this, mediaConstraints, rtcOfferConstraints, mediaStream);
};


RTCSession.prototype.init_incoming = function(request, initCallback) {
  debug('init_incoming()');

  var expires,
    self = this,
    contentType = request.getHeader('Content-Type');

  // Check body and content type
  if (request.body && (contentType !== 'application/sdp')) {
    request.reply(415);
    return;
  }

  // Session parameter initialization
  this.status = C.STATUS_INVITE_RECEIVED;
  this.from_tag = request.from_tag;
  this.id = request.call_id + this.from_tag;
  this.request = request;
  this.contact = this.ua.contact.toString();

  // Save the session into the ua sessions collection.
  this.ua.sessions[this.id] = this;

  // Get the Expires header value if exists
  if (request.hasHeader('expires')) {
    expires = request.getHeader('expires') * 1000;
  }

  /* Set the to_tag before
   * replying a response code that will create a dialog.
   */
  request.to_tag = Utils.newTag();

  // An error on dialog creation will fire 'failed' event
  if (! createDialog.call(this, request, 'UAS', true)) {
    request.reply(500, 'Missing Contact header field');
    return;
  }

  if (request.body) {
    this.late_sdp = false;
  }
  else {
    this.late_sdp = true;
  }

  this.status = C.STATUS_WAITING_FOR_ANSWER;

  // Set userNoAnswerTimer
  this.timers.userNoAnswerTimer = setTimeout(function() {
      request.reply(408);
      failed.call(self, 'local',null, JsSIP_C.causes.NO_ANSWER);
    }, this.ua.configuration.no_answer_timeout
  );

  /* Set expiresTimer
   * RFC3261 13.3.1
   */
  if (expires) {
    this.timers.expiresTimer = setTimeout(function() {
        if(self.status === C.STATUS_WAITING_FOR_ANSWER) {
          request.reply(487);
          failed.call(self, 'system', null, JsSIP_C.causes.EXPIRES);
        }
      }, expires
    );
  }

  // Set internal properties
  this.direction = 'incoming';
  this.local_identity = request.to;
  this.remote_identity = request.from;

  // A init callback was specifically defined
  if (initCallback) {
    initCallback(this);

  // Fire 'newRTCSession' event.
  } else {
    newRTCSession.call(this, 'remote', request);
  }

  // The user may have rejected the call in the 'newRTCSession' event.
  if (this.status === C.STATUS_TERMINATED) {
    return;
  }

  // Reply 180.
  request.reply(180, null, ['Contact: ' + self.contact]);

  // Fire 'progress' event.
  // TODO: Document that 'response' field in 'progress' event is null for
  // incoming calls.
  progress.call(self, 'local', null);
};


/**
 * Answer the call.
 */
RTCSession.prototype.answer = function(options) {
  debug('answer()');

  options = options || {};

  var idx, length, sdp, tracks,
    peerHasAudioLine = false,
    peerHasVideoLine = false,
    peerOffersFullAudio = false,
    peerOffersFullVideo = false,
    self = this,
    request = this.request,
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    mediaConstraints = options.mediaConstraints || {},
    mediaStream = options.mediaStream || null,
    pcConfig = options.pcConfig || {iceServers:[]},
    rtcConstraints = options.rtcConstraints || null,
    rtcAnswerConstraints = options.rtcAnswerConstraints || null;

  this.rtcAnswerConstraints = rtcAnswerConstraints;
  this.rtcOfferConstraints = options.rtcOfferConstraints || null;

  // Session Timers.
  if (this.sessionTimers.enabled) {
    if (Utils.isDecimal(options.sessionTimersExpires)) {
      if (options.sessionTimersExpires >= JsSIP_C.MIN_SESSION_EXPIRES) {
        this.sessionTimers.defaultExpires = options.sessionTimersExpires;
      }
      else {
        this.sessionTimers.defaultExpires = JsSIP_C.SESSION_EXPIRES;
      }
    }
  }

  this.data = options.data || this.data;

  // Check Session Direction and Status
  if (this.direction !== 'incoming') {
    throw new Exceptions.NotSupportedError('"answer" not supported for outgoing RTCSession');
  } else if (this.status !== C.STATUS_WAITING_FOR_ANSWER) {
    throw new Exceptions.InvalidStateError(this.status);
  }

  this.status = C.STATUS_ANSWERED;

  // An error on dialog creation will fire 'failed' event
  if (! createDialog.call(this, request, 'UAS')) {
    request.reply(500, 'Error creating dialog');
    return;
  }

  clearTimeout(this.timers.userNoAnswerTimer);

  extraHeaders.unshift('Contact: ' + self.contact);

  // Determine incoming media from incoming SDP offer (if any).
  sdp = request.parseSDP();

  // Make sure sdp.media is an array, not the case if there is only one media
  if (! Array.isArray(sdp.media)) {
    sdp.media = [sdp.media];
  }

  // Go through all medias in SDP to find offered capabilities to answer with
  idx = sdp.media.length;
  while(idx--) {
    var m = sdp.media[idx];
    if (m.type === 'audio') {
      peerHasAudioLine = true;
      if (!m.direction || m.direction === 'sendrecv') {
        peerOffersFullAudio = true;
      }
    }
    if (m.type === 'video') {
      peerHasVideoLine = true;
      if (!m.direction || m.direction === 'sendrecv') {
        peerOffersFullVideo = true;
      }
    }
  }

  // Remove audio from mediaStream if suggested by mediaConstraints
  if (mediaStream && mediaConstraints.audio === false) {
    tracks = mediaStream.getAudioTracks();
    length = tracks.length;
    for (idx=0; idx<length; idx++) {
      mediaStream.removeTrack(tracks[idx]);
    }
  }

  // Remove video from mediaStream if suggested by mediaConstraints
  if (mediaStream && mediaConstraints.video === false) {
    tracks = mediaStream.getVideoTracks();
    length = tracks.length;
    for (idx=0; idx<length; idx++) {
      mediaStream.removeTrack(tracks[idx]);
    }
  }

  // Set audio constraints based on incoming stream if not supplied
  if (!mediaStream && mediaConstraints.audio === undefined) {
    mediaConstraints.audio = peerOffersFullAudio;
  }

  // Set video constraints based on incoming stream if not supplied
  if (!mediaStream && mediaConstraints.video === undefined) {
    mediaConstraints.video = peerOffersFullVideo;
  }

  // Don't ask for audio if the incoming offer has no audio section
  if (!mediaStream && !peerHasAudioLine) {
    mediaConstraints.audio = false;
  }

  // Don't ask for video if the incoming offer has no video section
  if (!mediaStream && !peerHasVideoLine) {
    mediaConstraints.video = false;
  }

  // Create a new rtcninja.RTCPeerConnection instance.
  // TODO: This may throw an error, should react.
  createRTCConnection.call(this, pcConfig, rtcConstraints);

  // If a local MediaStream is given use it.
  if (mediaStream) {
    userMediaSucceeded(mediaStream);
  // If at least audio or video is requested prompt getUserMedia.
  } else if (mediaConstraints.audio || mediaConstraints.video) {
    self.localMediaStreamLocallyGenerated = true;
    rtcninja.getUserMedia(
      mediaConstraints,
      userMediaSucceeded,
      userMediaFailed
    );
  // Otherwise don't prompt getUserMedia.
  } else {
    userMediaSucceeded(null);
  }

  // User media succeeded
  function userMediaSucceeded(stream) {
    if (self.status === C.STATUS_TERMINATED) { return; }

    self.localMediaStream = stream;
    if (stream) {
      self.connection.addStream(stream);
    }

    // If it's an incoming INVITE without SDP notify the app with the
    // RTCPeerConnection so it can do stuff on it before generating the offer.
    if (! self.request.body) {
      self.emit('peerconnection', {
        peerconnection: self.connection
      });
    }

    if (! self.late_sdp) {
      var e = {originator:'remote', type:'offer', sdp:request.body};
      self.emit('sdp', e);

      self.connection.setRemoteDescription(
        new rtcninja.RTCSessionDescription({type:'offer', sdp:e.sdp}),
        // success
        remoteDescriptionSucceededOrNotNeeded,
        // failure
        function() {
          request.reply(488);
          failed.call(self, 'system', null, JsSIP_C.causes.WEBRTC_ERROR);
        }
      );
    }
    else {
      remoteDescriptionSucceededOrNotNeeded();
    }
  }

  // User media failed
  function userMediaFailed() {
    if (self.status === C.STATUS_TERMINATED) { return; }

    request.reply(480);
    failed.call(self, 'local', null, JsSIP_C.causes.USER_DENIED_MEDIA_ACCESS);
  }

  function remoteDescriptionSucceededOrNotNeeded() {
    connecting.call(self, request);
    if (! self.late_sdp) {
      createLocalDescription.call(self, 'answer', rtcSucceeded, rtcFailed, rtcAnswerConstraints);
    } else {
      createLocalDescription.call(self, 'offer', rtcSucceeded, rtcFailed, self.rtcOfferConstraints);
    }
  }

  function rtcSucceeded(desc) {
    if (self.status === C.STATUS_TERMINATED) { return; }

    // run for reply success callback
    function replySucceeded() {
      self.status = C.STATUS_WAITING_FOR_ACK;

      setInvite2xxTimer.call(self, request, desc);
      setACKTimer.call(self);
      accepted.call(self, 'local');
    }

    // run for reply failure callback
    function replyFailed() {
      failed.call(self, 'system', null, JsSIP_C.causes.CONNECTION_ERROR);
    }

    handleSessionTimersInIncomingRequest.call(self, request, extraHeaders);

    request.reply(200, null, extraHeaders,
      desc,
      replySucceeded,
      replyFailed
    );
  }

  function rtcFailed() {
    if (self.status === C.STATUS_TERMINATED) { return; }

    request.reply(500);
    failed.call(self, 'system', null, JsSIP_C.causes.WEBRTC_ERROR);
  }
};


/**
 * Terminate the call.
 */
RTCSession.prototype.terminate = function(options) {
  debug('terminate()');

  options = options || {};

  var cancel_reason, dialog,
    cause = options.cause || JsSIP_C.causes.BYE,
    status_code = options.status_code,
    reason_phrase = options.reason_phrase,
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    body = options.body,
    self = this;

  // Check Session Status
  if (this.status === C.STATUS_TERMINATED) {
    throw new Exceptions.InvalidStateError(this.status);
  }

  switch(this.status) {
    // - UAC -
    case C.STATUS_NULL:
    case C.STATUS_INVITE_SENT:
    case C.STATUS_1XX_RECEIVED:
      debug('canceling session');

      if (status_code && (status_code < 200 || status_code >= 700)) {
        throw new TypeError('Invalid status_code: '+ status_code);
      } else if (status_code) {
        reason_phrase = reason_phrase || JsSIP_C.REASON_PHRASE[status_code] || '';
        cancel_reason = 'SIP ;cause=' + status_code + ' ;text="' + reason_phrase + '"';
      }

      // Check Session Status
      if (this.status === C.STATUS_NULL) {
        this.isCanceled = true;
        this.cancelReason = cancel_reason;
      } else if (this.status === C.STATUS_INVITE_SENT) {
        this.isCanceled = true;
        this.cancelReason = cancel_reason;
      } else if(this.status === C.STATUS_1XX_RECEIVED) {
        this.request.cancel(cancel_reason);
      }

      this.status = C.STATUS_CANCELED;

      failed.call(this, 'local', null, JsSIP_C.causes.CANCELED);
      break;

      // - UAS -
    case C.STATUS_WAITING_FOR_ANSWER:
    case C.STATUS_ANSWERED:
      debug('rejecting session');

      status_code = status_code || 480;

      if (status_code < 300 || status_code >= 700) {
        throw new TypeError('Invalid status_code: '+ status_code);
      }

      this.request.reply(status_code, reason_phrase, extraHeaders, body);
      failed.call(this, 'local', null, JsSIP_C.causes.REJECTED);
      break;

    case C.STATUS_WAITING_FOR_ACK:
    case C.STATUS_CONFIRMED:
      debug('terminating session');

      reason_phrase = options.reason_phrase || JsSIP_C.REASON_PHRASE[status_code] || '';

      if (status_code && (status_code < 200 || status_code >= 700)) {
        throw new TypeError('Invalid status_code: '+ status_code);
      } else if (status_code) {
        extraHeaders.push('Reason: SIP ;cause=' + status_code + '; text="' + reason_phrase + '"');
      }

      /* RFC 3261 section 15 (Terminating a session):
        *
        * "...the callee's UA MUST NOT send a BYE on a confirmed dialog
        * until it has received an ACK for its 2xx response or until the server
        * transaction times out."
        */
      if (this.status === C.STATUS_WAITING_FOR_ACK &&
          this.direction === 'incoming' &&
          this.request.server_transaction.state !== Transactions.C.STATUS_TERMINATED) {

        // Save the dialog for later restoration
        dialog = this.dialog;

        // Send the BYE as soon as the ACK is received...
        this.receiveRequest = function(request) {
          if(request.method === JsSIP_C.ACK) {
            sendRequest.call(this, JsSIP_C.BYE, {
              extraHeaders: extraHeaders,
              body: body
            });
            dialog.terminate();
          }
        };

        // .., or when the INVITE transaction times out
        this.request.server_transaction.on('stateChanged', function(){
          if (this.state === Transactions.C.STATUS_TERMINATED) {
            sendRequest.call(self, JsSIP_C.BYE, {
              extraHeaders: extraHeaders,
              body: body
            });
            dialog.terminate();
          }
        });

        ended.call(this, 'local', null, cause);

        // Restore the dialog into 'this' in order to be able to send the in-dialog BYE :-)
        this.dialog = dialog;

        // Restore the dialog into 'ua' so the ACK can reach 'this' session
        this.ua.dialogs[dialog.id.toString()] = dialog;

      } else {
        sendRequest.call(this, JsSIP_C.BYE, {
          extraHeaders: extraHeaders,
          body: body
        });

        ended.call(this, 'local', null, cause);
      }
  }
};


RTCSession.prototype.close = function() {
  debug('close()');

  var idx;

  if (this.status === C.STATUS_TERMINATED) {
    return;
  }

  // Terminate RTC.
  if (this.connection) {
    try {
      this.connection.close();
    }
    catch(error) {
      debugerror('close() | error closing the RTCPeerConnection: %o', error);
    }
  }

  // Close local MediaStream if it was not given by the user.
  if (this.localMediaStream && this.localMediaStreamLocallyGenerated) {
    debug('close() | closing local MediaStream');
    rtcninja.closeMediaStream(this.localMediaStream);
  }

  // Terminate signaling.

  // Clear SIP timers
  for(idx in this.timers) {
    clearTimeout(this.timers[idx]);
  }

  // Clear Session Timers.
  clearTimeout(this.sessionTimers.timer);

  // Terminate confirmed dialog
  if (this.dialog) {
    this.dialog.terminate();
    delete this.dialog;
  }

  // Terminate early dialogs
  for(idx in this.earlyDialogs) {
    this.earlyDialogs[idx].terminate();
    delete this.earlyDialogs[idx];
  }

  this.status = C.STATUS_TERMINATED;

  delete this.ua.sessions[this.id];
};


RTCSession.prototype.sendDTMF = function(tones, options) {
  debug('sendDTMF() | tones: %s', tones);

  var duration, interToneGap,
    position = 0,
    self = this;

  options = options || {};
  duration = options.duration || null;
  interToneGap = options.interToneGap || null;

  if (tones === undefined) {
    throw new TypeError('Not enough arguments');
  }

  // Check Session Status
  if (this.status !== C.STATUS_CONFIRMED && this.status !== C.STATUS_WAITING_FOR_ACK) {
    throw new Exceptions.InvalidStateError(this.status);
  }

  // Convert to string
  if(typeof tones === 'number') {
    tones = tones.toString();
  }

  // Check tones
  if (!tones || typeof tones !== 'string' || !tones.match(/^[0-9A-D#*,]+$/i)) {
    throw new TypeError('Invalid tones: '+ tones);
  }

  // Check duration
  if (duration && !Utils.isDecimal(duration)) {
    throw new TypeError('Invalid tone duration: '+ duration);
  } else if (!duration) {
    duration = RTCSession_DTMF.C.DEFAULT_DURATION;
  } else if (duration < RTCSession_DTMF.C.MIN_DURATION) {
    debug('"duration" value is lower than the minimum allowed, setting it to '+ RTCSession_DTMF.C.MIN_DURATION+ ' milliseconds');
    duration = RTCSession_DTMF.C.MIN_DURATION;
  } else if (duration > RTCSession_DTMF.C.MAX_DURATION) {
    debug('"duration" value is greater than the maximum allowed, setting it to '+ RTCSession_DTMF.C.MAX_DURATION +' milliseconds');
    duration = RTCSession_DTMF.C.MAX_DURATION;
  } else {
    duration = Math.abs(duration);
  }
  options.duration = duration;

  // Check interToneGap
  if (interToneGap && !Utils.isDecimal(interToneGap)) {
    throw new TypeError('Invalid interToneGap: '+ interToneGap);
  } else if (!interToneGap) {
    interToneGap = RTCSession_DTMF.C.DEFAULT_INTER_TONE_GAP;
  } else if (interToneGap < RTCSession_DTMF.C.MIN_INTER_TONE_GAP) {
    debug('"interToneGap" value is lower than the minimum allowed, setting it to '+ RTCSession_DTMF.C.MIN_INTER_TONE_GAP +' milliseconds');
    interToneGap = RTCSession_DTMF.C.MIN_INTER_TONE_GAP;
  } else {
    interToneGap = Math.abs(interToneGap);
  }

  if (this.tones) {
    // Tones are already queued, just add to the queue
    this.tones += tones;
    return;
  }

  this.tones = tones;

  // Send the first tone
  _sendDTMF();

  function _sendDTMF() {
    var tone, timeout;

    if (self.status === C.STATUS_TERMINATED || !self.tones || position >= self.tones.length) {
      // Stop sending DTMF
      self.tones = null;
      return;
    }

    tone = self.tones[position];
    position += 1;

    if (tone === ',') {
      timeout = 2000;
    } else {
      var dtmf = new RTCSession_DTMF(self);
      options.eventHandlers = {
        failed: function() { self.tones = null; }
      };
      dtmf.send(tone, options);
      timeout = duration + interToneGap;
    }

    // Set timeout for the next tone
    setTimeout(_sendDTMF, timeout);
  }
};


/**
 * Mute
 */
RTCSession.prototype.mute = function(options) {
  debug('mute()');

  options = options || {audio:true, video:false};

  var
    audioMuted = false,
    videoMuted = false;

  if (this.audioMuted === false && options.audio) {
    audioMuted = true;
    this.audioMuted = true;
    toogleMuteAudio.call(this, true);
  }

  if (this.videoMuted === false && options.video) {
    videoMuted = true;
    this.videoMuted = true;
    toogleMuteVideo.call(this, true);
  }

  if (audioMuted === true || videoMuted === true) {
    onmute.call(this, {
      audio: audioMuted,
      video: videoMuted
    });
  }
};


/**
 * Unmute
 */
RTCSession.prototype.unmute = function(options) {
  debug('unmute()');

  options = options || {audio:true, video:true};

  var
    audioUnMuted = false,
    videoUnMuted = false;

  if (this.audioMuted === true && options.audio) {
    audioUnMuted = true;
    this.audioMuted = false;

    if (this.localHold === false) {
      toogleMuteAudio.call(this, false);
    }
  }

  if (this.videoMuted === true && options.video) {
    videoUnMuted = true;
    this.videoMuted = false;

    if (this.localHold === false) {
      toogleMuteVideo.call(this, false);
    }
  }

  if (audioUnMuted === true || videoUnMuted === true) {
    onunmute.call(this, {
      audio: audioUnMuted,
      video: videoUnMuted
    });
  }
};


/**
 * Hold
 */
RTCSession.prototype.hold = function(options, done) {
  debug('hold()');

  options = options || {};

  var self = this,
    eventHandlers;

  if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
    return false;
  }

  if (this.localHold === true) {
    return false;
  }

  if (! this.isReadyToReOffer()) {
    return false;
  }

  this.localHold = true;
  onhold.call(this, 'local');

  eventHandlers = {
    succeeded: function() {
      if (done) { done(); }
    },
    failed: function() {
      self.terminate({
        cause: JsSIP_C.causes.WEBRTC_ERROR,
        status_code: 500,
        reason_phrase: 'Hold Failed'
      });
    }
  };

  if (options.useUpdate) {
    sendUpdate.call(this, {
      sdpOffer: true,
      eventHandlers: eventHandlers,
      extraHeaders: options.extraHeaders
    });
  } else {
    sendReinvite.call(this, {
      eventHandlers: eventHandlers,
      extraHeaders: options.extraHeaders
    });
  }

  return true;
};


RTCSession.prototype.unhold = function(options, done) {
  debug('unhold()');

  options = options || {};

  var self = this,
    eventHandlers;

  if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
    return false;
  }

  if (this.localHold === false) {
    return false;
  }

  if (! this.isReadyToReOffer()) {
    return false;
  }

  this.localHold = false;
  onunhold.call(this, 'local');

  eventHandlers = {
    succeeded: function() {
      if (done) { done(); }
    },
    failed: function() {
      self.terminate({
        cause: JsSIP_C.causes.WEBRTC_ERROR,
        status_code: 500,
        reason_phrase: 'Unhold Failed'
      });
    }
  };

  if (options.useUpdate) {
    sendUpdate.call(this, {
      sdpOffer: true,
      eventHandlers: eventHandlers,
      extraHeaders: options.extraHeaders
    });
  } else {
    sendReinvite.call(this, {
      eventHandlers: eventHandlers,
      extraHeaders: options.extraHeaders
    });
  }

  return true;
};


RTCSession.prototype.renegotiate = function(options, done) {
  debug('renegotiate()');

  options = options || {};

  var self = this,
    eventHandlers,
    rtcOfferConstraints = options.rtcOfferConstraints || null;

  if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
    return false;
  }

  if (! this.isReadyToReOffer()) {
    return false;
  }

  eventHandlers = {
    succeeded: function() {
      if (done) { done(); }
    },
    failed: function() {
      self.terminate({
        cause: JsSIP_C.causes.WEBRTC_ERROR,
        status_code: 500,
        reason_phrase: 'Media Renegotiation Failed'
      });
    }
  };

  setLocalMediaStatus.call(this);

  if (options.useUpdate) {
    sendUpdate.call(this, {
      sdpOffer: true,
      eventHandlers: eventHandlers,
      rtcOfferConstraints: rtcOfferConstraints,
      extraHeaders: options.extraHeaders
    });
  } else {
    sendReinvite.call(this, {
      eventHandlers: eventHandlers,
      rtcOfferConstraints: rtcOfferConstraints,
      extraHeaders: options.extraHeaders
    });
  }

  return true;
};

/**
 * Refer
 */
RTCSession.prototype.refer = function(target, options) {
  debug('refer()');

  var self = this,
    originalTarget = target,
    referSubscriber,
    id;

  if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
    return false;
  }

  // Check target validity
  target = this.ua.normalizeTarget(target);
  if (!target) {
    throw new TypeError('Invalid target: '+ originalTarget);
  }

  referSubscriber = new RTCSession_ReferSubscriber(this);
  referSubscriber.sendRefer(target, options);

  // Store in the map
  id = referSubscriber.outgoingRequest.cseq;
  this.referSubscribers[id] = referSubscriber;

  // Listen for ending events so we can remove it from the map
  referSubscriber.on('requestFailed', function() {
    delete self.referSubscribers[id];
  });
  referSubscriber.on('accepted', function() {
    delete self.referSubscribers[id];
  });
  referSubscriber.on('failed', function() {
    delete self.referSubscribers[id];
  });

  return referSubscriber;
};

/**
 * In dialog Request Reception
 */
RTCSession.prototype.receiveRequest = function(request) {
  debug('receiveRequest()');

  var contentType,
      self = this;

  if(request.method === JsSIP_C.CANCEL) {
    /* RFC3261 15 States that a UAS may have accepted an invitation while a CANCEL
    * was in progress and that the UAC MAY continue with the session established by
    * any 2xx response, or MAY terminate with BYE. JsSIP does continue with the
    * established session. So the CANCEL is processed only if the session is not yet
    * established.
    */

    /*
    * Terminate the whole session in case the user didn't accept (or yet send the answer)
    * nor reject the request opening the session.
    */
    if(this.status === C.STATUS_WAITING_FOR_ANSWER  || this.status === C.STATUS_ANSWERED) {
      this.status = C.STATUS_CANCELED;
      this.request.reply(487);
      failed.call(this, 'remote', request, JsSIP_C.causes.CANCELED);
    }
  } else {
    // Requests arriving here are in-dialog requests.
    switch(request.method) {
      case JsSIP_C.ACK:
        if (this.status !== C.STATUS_WAITING_FOR_ACK) {
          return;
        }

        // Update signaling status.
        this.status = C.STATUS_CONFIRMED;

        clearTimeout(this.timers.ackTimer);
        clearTimeout(this.timers.invite2xxTimer);

        if (this.late_sdp) {
          if (!request.body) {
            this.terminate({
              cause: JsSIP_C.causes.MISSING_SDP,
              status_code: 400
            });
            break;
          }

          var e = {originator:'remote', type:'answer', sdp:request.body};
          this.emit('sdp', e);

          this.connection.setRemoteDescription(
            new rtcninja.RTCSessionDescription({type:'answer', sdp:e.sdp}),
            // success
            function() {
              if (!self.is_confirmed) {
                confirmed.call(self, 'remote', request);
              }
            },
            // failure
            function() {
              self.terminate({
                cause: JsSIP_C.causes.BAD_MEDIA_DESCRIPTION,
                status_code: 488
              });
            }
          );
        }
        else {
          if (!this.is_confirmed) {
            confirmed.call(this, 'remote', request);
          }
        }

        break;
      case JsSIP_C.BYE:
        if(this.status === C.STATUS_CONFIRMED) {
          request.reply(200);
          ended.call(this, 'remote', request, JsSIP_C.causes.BYE);
        }
        else if (this.status === C.STATUS_INVITE_RECEIVED) {
          request.reply(200);
          this.request.reply(487, 'BYE Received');
          ended.call(this, 'remote', request, JsSIP_C.causes.BYE);
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      case JsSIP_C.INVITE:
        if(this.status === C.STATUS_CONFIRMED) {
          if (request.hasHeader('replaces')) {
            receiveReplaces.call(this, request);
          } else {
            receiveReinvite.call(this, request);
          }
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      case JsSIP_C.INFO:
        if(this.status === C.STATUS_CONFIRMED || this.status === C.STATUS_WAITING_FOR_ACK || this.status === C.STATUS_INVITE_RECEIVED) {
          contentType = request.getHeader('content-type');
          if (contentType && (contentType.match(/^application\/dtmf-relay/i))) {
            new RTCSession_DTMF(this).init_incoming(request);
          }
          else {
            request.reply(415);
          }
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      case JsSIP_C.UPDATE:
        if(this.status === C.STATUS_CONFIRMED) {
          receiveUpdate.call(this, request);
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      case JsSIP_C.REFER:
        if(this.status === C.STATUS_CONFIRMED) {
          receiveRefer.call(this, request);
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      case JsSIP_C.NOTIFY:
        if(this.status === C.STATUS_CONFIRMED) {
          receiveNotify.call(this, request);
        }
        else {
          request.reply(403, 'Wrong Status');
        }
        break;
      default:
        request.reply(501);
    }
  }
};


/**
 * Session Callbacks
 */

RTCSession.prototype.onTransportError = function() {
  debugerror('onTransportError()');

  if(this.status !== C.STATUS_TERMINATED) {
    this.terminate({
      status_code: 500,
      reason_phrase: JsSIP_C.causes.CONNECTION_ERROR,
      cause: JsSIP_C.causes.CONNECTION_ERROR
    });
  }
};


RTCSession.prototype.onRequestTimeout = function() {
  debug('onRequestTimeout');

  if(this.status !== C.STATUS_TERMINATED) {
    this.terminate({
      status_code: 408,
      reason_phrase: JsSIP_C.causes.REQUEST_TIMEOUT,
      cause: JsSIP_C.causes.REQUEST_TIMEOUT
    });
  }
};


RTCSession.prototype.onDialogError = function() {
  debugerror('onDialogError()');

  if(this.status !== C.STATUS_TERMINATED) {
    this.terminate({
      status_code: 500,
      reason_phrase: JsSIP_C.causes.DIALOG_ERROR,
      cause: JsSIP_C.causes.DIALOG_ERROR
    });
  }
};


// Called from DTMF handler.
RTCSession.prototype.newDTMF = function(data) {
  debug('newDTMF()');

  this.emit('newDTMF', data);
};


RTCSession.prototype.resetLocalMedia = function() {
  debug('resetLocalMedia()');

  // Reset all but remoteHold.
  this.localHold = false;
  this.audioMuted = false;
  this.videoMuted = false;

  setLocalMediaStatus.call(this);
};


/**
 * Private API.
 */


/**
 * RFC3261 13.3.1.4
 * Response retransmissions cannot be accomplished by transaction layer
 *  since it is destroyed when receiving the first 2xx answer
 */
function setInvite2xxTimer(request, body) {
  var
    self = this,
    timeout = Timers.T1;

  this.timers.invite2xxTimer = setTimeout(function invite2xxRetransmission() {
    if (self.status !== C.STATUS_WAITING_FOR_ACK) {
      return;
    }

    request.reply(200, null, ['Contact: '+ self.contact], body);

    if (timeout < Timers.T2) {
      timeout = timeout * 2;
      if (timeout > Timers.T2) {
        timeout = Timers.T2;
      }
    }
    self.timers.invite2xxTimer = setTimeout(
      invite2xxRetransmission, timeout
    );
  }, timeout);
}


/**
 * RFC3261 14.2
 * If a UAS generates a 2xx response and never receives an ACK,
 *  it SHOULD generate a BYE to terminate the dialog.
 */
function setACKTimer() {
  var self = this;

  this.timers.ackTimer = setTimeout(function() {
    if(self.status === C.STATUS_WAITING_FOR_ACK) {
      debug('no ACK received, terminating the session');
      clearTimeout(self.timers.invite2xxTimer);
      sendRequest.call(self, JsSIP_C.BYE);
      ended.call(self, 'remote', null, JsSIP_C.causes.NO_ACK);
    }
  }, Timers.TIMER_H);
}


function createRTCConnection(pcConfig, rtcConstraints) {
  var self = this;

  this.connection = new rtcninja.RTCPeerConnection(pcConfig, rtcConstraints);

  this.connection.onaddstream = function(event, stream) {
    self.emit('addstream', {stream: stream});
  };

  this.connection.onremovestream = function(event, stream) {
    self.emit('removestream', {stream: stream});
  };

  this.connection.oniceconnectionstatechange = function(event, state) {
    self.emit('iceconnectionstatechange', {state: state});

    // TODO: Do more with different states.
    if (state === 'failed') {
      self.terminate({
        cause: JsSIP_C.causes.RTP_TIMEOUT,
        status_code: 200,
        reason_phrase: JsSIP_C.causes.RTP_TIMEOUT
      });
    }
  };
}

function createLocalDescription(type, onSuccess, onFailure, constraints) {
  debug('createLocalDescription()');

  var self = this;
  var connection = this.connection;

  this.rtcReady = false;

  if (type === 'offer') {
    connection.createOffer(
      // success
      createSucceeded,
      // failure
      function(error) {
        self.rtcReady = true;
        if (onFailure) { onFailure(error); }
      },
      // constraints
      constraints
    );
  }
  else if (type === 'answer') {
    connection.createAnswer(
      // success
      createSucceeded,
      // failure
      function(error) {
        self.rtcReady = true;
        if (onFailure) { onFailure(error); }
      },
      // constraints
      constraints
    );
  }
  else {
    throw new Error('createLocalDescription() | type must be "offer" or "answer", but "' +type+ '" was given');
  }

  // createAnswer or createOffer succeeded
  function createSucceeded(desc) {
    connection.onicecandidate = function(event, candidate) {
      if (! candidate) {
        connection.onicecandidate = null;
        self.rtcReady = true;

        if (onSuccess) {
          var e = {originator:'local', type:type, sdp:connection.localDescription.sdp};
          self.emit('sdp', e);
          onSuccess(e.sdp);
        }
        onSuccess = null;
      }
    };

    connection.setLocalDescription(desc,
      // success
      function() {
        if (connection.iceGatheringState === 'complete') {
          self.rtcReady = true;

          if (onSuccess) {
            var e = {originator:'local', type:type, sdp:connection.localDescription.sdp};
            self.emit('sdp', e);
            onSuccess(e.sdp);
          }
          onSuccess = null;
        }
      },
      // failure
      function(error) {
        self.rtcReady = true;
        if (onFailure) { onFailure(error); }
      }
    );
  }
}


/**
 * Dialog Management
 */
function createDialog(message, type, early) {
  var dialog, early_dialog,
    local_tag = (type === 'UAS') ? message.to_tag : message.from_tag,
    remote_tag = (type === 'UAS') ? message.from_tag : message.to_tag,
    id = message.call_id + local_tag + remote_tag;

    early_dialog = this.earlyDialogs[id];

  // Early Dialog
  if (early) {
    if (early_dialog) {
      return true;
    } else {
      early_dialog = new Dialog(this, message, type, Dialog.C.STATUS_EARLY);

      // Dialog has been successfully created.
      if(early_dialog.error) {
        debug(early_dialog.error);
        failed.call(this, 'remote', message, JsSIP_C.causes.INTERNAL_ERROR);
        return false;
      } else {
        this.earlyDialogs[id] = early_dialog;
        return true;
      }
    }
  }

  // Confirmed Dialog
  else {
    this.from_tag = message.from_tag;
    this.to_tag = message.to_tag;

    // In case the dialog is in _early_ state, update it
    if (early_dialog) {
      early_dialog.update(message, type);
      this.dialog = early_dialog;
      delete this.earlyDialogs[id];
      return true;
    }

    // Otherwise, create a _confirmed_ dialog
    dialog = new Dialog(this, message, type);

    if(dialog.error) {
      debug(dialog.error);
      failed.call(this, 'remote', message, JsSIP_C.causes.INTERNAL_ERROR);
      return false;
    } else {
      this.dialog = dialog;
      return true;
    }
  }
}

/**
 * In dialog INVITE Reception
 */

function receiveReinvite(request) {
  debug('receiveReinvite()');

  var
    sdp, idx, direction, m,
    self = this,
    contentType = request.getHeader('Content-Type'),
    hold = false,
    rejected = false,
    data = {
      request: request,
      callback: undefined,
      reject: reject.bind(this)
    };

  function reject(options) {
    options = options || {};
    rejected = true;

    var
      status_code = options.status_code || 403,
      reason_phrase = options.reason_phrase || '',
      extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [];

    if (this.status !== C.STATUS_CONFIRMED) {
      return false;
    }

    if (status_code < 300 || status_code >= 700) {
      throw new TypeError('Invalid status_code: '+ status_code);
    }

    request.reply(status_code, reason_phrase, extraHeaders);
  }

  // Emit 'reinvite'.
  this.emit('reinvite', data);

  if (rejected) {
    return;
  }

  if (request.body) {
    this.late_sdp = false;
    if (contentType !== 'application/sdp') {
      debug('invalid Content-Type');
      request.reply(415);
      return;
    }

    sdp = request.parseSDP();

    for (idx=0; idx < sdp.media.length; idx++) {
      m = sdp.media[idx];

      if (holdMediaTypes.indexOf(m.type) === -1) {
        continue;
      }

      direction = m.direction || sdp.direction || 'sendrecv';

      if (direction === 'sendonly' || direction === 'inactive') {
        hold = true;
      }
      // If at least one of the streams is active don't emit 'hold'.
      else {
        hold = false;
        break;
      }
    }

    var e = {originator:'remote', type:'offer', sdp:request.body};
    this.emit('sdp', e);

    this.connection.setRemoteDescription(
      new rtcninja.RTCSessionDescription({type:'offer', sdp:e.sdp}),
      // success
      answer,
      // failure
      function() {
        request.reply(488);
      }
    );
  }
  else {
    this.late_sdp = true;
    answer();
  }

  function answer() {
    createSdp(
      // onSuccess
      function(sdp) {
        var extraHeaders = ['Contact: ' + self.contact];
        handleSessionTimersInIncomingRequest.call(self, request, extraHeaders);

        if (self.late_sdp) {
          sdp = mangleOffer.call(self, sdp);
        }

        request.reply(200, null, extraHeaders, sdp,
          function() {
            self.status = C.STATUS_WAITING_FOR_ACK;
            setInvite2xxTimer.call(self, request, sdp);
            setACKTimer.call(self);
          }
        );

        // If callback is given execute it.
        if (typeof data.callback === 'function') {
          data.callback();
        }
      },
      // onFailure
      function() {
        request.reply(500);
      }
    );
  }

  function createSdp(onSuccess, onFailure) {
    if (! self.late_sdp) {
      if (self.remoteHold === true && hold === false) {
        self.remoteHold = false;
        onunhold.call(self, 'remote');
      } else if (self.remoteHold === false && hold === true) {
        self.remoteHold = true;
        onhold.call(self, 'remote');
      }

      createLocalDescription.call(self, 'answer', onSuccess, onFailure, self.rtcAnswerConstraints);
    } else {
      createLocalDescription.call(self, 'offer', onSuccess, onFailure, self.rtcOfferConstraints);
    }
  }
}

/**
 * In dialog UPDATE Reception
 */
function receiveUpdate(request) {
  debug('receiveUpdate()');

  var
    sdp, idx, direction, m,
    self = this,
    contentType = request.getHeader('Content-Type'),
    rejected = false,
    hold = false,
    data = {
      request: request,
      callback: undefined,
      reject: reject.bind(this)
    };

  function reject(options) {
    options = options || {};
    rejected = true;

    var
      status_code = options.status_code || 403,
      reason_phrase = options.reason_phrase || '',
      extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [];

    if (this.status !== C.STATUS_CONFIRMED) {
      return false;
    }

    if (status_code < 300 || status_code >= 700) {
      throw new TypeError('Invalid status_code: '+ status_code);
    }

    request.reply(status_code, reason_phrase, extraHeaders);
  }

  // Emit 'update'.
  this.emit('update', data);

  if (rejected) {
    return;
  }

  if (! request.body) {
    var extraHeaders = [];
    handleSessionTimersInIncomingRequest.call(this, request, extraHeaders);
    request.reply(200, null, extraHeaders);
    return;
  }

  if (contentType !== 'application/sdp') {
    debug('invalid Content-Type');
    request.reply(415);
    return;
  }

  sdp = request.parseSDP();

  for (idx=0; idx < sdp.media.length; idx++) {
    m = sdp.media[idx];

    if (holdMediaTypes.indexOf(m.type) === -1) {
      continue;
    }

    direction = m.direction || sdp.direction || 'sendrecv';

    if (direction === 'sendonly' || direction === 'inactive') {
      hold = true;
    }
    // If at least one of the streams is active don't emit 'hold'.
    else {
      hold = false;
      break;
    }
  }

  var e = {originator:'remote', type:'offer', sdp:request.body};
  this.emit('sdp', e);

  this.connection.setRemoteDescription(
    new rtcninja.RTCSessionDescription({type:'offer', sdp:e.sdp}),
    // success
    function() {
      if (self.remoteHold === true && hold === false) {
        self.remoteHold = false;
        onunhold.call(self, 'remote');
      } else if (self.remoteHold === false && hold === true) {
        self.remoteHold = true;
        onhold.call(self, 'remote');
      }

      createLocalDescription.call(self, 'answer',
        // success
        function(sdp) {
          var extraHeaders = ['Contact: ' + self.contact];
          handleSessionTimersInIncomingRequest.call(self, request, extraHeaders);
          request.reply(200, null, extraHeaders, sdp);

          // If callback is given execute it.
          if (typeof data.callback === 'function') {
            data.callback();
          }
        },
        // failure
        function() {
          request.reply(500);
        }
      );
    },
    // failure
    function() {
      request.reply(488);
    },
    // Constraints.
    this.rtcAnswerConstraints
  );
}

/**
 * In dialog Refer Reception
 */
function receiveRefer(request) {
  debug('receiveRefer()');

  var notifier,
      self = this;

  function accept(initCallback, options) {
    var session, replaces;

    options = options || {};
    initCallback = (typeof initCallback === 'function')? initCallback : null;

    if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
      return false;
    }

    session = new RTCSession(this.ua);

    session.on('progress', function(e) {
      notifier.notify(e.response.status_code, e.response.reason_phrase);
    });

    session.on('accepted', function(e) {
      notifier.notify(e.response.status_code, e.response.reason_phrase);
    });

    session.on('failed', function(e) {
      if (e.message) {
        notifier.notify(e.message.status_code, e.message.reason_phrase);
      } else {
        notifier.notify(487, e.cause);
      }
    });

    // Consider the Replaces header present in the Refer-To URI
    if (request.refer_to.uri.hasHeader('replaces')) {
      replaces = decodeURIComponent(request.refer_to.uri.getHeader('replaces'));
      options.extraHeaders = options.extraHeaders || [];
      options.extraHeaders.push('Replaces: '+ replaces);
    }

    session.connect(request.refer_to.uri.toAor(), options, initCallback);
  }

  function reject() {
    notifier.notify(603);
  }

  if (typeof request.refer_to === undefined) {
    debug('no Refer-To header field present in REFER');
    request.reply(400);
    return;
  }

  if (request.refer_to.uri.scheme !== JsSIP_C.SIP) {
    debug('Refer-To header field points to a non-SIP URI scheme');
    request.reply(416);
    return;
  }

  // reply before the transaction timer expires
  request.reply(202);

  notifier = new RTCSession_ReferNotifier(this, request.cseq);

  // Emit 'refer'.
  this.emit('refer', {
    request: request,
    accept: function(initCallback, options) { accept.call(self, initCallback, options); },
    reject: function() { reject.call(self); }
  });
}

/**
 * In dialog Notify Reception
 */
function receiveNotify(request) {
  debug('receiveNotify()');

  if (typeof request.event === undefined) {
    request.reply(400);
  }

  switch (request.event.event) {
    case 'refer': {
      var id = request.event.params.id;
      var referSubscriber = this.referSubscribers[id];

      if (!referSubscriber) {
        request.reply(481, 'Subscription does not exist');
        return;
      }

      referSubscriber.receiveNotify(request);
      request.reply(200);

      break;
    }

    default: {
      request.reply(489);
    }
  }
}

/**
 * INVITE with Replaces Reception
 */
function receiveReplaces(request) {
  debug('receiveReplaces()');

  var self = this;

  function accept(initCallback) {
    var session;

    if (this.status !== C.STATUS_WAITING_FOR_ACK && this.status !== C.STATUS_CONFIRMED) {
      return false;
    }

    session = new RTCSession(this.ua);

    // terminate the current session when the new one is confirmed
    session.on('confirmed', function() {
      self.terminate();
    });

    session.init_incoming(request, initCallback);
  }

  function reject() {
    debug('Replaced INVITE rejected by the user');
    request.reply(486);
  }

  // Emit 'replace'.
  this.emit('replaces', {
    request: request,
    accept: function(initCallback) { accept.call(self, initCallback); },
    reject: function() { reject.call(self); }
  });
}

/**
 * Initial Request Sender
 */
function sendInitialRequest(mediaConstraints, rtcOfferConstraints, mediaStream) {
  var self = this;
  var request_sender = new RequestSender(self, this.ua);

  this.receiveResponse = function(response) {
    receiveInviteResponse.call(self, response);
  };

  // If a local MediaStream is given use it.
  if (mediaStream) {
    // Wait a bit so the app can set events such as 'peerconnection' and 'connecting'.
    setTimeout(function() {
      userMediaSucceeded(mediaStream);
    });
  // If at least audio or video is requested prompt getUserMedia.
  } else if (mediaConstraints.audio || mediaConstraints.video) {
    this.localMediaStreamLocallyGenerated = true;
    rtcninja.getUserMedia(
      mediaConstraints,
      userMediaSucceeded,
      userMediaFailed
    );
  // Otherwise don't prompt getUserMedia.
  } else {
    userMediaSucceeded(null);
  }

  // User media succeeded
  function userMediaSucceeded(stream) {
    if (self.status === C.STATUS_TERMINATED) { return; }

    self.localMediaStream = stream;
    if (stream) {
      self.connection.addStream(stream);
    }

    // Notify the app with the RTCPeerConnection so it can do stuff on it
    // before generating the offer.
    self.emit('peerconnection', {
      peerconnection: self.connection
    });

    connecting.call(self, self.request);
    createLocalDescription.call(self, 'offer', rtcSucceeded, rtcFailed, rtcOfferConstraints);
  }

  // User media failed
  function userMediaFailed() {
    if (self.status === C.STATUS_TERMINATED) { return; }

    failed.call(self, 'local', null, JsSIP_C.causes.USER_DENIED_MEDIA_ACCESS);
  }

  function rtcSucceeded(desc) {
    if (self.isCanceled || self.status === C.STATUS_TERMINATED) { return; }

    self.request.body = desc;
    self.status = C.STATUS_INVITE_SENT;

    // Emit 'sending' so the app can mangle the body before the request
    // is sent.
    self.emit('sending', {
      request: self.request
    });

    request_sender.send();
  }

  function rtcFailed() {
    if (self.status === C.STATUS_TERMINATED) { return; }

    failed.call(self, 'system', null, JsSIP_C.causes.WEBRTC_ERROR);
  }
}

/**
 * Reception of Response for Initial INVITE
 */
function receiveInviteResponse(response) {
  debug('receiveInviteResponse()');

  var cause, dialog, e,
    self = this;

  // Handle 2XX retransmissions and responses from forked requests
  if (this.dialog && (response.status_code >=200 && response.status_code <=299)) {

    /*
     * If it is a retransmission from the endpoint that established
     * the dialog, send an ACK
     */
    if (this.dialog.id.call_id === response.call_id &&
        this.dialog.id.local_tag === response.from_tag &&
        this.dialog.id.remote_tag === response.to_tag) {
      sendRequest.call(this, JsSIP_C.ACK);
      return;
    }

    // If not, send an ACK  and terminate
    else  {
      dialog = new Dialog(this, response, 'UAC');

      if (dialog.error !== undefined) {
        debug(dialog.error);
        return;
      }

      dialog.sendRequest({
          owner: {status: C.STATUS_TERMINATED},
          onRequestTimeout: function(){},
          onTransportError: function(){},
          onDialogError: function(){},
          receiveResponse: function(){}
        }, JsSIP_C.ACK);

      dialog.sendRequest({
          owner: {status: C.STATUS_TERMINATED},
          onRequestTimeout: function(){},
          onTransportError: function(){},
          onDialogError: function(){},
          receiveResponse: function(){}
        }, JsSIP_C.BYE);
      return;
    }

  }

  // Proceed to cancellation if the user requested.
  if(this.isCanceled) {
    // Remove the flag. We are done.
    this.isCanceled = false;

    if(response.status_code >= 100 && response.status_code < 200) {
      this.request.cancel(this.cancelReason);
    } else if(response.status_code >= 200 && response.status_code < 299) {
      acceptAndTerminate.call(this, response);
    }
    return;
  }

  if(this.status !== C.STATUS_INVITE_SENT && this.status !== C.STATUS_1XX_RECEIVED) {
    return;
  }

  switch(true) {
    case /^100$/.test(response.status_code):
      this.status = C.STATUS_1XX_RECEIVED;
      break;

    case /^1[0-9]{2}$/.test(response.status_code):
      // Do nothing with 1xx responses without To tag.
      if (!response.to_tag) {
        debug('1xx response received without to tag');
        break;
      }

      // Create Early Dialog if 1XX comes with contact
      if (response.hasHeader('contact')) {
        // An error on dialog creation will fire 'failed' event
        if(! createDialog.call(this, response, 'UAC', true)) {
          break;
        }
      }

      this.status = C.STATUS_1XX_RECEIVED;
      progress.call(this, 'remote', response);

      if (!response.body) {
        break;
      }

      e = {originator:'remote', type:'pranswer', sdp:response.body};
      this.emit('sdp', e);

      this.connection.setRemoteDescription(
        new rtcninja.RTCSessionDescription({type:'pranswer', sdp:e.sdp}),
        // success
        null,
        // failure
        null
      );
      break;

    case /^2[0-9]{2}$/.test(response.status_code):
      this.status = C.STATUS_CONFIRMED;

      if(!response.body) {
        acceptAndTerminate.call(this, response, 400, JsSIP_C.causes.MISSING_SDP);
        failed.call(this, 'remote', response, JsSIP_C.causes.BAD_MEDIA_DESCRIPTION);
        break;
      }

      // An error on dialog creation will fire 'failed' event
      if (! createDialog.call(this, response, 'UAC')) {
        break;
      }

      e = {originator:'remote', type:'answer', sdp:response.body};
      this.emit('sdp', e);

      this.connection.setRemoteDescription(
        new rtcninja.RTCSessionDescription({type:'answer', sdp:e.sdp}),
        // success
        function() {
          // Handle Session Timers.
          handleSessionTimersInIncomingResponse.call(self, response);

          accepted.call(self, 'remote', response);
          sendRequest.call(self, JsSIP_C.ACK);
          confirmed.call(self, 'local', null);
        },
        // failure
        function() {
          acceptAndTerminate.call(self, response, 488, 'Not Acceptable Here');
          failed.call(self, 'remote', response, JsSIP_C.causes.BAD_MEDIA_DESCRIPTION);
        }
      );
      break;

    default:
      cause = Utils.sipErrorCause(response.status_code);
      failed.call(this, 'remote', response, cause);
  }
}

/**
 * Send Re-INVITE
 */
function sendReinvite(options) {
  debug('sendReinvite()');

  options = options || {};

  var
    self = this,
    extraHeaders = options.extraHeaders || [],
    eventHandlers = options.eventHandlers || {},
    rtcOfferConstraints = options.rtcOfferConstraints || this.rtcOfferConstraints || null,
    succeeded = false;

  extraHeaders.push('Contact: ' + this.contact);
  extraHeaders.push('Content-Type: application/sdp');

  // Session Timers.
  if (this.sessionTimers.running) {
    extraHeaders.push('Session-Expires: ' + this.sessionTimers.currentExpires + ';refresher=' + (this.sessionTimers.refresher ? 'uac' : 'uas'));
  }

  createLocalDescription.call(this, 'offer',
    // success
    function(sdp) {
      sdp = mangleOffer.call(self, sdp);

      var request = new RTCSession_Request(self, JsSIP_C.INVITE);

      request.send({
        extraHeaders: extraHeaders,
        body: sdp,
        eventHandlers: {
          onSuccessResponse: function(response) {
            onSucceeded(response);
            succeeded = true;
          },
          onErrorResponse: function(response) {
            onFailed(response);
          },
          onTransportError: function() {
            self.onTransportError();  // Do nothing because session ends.
          },
          onRequestTimeout: function() {
            self.onRequestTimeout();  // Do nothing because session ends.
          },
          onDialogError: function() {
            self.onDialogError();  // Do nothing because session ends.
          }
        }
      });
    },
    // failure
    function() {
      onFailed();
    },
    // RTC constraints.
    rtcOfferConstraints
  );

  function onSucceeded(response) {
    if (self.status === C.STATUS_TERMINATED) {
      return;
    }

    sendRequest.call(self, JsSIP_C.ACK);

    // If it is a 2XX retransmission exit now.
    if (succeeded) { return; }

    // Handle Session Timers.
    handleSessionTimersInIncomingResponse.call(self, response);

    // Must have SDP answer.
    if(! response.body) {
      onFailed();
      return;
    } else if (response.getHeader('Content-Type') !== 'application/sdp') {
      onFailed();
      return;
    }

    var e = {originator:'remote', type:'answer', sdp:response.body};
    self.emit('sdp', e);

    self.connection.setRemoteDescription(
      new rtcninja.RTCSessionDescription({type:'answer', sdp:e.sdp}),
      // success
      function() {
        if (eventHandlers.succeeded) { eventHandlers.succeeded(response); }
      },
      // failure
      function() {
        onFailed();
      }
    );
  }

  function onFailed(response) {
    if (eventHandlers.failed) { eventHandlers.failed(response); }
  }
}

/**
 * Send UPDATE
 */
function sendUpdate(options) {
  debug('sendUpdate()');

  options = options || {};

  var
    self = this,
    extraHeaders = options.extraHeaders || [],
    eventHandlers = options.eventHandlers || {},
    rtcOfferConstraints = options.rtcOfferConstraints || this.rtcOfferConstraints || null,
    sdpOffer = options.sdpOffer || false,
    succeeded = false;

  extraHeaders.push('Contact: ' + this.contact);

  // Session Timers.
  if (this.sessionTimers.running) {
    extraHeaders.push('Session-Expires: ' + this.sessionTimers.currentExpires + ';refresher=' + (this.sessionTimers.refresher ? 'uac' : 'uas'));
  }

  if (sdpOffer) {
    extraHeaders.push('Content-Type: application/sdp');

    createLocalDescription.call(this, 'offer',
      // success
      function(sdp) {
        sdp = mangleOffer.call(self, sdp);

        var request = new RTCSession_Request(self, JsSIP_C.UPDATE);

        request.send({
          extraHeaders: extraHeaders,
          body: sdp,
          eventHandlers: {
            onSuccessResponse: function(response) {
              onSucceeded(response);
              succeeded = true;
            },
            onErrorResponse: function(response) {
              onFailed(response);
            },
            onTransportError: function() {
              self.onTransportError();  // Do nothing because session ends.
            },
            onRequestTimeout: function() {
              self.onRequestTimeout();  // Do nothing because session ends.
            },
            onDialogError: function() {
              self.onDialogError();  // Do nothing because session ends.
            }
          }
        });
      },
      // failure
      function() {
        onFailed();
      },
      // RTC constraints.
      rtcOfferConstraints
    );
  }

  // No SDP.
  else {
    var request = new RTCSession_Request(self, JsSIP_C.UPDATE);

    request.send({
      extraHeaders: extraHeaders,
      eventHandlers: {
        onSuccessResponse: function(response) {
          onSucceeded(response);
        },
        onErrorResponse: function(response) {
          onFailed(response);
        },
        onTransportError: function() {
          self.onTransportError();  // Do nothing because session ends.
        },
        onRequestTimeout: function() {
          self.onRequestTimeout();  // Do nothing because session ends.
        },
        onDialogError: function() {
          self.onDialogError();  // Do nothing because session ends.
        }
      }
    });
  }

  function onSucceeded(response) {
    if (self.status === C.STATUS_TERMINATED) {
      return;
    }

    // If it is a 2XX retransmission exit now.
    if (succeeded) { return; }

    // Handle Session Timers.
    handleSessionTimersInIncomingResponse.call(self, response);

    // Must have SDP answer.
    if (sdpOffer) {
      if(! response.body) {
        onFailed();
        return;
      } else if (response.getHeader('Content-Type') !== 'application/sdp') {
        onFailed();
        return;
      }

      var e = {originator:'remote', type:'answer', sdp:response.body};
      self.emit('sdp', e);

      self.connection.setRemoteDescription(
        new rtcninja.RTCSessionDescription({type:'answer', sdp:e.sdp}),
        // success
        function() {
          if (eventHandlers.succeeded) { eventHandlers.succeeded(response); }
        },
        // failure
        function() {
          onFailed();
        }
      );
    }
    // No SDP answer.
    else {
      if (eventHandlers.succeeded) { eventHandlers.succeeded(response); }
    }
  }

  function onFailed(response) {
    if (eventHandlers.failed) { eventHandlers.failed(response); }
  }
}

function acceptAndTerminate(response, status_code, reason_phrase) {
  debug('acceptAndTerminate()');

  var extraHeaders = [];

  if (status_code) {
    reason_phrase = reason_phrase || JsSIP_C.REASON_PHRASE[status_code] || '';
    extraHeaders.push('Reason: SIP ;cause=' + status_code + '; text="' + reason_phrase + '"');
  }

  // An error on dialog creation will fire 'failed' event
  if (this.dialog || createDialog.call(this, response, 'UAC')) {
    sendRequest.call(this, JsSIP_C.ACK);
    sendRequest.call(this, JsSIP_C.BYE, {
      extraHeaders: extraHeaders
    });
  }

  // Update session status.
  this.status = C.STATUS_TERMINATED;
}

/**
 * Send a generic in-dialog Request
 */
function sendRequest(method, options) {
  debug('sendRequest()');

  var request = new RTCSession_Request(this, method);
  request.send(options);
}

/**
 * Correctly set the SDP direction attributes if the call is on local hold
 */
function mangleOffer(sdp) {
  var idx, length, m;

  if (! this.localHold && ! this.remoteHold) {
    return sdp;
  }

  sdp = sdp_transform.parse(sdp);

  // Local hold.
  if (this.localHold && ! this.remoteHold) {
    debug('mangleOffer() | me on hold, mangling offer');
    length = sdp.media.length;
    for (idx=0; idx<length; idx++) {
      m = sdp.media[idx];
      if (holdMediaTypes.indexOf(m.type) === -1) {
        continue;
      }
      if (!m.direction) {
        m.direction = 'sendonly';
      } else if (m.direction === 'sendrecv') {
        m.direction = 'sendonly';
      } else if (m.direction === 'recvonly') {
        m.direction = 'inactive';
      }
    }
  }
  // Local and remote hold.
  else if (this.localHold && this.remoteHold) {
    debug('mangleOffer() | both on hold, mangling offer');
    length = sdp.media.length;
    for (idx=0; idx<length; idx++) {
      m = sdp.media[idx];
      if (holdMediaTypes.indexOf(m.type) === -1) {
        continue;
      }
      m.direction = 'inactive';
    }
  }
  // Remote hold.
  else if (this.remoteHold) {
    debug('mangleOffer() | remote on hold, mangling offer');
    length = sdp.media.length;
    for (idx=0; idx<length; idx++) {
      m = sdp.media[idx];
      if (holdMediaTypes.indexOf(m.type) === -1) {
        continue;
      }
      if (!m.direction) {
        m.direction = 'recvonly';
      } else if (m.direction === 'sendrecv') {
        m.direction = 'recvonly';
      } else if (m.direction === 'recvonly') {
        m.direction = 'inactive';
      }
    }
  }

  return sdp_transform.write(sdp);
}

function setLocalMediaStatus() {
  var enableAudio = true,
    enableVideo = true;

  if (this.localHold || this.remoteHold) {
    enableAudio = false;
    enableVideo = false;
  }

  if (this.audioMuted) {
    enableAudio = false;
  }

  if (this.videoMuted) {
    enableVideo = false;
  }

  toogleMuteAudio.call(this, !enableAudio);
  toogleMuteVideo.call(this, !enableVideo);
}

/**
 * Handle SessionTimers for an incoming INVITE or UPDATE.
 * @param  {IncomingRequest} request
 * @param  {Array} responseExtraHeaders  Extra headers for the 200 response.
 */
function handleSessionTimersInIncomingRequest(request, responseExtraHeaders) {
  if (! this.sessionTimers.enabled) { return; }

  var session_expires_refresher;

  if (request.session_expires && request.session_expires >= JsSIP_C.MIN_SESSION_EXPIRES) {
    this.sessionTimers.currentExpires = request.session_expires;
    session_expires_refresher = request.session_expires_refresher || 'uas';
  }
  else {
    this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires;
    session_expires_refresher = 'uas';
  }

  responseExtraHeaders.push('Session-Expires: ' + this.sessionTimers.currentExpires + ';refresher=' + session_expires_refresher);

  this.sessionTimers.refresher = (session_expires_refresher === 'uas');
  runSessionTimer.call(this);
}

/**
 * Handle SessionTimers for an incoming response to INVITE or UPDATE.
 * @param  {IncomingResponse} response
 */
function handleSessionTimersInIncomingResponse(response) {
  if (! this.sessionTimers.enabled) { return; }

  var session_expires_refresher;

  if (response.session_expires && response.session_expires >= JsSIP_C.MIN_SESSION_EXPIRES) {
    this.sessionTimers.currentExpires = response.session_expires;
    session_expires_refresher = response.session_expires_refresher || 'uac';
  }
  else {
    this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires;
    session_expires_refresher = 'uac';
  }

  this.sessionTimers.refresher = (session_expires_refresher === 'uac');
  runSessionTimer.call(this);
}

function runSessionTimer() {
  var self = this;
  var expires = this.sessionTimers.currentExpires;

  this.sessionTimers.running = true;

  clearTimeout(this.sessionTimers.timer);

  // I'm the refresher.
  if (this.sessionTimers.refresher) {
    this.sessionTimers.timer = setTimeout(function() {
      if (self.status === C.STATUS_TERMINATED) { return; }

      debug('runSessionTimer() | sending session refresh request');

      sendUpdate.call(self, {
        eventHandlers: {
          succeeded: function(response) {
            handleSessionTimersInIncomingResponse.call(self, response);
          }
        }
      });
    }, expires * 500);  // Half the given interval (as the RFC states).
  }

  // I'm not the refresher.
  else {
    this.sessionTimers.timer = setTimeout(function() {
      if (self.status === C.STATUS_TERMINATED) { return; }

      debugerror('runSessionTimer() | timer expired, terminating the session');

      self.terminate({
        cause: JsSIP_C.causes.REQUEST_TIMEOUT,
        status_code: 408,
        reason_phrase: 'Session Timer Expired'
      });
    }, expires * 1100);
  }
}

function toogleMuteAudio(mute) {
  var streamIdx, trackIdx, streamsLength, tracksLength, tracks,
    localStreams = this.connection.getLocalStreams();

  streamsLength = localStreams.length;
  for (streamIdx = 0; streamIdx < streamsLength; streamIdx++) {
    tracks = localStreams[streamIdx].getAudioTracks();
    tracksLength = tracks.length;
    for (trackIdx = 0; trackIdx < tracksLength; trackIdx++) {
      tracks[trackIdx].enabled = !mute;
    }
  }
}

function toogleMuteVideo(mute) {
  var streamIdx, trackIdx, streamsLength, tracksLength, tracks,
    localStreams = this.connection.getLocalStreams();

  streamsLength = localStreams.length;
  for (streamIdx = 0; streamIdx < streamsLength; streamIdx++) {
    tracks = localStreams[streamIdx].getVideoTracks();
    tracksLength = tracks.length;
    for (trackIdx = 0; trackIdx < tracksLength; trackIdx++) {
      tracks[trackIdx].enabled = !mute;
    }
  }
}

function newRTCSession(originator, request) {
  debug('newRTCSession');

  this.ua.newRTCSession({
    originator: originator,
    session: this,
    request: request
  });
}

function connecting(request) {
  debug('session connecting');

  this.emit('connecting', {
    request: request
  });
}

function progress(originator, response) {
  debug('session progress');

  this.emit('progress', {
    originator: originator,
    response: response || null
  });
}

function accepted(originator, message) {
  debug('session accepted');

  this.start_time = new Date();

  this.emit('accepted', {
    originator: originator,
    response: message || null
  });
}

function confirmed(originator, ack) {
  debug('session confirmed');

  this.is_confirmed = true;

  this.emit('confirmed', {
    originator: originator,
    ack: ack || null
  });
}

function ended(originator, message, cause) {
  debug('session ended');

  this.end_time = new Date();

  this.close();
  this.emit('ended', {
    originator: originator,
    message: message || null,
    cause: cause
  });
}

function failed(originator, message, cause) {
  debug('session failed');

  this.close();
  this.emit('failed', {
    originator: originator,
    message: message || null,
    cause: cause
  });
}

function onhold(originator) {
  debug('session onhold');

  setLocalMediaStatus.call(this);

  this.emit('hold', {
    originator: originator
  });
}

function onunhold(originator) {
  debug('session onunhold');

  setLocalMediaStatus.call(this);

  this.emit('unhold', {
    originator: originator
  });
}

function onmute(options) {
  debug('session onmute');

  setLocalMediaStatus.call(this);

  this.emit('muted', {
    audio: options.audio,
    video: options.video
  });
}

function onunmute(options) {
  debug('session onunmute');

  setLocalMediaStatus.call(this);

  this.emit('unmuted', {
    audio: options.audio,
    video: options.video
  });
}

},{"./Constants":1,"./Dialog":2,"./Exceptions":5,"./RTCSession/DTMF":12,"./RTCSession/ReferNotifier":13,"./RTCSession/ReferSubscriber":14,"./RTCSession/Request":15,"./RequestSender":17,"./SIPMessage":18,"./Timers":20,"./Transactions":21,"./Utils":25,"debug":33,"events":28,"rtcninja":43,"sdp-transform":37,"util":32}],12:[function(require,module,exports){
module.exports = DTMF;


var C = {
  MIN_DURATION:            70,
  MAX_DURATION:            6000,
  DEFAULT_DURATION:        100,
  MIN_INTER_TONE_GAP:      50,
  DEFAULT_INTER_TONE_GAP:  500
};

/**
 * Expose C object.
 */
DTMF.C = C;


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:RTCSession:DTMF');
var debugerror = require('debug')('JsSIP:ERROR:RTCSession:DTMF');
debugerror.log = console.warn.bind(console);
var JsSIP_C = require('../Constants');
var Exceptions = require('../Exceptions');
var RTCSession = require('../RTCSession');


function DTMF(session) {
  this.owner = session;
  this.direction = null;
  this.tone = null;
  this.duration = null;
}


DTMF.prototype.send = function(tone, options) {
  var extraHeaders, body;

  if (tone === undefined) {
    throw new TypeError('Not enough arguments');
  }

  this.direction = 'outgoing';

  // Check RTCSession Status
  if (this.owner.status !== RTCSession.C.STATUS_CONFIRMED &&
    this.owner.status !== RTCSession.C.STATUS_WAITING_FOR_ACK) {
    throw new Exceptions.InvalidStateError(this.owner.status);
  }

  // Get DTMF options
  options = options || {};
  extraHeaders = options.extraHeaders ? options.extraHeaders.slice() : [];
  this.eventHandlers = options.eventHandlers || {};

  // Check tone type
  if (typeof tone === 'string' ) {
    tone = tone.toUpperCase();
  } else if (typeof tone === 'number') {
    tone = tone.toString();
  } else {
    throw new TypeError('Invalid tone: '+ tone);
  }

  // Check tone value
  if (!tone.match(/^[0-9A-D#*]$/)) {
    throw new TypeError('Invalid tone: '+ tone);
  } else {
    this.tone = tone;
  }

  // Duration is checked/corrected in RTCSession
  this.duration = options.duration;

  extraHeaders.push('Content-Type: application/dtmf-relay');

  body = 'Signal=' + this.tone + '\r\n';
  body += 'Duration=' + this.duration;

  this.owner.newDTMF({
    originator: 'local',
    dtmf: this,
    request: this.request
  });

  this.owner.dialog.sendRequest(this, JsSIP_C.INFO, {
    extraHeaders: extraHeaders,
    body: body
  });
};

DTMF.prototype.receiveResponse = function(response) {
  switch(true) {
    case /^1[0-9]{2}$/.test(response.status_code):
      // Ignore provisional responses.
      break;

    case /^2[0-9]{2}$/.test(response.status_code):
      debug('onSuccessResponse');
      if (this.eventHandlers.onSuccessResponse) { this.eventHandlers.onSuccessResponse(response); }
      break;

    default:
      if (this.eventHandlers.onErrorResponse) { this.eventHandlers.onErrorResponse(response); }
      break;
  }
};

DTMF.prototype.onRequestTimeout = function() {
  debugerror('onRequestTimeout');
  if (this.eventHandlers.onRequestTimeout) { this.eventHandlers.onRequestTimeout(); }
};

DTMF.prototype.onTransportError = function() {
  debugerror('onTransportError');
  if (this.eventHandlers.onTransportError) { this.eventHandlers.onTransportError(); }
};

DTMF.prototype.onDialogError = function() {
  debugerror('onDialogError');
  if (this.eventHandlers.onDialogError) { this.eventHandlers.onDialogError(); }
};

DTMF.prototype.init_incoming = function(request) {
  var body,
    reg_tone = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,
    reg_duration = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;

  this.direction = 'incoming';
  this.request = request;

  request.reply(200);

  if (request.body) {
    body = request.body.split('\n');
    if (body.length >= 1) {
      if (reg_tone.test(body[0])) {
        this.tone = body[0].replace(reg_tone,'$2');
      }
    }
    if (body.length >=2) {
      if (reg_duration.test(body[1])) {
        this.duration = parseInt(body[1].replace(reg_duration,'$2'), 10);
      }
    }
  }

  if (!this.duration) {
    this.duration = C.DEFAULT_DURATION;
  }

  if (!this.tone) {
    debug('invalid INFO DTMF received, discarded');
  } else {
    this.owner.newDTMF({
      originator: 'remote',
      dtmf: this,
      request: request
    });
  }
};

},{"../Constants":1,"../Exceptions":5,"../RTCSession":11,"debug":33}],13:[function(require,module,exports){
module.exports = ReferNotifier;


var C = {
  event_type: 'refer',
  body_type: 'message/sipfrag;version=2.0',
  expires: 300
};

/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:RTCSession:ReferNotifier');
var JsSIP_C = require('../Constants');
var RTCSession_Request = require('./Request');


function ReferNotifier(session, id, expires) {
  this.session = session;
  this.id = id;
  this.expires = expires || C.expires;
  this.active = true;

  // The creation of a Notifier results in an immediate NOTIFY
  this.notify(100);
}

ReferNotifier.prototype.notify = function(code, reason) {
  debug('notify()');

  var state,
      self = this;

  if (this.active === false) {
    return;
  }

  reason = reason || JsSIP_C.REASON_PHRASE[code] || '';

  if (code >= 200) {
    state = 'terminated;reason=noresource';
  } else {
    state = 'active;expires='+ this.expires;
  }

  // put this in a try/catch block
  var request = new RTCSession_Request(this.session, JsSIP_C.NOTIFY);
  request.send({
    extraHeaders: [
      'Event: '+ C.event_type +';id='+ self.id,
      'Subscription-State: '+ state,
      'Content-Type: '+ C.body_type
    ],
    body: 'SIP/2.0 ' + code + ' ' + reason,
    eventHandlers: {
      // if a negative response is received, subscription is canceled
      onErrorResponse: function() { self.active = false; }
    }
  });
};

},{"../Constants":1,"./Request":15,"debug":33}],14:[function(require,module,exports){
module.exports = ReferSubscriber;


var C = {
  expires: 120
};

/**
 * Dependencies.
 */
var util = require('util');
var events = require('events');
var debug = require('debug')('JsSIP:RTCSession:ReferSubscriber');
var JsSIP_C = require('../Constants');
var Grammar = require('../Grammar');
var RTCSession_Request = require('./Request');


function ReferSubscriber(session) {
  this.session = session;
  this.timer = null;
  // Instance of REFER OutgoingRequest
  this.outgoingRequest = null;

  events.EventEmitter.call(this);
}

util.inherits(ReferSubscriber, events.EventEmitter);

ReferSubscriber.prototype.sendRefer = function(target, options) {
  debug('sendRefer()');

  var extraHeaders, eventHandlers, referTo,
      replaces = null,
      self = this;

  // Get REFER options
  options = options || {};
  extraHeaders = options.extraHeaders ? options.extraHeaders.slice() : [];
  eventHandlers = options.eventHandlers || {};

  // Set event handlers
  for (var event in eventHandlers) {
    this.on(event, eventHandlers[event]);
  }

  // Replaces URI header field
  if (options.replaces) {
    replaces = options.replaces.request.call_id;
    replaces += ';to-tag='+ options.replaces.to_tag;
    replaces += ';from-tag='+ options.replaces.from_tag;

    replaces = encodeURIComponent(replaces);
  }

  // Refer-To header field
  referTo = 'Refer-To: <'+ target + (replaces?'?Replaces='+ replaces:'') +'>';

  extraHeaders.push(referTo);

  var request = new RTCSession_Request(this.session, JsSIP_C.REFER);

  this.timer = setTimeout(function() {
    removeSubscriber.call(self);
  }, C.expires * 1000);

  request.send({
    extraHeaders: extraHeaders,
    eventHandlers: {
      onSuccessResponse: function(response) {
        self.emit('requestSucceeded', {
          response: response
        });
      },
      onErrorResponse: function(response) {
        self.emit('requestFailed', {
          response: response,
          cause: JsSIP_C.causes.REJECTED
        });
      },
      onTransportError: function() {
        removeSubscriber.call(self);
        self.emit('requestFailed', {
          response: null,
          cause: JsSIP_C.causes.CONNECTION_ERROR
        });
      },
      onRequestTimeout: function() {
        removeSubscriber.call(self);
        self.emit('requestFailed', {
          response: null,
          cause: JsSIP_C.causes.REQUEST_TIMEOUT
        });
      },
      onDialogError: function() {
        removeSubscriber.call(self);
        self.emit('requestFailed', {
          response: null,
          cause: JsSIP_C.causes.DIALOG_ERROR
        });
      }
    }
  });

  this.outgoingRequest = request.outgoingRequest;
};

ReferSubscriber.prototype.receiveNotify = function(request) {
  debug('receiveNotify()');

  var status_line;

  if (!request.body) {
    return;
  }

  status_line = Grammar.parse(request.body, 'Status_Line');

  if(status_line === -1) {
    debug('receiveNotify() | error parsing NOTIFY body: "' + request.body + '"');
    return;
  }

  switch(true) {
    case /^100$/.test(status_line.status_code):
      this.emit('trying', {
        request: request,
        status_line: status_line
      });
      break;

    case /^1[0-9]{2}$/.test(status_line.status_code):
      this.emit('progress', {
        request: request,
        status_line: status_line
      });
      break;

    case /^2[0-9]{2}$/.test(status_line.status_code):
      removeSubscriber.call(this);
      this.emit('accepted', {
        request: request,
        status_line: status_line
      });
      break;

    default:
      removeSubscriber.call(this);
      this.emit('failed', {
        request: request,
        status_line: status_line
      });
      break;
  }
};

// remove refer subscriber from the session
function removeSubscriber() {
  console.log('removeSubscriber()');
  clearTimeout(this.timer);
  this.session.referSubscriber = null;
}

},{"../Constants":1,"../Grammar":6,"./Request":15,"debug":33,"events":28,"util":32}],15:[function(require,module,exports){
module.exports = Request;

/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:RTCSession:Request');
var debugerror = require('debug')('JsSIP:ERROR:RTCSession:Request');
debugerror.log = console.warn.bind(console);
var JsSIP_C = require('../Constants');
var Exceptions = require('../Exceptions');
var RTCSession = require('../RTCSession');


function Request(session, method) {
  debug('new | %s', method);

  this.session = session;
  this.method = method;
  // Instance of OutgoingRequest
  this.outgoingRequest = null;

  // Check RTCSession Status
  if (this.session.status !== RTCSession.C.STATUS_1XX_RECEIVED &&
    this.session.status !== RTCSession.C.STATUS_WAITING_FOR_ANSWER &&
    this.session.status !== RTCSession.C.STATUS_WAITING_FOR_ACK &&
    this.session.status !== RTCSession.C.STATUS_CONFIRMED &&
    this.session.status !== RTCSession.C.STATUS_TERMINATED) {
    throw new Exceptions.InvalidStateError(this.session.status);
  }

  /*
   * Allow sending BYE in TERMINATED status since the RTCSession
   * could had been terminated before the ACK had arrived.
   * RFC3261 Section 15, Paragraph 2
   */
  else if (this.session.status === RTCSession.C.STATUS_TERMINATED && method !== JsSIP_C.BYE) {
    throw new Exceptions.InvalidStateError(this.session.status);
  }
}

Request.prototype.send = function(options) {
  options = options || {};

  var
    extraHeaders = options.extraHeaders && options.extraHeaders.slice() || [],
    body = options.body || null;

  this.eventHandlers = options.eventHandlers || {};

  this.outgoingRequest = this.session.dialog.sendRequest(this, this.method, {
    extraHeaders: extraHeaders,
    body: body
  });
};

Request.prototype.receiveResponse = function(response) {
  switch(true) {
    case /^1[0-9]{2}$/.test(response.status_code):
      debug('onProgressResponse');
      if (this.eventHandlers.onProgressResponse) { this.eventHandlers.onProgressResponse(response); }
      break;

    case /^2[0-9]{2}$/.test(response.status_code):
      debug('onSuccessResponse');
      if (this.eventHandlers.onSuccessResponse) { this.eventHandlers.onSuccessResponse(response); }
      break;

    default:
      debug('onErrorResponse');
      if (this.eventHandlers.onErrorResponse) { this.eventHandlers.onErrorResponse(response); }
      break;
  }
};

Request.prototype.onRequestTimeout = function() {
  debugerror('onRequestTimeout');
  if (this.eventHandlers.onRequestTimeout) { this.eventHandlers.onRequestTimeout(); }
};

Request.prototype.onTransportError = function() {
  debugerror('onTransportError');
  if (this.eventHandlers.onTransportError) { this.eventHandlers.onTransportError(); }
};

Request.prototype.onDialogError = function() {
  debugerror('onDialogError');
  if (this.eventHandlers.onDialogError) { this.eventHandlers.onDialogError(); }
};

},{"../Constants":1,"../Exceptions":5,"../RTCSession":11,"debug":33}],16:[function(require,module,exports){
module.exports = Registrator;


/**
 * Dependecies
 */
var debug = require('debug')('JsSIP:Registrator');
var Utils = require('./Utils');
var JsSIP_C = require('./Constants');
var SIPMessage = require('./SIPMessage');
var RequestSender = require('./RequestSender');


function Registrator(ua, transport) {
  var reg_id=1; //Force reg_id to 1.

  this.ua = ua;
  this.transport = transport;

  this.registrar = ua.configuration.registrar_server;
  this.expires = ua.configuration.register_expires;

  // Call-ID and CSeq values RFC3261 10.2
  this.call_id = Utils.createRandomToken(22);
  this.cseq = 0;

  // this.to_uri
  this.to_uri = ua.configuration.uri;

  this.registrationTimer = null;

  // Set status
  this.registered = false;

  // Contact header
  this.contact = this.ua.contact.toString();

  // sip.ice media feature tag (RFC 5768)
  this.contact += ';+sip.ice';

  // Custom headers for REGISTER and un-REGISTER.
  this.extraHeaders = [];

  // Custom Contact header params for REGISTER and un-REGISTER.
  this.extraContactParams = '';

  if(reg_id) {
    this.contact += ';reg-id='+ reg_id;
    this.contact += ';+sip.instance="<urn:uuid:'+ this.ua.configuration.instance_id+'>"';
  }
}


Registrator.prototype = {
  setExtraHeaders: function(extraHeaders) {
    if (! Array.isArray(extraHeaders)) {
      extraHeaders = [];
    }

    this.extraHeaders = extraHeaders.slice();
  },

  setExtraContactParams: function(extraContactParams) {
    if (! (extraContactParams instanceof Object)) {
      extraContactParams = {};
    }

    // Reset it.
    this.extraContactParams = '';

    for(var param_key in extraContactParams) {
      var param_value = extraContactParams[param_key];
      this.extraContactParams += (';' + param_key);
      if (param_value) {
        this.extraContactParams += ('=' + param_value);
      }
    }
  },

  register: function() {
    var request_sender, cause, extraHeaders,
      self = this;

    extraHeaders = this.extraHeaders.slice();
    extraHeaders.push('Contact: ' + this.contact + ';expires=' + this.expires + this.extraContactParams);
    extraHeaders.push('Expires: '+ this.expires);

    this.request = new SIPMessage.OutgoingRequest(JsSIP_C.REGISTER, this.registrar, this.ua, {
        'to_uri': this.to_uri,
        'call_id': this.call_id,
        'cseq': (this.cseq += 1)
      }, extraHeaders);

    request_sender = new RequestSender(this, this.ua);

    this.receiveResponse = function(response) {
      var contact, expires,
        contacts = response.getHeaders('contact').length;

      // Discard responses to older REGISTER/un-REGISTER requests.
      if(response.cseq !== this.cseq) {
        return;
      }

      // Clear registration timer
      if (this.registrationTimer !== null) {
        clearTimeout(this.registrationTimer);
        this.registrationTimer = null;
      }

      switch(true) {
        case /^1[0-9]{2}$/.test(response.status_code):
          // Ignore provisional responses.
          break;
        case /^2[0-9]{2}$/.test(response.status_code):
          if(response.hasHeader('expires')) {
            expires = response.getHeader('expires');
          }

          // Search the Contact pointing to us and update the expires value accordingly.
          if (!contacts) {
            debug('no Contact header in response to REGISTER, response ignored');
            break;
          }

          while(contacts--) {
            contact = response.parseHeader('contact', contacts);
            if(contact.uri.user === this.ua.contact.uri.user) {
              expires = contact.getParam('expires');
              break;
            } else {
              contact = null;
            }
          }

          if (!contact) {
            debug('no Contact header pointing to us, response ignored');
            break;
          }

          if(!expires) {
            expires = this.expires;
          }

          // Re-Register before the expiration interval has elapsed.
          // For that, decrease the expires value. ie: 3 seconds
          this.registrationTimer = setTimeout(function() {
            self.registrationTimer = null;
            self.register();
          }, (expires * 1000) - 3000);

          //Save gruu values
          if (contact.hasParam('temp-gruu')) {
            this.ua.contact.temp_gruu = contact.getParam('temp-gruu').replace(/"/g,'');
          }
          if (contact.hasParam('pub-gruu')) {
            this.ua.contact.pub_gruu = contact.getParam('pub-gruu').replace(/"/g,'');
          }

          if (! this.registered) {
            this.registered = true;
            this.ua.registered({
              response: response
            });
          }
          break;
        // Interval too brief RFC3261 10.2.8
        case /^423$/.test(response.status_code):
          if(response.hasHeader('min-expires')) {
            // Increase our registration interval to the suggested minimum
            this.expires = response.getHeader('min-expires');
            // Attempt the registration again immediately
            this.register();
          } else { //This response MUST contain a Min-Expires header field
            debug('423 response received for REGISTER without Min-Expires');
            this.registrationFailure(response, JsSIP_C.causes.SIP_FAILURE_CODE);
          }
          break;
        default:
          cause = Utils.sipErrorCause(response.status_code);
          this.registrationFailure(response, cause);
      }
    };

    this.onRequestTimeout = function() {
      this.registrationFailure(null, JsSIP_C.causes.REQUEST_TIMEOUT);
    };

    this.onTransportError = function() {
      this.registrationFailure(null, JsSIP_C.causes.CONNECTION_ERROR);
    };

    request_sender.send();
  },

  unregister: function(options) {
    var extraHeaders;

    if(!this.registered) {
      debug('already unregistered');
      return;
    }

    options = options || {};

    this.registered = false;

    // Clear the registration timer.
    if (this.registrationTimer !== null) {
      clearTimeout(this.registrationTimer);
      this.registrationTimer = null;
    }

    extraHeaders = this.extraHeaders.slice();

    if(options.all) {
      extraHeaders.push('Contact: *' + this.extraContactParams);
      extraHeaders.push('Expires: 0');

      this.request = new SIPMessage.OutgoingRequest(JsSIP_C.REGISTER, this.registrar, this.ua, {
          'to_uri': this.to_uri,
          'call_id': this.call_id,
          'cseq': (this.cseq += 1)
        }, extraHeaders);
    } else {
      extraHeaders.push('Contact: '+ this.contact + ';expires=0' + this.extraContactParams);
      extraHeaders.push('Expires: 0');

      this.request = new SIPMessage.OutgoingRequest(JsSIP_C.REGISTER, this.registrar, this.ua, {
          'to_uri': this.to_uri,
          'call_id': this.call_id,
          'cseq': (this.cseq += 1)
        }, extraHeaders);
    }

    var request_sender = new RequestSender(this, this.ua);

    this.receiveResponse = function(response) {
      var cause;

      switch(true) {
        case /^1[0-9]{2}$/.test(response.status_code):
          // Ignore provisional responses.
          break;
        case /^2[0-9]{2}$/.test(response.status_code):
          this.unregistered(response);
          break;
        default:
          cause = Utils.sipErrorCause(response.status_code);
          this.unregistered(response, cause);
      }
    };

    this.onRequestTimeout = function() {
      this.unregistered(null, JsSIP_C.causes.REQUEST_TIMEOUT);
    };

    this.onTransportError = function() {
      this.unregistered(null, JsSIP_C.causes.CONNECTION_ERROR);
    };

    request_sender.send();
  },

  registrationFailure: function(response, cause) {
    this.ua.registrationFailed({
      response: response || null,
      cause: cause
    });

    if (this.registered) {
      this.registered = false;
      this.ua.unregistered({
        response: response || null,
        cause: cause
      });
    }
  },

  unregistered: function(response, cause) {
    this.registered = false;
    this.ua.unregistered({
      response: response || null,
      cause: cause || null
    });
  },

  onTransportClosed: function() {
    if (this.registrationTimer !== null) {
      clearTimeout(this.registrationTimer);
      this.registrationTimer = null;
    }

    if(this.registered) {
      this.registered = false;
      this.ua.unregistered({});
    }
  },

  close: function() {
    if (this.registered) {
      this.unregister();
    }
  }
};


},{"./Constants":1,"./RequestSender":17,"./SIPMessage":18,"./Utils":25,"debug":33}],17:[function(require,module,exports){
module.exports = RequestSender;


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:RequestSender');
var JsSIP_C = require('./Constants');
var UA = require('./UA');
var DigestAuthentication = require('./DigestAuthentication');
var Transactions = require('./Transactions');


function RequestSender(applicant, ua) {
  this.ua = ua;
  this.applicant = applicant;
  this.method = applicant.request.method;
  this.request = applicant.request;
  this.auth = null;
  this.challenged = false;
  this.staled = false;

  // If ua is in closing process or even closed just allow sending Bye and ACK
  if (ua.status === UA.C.STATUS_USER_CLOSED && (this.method !== JsSIP_C.BYE || this.method !== JsSIP_C.ACK)) {
    this.onTransportError();
  }
}


/**
* Create the client transaction and send the message.
*/
RequestSender.prototype = {
  send: function() {
    switch(this.method) {
      case 'INVITE':
        this.clientTransaction = new Transactions.InviteClientTransaction(this, this.request, this.ua.transport);
        break;
      case 'ACK':
        this.clientTransaction = new Transactions.AckClientTransaction(this, this.request, this.ua.transport);
        break;
      default:
        this.clientTransaction = new Transactions.NonInviteClientTransaction(this, this.request, this.ua.transport);
    }

    this.clientTransaction.send();
  },

  /**
  * Callback fired when receiving a request timeout error from the client transaction.
  * To be re-defined by the applicant.
  */
  onRequestTimeout: function() {
    this.applicant.onRequestTimeout();
  },

  /**
  * Callback fired when receiving a transport error from the client transaction.
  * To be re-defined by the applicant.
  */
  onTransportError: function() {
    this.applicant.onTransportError();
  },

  /**
  * Called from client transaction when receiving a correct response to the request.
  * Authenticate request if needed or pass the response back to the applicant.
  */
  receiveResponse: function(response) {
    var
      cseq, challenge, authorization_header_name,
      status_code = response.status_code;

    /*
    * Authentication
    * Authenticate once. _challenged_ flag used to avoid infinite authentications.
    */
    if ((status_code === 401 || status_code === 407) &&
        (this.ua.configuration.password !== null || this.ua.configuration.ha1 !== null)) {

      // Get and parse the appropriate WWW-Authenticate or Proxy-Authenticate header.
      if (response.status_code === 401) {
        challenge = response.parseHeader('www-authenticate');
        authorization_header_name = 'authorization';
      } else {
        challenge = response.parseHeader('proxy-authenticate');
        authorization_header_name = 'proxy-authorization';
      }

      // Verify it seems a valid challenge.
      if (!challenge) {
        debug(response.status_code + ' with wrong or missing challenge, cannot authenticate');
        this.applicant.receiveResponse(response);
        return;
      }

      if (!this.challenged || (!this.staled && challenge.stale === true)) {
        if (!this.auth) {
          this.auth = new DigestAuthentication({
            username : this.ua.configuration.authorization_user,
            password : this.ua.configuration.password,
            realm    : this.ua.configuration.realm,
            ha1      : this.ua.configuration.ha1
          });
        }

        // Verify that the challenge is really valid.
        if (!this.auth.authenticate(this.request, challenge)) {
          this.applicant.receiveResponse(response);
          return;
        }
        this.challenged = true;

        // Update ha1 and realm in the UA.
        this.ua.set('realm', this.auth.get('realm'));
        this.ua.set('ha1', this.auth.get('ha1'));

        if (challenge.stale) {
          this.staled = true;
        }

        if (response.method === JsSIP_C.REGISTER) {
          cseq = this.applicant.cseq += 1;
        } else if (this.request.dialog) {
          cseq = this.request.dialog.local_seqnum += 1;
        } else {
          cseq = this.request.cseq + 1;
        }

        this.request = this.applicant.request = this.request.clone();

        this.request.cseq = cseq;
        this.request.setHeader('cseq', cseq +' '+ this.method);

        this.request.setHeader(authorization_header_name, this.auth.toString());
        this.send();
      } else {
        this.applicant.receiveResponse(response);
      }
    } else {
      this.applicant.receiveResponse(response);
    }
  }
};

},{"./Constants":1,"./DigestAuthentication":4,"./Transactions":21,"./UA":23,"debug":33}],18:[function(require,module,exports){
module.exports = {
  OutgoingRequest: OutgoingRequest,
  IncomingRequest: IncomingRequest,
  IncomingResponse: IncomingResponse
};


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:SIPMessage');
var sdp_transform = require('sdp-transform');
var JsSIP_C = require('./Constants');
var Utils = require('./Utils');
var NameAddrHeader = require('./NameAddrHeader');
var Grammar = require('./Grammar');


/**
 * -param {String} method request method
 * -param {String} ruri request uri
 * -param {UA} ua
 * -param {Object} params parameters that will have priority over ua.configuration parameters:
 * <br>
 *  - cseq, call_id, from_tag, from_uri, from_display_name, to_uri, to_tag, route_set
 * -param {Object} [headers] extra headers
 * -param {String} [body]
 */
function OutgoingRequest(method, ruri, ua, params, extraHeaders, body) {
  var
    to,
    from,
    call_id,
    cseq;

  params = params || {};

  // Mandatory parameters check
  if(!method || !ruri || !ua) {
    return null;
  }

  this.ua = ua;
  this.headers = {};
  this.method = method;
  this.ruri = ruri;
  this.body = body;
  this.extraHeaders = extraHeaders && extraHeaders.slice() || [];

  // Fill the Common SIP Request Headers

  // Route
  if (params.route_set) {
    this.setHeader('route', params.route_set);
  } else if (ua.configuration.use_preloaded_route) {
    this.setHeader('route', '<' + ua.transport.sip_uri + ';lr>');
  }

  // Via
  // Empty Via header. Will be filled by the client transaction.
  this.setHeader('via', '');

  // Max-Forwards
  this.setHeader('max-forwards', JsSIP_C.MAX_FORWARDS);

  // To
  to = (params.to_display_name || params.to_display_name === 0) ? '"' + params.to_display_name + '" ' : '';
  to += '<' + (params.to_uri || ruri) + '>';
  to += params.to_tag ? ';tag=' + params.to_tag : '';
  this.to = new NameAddrHeader.parse(to);
  this.setHeader('to', to);

  // From
  if (params.from_display_name || params.from_display_name === 0) {
    from = '"' + params.from_display_name + '" ';
  } else if (ua.configuration.display_name) {
    from = '"' + ua.configuration.display_name + '" ';
  } else {
    from = '';
  }
  from += '<' + (params.from_uri || ua.configuration.uri) + '>;tag=';
  from += params.from_tag || Utils.newTag();
  this.from = new NameAddrHeader.parse(from);
  this.setHeader('from', from);

  // Call-ID
  call_id = params.call_id || (ua.configuration.jssip_id + Utils.createRandomToken(15));
  this.call_id = call_id;
  this.setHeader('call-id', call_id);

  // CSeq
  cseq = params.cseq || Math.floor(Math.random() * 10000);
  this.cseq = cseq;
  this.setHeader('cseq', cseq + ' ' + method);
}

OutgoingRequest.prototype = {
  /**
   * Replace the the given header by the given value.
   * -param {String} name header name
   * -param {String | Array} value header value
   */
  setHeader: function(name, value) {
    var regexp, idx;

    // Remove the header from extraHeaders if present.
    regexp = new RegExp('^\\s*'+ name +'\\s*:','i');
    for (idx=0; idx<this.extraHeaders.length; idx++) {
      if (regexp.test(this.extraHeaders[idx])) {
        this.extraHeaders.splice(idx, 1);
      }
    }

    this.headers[Utils.headerize(name)] = (Array.isArray(value)) ? value : [value];
  },

  /**
   * Get the value of the given header name at the given position.
   * -param {String} name header name
   * -returns {String|undefined} Returns the specified header, null if header doesn't exist.
   */
  getHeader: function(name) {
    var regexp, idx,
      length = this.extraHeaders.length,
      header = this.headers[Utils.headerize(name)];

    if(header) {
      if(header[0]) {
        return header[0];
      }
    } else {
      regexp = new RegExp('^\\s*'+ name +'\\s*:','i');
      for (idx=0; idx<length; idx++) {
        header = this.extraHeaders[idx];
        if (regexp.test(header)) {
          return header.substring(header.indexOf(':')+1).trim();
        }
      }
    }

    return;
  },

  /**
   * Get the header/s of the given name.
   * -param {String} name header name
   * -returns {Array} Array with all the headers of the specified name.
   */
  getHeaders: function(name) {
    var idx, length, regexp,
      header = this.headers[Utils.headerize(name)],
      result = [];

    if (header) {
      length = header.length;
      for (idx = 0; idx < length; idx++) {
        result.push(header[idx]);
      }
      return result;
    } else {
      length = this.extraHeaders.length;
      regexp = new RegExp('^\\s*'+ name +'\\s*:','i');
      for (idx=0; idx<length; idx++) {
        header = this.extraHeaders[idx];
        if (regexp.test(header)) {
          result.push(header.substring(header.indexOf(':')+1).trim());
        }
      }
      return result;
    }
  },

  /**
   * Verify the existence of the given header.
   * -param {String} name header name
   * -returns {boolean} true if header with given name exists, false otherwise
   */
  hasHeader: function(name) {
    var regexp, idx,
      length = this.extraHeaders.length;

    if (this.headers[Utils.headerize(name)]) {
      return true;
    } else {
      regexp = new RegExp('^\\s*'+ name +'\\s*:','i');
      for (idx=0; idx<length; idx++) {
        if (regexp.test(this.extraHeaders[idx])) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Parse the current body as a SDP and store the resulting object
   * into this.sdp.
   * -param {Boolean} force: Parse even if this.sdp already exists.
   *
   * Returns this.sdp.
   */
  parseSDP: function(force) {
    if (!force && this.sdp) {
      return this.sdp;
    } else {
      this.sdp = sdp_transform.parse(this.body || '');
      return this.sdp;
    }
  },

  toString: function() {
    var msg = '', header, length, idx,
      supported = [];

    msg += this.method + ' ' + this.ruri + ' SIP/2.0\r\n';

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    length = this.extraHeaders.length;
    for (idx = 0; idx < length; idx++) {
      msg += this.extraHeaders[idx].trim() +'\r\n';
    }

    // Supported
    switch (this.method) {
      case JsSIP_C.REGISTER:
        supported.push('path', 'gruu');
        break;
      case JsSIP_C.INVITE:
        if (this.ua.configuration.session_timers) {
          supported.push('timer');
        }
        if (this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) {
          supported.push('gruu');
        }
        supported.push('ice','replaces');
        break;
      case JsSIP_C.UPDATE:
        if (this.ua.configuration.session_timers) {
          supported.push('timer');
        }
        supported.push('ice');
        break;
    }

    supported.push('outbound');

    // Allow
    msg += 'Allow: '+ JsSIP_C.ALLOWED_METHODS +'\r\n';
    msg += 'Supported: ' +  supported +'\r\n';
    msg += 'User-Agent: ' + JsSIP_C.USER_AGENT +'\r\n';

    if (this.body) {
      length = Utils.str_utf8_length(this.body);
      msg += 'Content-Length: ' + length + '\r\n\r\n';
      msg += this.body;
    } else {
      msg += 'Content-Length: 0\r\n\r\n';
    }

    return msg;
  },

  clone: function() {
    var request = new OutgoingRequest(this.method, this.ruri, this.ua);

    Object.keys(this.headers).forEach(function(name) {
      request.headers[name] = this.headers[name].slice();
    }, this);

    request.body = this.body;
    request.extraHeaders = this.extraHeaders && this.extraHeaders.slice() || [];

    request.to = this.to;
    request.from = this.from;
    request.call_id = this.call_id;
    request.cseq = this.cseq;

    return request;
  }
};


function IncomingMessage(){
  this.data = null;
  this.headers = null;
  this.method =  null;
  this.via = null;
  this.via_branch = null;
  this.call_id = null;
  this.cseq = null;
  this.from = null;
  this.from_tag = null;
  this.to = null;
  this.to_tag = null;
  this.body = null;
  this.sdp = null;
}

IncomingMessage.prototype = {
  /**
  * Insert a header of the given name and value into the last position of the
  * header array.
  */
  addHeader: function(name, value) {
    var header = { raw: value };

    name = Utils.headerize(name);

    if(this.headers[name]) {
      this.headers[name].push(header);
    } else {
      this.headers[name] = [header];
    }
  },

  /**
   * Get the value of the given header name at the given position.
   */
  getHeader: function(name) {
    var header = this.headers[Utils.headerize(name)];

    if(header) {
      if(header[0]) {
        return header[0].raw;
      }
    } else {
      return;
    }
  },

  /**
   * Get the header/s of the given name.
   */
  getHeaders: function(name) {
    var idx, length,
      header = this.headers[Utils.headerize(name)],
      result = [];

    if(!header) {
      return [];
    }

    length = header.length;
    for (idx = 0; idx < length; idx++) {
      result.push(header[idx].raw);
    }

    return result;
  },

  /**
   * Verify the existence of the given header.
   */
  hasHeader: function(name) {
    return(this.headers[Utils.headerize(name)]) ? true : false;
  },

  /**
  * Parse the given header on the given index.
  * -param {String} name header name
  * -param {Number} [idx=0] header index
  * -returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
  */
  parseHeader: function(name, idx) {
    var header, value, parsed;

    name = Utils.headerize(name);

    idx = idx || 0;

    if(!this.headers[name]) {
      debug('header "' + name + '" not present');
      return;
    } else if(idx >= this.headers[name].length) {
      debug('not so many "' + name + '" headers present');
      return;
    }

    header = this.headers[name][idx];
    value = header.raw;

    if(header.parsed) {
      return header.parsed;
    }

    //substitute '-' by '_' for grammar rule matching.
    parsed = Grammar.parse(value, name.replace(/-/g, '_'));

    if(parsed === -1) {
      this.headers[name].splice(idx, 1); //delete from headers
      debug('error parsing "' + name + '" header field with value "' + value + '"');
      return;
    } else {
      header.parsed = parsed;
      return parsed;
    }
  },

  /**
   * Message Header attribute selector. Alias of parseHeader.
   * -param {String} name header name
   * -param {Number} [idx=0] header index
   * -returns {Object|undefined} Parsed header object, undefined if the header is not present or in case of a parsing error.
   *
   * -example
   * message.s('via',3).port
   */
  s: function(name, idx) {
    return this.parseHeader(name, idx);
  },

  /**
  * Replace the value of the given header by the value.
  * -param {String} name header name
  * -param {String} value header value
  */
  setHeader: function(name, value) {
    var header = { raw: value };
    this.headers[Utils.headerize(name)] = [header];
  },

  /**
   * Parse the current body as a SDP and store the resulting object
   * into this.sdp.
   * -param {Boolean} force: Parse even if this.sdp already exists.
   *
   * Returns this.sdp.
   */
  parseSDP: function(force) {
    if (!force && this.sdp) {
      return this.sdp;
    } else {
      this.sdp = sdp_transform.parse(this.body || '');
      return this.sdp;
    }
  },

  toString: function() {
    return this.data;
  }
};


function IncomingRequest(ua) {
  this.ua = ua;
  this.headers = {};
  this.ruri = null;
  this.transport = null;
  this.server_transaction = null;
}

IncomingRequest.prototype = new IncomingMessage();

/**
* Stateful reply.
* -param {Number} code status code
* -param {String} reason reason phrase
* -param {Object} headers extra headers
* -param {String} body body
* -param {Function} [onSuccess] onSuccess callback
* -param {Function} [onFailure] onFailure callback
*/
IncomingRequest.prototype.reply = function(code, reason, extraHeaders, body, onSuccess, onFailure) {
  var rr, vias, length, idx, response,
    supported = [],
    to = this.getHeader('To'),
    r = 0,
    v = 0;

  code = code || null;
  reason = reason || null;

  // Validate code and reason values
  if (!code || (code < 100 || code > 699)) {
    throw new TypeError('Invalid status_code: '+ code);
  } else if (reason && typeof reason !== 'string' && !(reason instanceof String)) {
    throw new TypeError('Invalid reason_phrase: '+ reason);
  }

  reason = reason || JsSIP_C.REASON_PHRASE[code] || '';
  extraHeaders = extraHeaders && extraHeaders.slice() || [];

  response = 'SIP/2.0 ' + code + ' ' + reason + '\r\n';

  if(this.method === JsSIP_C.INVITE && code > 100 && code <= 200) {
    rr = this.getHeaders('record-route');
    length = rr.length;

    for(r; r < length; r++) {
      response += 'Record-Route: ' + rr[r] + '\r\n';
    }
  }

  vias = this.getHeaders('via');
  length = vias.length;

  for(v; v < length; v++) {
    response += 'Via: ' + vias[v] + '\r\n';
  }

  if(!this.to_tag && code > 100) {
    to += ';tag=' + Utils.newTag();
  } else if(this.to_tag && !this.s('to').hasParam('tag')) {
    to += ';tag=' + this.to_tag;
  }

  response += 'To: ' + to + '\r\n';
  response += 'From: ' + this.getHeader('From') + '\r\n';
  response += 'Call-ID: ' + this.call_id + '\r\n';
  response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';

  length = extraHeaders.length;
  for (idx = 0; idx < length; idx++) {
    response += extraHeaders[idx].trim() +'\r\n';
  }

  // Supported
  switch (this.method) {
    case JsSIP_C.INVITE:
      if (this.ua.configuration.session_timers) {
        supported.push('timer');
      }
      if (this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) {
        supported.push('gruu');
      }
      supported.push('ice','replaces');
      break;
    case JsSIP_C.UPDATE:
      if (this.ua.configuration.session_timers) {
        supported.push('timer');
      }
      if (body) {
        supported.push('ice');
      }
      supported.push('replaces');
  }

  supported.push('outbound');

  // Allow and Accept
  if (this.method === JsSIP_C.OPTIONS) {
    response += 'Allow: '+ JsSIP_C.ALLOWED_METHODS +'\r\n';
    response += 'Accept: '+ JsSIP_C.ACCEPTED_BODY_TYPES +'\r\n';
  } else if (code === 405) {
    response += 'Allow: '+ JsSIP_C.ALLOWED_METHODS +'\r\n';
  } else if (code === 415 ) {
    response += 'Accept: '+ JsSIP_C.ACCEPTED_BODY_TYPES +'\r\n';
  }

  response += 'Supported: ' +  supported +'\r\n';

  if(body) {
    length = Utils.str_utf8_length(body);
    response += 'Content-Type: application/sdp\r\n';
    response += 'Content-Length: ' + length + '\r\n\r\n';
    response += body;
  } else {
    response += 'Content-Length: ' + 0 + '\r\n\r\n';
  }

  this.server_transaction.receiveResponse(code, response, onSuccess, onFailure);
};

/**
* Stateless reply.
* -param {Number} code status code
* -param {String} reason reason phrase
*/
IncomingRequest.prototype.reply_sl = function(code, reason) {
  var to, response,
    v = 0,
    vias = this.getHeaders('via'),
    length = vias.length;

  code = code || null;
  reason = reason || null;

  // Validate code and reason values
  if (!code || (code < 100 || code > 699)) {
    throw new TypeError('Invalid status_code: '+ code);
  } else if (reason && typeof reason !== 'string' && !(reason instanceof String)) {
    throw new TypeError('Invalid reason_phrase: '+ reason);
  }

  reason = reason || JsSIP_C.REASON_PHRASE[code] || '';

  response = 'SIP/2.0 ' + code + ' ' + reason + '\r\n';

  for(v; v < length; v++) {
    response += 'Via: ' + vias[v] + '\r\n';
  }

  to = this.getHeader('To');

  if(!this.to_tag && code > 100) {
    to += ';tag=' + Utils.newTag();
  } else if(this.to_tag && !this.s('to').hasParam('tag')) {
    to += ';tag=' + this.to_tag;
  }

  response += 'To: ' + to + '\r\n';
  response += 'From: ' + this.getHeader('From') + '\r\n';
  response += 'Call-ID: ' + this.call_id + '\r\n';
  response += 'CSeq: ' + this.cseq + ' ' + this.method + '\r\n';
  response += 'Content-Length: ' + 0 + '\r\n\r\n';

  this.transport.send(response);
};


function IncomingResponse() {
  this.headers = {};
  this.status_code = null;
  this.reason_phrase = null;
}

IncomingResponse.prototype = new IncomingMessage();

},{"./Constants":1,"./Grammar":6,"./NameAddrHeader":9,"./Utils":25,"debug":33,"sdp-transform":37}],19:[function(require,module,exports){
module.exports = Socket;

/**
 * Interface documentation: http://jssip.net/documentation/$last_version/api/socket/
 *
 * interface Socket {
 *  attribute String via_transport
 *  attribute String url
 *  attribute String sip_uri
 *
 *  method connect();
 *  method disconnect();
 *  method send(data);
 *
 *  attribute EventHandler onconnect
 *  attribute EventHandler ondisconnect
 *  attribute EventHandler ondata
 * }
 *
 */


/**
 * Dependencies.
 */
var Utils = require('./Utils');
var Grammar = require('./Grammar');
var debugerror = require('debug')('JsSIP:ERROR:Socket');
debugerror.log = console.warn.bind(console);

function Socket() {}

Socket.isSocket = function(socket) {
  // Ignore if an array is given
  if (Array.isArray(socket)) {
    return false;
  }

  if (typeof socket === 'undefined') {
    debugerror('undefined JsSIP.Socket instance');
    return false;
  }

  // Check Properties
  try {
    if (!Utils.isString(socket.url)) {
      debugerror('missing or invalid JsSIP.Socket url property');
      throw new Error();
    }

    if (!Utils.isString(socket.via_transport)) {
      debugerror('missing or invalid JsSIP.Socket via_transport property');
      throw new Error();
    }

    if (Grammar.parse(socket.sip_uri, 'SIP_URI') === -1) {
      debugerror('missing or invalid JsSIP.Socket sip_uri property');
      throw new Error();
    }
  } catch(e) {
    return false;
  }

  // Check Methods
  try {
    ['connect', 'disconnect', 'send'].forEach(function(method) {
      if (!Utils.isFunction(socket[method])) {
        debugerror('missing or invalid JsSIP.Socket method: ' + method);
        throw new Error();
      }
    });
  } catch(e) {
    return false;
  }

  return true;
};

},{"./Grammar":6,"./Utils":25,"debug":33}],20:[function(require,module,exports){
var T1 = 500,
  T2 = 4000,
  T4 = 5000;


var Timers = {
  T1: T1,
  T2: T2,
  T4: T4,
  TIMER_B: 64 * T1,
  TIMER_D: 0  * T1,
  TIMER_F: 64 * T1,
  TIMER_H: 64 * T1,
  TIMER_I: 0  * T1,
  TIMER_J: 0  * T1,
  TIMER_K: 0  * T4,
  TIMER_L: 64 * T1,
  TIMER_M: 64 * T1,
  PROVISIONAL_RESPONSE_INTERVAL: 60000  // See RFC 3261 Section 13.3.1.1
};


module.exports = Timers;

},{}],21:[function(require,module,exports){
module.exports = {
  C: null,
  NonInviteClientTransaction: NonInviteClientTransaction,
  InviteClientTransaction: InviteClientTransaction,
  AckClientTransaction: AckClientTransaction,
  NonInviteServerTransaction: NonInviteServerTransaction,
  InviteServerTransaction: InviteServerTransaction,
  checkTransaction: checkTransaction
};


var C = {
  // Transaction states
  STATUS_TRYING:     1,
  STATUS_PROCEEDING: 2,
  STATUS_CALLING:    3,
  STATUS_ACCEPTED:   4,
  STATUS_COMPLETED:  5,
  STATUS_TERMINATED: 6,
  STATUS_CONFIRMED:  7,

  // Transaction types
  NON_INVITE_CLIENT: 'nict',
  NON_INVITE_SERVER: 'nist',
  INVITE_CLIENT: 'ict',
  INVITE_SERVER: 'ist'
};

/**
 * Expose C object.
 */
module.exports.C = C;


/**
 * Dependencies.
 */
var util = require('util');
var events = require('events');
var debugnict = require('debug')('JsSIP:NonInviteClientTransaction');
var debugict = require('debug')('JsSIP:InviteClientTransaction');
var debugact = require('debug')('JsSIP:AckClientTransaction');
var debugnist = require('debug')('JsSIP:NonInviteServerTransaction');
var debugist = require('debug')('JsSIP:InviteServerTransaction');
var JsSIP_C = require('./Constants');
var Timers = require('./Timers');


function NonInviteClientTransaction(request_sender, request, transport) {
  var via;

  this.type = C.NON_INVITE_CLIENT;
  this.transport = transport;
  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
  this.request_sender = request_sender;
  this.request = request;

  via = 'SIP/2.0/' + transport.via_transport;
  via += ' ' + request_sender.ua.configuration.via_host + ';branch=' + this.id;

  this.request.setHeader('via', via);

  this.request_sender.ua.newTransaction(this);

  events.EventEmitter.call(this);
}

util.inherits(NonInviteClientTransaction, events.EventEmitter);

NonInviteClientTransaction.prototype.stateChanged = function(state) {
  this.state = state;
  this.emit('stateChanged');
};

NonInviteClientTransaction.prototype.send = function() {
  var tr = this;

  this.stateChanged(C.STATUS_TRYING);
  this.F = setTimeout(function() {tr.timer_F();}, Timers.TIMER_F);

  if(!this.transport.send(this.request)) {
    this.onTransportError();
  }
};

NonInviteClientTransaction.prototype.onTransportError = function() {
  debugnict('transport error occurred, deleting transaction ' + this.id);
  clearTimeout(this.F);
  clearTimeout(this.K);
  this.stateChanged(C.STATUS_TERMINATED);
  this.request_sender.ua.destroyTransaction(this);
  this.request_sender.onTransportError();
};

NonInviteClientTransaction.prototype.timer_F = function() {
  debugnict('Timer F expired for transaction ' + this.id);
  this.stateChanged(C.STATUS_TERMINATED);
  this.request_sender.ua.destroyTransaction(this);
  this.request_sender.onRequestTimeout();
};

NonInviteClientTransaction.prototype.timer_K = function() {
  this.stateChanged(C.STATUS_TERMINATED);
  this.request_sender.ua.destroyTransaction(this);
};

NonInviteClientTransaction.prototype.receiveResponse = function(response) {
  var
    tr = this,
    status_code = response.status_code;

  if(status_code < 200) {
    switch(this.state) {
      case C.STATUS_TRYING:
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_PROCEEDING);
        this.request_sender.receiveResponse(response);
        break;
    }
  } else {
    switch(this.state) {
      case C.STATUS_TRYING:
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_COMPLETED);
        clearTimeout(this.F);

        if(status_code === 408) {
          this.request_sender.onRequestTimeout();
        } else {
          this.request_sender.receiveResponse(response);
        }

        this.K = setTimeout(function() {tr.timer_K();}, Timers.TIMER_K);
        break;
      case C.STATUS_COMPLETED:
        break;
    }
  }
};


function InviteClientTransaction(request_sender, request, transport) {
  var via,
    tr = this;

  this.type = C.INVITE_CLIENT;
  this.transport = transport;
  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
  this.request_sender = request_sender;
  this.request = request;

  via = 'SIP/2.0/' + transport.via_transport;
  via += ' ' + request_sender.ua.configuration.via_host + ';branch=' + this.id;

  this.request.setHeader('via', via);

  this.request_sender.ua.newTransaction(this);

  // TODO: Adding here the cancel() method is a hack that must be fixed.
  // Add the cancel property to the request.
  //Will be called from the request instance, not the transaction itself.
  this.request.cancel = function(reason) {
    tr.cancel_request(tr, reason);
  };

  events.EventEmitter.call(this);
}

util.inherits(InviteClientTransaction, events.EventEmitter);

InviteClientTransaction.prototype.stateChanged = function(state) {
  this.state = state;
  this.emit('stateChanged');
};

InviteClientTransaction.prototype.send = function() {
  var tr = this;
  this.stateChanged(C.STATUS_CALLING);
  this.B = setTimeout(function() {
    tr.timer_B();
  }, Timers.TIMER_B);

  if(!this.transport.send(this.request)) {
    this.onTransportError();
  }
};

InviteClientTransaction.prototype.onTransportError = function() {
  clearTimeout(this.B);
  clearTimeout(this.D);
  clearTimeout(this.M);

  if (this.state !== C.STATUS_ACCEPTED) {
    debugict('transport error occurred, deleting transaction ' + this.id);
    this.request_sender.onTransportError();
  }

  this.stateChanged(C.STATUS_TERMINATED);
  this.request_sender.ua.destroyTransaction(this);
};

// RFC 6026 7.2
InviteClientTransaction.prototype.timer_M = function() {
  debugict('Timer M expired for transaction ' + this.id);

  if(this.state === C.STATUS_ACCEPTED) {
    clearTimeout(this.B);
    this.stateChanged(C.STATUS_TERMINATED);
    this.request_sender.ua.destroyTransaction(this);
  }
};

// RFC 3261 17.1.1
InviteClientTransaction.prototype.timer_B = function() {
  debugict('Timer B expired for transaction ' + this.id);
  if(this.state === C.STATUS_CALLING) {
    this.stateChanged(C.STATUS_TERMINATED);
    this.request_sender.ua.destroyTransaction(this);
    this.request_sender.onRequestTimeout();
  }
};

InviteClientTransaction.prototype.timer_D = function() {
  debugict('Timer D expired for transaction ' + this.id);
  clearTimeout(this.B);
  this.stateChanged(C.STATUS_TERMINATED);
  this.request_sender.ua.destroyTransaction(this);
};

InviteClientTransaction.prototype.sendACK = function(response) {
  var tr = this;

  this.ack = 'ACK ' + this.request.ruri + ' SIP/2.0\r\n';
  this.ack += 'Via: ' + this.request.headers.Via.toString() + '\r\n';

  if(this.request.headers.Route) {
    this.ack += 'Route: ' + this.request.headers.Route.toString() + '\r\n';
  }

  this.ack += 'To: ' + response.getHeader('to') + '\r\n';
  this.ack += 'From: ' + this.request.headers.From.toString() + '\r\n';
  this.ack += 'Call-ID: ' + this.request.headers['Call-ID'].toString() + '\r\n';
  this.ack += 'CSeq: ' + this.request.headers.CSeq.toString().split(' ')[0];
  this.ack += ' ACK\r\n';
  this.ack += 'Content-Length: 0\r\n\r\n';

  this.D = setTimeout(function() {tr.timer_D();}, Timers.TIMER_D);

  this.transport.send(this.ack);
};

InviteClientTransaction.prototype.cancel_request = function(tr, reason) {
  var request = tr.request;

  this.cancel = JsSIP_C.CANCEL + ' ' + request.ruri + ' SIP/2.0\r\n';
  this.cancel += 'Via: ' + request.headers.Via.toString() + '\r\n';

  if(this.request.headers.Route) {
    this.cancel += 'Route: ' + request.headers.Route.toString() + '\r\n';
  }

  this.cancel += 'To: ' + request.headers.To.toString() + '\r\n';
  this.cancel += 'From: ' + request.headers.From.toString() + '\r\n';
  this.cancel += 'Call-ID: ' + request.headers['Call-ID'].toString() + '\r\n';
  this.cancel += 'CSeq: ' + request.headers.CSeq.toString().split(' ')[0] +
  ' CANCEL\r\n';

  if(reason) {
    this.cancel += 'Reason: ' + reason + '\r\n';
  }

  this.cancel += 'Content-Length: 0\r\n\r\n';

  // Send only if a provisional response (>100) has been received.
  if(this.state === C.STATUS_PROCEEDING) {
    this.transport.send(this.cancel);
  }
};

InviteClientTransaction.prototype.receiveResponse = function(response) {
  var
  tr = this,
  status_code = response.status_code;

  if(status_code >= 100 && status_code <= 199) {
    switch(this.state) {
      case C.STATUS_CALLING:
        this.stateChanged(C.STATUS_PROCEEDING);
        this.request_sender.receiveResponse(response);
        break;
      case C.STATUS_PROCEEDING:
        this.request_sender.receiveResponse(response);
        break;
    }
  } else if(status_code >= 200 && status_code <= 299) {
    switch(this.state) {
      case C.STATUS_CALLING:
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_ACCEPTED);
        this.M = setTimeout(function() {
          tr.timer_M();
        }, Timers.TIMER_M);
        this.request_sender.receiveResponse(response);
        break;
      case C.STATUS_ACCEPTED:
        this.request_sender.receiveResponse(response);
        break;
    }
  } else if(status_code >= 300 && status_code <= 699) {
    switch(this.state) {
      case C.STATUS_CALLING:
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_COMPLETED);
        this.sendACK(response);
        this.request_sender.receiveResponse(response);
        break;
      case C.STATUS_COMPLETED:
        this.sendACK(response);
        break;
    }
  }
};


function AckClientTransaction(request_sender, request, transport) {
  var via;

  this.transport = transport;
  this.id = 'z9hG4bK' + Math.floor(Math.random() * 10000000);
  this.request_sender = request_sender;
  this.request = request;

  via = 'SIP/2.0/' + transport.via_transport;
  via += ' ' + request_sender.ua.configuration.via_host + ';branch=' + this.id;

  this.request.setHeader('via', via);

  events.EventEmitter.call(this);
}

util.inherits(AckClientTransaction, events.EventEmitter);

AckClientTransaction.prototype.send = function() {
  if(!this.transport.send(this.request)) {
    this.onTransportError();
  }
};

AckClientTransaction.prototype.onTransportError = function() {
  debugact('transport error occurred for transaction ' + this.id);
  this.request_sender.onTransportError();
};


function NonInviteServerTransaction(request, ua) {
  this.type = C.NON_INVITE_SERVER;
  this.id = request.via_branch;
  this.request = request;
  this.transport = request.transport;
  this.ua = ua;
  this.last_response = '';
  request.server_transaction = this;

  this.state = C.STATUS_TRYING;

  ua.newTransaction(this);

  events.EventEmitter.call(this);
}

util.inherits(NonInviteServerTransaction, events.EventEmitter);

NonInviteServerTransaction.prototype.stateChanged = function(state) {
  this.state = state;
  this.emit('stateChanged');
};

NonInviteServerTransaction.prototype.timer_J = function() {
  debugnist('Timer J expired for transaction ' + this.id);
  this.stateChanged(C.STATUS_TERMINATED);
  this.ua.destroyTransaction(this);
};

NonInviteServerTransaction.prototype.onTransportError = function() {
  if (!this.transportError) {
    this.transportError = true;

    debugnist('transport error occurred, deleting transaction ' + this.id);

    clearTimeout(this.J);
    this.stateChanged(C.STATUS_TERMINATED);
    this.ua.destroyTransaction(this);
  }
};

NonInviteServerTransaction.prototype.receiveResponse = function(status_code, response, onSuccess, onFailure) {
  var tr = this;

  if(status_code === 100) {
    /* RFC 4320 4.1
     * 'A SIP element MUST NOT
     * send any provisional response with a
     * Status-Code other than 100 to a non-INVITE request.'
     */
    switch(this.state) {
      case C.STATUS_TRYING:
        this.stateChanged(C.STATUS_PROCEEDING);
        if(!this.transport.send(response))  {
          this.onTransportError();
        }
        break;
      case C.STATUS_PROCEEDING:
        this.last_response = response;
        if(!this.transport.send(response)) {
          this.onTransportError();
          if (onFailure) {
            onFailure();
          }
        } else if (onSuccess) {
          onSuccess();
        }
        break;
    }
  } else if(status_code >= 200 && status_code <= 699) {
    switch(this.state) {
      case C.STATUS_TRYING:
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_COMPLETED);
        this.last_response = response;
        this.J = setTimeout(function() {
          tr.timer_J();
        }, Timers.TIMER_J);
        if(!this.transport.send(response)) {
          this.onTransportError();
          if (onFailure) {
            onFailure();
          }
        } else if (onSuccess) {
          onSuccess();
        }
        break;
      case C.STATUS_COMPLETED:
        break;
    }
  }
};


function InviteServerTransaction(request, ua) {
  this.type = C.INVITE_SERVER;
  this.id = request.via_branch;
  this.request = request;
  this.transport = request.transport;
  this.ua = ua;
  this.last_response = '';
  request.server_transaction = this;

  this.state = C.STATUS_PROCEEDING;

  ua.newTransaction(this);

  this.resendProvisionalTimer = null;

  request.reply(100);

  events.EventEmitter.call(this);
}

util.inherits(InviteServerTransaction, events.EventEmitter);

InviteServerTransaction.prototype.stateChanged = function(state) {
  this.state = state;
  this.emit('stateChanged');
};

InviteServerTransaction.prototype.timer_H = function() {
  debugist('Timer H expired for transaction ' + this.id);

  if(this.state === C.STATUS_COMPLETED) {
    debugist('ACK not received, dialog will be terminated');
  }

  this.stateChanged(C.STATUS_TERMINATED);
  this.ua.destroyTransaction(this);
};

InviteServerTransaction.prototype.timer_I = function() {
  this.stateChanged(C.STATUS_TERMINATED);
};

// RFC 6026 7.1
InviteServerTransaction.prototype.timer_L = function() {
  debugist('Timer L expired for transaction ' + this.id);

  if(this.state === C.STATUS_ACCEPTED) {
    this.stateChanged(C.STATUS_TERMINATED);
    this.ua.destroyTransaction(this);
  }
};

InviteServerTransaction.prototype.onTransportError = function() {
  if (!this.transportError) {
    this.transportError = true;

    debugist('transport error occurred, deleting transaction ' + this.id);

    if (this.resendProvisionalTimer !== null) {
      clearInterval(this.resendProvisionalTimer);
      this.resendProvisionalTimer = null;
    }

    clearTimeout(this.L);
    clearTimeout(this.H);
    clearTimeout(this.I);

    this.stateChanged(C.STATUS_TERMINATED);
    this.ua.destroyTransaction(this);
  }
};

InviteServerTransaction.prototype.resend_provisional = function() {
  if(!this.transport.send(this.last_response)) {
    this.onTransportError();
  }
};

// INVITE Server Transaction RFC 3261 17.2.1
InviteServerTransaction.prototype.receiveResponse = function(status_code, response, onSuccess, onFailure) {
  var tr = this;

  if(status_code >= 100 && status_code <= 199) {
    switch(this.state) {
      case C.STATUS_PROCEEDING:
        if(!this.transport.send(response)) {
          this.onTransportError();
        }
        this.last_response = response;
        break;
    }
  }

  if(status_code > 100 && status_code <= 199 && this.state === C.STATUS_PROCEEDING) {
    // Trigger the resendProvisionalTimer only for the first non 100 provisional response.
    if(this.resendProvisionalTimer === null) {
      this.resendProvisionalTimer = setInterval(function() {
        tr.resend_provisional();}, Timers.PROVISIONAL_RESPONSE_INTERVAL);
    }
  } else if(status_code >= 200 && status_code <= 299) {
    switch(this.state) {
      case C.STATUS_PROCEEDING:
        this.stateChanged(C.STATUS_ACCEPTED);
        this.last_response = response;
        this.L = setTimeout(function() {
          tr.timer_L();
        }, Timers.TIMER_L);

        if (this.resendProvisionalTimer !== null) {
          clearInterval(this.resendProvisionalTimer);
          this.resendProvisionalTimer = null;
        }
        /* falls through */
        case C.STATUS_ACCEPTED:
          // Note that this point will be reached for proceeding tr.state also.
          if(!this.transport.send(response)) {
            this.onTransportError();
            if (onFailure) {
              onFailure();
            }
          } else if (onSuccess) {
            onSuccess();
          }
          break;
    }
  } else if(status_code >= 300 && status_code <= 699) {
    switch(this.state) {
      case C.STATUS_PROCEEDING:
        if (this.resendProvisionalTimer !== null) {
          clearInterval(this.resendProvisionalTimer);
          this.resendProvisionalTimer = null;
        }

        if(!this.transport.send(response)) {
          this.onTransportError();
          if (onFailure) {
            onFailure();
          }
        } else {
          this.stateChanged(C.STATUS_COMPLETED);
          this.H = setTimeout(function() {
            tr.timer_H();
          }, Timers.TIMER_H);
          if (onSuccess) {
            onSuccess();
          }
        }
        break;
    }
  }
};

/**
 * INVITE:
 *  _true_ if retransmission
 *  _false_ new request
 *
 * ACK:
 *  _true_  ACK to non2xx response
 *  _false_ ACK must be passed to TU (accepted state)
 *          ACK to 2xx response
 *
 * CANCEL:
 *  _true_  no matching invite transaction
 *  _false_ matching invite transaction and no final response sent
 *
 * OTHER:
 *  _true_  retransmission
 *  _false_ new request
 */
function checkTransaction(ua, request) {
  var tr;

  switch(request.method) {
    case JsSIP_C.INVITE:
      tr = ua.transactions.ist[request.via_branch];
      if(tr) {
        switch(tr.state) {
          case C.STATUS_PROCEEDING:
            tr.transport.send(tr.last_response);
            break;

            // RFC 6026 7.1 Invite retransmission
            //received while in C.STATUS_ACCEPTED state. Absorb it.
          case C.STATUS_ACCEPTED:
            break;
        }
        return true;
      }
      break;
    case JsSIP_C.ACK:
      tr = ua.transactions.ist[request.via_branch];

      // RFC 6026 7.1
      if(tr) {
        if(tr.state === C.STATUS_ACCEPTED) {
          return false;
        } else if(tr.state === C.STATUS_COMPLETED) {
          tr.state = C.STATUS_CONFIRMED;
          tr.I = setTimeout(function() {tr.timer_I();}, Timers.TIMER_I);
          return true;
        }
      }
      // ACK to 2XX Response.
      else {
        return false;
      }
      break;
    case JsSIP_C.CANCEL:
      tr = ua.transactions.ist[request.via_branch];
      if(tr) {
        request.reply_sl(200);
        if(tr.state === C.STATUS_PROCEEDING) {
          return false;
        } else {
          return true;
        }
      } else {
        request.reply_sl(481);
        return true;
      }
      break;
    default:

      // Non-INVITE Server Transaction RFC 3261 17.2.2
      tr = ua.transactions.nist[request.via_branch];
      if(tr) {
        switch(tr.state) {
          case C.STATUS_TRYING:
            break;
          case C.STATUS_PROCEEDING:
          case C.STATUS_COMPLETED:
            tr.transport.send(tr.last_response);
            break;
        }
        return true;
      }
      break;
  }
}

},{"./Constants":1,"./Timers":20,"debug":33,"events":28,"util":32}],22:[function(require,module,exports){
module.exports = Transport;

/**
 * Dependencies.
 */
var Socket = require('./Socket');
var debug = require('debug')('JsSIP:Transport');
var debugerror = require('debug')('JsSIP:ERROR:Transport');

/**
 * Constants
 */
var C = {
  // Transport status
  STATUS_CONNECTED:           0,
  STATUS_CONNECTING:          1,
  STATUS_DISCONNECTED:        2,

  // Socket status
  SOCKET_STATUS_READY:        0,
  SOCKET_STATUS_ERROR:        1,

  // Recovery options
  recovery_options: {
    min_interval: 2, // minimum interval in seconds between recover attempts
    max_interval: 30 // maximum interval in seconds between recover attempts
  }
};

/*
 * Manages one or multiple JsSIP.Socket instances.
 * Is reponsible for transport recovery logic among all socket instances.
 *
 * @socket JsSIP::Socket instance
 */

function Transport(sockets, recovery_options) {
  debug('new()');

  this.status = C.STATUS_DISCONNECTED;

  // current socket
  this.socket = null;

  // socket collection
  this.sockets = [];

  this.recovery_options = recovery_options || C.recovery_options;
  this.recover_attempts = 0;
  this.recovery_timer = null;

  this.close_requested = false;

  if (typeof sockets === 'undefined') {
    throw new TypeError('Invalid argument.' +
                        ' undefined \'sockets\' argument');
  }

  if (!(sockets instanceof Array)) {
    sockets = [ sockets ];
  }

  sockets.forEach(function(socket) {
    if (!Socket.isSocket(socket.socket)) {
      throw new TypeError('Invalid argument.' +
                          ' invalid \'JsSIP.Socket\' instance');
    }

    if (socket.weight && !Number(socket.weight)) {
      throw new TypeError('Invalid argument.' +
                          ' \'weight\' attribute is not a number');
    }

    this.sockets.push({
      socket: socket.socket,
      weight: socket.weight || 0,
      status: C.SOCKET_STATUS_READY
    });
  }, this);

  // read only properties
  Object.defineProperties(this, {
    via_transport:   { get: function() { return this.socket.via_transport; } },
    url:      { get: function() { return this.socket.url;       } },
    sip_uri:  { get: function() { return this.socket.sip_uri;   } }
  });

  // get the socket with higher weight
  getSocket.call(this);
}

/**
 * Instance Methods
 */

Transport.prototype.connect = function() {
  debug('connect()');

  if (this.isConnected()) {
    debug('Transport is already connected');
    return;
  } else if (this.isConnecting()) {
    debug('Transport is connecting');
    return;
  }

  this.close_requested = false;
  this.status = C.STATUS_CONNECTING;
  this.onconnecting({ socket:this.socket, attempts:this.recover_attempts });

  if (!this.close_requested) {
    // bind socket event callbacks
    this.socket.onconnect     = onConnect.bind(this);
    this.socket.ondisconnect  = onDisconnect.bind(this);
    this.socket.ondata        = onData.bind(this);

    this.socket.connect();
  }

  return;
};

Transport.prototype.disconnect = function() {
  debug('close()');

  this.close_requested = true;
  this.recover_attempts = 0;
  this.status = C.STATUS_DISCONNECTED;

  // clear recovery_timer
  if (this.recovery_timer !== null) {
    clearTimeout(this.recovery_timer);
    this.recovery_timer = null;
  }

  // unbind socket event callbacks
  this.socket.onconnect     = function() {};
  this.socket.ondisconnect  = function() {};
  this.socket.ondata        = function() {};

  this.socket.disconnect();
  this.ondisconnect();
};

Transport.prototype.send = function(data) {
  debug('send()');

  if (!this.isConnected()) {
    debugerror('unable to send message, transport is not connected');
    return false;
  }

  var message = data.toString();

  debug('sending message:\n\n' + message + '\n');
  return this.socket.send(message);
};

Transport.prototype.isConnected = function() {
  return this.status === C.STATUS_CONNECTED;
};

Transport.prototype.isConnecting = function() {
  return this.status === C.STATUS_CONNECTING;
};

/**
 * Socket Event Handlers
 */

function onConnect() {
  this.recover_attempts = 0;
  this.status = C.STATUS_CONNECTED;

  // clear recovery_timer
  if (this.recovery_timer !== null) {
    clearTimeout(this.recovery_timer);
    this.recovery_timer = null;
  }

  this.onconnect( {socket:this} );
}

function onDisconnect(error, code, reason) {
  this.status = C.STATUS_DISCONNECTED;
  this.ondisconnect({ socket:this.socket, error:error, code:code, reason:reason });

  if (this.close_requested) {
    return;
  }

  // update socket status
  if (error) {
    this.socket.status = C.SOCKET_STATUS_ERROR;
  }

  reconnect.call(this, error);
}

function onData(data) {
  // CRLF Keep Alive response from server. Ignore it.
  if(data === '\r\n') {
    debug('received message with CRLF Keep Alive response');
    return;
  }

  // binary message.
  else if (typeof data !== 'string') {
    try {
      data = String.fromCharCode.apply(null, new Uint8Array(data));
    } catch(evt) {
      debug('received binary message failed to be converted into string,' +
            ' message discarded');
      return;
    }

    debug('received binary message:\n\n' + data + '\n');
  }

  // text message.
  else {
    debug('received text message:\n\n' + data + '\n');
  }

  this.ondata({ transport:this, message:data });
}

function reconnect() {
  var k,
  self = this;

  this.recover_attempts+=1;

  k = Math.floor((Math.random() * Math.pow(2,this.recover_attempts)) +1);

  if (k < this.recovery_options.min_interval) {
    k = this.recovery_options.min_interval;
  }

  else if (k > this.recovery_options.max_interval) {
    k = this.recovery_options.max_interval;
  }

  debug('reconnection attempt: '+ this.recover_attempts +
        '. next connection attempt in '+ k +' seconds');

  this.recovery_timer = setTimeout(function() {
    if (!self.close_requested && !(self.isConnected() || self.isConnecting())) {
      // get the next available socket with higher weight
      getSocket.call(self);

      // connect the socket
      self.connect();
    }
  }, k * 1000);
}

/**
 * get the next available socket with higher weight
 */
function getSocket() {

  var candidates = [];

  this.sockets.forEach(function(socket) {
    if (socket.status === C.SOCKET_STATUS_ERROR) {
      return; // continue the array iteration
    } else if (candidates.length === 0) {
      candidates.push(socket);
    } else if (socket.weight > candidates[0].weight) {
      candidates = [socket];
    } else if (socket.weight === candidates[0].weight) {
      candidates.push(socket);
    }
  });

  if (candidates.length === 0) {
    // all sockets have failed. reset sockets status
    this.sockets.forEach(function(socket) {
      socket.status = C.SOCKET_STATUS_READY;
    });

    // get next available socket
    getSocket.call(this);
    return;
  }

  var idx = Math.floor((Math.random()* candidates.length));
  this.socket = candidates[idx].socket;
}

},{"./Socket":19,"debug":33}],23:[function(require,module,exports){
module.exports = UA;


var C = {
  // UA status codes
  STATUS_INIT :                0,
  STATUS_READY:                1,
  STATUS_USER_CLOSED:          2,
  STATUS_NOT_READY:            3,

  // UA error codes
  CONFIGURATION_ERROR:  1,
  NETWORK_ERROR:        2
};

/**
 * Expose C object.
 */
UA.C = C;


/**
 * Dependencies.
 */
var util = require('util');
var events = require('events');
var debug = require('debug')('JsSIP:UA');
var debugerror = require('debug')('JsSIP:ERROR:UA');
debugerror.log = console.warn.bind(console);
var rtcninja = require('rtcninja');
var JsSIP_C = require('./Constants');
var Registrator = require('./Registrator');
var RTCSession = require('./RTCSession');
var Message = require('./Message');
var Transactions = require('./Transactions');
var Transport = require('./Transport');
var WebSocketInterface = require('./WebSocketInterface');
var Socket = require('./Socket');
var Utils = require('./Utils');
var Exceptions = require('./Exceptions');
var URI = require('./URI');
var Grammar = require('./Grammar');
var Parser = require('./Parser');
var SIPMessage = require('./SIPMessage');
var sanityCheck = require('./sanityCheck');



/**
 * The User-Agent class.
 * @class JsSIP.UA
 * @param {Object} configuration Configuration parameters.
 * @throws {JsSIP.Exceptions.ConfigurationError} If a configuration parameter is invalid.
 * @throws {TypeError} If no configuration is given.
 */
function UA(configuration) {
  debug('new() [configuration:%o]', configuration);

  this.cache = {
    credentials: {}
  };

  this.configuration = {};
  this.dynConfiguration = {};
  this.dialogs = {};

  //User actions outside any session/dialog (MESSAGE)
  this.applicants = {};

  this.sessions = {};
  this.transport = null;
  this.contact = null;
  this.status = C.STATUS_INIT;
  this.error = null;
  this.transactions = {
    nist: {},
    nict: {},
    ist: {},
    ict: {}
  };

  // Custom UA empty object for high level use
  this.data = {};

  Object.defineProperties(this, {
    transactionsCount: {
      get: function() {
        var type,
          transactions = ['nist','nict','ist','ict'],
          count = 0;

        for (type in transactions) {
          count += Object.keys(this.transactions[transactions[type]]).length;
        }

        return count;
      }
    },

    nictTransactionsCount: {
      get: function() {
        return Object.keys(this.transactions.nict).length;
      }
    },

    nistTransactionsCount: {
      get: function() {
        return Object.keys(this.transactions.nist).length;
      }
    },

    ictTransactionsCount: {
      get: function() {
        return Object.keys(this.transactions.ict).length;
      }
    },

    istTransactionsCount: {
      get: function() {
        return Object.keys(this.transactions.ist).length;
      }
    }
  });

  /**
   * Load configuration
   */

  if(configuration === undefined) {
    throw new TypeError('Not enough arguments');
  }

  try {
    this.loadConfig(configuration);
  } catch(e) {
    this.status = C.STATUS_NOT_READY;
    this.error = C.CONFIGURATION_ERROR;
    throw e;
  }

  // Initialize registrator
  this._registrator = new Registrator(this);

  events.EventEmitter.call(this);

  // Initialize rtcninja if not yet done.
  if (! rtcninja.called) {
    rtcninja();
  }
}

util.inherits(UA, events.EventEmitter);


//=================
//  High Level API
//=================

/**
 * Connect to the server if status = STATUS_INIT.
 * Resume UA after being closed.
 */
UA.prototype.start = function() {
  debug('start()');

  var self = this;

  function connect() {
    debug('restarting UA');
    self.status = C.STATUS_READY;
    self.transport.connect();
  }

  if (this.status === C.STATUS_INIT) {
    this.transport.connect();
  } else if(this.status === C.STATUS_USER_CLOSED) {
    if (!this.isConnected()) {
      connect();
    } else {
      this.once('disconnected', connect);
    }
  } else if (this.status === C.STATUS_READY) {
    debug('UA is in READY status, not restarted');
  } else {
    debug('ERROR: connection is down, Auto-Recovery system is trying to reconnect');
  }

  // Set dynamic configuration.
  this.dynConfiguration.register = this.configuration.register;
};

/**
 * Register.
 */
UA.prototype.register = function() {
  debug('register()');

  this.dynConfiguration.register = true;
  this._registrator.register();
};

/**
 * Unregister.
 */
UA.prototype.unregister = function(options) {
  debug('unregister()');

  this.dynConfiguration.register = false;
  this._registrator.unregister(options);
};

/**
 * Get the Registrator instance.
 */
UA.prototype.registrator = function() {
  return this._registrator;
};

/**
 * Registration state.
 */
UA.prototype.isRegistered = function() {
  if(this._registrator.registered) {
    return true;
  } else {
    return false;
  }
};

/**
 * Connection state.
 */
UA.prototype.isConnected = function() {
  return this.transport.isConnected();
};

/**
 * Make an outgoing call.
 *
 * -param {String} target
 * -param {Object} views
 * -param {Object} [options]
 *
 * -throws {TypeError}
 *
 */
UA.prototype.call = function(target, options) {
  debug('call()');

  var session;

  session = new RTCSession(this);
  session.connect(target, options);
  return session;
};

/**
 * Send a message.
 *
 * -param {String} target
 * -param {String} body
 * -param {Object} [options]
 *
 * -throws {TypeError}
 *
 */
UA.prototype.sendMessage = function(target, body, options) {
  debug('sendMessage()');

  var message;

  message = new Message(this);
  message.send(target, body, options);
  return message;
};

/**
 * Terminate ongoing sessions.
 */
UA.prototype.terminateSessions = function(options) {
  debug('terminateSessions()');

  for(var idx in this.sessions) {
    if (!this.sessions[idx].isEnded()) {
      this.sessions[idx].terminate(options);
    }
  }
};

/**
 * Gracefully close.
 *
 */
UA.prototype.stop = function() {
  debug('stop()');

  var session;
  var applicant;
  var num_sessions;
  var ua = this;

  // Remove dynamic settings.
  this.dynConfiguration = {};

  if(this.status === C.STATUS_USER_CLOSED) {
    debug('UA already closed');
    return;
  }

  // Close registrator
  this._registrator.close();

  // If there are session wait a bit so CANCEL/BYE can be sent and their responses received.
  num_sessions = Object.keys(this.sessions).length;

  // Run  _terminate_ on every Session
  for(session in this.sessions) {
    debug('closing session ' + session);
    try { this.sessions[session].terminate(); } catch(error) {}
  }

  // Run  _close_ on every applicant
  for(applicant in this.applicants) {
    try { this.applicants[applicant].close(); } catch(error) {}
  }

  this.status = C.STATUS_USER_CLOSED;

  if (this.nistTransactionsCount  === 0 &&
      this.nictTransactionsCount  === 0 &&
      this.ictTransactionsCount   === 0 &&
      this.istTransactionsCount   === 0 &&
      num_sessions === 0) {
    ua.transport.disconnect();
  }
  else {
    setTimeout(function() {
      ua.transport.disconnect();
    }, 2000);
  }
};

/**
 * Normalice a string into a valid SIP request URI
 * -param {String} target
 * -returns {JsSIP.URI|undefined}
 */
UA.prototype.normalizeTarget = function(target) {
  return Utils.normalizeTarget(target, this.configuration.hostport_params);
};

/**
 * Allow retrieving configuration and autogenerated fields in runtime.
 */
UA.prototype.get = function(parameter) {
  switch(parameter) {
    case 'realm':
      return this.configuration.realm;

    case 'ha1':
      return this.configuration.ha1;

    default:
      debugerror('get() | cannot get "%s" parameter in runtime', parameter);
      return undefined;
  }

  return true;
};

/**
 * Allow configuration changes in runtime.
 * Returns true if the parameter could be set.
 */
UA.prototype.set = function(parameter, value) {
  switch(parameter) {
    case 'password': {
      this.configuration.password = String(value);
      break;
    }

    case 'realm': {
      this.configuration.realm = String(value);
      break;
    }

    case 'ha1': {
      this.configuration.ha1 = String(value);
      // Delete the plain SIP password.
      this.configuration.password = null;
      break;
    }

    case 'display_name': {
      if (Grammar.parse('"' + value + '"', 'display_name') === -1) {
        debugerror('set() | wrong "display_name"');
        return false;
      }
      this.configuration.display_name = value;
      break;
    }

    default:
      debugerror('set() | cannot set "%s" parameter in runtime', parameter);
      return false;
  }

  return true;
};


//===============================
//  Private (For internal use)
//===============================

// UA.prototype.saveCredentials = function(credentials) {
//   this.cache.credentials[credentials.realm] = this.cache.credentials[credentials.realm] || {};
//   this.cache.credentials[credentials.realm][credentials.uri] = credentials;
// };

// UA.prototype.getCredentials = function(request) {
//   var realm, credentials;

//   realm = request.ruri.host;

//   if (this.cache.credentials[realm] && this.cache.credentials[realm][request.ruri]) {
//     credentials = this.cache.credentials[realm][request.ruri];
//     credentials.method = request.method;
//   }

//   return credentials;
// };


//==========================
// Event Handlers
//==========================

/**
 * new Transaction
 */
UA.prototype.newTransaction = function(transaction) {
  this.transactions[transaction.type][transaction.id] = transaction;
    this.emit('newTransaction', {
    transaction: transaction
  });
};


/**
 * Transaction destroyed.
 */
UA.prototype.destroyTransaction = function(transaction) {
  delete this.transactions[transaction.type][transaction.id];
    this.emit('transactionDestroyed', {
    transaction: transaction
  });
};


/**
 *  new Message
 */
UA.prototype.newMessage = function(data) {
  this.emit('newMessage', data);
};

/**
 * new RTCSession
 */
UA.prototype.newRTCSession = function(data) {
  this.emit('newRTCSession', data);
};

/**
 * Registered
 */
UA.prototype.registered = function(data) {
  this.emit('registered', data);
};


/**
 * Unregistered
 */
UA.prototype.unregistered = function(data) {
  this.emit('unregistered', data);
};


/**
 * Registration Failed
 */
UA.prototype.registrationFailed = function(data) {
  this.emit('registrationFailed', data);
};


//=========================
// receiveRequest
//=========================

/**
 * Request reception
 */
UA.prototype.receiveRequest = function(request) {
  var dialog, session, message, replaces,
  method = request.method;

  // Check that request URI points to us
  if(request.ruri.user !== this.configuration.uri.user && request.ruri.user !== this.contact.uri.user) {
    debug('Request-URI does not point to us');
    if (request.method !== JsSIP_C.ACK) {
      request.reply_sl(404);
    }
    return;
    }

    // Check request URI scheme
    if(request.ruri.scheme === JsSIP_C.SIPS) {
    request.reply_sl(416);
    return;
  }

  // Check transaction
  if(Transactions.checkTransaction(this, request)) {
    return;
  }

  // Create the server transaction
  if(method === JsSIP_C.INVITE) {
    new Transactions.InviteServerTransaction(request, this);
  } else if(method !== JsSIP_C.ACK && method !== JsSIP_C.CANCEL) {
    new Transactions.NonInviteServerTransaction(request, this);
  }

  /* RFC3261 12.2.2
   * Requests that do not change in any way the state of a dialog may be
   * received within a dialog (for example, an OPTIONS request).
   * They are processed as if they had been received outside the dialog.
   */
  if(method === JsSIP_C.OPTIONS) {
    request.reply(200);
  } else if (method === JsSIP_C.MESSAGE) {
    if (this.listeners('newMessage').length === 0) {
      request.reply(405);
      return;
    }
    message = new Message(this);
    message.init_incoming(request);
  } else if (method === JsSIP_C.INVITE) {
    // Initial INVITE
    if(!request.to_tag && this.listeners('newRTCSession').length === 0) {
      request.reply(405);
      return;
    }
  }

  // Initial Request
  if(!request.to_tag) {
    switch(method) {
      case JsSIP_C.INVITE:
        if (rtcninja.hasWebRTC()) {
          if (request.hasHeader('replaces')) {
            replaces = request.replaces;
            dialog = this.findDialog(replaces.call_id, replaces.from_tag, replaces.to_tag);
            if (dialog) {
              session = dialog.owner;
              if (!session.isEnded()) {
                session.receiveRequest(request);
              } else {
                request.reply(603);
              }
            } else {
              request.reply(481);
            }
          } else {
            session = new RTCSession(this);
            session.init_incoming(request);
          }
        } else {
          debug('INVITE received but WebRTC is not supported');
          request.reply(488);
        }
        break;
      case JsSIP_C.BYE:
        // Out of dialog BYE received
        request.reply(481);
        break;
        case JsSIP_C.CANCEL:
        session = this.findSession(request);
        if (session) {
          session.receiveRequest(request);
        } else {
          debug('received CANCEL request for a non existent session');
        }
        break;
      case JsSIP_C.ACK:
        /* Absorb it.
         * ACK request without a corresponding Invite Transaction
         * and without To tag.
         */
        break;
        default:
        request.reply(405);
        break;
    }
  }
  // In-dialog request
  else {
    dialog = this.findDialog(request.call_id, request.from_tag, request.to_tag);

    if(dialog) {
      dialog.receiveRequest(request);
    } else if (method === JsSIP_C.NOTIFY) {
      session = this.findSession(request);
      if(session) {
        session.receiveRequest(request);
      } else {
        debug('received NOTIFY request for a non existent subscription');
        request.reply(481, 'Subscription does not exist');
      }
    }
    /* RFC3261 12.2.2
     * Request with to tag, but no matching dialog found.
     * Exception: ACK for an Invite request for which a dialog has not
     * been created.
     */
    else {
      if(method !== JsSIP_C.ACK) {
        request.reply(481);
      }
    }
  }
};

//=================
// Utils
//=================

/**
 * Get the session to which the request belongs to, if any.
 */
UA.prototype.findSession = function(request) {
  var
  sessionIDa = request.call_id + request.from_tag,
  sessionA = this.sessions[sessionIDa],
  sessionIDb = request.call_id + request.to_tag,
  sessionB = this.sessions[sessionIDb];

  if(sessionA) {
    return sessionA;
  } else if(sessionB) {
    return sessionB;
  } else {
    return null;
  }
};

/**
 * Get the dialog to which the request belongs to, if any.
 */
UA.prototype.findDialog = function(call_id, from_tag, to_tag) {
  var
  id = call_id + from_tag + to_tag,
  dialog = this.dialogs[id];

  if(dialog) {
    return dialog;
  } else {
    id = call_id + to_tag + from_tag;
    dialog = this.dialogs[id];
    if(dialog) {
      return dialog;
    } else {
      return null;
    }
  }
};

UA.prototype.loadConfig = function(configuration) {
  // Settings and default values
  var parameter, value, checked_value, hostport_params, registrar_server,
  settings = {
    /* Host address
    * Value to be set in Via sent_by and host part of Contact FQDN
    */
    via_host: Utils.createRandomToken(12) + '.invalid',

    // SIP Contact URI
    contact_uri: null,

    // SIP authentication password
    password: null,

    // SIP authentication realm
    realm: null,

    // SIP authentication HA1 hash
    ha1: null,

    // Registration parameters
    register_expires: 600,
    register: true,
    registrar_server: null,

    use_preloaded_route: false,

    // Session parameters
    no_answer_timeout: 60,
    session_timers: true,
  };

  // Pre-Configuration

  // Check Mandatory parameters
  for(parameter in UA.configuration_check.mandatory) {
    if(!configuration.hasOwnProperty(parameter)) {
      throw new Exceptions.ConfigurationError(parameter);
    } else {
      value = configuration[parameter];
      checked_value = UA.configuration_check.mandatory[parameter].call(this, value);
      if (checked_value !== undefined) {
        settings[parameter] = checked_value;
      } else {
        throw new Exceptions.ConfigurationError(parameter, value);
      }
    }
  }

  // Check Optional parameters
  for(parameter in UA.configuration_check.optional) {
    if(configuration.hasOwnProperty(parameter)) {
      value = configuration[parameter];

      /* If the parameter value is null, empty string, undefined, empty array
       * or it's a number with NaN value, then apply its default value.
       */
      if (Utils.isEmpty(value)) {
        continue;
      }

      checked_value = UA.configuration_check.optional[parameter].call(this, value, configuration);
      if (checked_value !== undefined) {
        settings[parameter] = checked_value;
      } else {
        throw new Exceptions.ConfigurationError(parameter, value);
      }
    }
  }

  // Post Configuration Process

  // Allow passing 0 number as display_name.
  if (settings.display_name === 0) {
    settings.display_name = '0';
  }

  // Instance-id for GRUU.
  if (!settings.instance_id) {
    settings.instance_id = Utils.newUUID();
  }

  // jssip_id instance parameter. Static random tag of length 5.
  settings.jssip_id = Utils.createRandomToken(5);

  // String containing settings.uri without scheme and user.
  hostport_params = settings.uri.clone();
  hostport_params.user = null;
  settings.hostport_params = hostport_params.toString().replace(/^sip:/i, '');

  // Transport
  var sockets = [];
  if (settings.ws_servers && Array.isArray(settings.ws_servers)) {
    sockets = sockets.concat(settings.ws_servers);
  }

  if (settings.sockets && Array.isArray(settings.sockets)) {
    sockets = sockets.concat(settings.sockets);
  }

  if (sockets.length === 0) {
    throw new Exceptions.ConfigurationError('sockets');
  }

  try {
    this.transport = new Transport(sockets, { /* recovery options */
      max_interval: settings.connection_recovery_max_interval,
      min_interval: settings.connection_recovery_min_interval
    });

    // Transport event callbacks
    this.transport.onconnecting = onTransportConnecting.bind(this);
    this.transport.onconnect    = onTransportConnect.bind(this);
    this.transport.ondisconnect = onTransportDisconnect.bind(this);
    this.transport.ondata       = onTransportData.bind(this);

    // transport options not needed here anymore
    delete settings.connection_recovery_max_interval;
    delete settings.connection_recovery_min_interval;
    delete settings.ws_servers;
    delete settings.sockets;
  } catch (e) {
    debugerror(e);
    throw new Exceptions.ConfigurationError('sockets', sockets);
  }

  // Check whether authorization_user is explicitly defined.
  // Take 'settings.uri.user' value if not.
  if (!settings.authorization_user) {
    settings.authorization_user = settings.uri.user;
  }

  // If no 'registrar_server' is set use the 'uri' value without user portion and
  // without URI params/headers.
  if (!settings.registrar_server) {
    registrar_server = settings.uri.clone();
    registrar_server.user = null;
    registrar_server.clearParams();
    registrar_server.clearHeaders();
    settings.registrar_server = registrar_server;
  }

  // User no_answer_timeout.
  settings.no_answer_timeout = settings.no_answer_timeout * 1000;

  // Via Host
  if (settings.contact_uri) {
    settings.via_host = settings.contact_uri.host;
  }

  // Contact URI
  else {
    settings.contact_uri = new URI('sip', Utils.createRandomToken(8), settings.via_host, null, {transport: 'ws'});
  }

  this.contact = {
    pub_gruu: null,
    temp_gruu: null,
    uri: settings.contact_uri,
    toString: function(options) {
      options = options || {};

      var
      anonymous = options.anonymous || null,
      outbound = options.outbound || null,
      contact = '<';

      if (anonymous) {
        contact += this.temp_gruu || 'sip:anonymous@anonymous.invalid;transport=ws';
      } else {
        contact += this.pub_gruu || this.uri.toString();
      }

      if (outbound && (anonymous ? !this.temp_gruu : !this.pub_gruu)) {
        contact += ';ob';
      }

      contact += '>';

      return contact;
    }
  };

  // Fill the value of the configuration_skeleton
  for(parameter in settings) {
    UA.configuration_skeleton[parameter].value = settings[parameter];
  }

  Object.defineProperties(this.configuration, UA.configuration_skeleton);

  // Clean UA.configuration_skeleton
  for(parameter in settings) {
    UA.configuration_skeleton[parameter].value = '';
  }

  debug('configuration parameters after validation:');
  for(parameter in settings) {
    switch(parameter) {
      case 'uri':
      case 'registrar_server':
        debug('- ' + parameter + ': ' + settings[parameter]);
        break;
      case 'password':
      case 'ha1':
        debug('- ' + parameter + ': ' + 'NOT SHOWN');
        break;
      default:
        debug('- ' + parameter + ': ' + JSON.stringify(settings[parameter]));
    }
  }

  return;
};

/**
 * Configuration Object skeleton.
 */
UA.configuration_skeleton = (function() {
  var
    idx, parameter, writable,
    skeleton = {},
    parameters = [
      // Internal parameters
      'jssip_id',
      'hostport_params',

      // Mandatory user configurable parameters
      'uri',

      // Optional user configurable parameters
      'authorization_user',
      'contact_uri',
      'display_name',
      'instance_id',
      'no_answer_timeout', // 30 seconds
      'session_timers', // true
      'password',
      'realm',
      'ha1',
      'register_expires', // 600 seconds
      'registrar_server',
      'sockets',
      'use_preloaded_route',
      'ws_servers',


      // Post-configuration generated parameters
      'via_core_value',
      'via_host'
    ];

  var writable_parameters = [
    'password', 'realm', 'ha1', 'display_name'
  ];

  for(idx in parameters) {
    parameter = parameters[idx];

    if (writable_parameters.indexOf(parameter) !== -1) {
      writable = true;
    } else {
      writable = false;
    }

    skeleton[parameter] = {
      value: '',
      writable: writable,
      configurable: false
    };
  }

  skeleton.register = {
    value: '',
    writable: true,
    configurable: false
  };

  return skeleton;
}());

/**
 * Configuration checker.
 */
UA.configuration_check = {
  mandatory: {

    uri: function(uri) {
      var parsed;

      if (!/^sip:/i.test(uri)) {
        uri = JsSIP_C.SIP + ':' + uri;
      }
      parsed = URI.parse(uri);

      if(!parsed) {
        return;
      } else if(!parsed.user) {
        return;
      } else {
        return parsed;
      }
    }
  },

  optional: {

    authorization_user: function(authorization_user) {
      if(Grammar.parse('"'+ authorization_user +'"', 'quoted_string') === -1) {
        return;
      } else {
        return authorization_user;
      }
    },

    connection_recovery_max_interval: function(connection_recovery_max_interval) {
      var value;
      if(Utils.isDecimal(connection_recovery_max_interval)) {
        value = Number(connection_recovery_max_interval);
        if(value > 0) {
          return value;
        }
      }
    },

    connection_recovery_min_interval: function(connection_recovery_min_interval) {
      var value;
      if(Utils.isDecimal(connection_recovery_min_interval)) {
        value = Number(connection_recovery_min_interval);
        if(value > 0) {
          return value;
        }
      }
    },

    contact_uri: function(contact_uri) {
      if (typeof contact_uri === 'string') {
        var uri = Grammar.parse(contact_uri,'SIP_URI');
        if (uri !== -1) {
          return uri;
        }
      }
    },

    display_name: function(display_name) {
      if (Grammar.parse('"' + display_name + '"', 'display_name') === -1) {
        return;
      } else {
        return display_name;
      }
    },

    instance_id: function(instance_id) {
      if ((/^uuid:/i.test(instance_id))) {
        instance_id = instance_id.substr(5);
      }

      if(Grammar.parse(instance_id, 'uuid') === -1) {
        return;
      } else {
        return instance_id;
      }
    },

    no_answer_timeout: function(no_answer_timeout) {
      var value;
      if (Utils.isDecimal(no_answer_timeout)) {
        value = Number(no_answer_timeout);
        if (value > 0) {
          return value;
        }
      }
    },

    session_timers: function(session_timers) {
      if (typeof session_timers === 'boolean') {
        return session_timers;
      }
    },

    password: function(password) {
      return String(password);
    },

    realm: function(realm) {
      return String(realm);
    },

    ha1: function(ha1) {
      return String(ha1);
    },

    register: function(register) {
      if (typeof register === 'boolean') {
        return register;
      }
    },

    register_expires: function(register_expires) {
      var value;
      if (Utils.isDecimal(register_expires)) {
        value = Number(register_expires);
        if (value > 0) {
          return value;
        }
      }
    },

    registrar_server: function(registrar_server) {
      var parsed;

      if (!/^sip:/i.test(registrar_server)) {
        registrar_server = JsSIP_C.SIP + ':' + registrar_server;
      }
      parsed = URI.parse(registrar_server);

      if(!parsed) {
        return;
      } else if(parsed.user) {
        return;
      } else {
        return parsed;
      }
    },

    sockets: function(sockets) {
      var idx, length;

      /* Allow defining sockets parameter as:
       *  Socket: socket
       *  Array of Socket: [socket1, socket2]
       *  Array of Objects: [{socket: socket1, weight:1}, {socket: Socket2, weight:0}]
       *  Array of Objects and Socket: [{socket: socket1}, socket2]
       */
      if (Socket.isSocket(sockets)) {
        sockets = [{socket: sockets}];
      } else if (Array.isArray(sockets) && sockets.length) {
        length = sockets.length;
        for (idx = 0; idx < length; idx++) {
          if (Socket.isSocket(sockets[idx])) {
            sockets[idx] = {socket: sockets[idx]};
          }
        }
      } else {
        return;
      }

      return sockets;
    },

    use_preloaded_route: function(use_preloaded_route) {
      if (typeof use_preloaded_route === 'boolean') {
        return use_preloaded_route;
      }
    },

    ws_servers: function(ws_servers) {
      var idx, length, sockets = [];

      /* Allow defining ws_servers parameter as:
       *  String: "host"
       *  Array of Strings: ["host1", "host2"]
       *  Array of Objects: [{ws_uri:"host1", weight:1}, {ws_uri:"host2", weight:0}]
       *  Array of Objects and Strings: [{ws_uri:"host1"}, "host2"]
       */
      if (typeof ws_servers === 'string') {
        ws_servers = [{ws_uri: ws_servers}];
      } else if (Array.isArray(ws_servers) && ws_servers.length) {
        length = ws_servers.length;
        for (idx = 0; idx < length; idx++) {
          if (typeof ws_servers[idx] === 'string') {
            ws_servers[idx] = {ws_uri: ws_servers[idx]};
          }
        }
      } else {
        return;
      }

      length = ws_servers.length;
      for (idx = 0; idx < length; idx++) {
        try {
          sockets.push({
            socket: new WebSocketInterface(ws_servers[idx].ws_uri),
            weight: ws_servers[idx].weight || 0
          });
        } catch(e) {
          debugerror(e);
          return;
        }
      }

      return sockets;
    }
  }
};

/**
 * Transport event handlers
 */

// Transport connecting event
function onTransportConnecting(data) {
  this.emit('connecting', data);
}

// Transport connected event.
function onTransportConnect(data) {
  if(this.status === C.STATUS_USER_CLOSED) {
    return;
  }

  this.status = C.STATUS_READY;
  this.error = null;

  this.emit('connected', data);

  if(this.dynConfiguration.register) {
    this._registrator.register();
  }
}

// Transport disconnected event.
function onTransportDisconnect(data) {
  // Run _onTransportError_ callback on every client transaction using _transport_
  var type, idx, length,
  client_transactions = ['nict', 'ict', 'nist', 'ist'];

  length = client_transactions.length;
  for (type = 0; type < length; type++) {
    for(idx in this.transactions[client_transactions[type]]) {
      this.transactions[client_transactions[type]][idx].onTransportError();
    }
  }

  this.emit('disconnected', data);

  // Call registrator _onTransportClosed_
  this._registrator.onTransportClosed();

  if (this.status !== C.STATUS_USER_CLOSED) {
    this.status = C.STATUS_NOT_READY;
    this.error = C.NETWORK_ERROR;
  }
}

// Transport data event
function onTransportData(data) {
 var transaction,
  transport = data.transport,
  message = data.message;

 message = Parser.parseMessage(message, this);

 if (! message) {
   return;
 }

 if (this.status === UA.C.STATUS_USER_CLOSED &&
     message instanceof SIPMessage.IncomingRequest) {
   return;
 }

 // Do some sanity check
 if(! sanityCheck(message, this, transport)) {
   return;
 }

 if(message instanceof SIPMessage.IncomingRequest) {
   message.transport = transport;
   this.receiveRequest(message);
 } else if(message instanceof SIPMessage.IncomingResponse) {
   /* Unike stated in 18.1.2, if a response does not match
   * any transaction, it is discarded here and no passed to the core
   * in order to be discarded there.
   */
   switch(message.method) {
     case JsSIP_C.INVITE:
       transaction = this.transactions.ict[message.via_branch];
       if(transaction) {
         transaction.receiveResponse(message);
       }
       break;
     case JsSIP_C.ACK:
       // Just in case ;-)
       break;
     default:
       transaction = this.transactions.nict[message.via_branch];
       if(transaction) {
         transaction.receiveResponse(message);
       }
       break;
   }
 }
}

},{"./Constants":1,"./Exceptions":5,"./Grammar":6,"./Message":8,"./Parser":10,"./RTCSession":11,"./Registrator":16,"./SIPMessage":18,"./Socket":19,"./Transactions":21,"./Transport":22,"./URI":24,"./Utils":25,"./WebSocketInterface":26,"./sanityCheck":27,"debug":33,"events":28,"rtcninja":43,"util":32}],24:[function(require,module,exports){
module.exports = URI;


/**
 * Dependencies.
 */
var JsSIP_C = require('./Constants');
var Utils = require('./Utils');
var Grammar = require('./Grammar');


/**
 * -param {String} [scheme]
 * -param {String} [user]
 * -param {String} host
 * -param {String} [port]
 * -param {Object} [parameters]
 * -param {Object} [headers]
 *
 */
function URI(scheme, user, host, port, parameters, headers) {
  var param, header;

  // Checks
  if(!host) {
    throw new TypeError('missing or invalid "host" parameter');
  }

  // Initialize parameters
  scheme = scheme || JsSIP_C.SIP;
  this.parameters = {};
  this.headers = {};

  for (param in parameters) {
    this.setParam(param, parameters[param]);
  }

  for (header in headers) {
    this.setHeader(header, headers[header]);
  }

  Object.defineProperties(this, {
    scheme: {
      get: function(){ return scheme; },
      set: function(value){
        scheme = value.toLowerCase();
      }
    },

    user: {
      get: function(){ return user; },
      set: function(value){
        user = value;
      }
    },

    host: {
      get: function(){ return host; },
      set: function(value){
        host = value.toLowerCase();
      }
    },

    port: {
      get: function(){ return port; },
      set: function(value){
        port = value === 0 ? value : (parseInt(value,10) || null);
      }
    }
  });
}


URI.prototype = {
  setParam: function(key, value) {
    if(key) {
      this.parameters[key.toLowerCase()] = (typeof value === 'undefined' || value === null) ? null : value.toString();
    }
  },

  getParam: function(key) {
    if(key) {
      return this.parameters[key.toLowerCase()];
    }
  },

  hasParam: function(key) {
    if(key) {
      return (this.parameters.hasOwnProperty(key.toLowerCase()) && true) || false;
    }
  },

  deleteParam: function(parameter) {
    var value;
    parameter = parameter.toLowerCase();
    if (this.parameters.hasOwnProperty(parameter)) {
      value = this.parameters[parameter];
      delete this.parameters[parameter];
      return value;
    }
  },

  clearParams: function() {
    this.parameters = {};
  },

  setHeader: function(name, value) {
    this.headers[Utils.headerize(name)] = (Array.isArray(value)) ? value : [value];
  },

  getHeader: function(name) {
    if(name) {
      return this.headers[Utils.headerize(name)];
    }
  },

  hasHeader: function(name) {
    if(name) {
      return (this.headers.hasOwnProperty(Utils.headerize(name)) && true) || false;
    }
  },

  deleteHeader: function(header) {
    var value;
    header = Utils.headerize(header);
    if(this.headers.hasOwnProperty(header)) {
      value = this.headers[header];
      delete this.headers[header];
      return value;
    }
  },

  clearHeaders: function() {
    this.headers = {};
  },

  clone: function() {
    return new URI(
      this.scheme,
      this.user,
      this.host,
      this.port,
      JSON.parse(JSON.stringify(this.parameters)),
      JSON.parse(JSON.stringify(this.headers)));
  },

  toString: function(){
    var header, parameter, idx, uri,
      headers = [];

    uri  = this.scheme + ':';
    if (this.user) {
      uri += Utils.escapeUser(this.user) + '@';
    }
    uri += this.host;
    if (this.port || this.port === 0) {
      uri += ':' + this.port;
    }

    for (parameter in this.parameters) {
      uri += ';' + parameter;

      if (this.parameters[parameter] !== null) {
        uri += '='+ this.parameters[parameter];
      }
    }

    for(header in this.headers) {
      for(idx = 0; idx < this.headers[header].length; idx++) {
        headers.push(header + '=' + this.headers[header][idx]);
      }
    }

    if (headers.length > 0) {
      uri += '?' + headers.join('&');
    }

    return uri;
  },

  toAor: function(show_port){
      var aor;

      aor  = this.scheme + ':';
      if (this.user) {
        aor += Utils.escapeUser(this.user) + '@';
      }
      aor += this.host;
      if (show_port && (this.port || this.port === 0)) {
        aor += ':' + this.port;
      }

      return aor;
  }
};


/**
  * Parse the given string and returns a JsSIP.URI instance or undefined if
  * it is an invalid URI.
  */
URI.parse = function(uri) {
  uri = Grammar.parse(uri,'SIP_URI');

  if (uri !== -1) {
    return uri;
  } else {
    return undefined;
  }
};

},{"./Constants":1,"./Grammar":6,"./Utils":25}],25:[function(require,module,exports){
var Utils = {};

module.exports = Utils;


/**
 * Dependencies.
 */
var JsSIP_C = require('./Constants');
var URI = require('./URI');
var Grammar = require('./Grammar');


Utils.str_utf8_length = function(string) {
  return unescape(encodeURIComponent(string)).length;
};

Utils.isFunction = function(fn) {
  if (fn !== undefined) {
    return (Object.prototype.toString.call(fn) === '[object Function]')? true : false;
  } else {
    return false;
  }
};

Utils.isString = function(str) {
  if (str !== undefined) {
    return (Object.prototype.toString.call(str) === '[object String]')? true : false;
  } else {
    return false;
  }
};

Utils.isDecimal = function(num) {
  return !isNaN(num) && (parseFloat(num) === parseInt(num,10));
};

Utils.isEmpty = function(value) {
  if (value === null || value === '' || value === undefined || (Array.isArray(value) && value.length === 0) || (typeof(value) === 'number' && isNaN(value))) {
    return true;
  }
};

Utils.hasMethods = function(obj /*, method list as strings */){
  var i = 1, methodName;
  while((methodName = arguments[i++])){
    if(this.isFunction(obj[methodName])) {
      return false;
    }
  }
  return true;
};

Utils.createRandomToken = function(size, base) {
  var i, r,
    token = '';

  base = base || 32;

  for( i=0; i < size; i++ ) {
    r = Math.random() * base|0;
    token += r.toString(base);
  }
  return token;
};

Utils.newTag = function() {
  return Utils.createRandomToken(10);
};

// http://stackoverflow.com/users/109538/broofa
Utils.newUUID = function() {
  var UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  return UUID;
};

Utils.hostType = function(host) {
  if (!host) {
    return;
  } else {
    host = Grammar.parse(host,'host');
    if (host !== -1) {
      return host.host_type;
    }
  }
};

/**
* Normalize SIP URI.
* NOTE: It does not allow a SIP URI without username.
* Accepts 'sip', 'sips' and 'tel' URIs and convert them into 'sip'.
* Detects the domain part (if given) and properly hex-escapes the user portion.
* If the user portion has only 'tel' number symbols the user portion is clean of 'tel' visual separators.
*/
Utils.normalizeTarget = function(target, domain) {
  var uri, target_array, target_user, target_domain;

  // If no target is given then raise an error.
  if (!target) {
    return;
  // If a URI instance is given then return it.
  } else if (target instanceof URI) {
    return target;

  // If a string is given split it by '@':
  // - Last fragment is the desired domain.
  // - Otherwise append the given domain argument.
  } else if (typeof target === 'string') {
    target_array = target.split('@');

    switch(target_array.length) {
      case 1:
        if (!domain) {
          return;
        }
        target_user = target;
        target_domain = domain;
        break;
      case 2:
        target_user = target_array[0];
        target_domain = target_array[1];
        break;
      default:
        target_user = target_array.slice(0, target_array.length-1).join('@');
        target_domain = target_array[target_array.length-1];
    }

    // Remove the URI scheme (if present).
    target_user = target_user.replace(/^(sips?|tel):/i, '');

    // Remove 'tel' visual separators if the user portion just contains 'tel' number symbols.
    if (/^[\-\.\(\)]*\+?[0-9\-\.\(\)]+$/.test(target_user)) {
      target_user = target_user.replace(/[\-\.\(\)]/g, '');
    }

    // Build the complete SIP URI.
    target = JsSIP_C.SIP + ':' + Utils.escapeUser(target_user) + '@' + target_domain;

    // Finally parse the resulting URI.
    if ((uri = URI.parse(target))) {
      return uri;
    } else {
      return;
    }
  } else {
    return;
  }
};

/**
* Hex-escape a SIP URI user.
*/
Utils.escapeUser = function(user) {
  // Don't hex-escape ':' (%3A), '+' (%2B), '?' (%3F"), '/' (%2F).
  return encodeURIComponent(decodeURIComponent(user)).replace(/%3A/ig, ':').replace(/%2B/ig, '+').replace(/%3F/ig, '?').replace(/%2F/ig, '/');
};

Utils.headerize = function(string) {
  var exceptions = {
    'Call-Id': 'Call-ID',
    'Cseq': 'CSeq',
    'Www-Authenticate': 'WWW-Authenticate'
    },
    name = string.toLowerCase().replace(/_/g,'-').split('-'),
    hname = '',
    parts = name.length, part;

  for (part = 0; part < parts; part++) {
    if (part !== 0) {
      hname +='-';
    }
    hname += name[part].charAt(0).toUpperCase()+name[part].substring(1);
  }
  if (exceptions[hname]) {
    hname = exceptions[hname];
  }
  return hname;
};

Utils.sipErrorCause = function(status_code) {
  var cause;

  for (cause in JsSIP_C.SIP_ERROR_CAUSES) {
    if (JsSIP_C.SIP_ERROR_CAUSES[cause].indexOf(status_code) !== -1) {
      return JsSIP_C.causes[cause];
    }
  }

  return JsSIP_C.causes.SIP_FAILURE_CODE;
};

/**
* Generate a random Test-Net IP (http://tools.ietf.org/html/rfc5735)
*/
Utils.getRandomTestNetIP = function() {
  function getOctet(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
  }
  return '192.0.2.' + getOctet(1, 254);
};

// MD5 (Message-Digest Algorithm) http://www.webtoolkit.info
Utils.calculateMD5 = function(string) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }

  function addUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function doF(x,y,z) {
    return (x & y) | ((~x) & z);
  }

  function doG(x,y,z) {
    return (x & z) | (y & (~z));
  }

  function doH(x,y,z) {
    return (x ^ y ^ z);
  }

  function doI(x,y,z) {
    return (y ^ (x | (~z)));
  }

  function doFF(a,b,c,d,x,s,ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(doF(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function doGG(a,b,c,d,x,s,ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(doG(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function doHH(a,b,c,d,x,s,ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(doH(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function doII(a,b,c,d,x,s,ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(doI(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray = new Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  }

  function wordToHex(lValue) {
    var wordToHexValue='',wordToHexValue_temp='',lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
    }
    return wordToHexValue;
  }

  function utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  var x=[];
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;

  string = utf8Encode(string);

  x = convertToWordArray(string);

  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

  for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=doFF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=doFF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=doFF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=doFF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=doFF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=doFF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=doFF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=doFF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=doFF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=doFF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=doFF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=doFF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=doFF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=doFF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=doFF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=doFF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=doGG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=doGG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=doGG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=doGG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=doGG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=doGG(d,a,b,c,x[k+10],S22,0x2441453);
    c=doGG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=doGG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=doGG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=doGG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=doGG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=doGG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=doGG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=doGG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=doGG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=doGG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=doHH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=doHH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=doHH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=doHH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=doHH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=doHH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=doHH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=doHH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=doHH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=doHH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=doHH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=doHH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=doHH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=doHH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=doHH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=doHH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=doII(a,b,c,d,x[k+0], S41,0xF4292244);
    d=doII(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=doII(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=doII(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=doII(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=doII(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=doII(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=doII(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=doII(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=doII(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=doII(c,d,a,b,x[k+6], S43,0xA3014314);
    b=doII(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=doII(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=doII(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=doII(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=doII(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=addUnsigned(a,AA);
    b=addUnsigned(b,BB);
    c=addUnsigned(c,CC);
    d=addUnsigned(d,DD);
  }

  var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);

  return temp.toLowerCase();
};

},{"./Constants":1,"./Grammar":6,"./URI":24}],26:[function(require,module,exports){
module.exports = WebSocketInterface;

/**
 * Dependencies.
 */
var Grammar = require('./Grammar');
var debug = require('debug')('JsSIP:WebSocketInterface');
var debugerror = require('debug')('JsSIP:ERROR:WebSocketInterface');
debugerror.log = console.warn.bind(console);

function WebSocketInterface(url) {
  debug('new() [url:"%s"]', url);

  var sip_uri = null;
  var via_transport = null;

  this.ws = null;

  // setting the 'scheme' alters the sip_uri too (used in SIP Route header field)
  Object.defineProperties(this, {
    via_transport: {
      get: function() { return via_transport; },
      set: function(transport) {
        via_transport = transport.toUpperCase();
      }
    },
    sip_uri:  { get: function() { return sip_uri; }},
    url:      { get: function() { return url; }}
  });

  var parsed_url = Grammar.parse(url, 'absoluteURI');

  if (parsed_url === -1) {
    debugerror('invalid WebSocket URI: ' + url);
    throw new TypeError('Invalid argument: ' + url);
  } else if(parsed_url.scheme !== 'wss' && parsed_url.scheme !== 'ws') {
    debugerror('invalid WebSocket URI scheme: ' + parsed_url.scheme);
    throw new TypeError('Invalid argument: ' + url);
  } else {
    sip_uri = 'sip:' + parsed_url.host +
      (parsed_url.port ? ':' + parsed_url.port : '') + ';transport=ws';
    this.via_transport = parsed_url.scheme;
  }
}

WebSocketInterface.prototype.connect = function () {
  debug('connect()');

  if (this.isConnected()) {
    debug('WebSocket ' + this.url + ' is already connected');
    return;
  } else if (this.isConnecting()) {
    debug('WebSocket ' + this.url + ' is connecting');
    return;
  }

  if (this.ws) {
    this.ws.close();
  }

  debug('connecting to WebSocket ' + this.url);

  try {
    this.ws = new WebSocket(this.url, 'sip');

    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen    = onOpen.bind(this);
    this.ws.onclose   = onClose.bind(this);
    this.ws.onmessage = onMessage.bind(this);
    this.ws.onerror   = onError.bind(this);
  } catch(e) {
    onError.call(this, e);
  }
};

WebSocketInterface.prototype.disconnect = function() {
  debug('disconnect()');

  if (this.ws) {
    this.ws.close();
    this.ws = null;
  }
};

WebSocketInterface.prototype.send = function(message) {
  debug('send()');

  if (this.isConnected()) {
    this.ws.send(message);
    return true;
  } else {
    debugerror('unable to send message, WebSocket is not open');
    return false;
  }
};

WebSocketInterface.prototype.isConnected = function() {
  return this.ws && this.ws.readyState === this.ws.OPEN;
};

WebSocketInterface.prototype.isConnecting = function() {
  return this.ws && this.ws.readyState === this.ws.CONNECTING;
};


/**
 * WebSocket Event Handlers
 */

function onOpen() {
  debug('WebSocket ' + this.url + ' connected');

  this.onconnect();
}

function onClose(e) {
  debug('WebSocket ' + this.url + ' closed');

  if (e.wasClean === false) {
    debug('WebSocket abrupt disconnection');
  }

  this.ondisconnect(e.wasClean, e.code, e.reason);
}

function onMessage(e) {
  debug('received WebSocket message');

  this.ondata(e.data);
}

function onError(e) {
  debugerror('WebSocket ' + this.url + ' error: '+ e);
}

},{"./Grammar":6,"debug":33}],27:[function(require,module,exports){
module.exports = sanityCheck;


/**
 * Dependencies.
 */
var debug = require('debug')('JsSIP:sanityCheck');
var JsSIP_C = require('./Constants');
var SIPMessage = require('./SIPMessage');
var Utils = require('./Utils');


var message, ua, transport,
  requests = [],
  responses = [],
  all = [];


requests.push(rfc3261_8_2_2_1);
requests.push(rfc3261_16_3_4);
requests.push(rfc3261_18_3_request);
requests.push(rfc3261_8_2_2_2);

responses.push(rfc3261_8_1_3_3);
responses.push(rfc3261_18_3_response);

all.push(minimumHeaders);


function sanityCheck(m, u, t) {
  var len, pass;

  message = m;
  ua = u;
  transport = t;

  len = all.length;
  while(len--) {
    pass = all[len](message);
    if(pass === false) {
      return false;
    }
  }

  if(message instanceof SIPMessage.IncomingRequest) {
    len = requests.length;
    while(len--) {
      pass = requests[len](message);
      if(pass === false) {
        return false;
      }
    }
  }

  else if(message instanceof SIPMessage.IncomingResponse) {
    len = responses.length;
    while(len--) {
      pass = responses[len](message);
      if(pass === false) {
        return false;
      }
    }
  }

  //Everything is OK
  return true;
}


/*
 * Sanity Check for incoming Messages
 *
 * Requests:
 *  - _rfc3261_8_2_2_1_ Receive a Request with a non supported URI scheme
 *  - _rfc3261_16_3_4_ Receive a Request already sent by us
 *   Does not look at via sent-by but at jssip_id, which is inserted as
 *   a prefix in all initial requests generated by the ua
 *  - _rfc3261_18_3_request_ Body Content-Length
 *  - _rfc3261_8_2_2_2_ Merged Requests
 *
 * Responses:
 *  - _rfc3261_8_1_3_3_ Multiple Via headers
 *  - _rfc3261_18_3_response_ Body Content-Length
 *
 * All:
 *  - Minimum headers in a SIP message
 */

// Sanity Check functions for requests
function rfc3261_8_2_2_1() {
  if(message.s('to').uri.scheme !== 'sip') {
    reply(416);
    return false;
  }
}

function rfc3261_16_3_4() {
  if(!message.to_tag) {
    if(message.call_id.substr(0, 5) === ua.configuration.jssip_id) {
      reply(482);
      return false;
    }
  }
}

function rfc3261_18_3_request() {
  var len = Utils.str_utf8_length(message.body),
  contentLength = message.getHeader('content-length');

  if(len < contentLength) {
    reply(400);
    return false;
  }
}

function rfc3261_8_2_2_2() {
  var tr, idx,
    fromTag = message.from_tag,
    call_id = message.call_id,
    cseq = message.cseq;

  // Accept any in-dialog request.
  if(message.to_tag) {
    return;
  }

  // INVITE request.
  if (message.method === JsSIP_C.INVITE) {
    // If the branch matches the key of any IST then assume it is a retransmission
    // and ignore the INVITE.
    // TODO: we should reply the last response.
    if (ua.transactions.ist[message.via_branch]) {
      return false;
    }
    // Otherwise check whether it is a merged request.
    else {
      for(idx in ua.transactions.ist) {
        tr = ua.transactions.ist[idx];
        if(tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
          reply(482);
          return false;
        }
      }
    }
  }
  // Non INVITE request.
  else {
    // If the branch matches the key of any NIST then assume it is a retransmission
    // and ignore the request.
    // TODO: we should reply the last response.
    if (ua.transactions.nist[message.via_branch]) {
      return false;
    }
    // Otherwise check whether it is a merged request.
    else {
      for(idx in ua.transactions.nist) {
        tr = ua.transactions.nist[idx];
        if(tr.request.from_tag === fromTag && tr.request.call_id === call_id && tr.request.cseq === cseq) {
          reply(482);
          return false;
        }
      }
    }
  }
}

// Sanity Check functions for responses
function rfc3261_8_1_3_3() {
  if(message.getHeaders('via').length > 1) {
    debug('more than one Via header field present in the response, dropping the response');
    return false;
  }
}

function rfc3261_18_3_response() {
  var
    len = Utils.str_utf8_length(message.body),
    contentLength = message.getHeader('content-length');

    if(len < contentLength) {
      debug('message body length is lower than the value in Content-Length header field, dropping the response');
      return false;
    }
}

// Sanity Check functions for requests and responses
function minimumHeaders() {
  var
    mandatoryHeaders = ['from', 'to', 'call_id', 'cseq', 'via'],
    idx = mandatoryHeaders.length;

  while(idx--) {
    if(!message.hasHeader(mandatoryHeaders[idx])) {
      debug('missing mandatory header field : ' + mandatoryHeaders[idx] + ', dropping the response');
      return false;
    }
  }
}

// Reply
function reply(status_code) {
  var to,
    response = 'SIP/2.0 ' + status_code + ' ' + JsSIP_C.REASON_PHRASE[status_code] + '\r\n',
    vias = message.getHeaders('via'),
    length = vias.length,
    idx = 0;

  for(idx; idx < length; idx++) {
    response += 'Via: ' + vias[idx] + '\r\n';
  }

  to = message.getHeader('To');

  if(!message.to_tag) {
    to += ';tag=' + Utils.newTag();
  }

  response += 'To: ' + to + '\r\n';
  response += 'From: ' + message.getHeader('From') + '\r\n';
  response += 'Call-ID: ' + message.call_id + '\r\n';
  response += 'CSeq: ' + message.cseq + ' ' + message.method + '\r\n';
  response += '\r\n';

  transport.send(response);
}

},{"./Constants":1,"./SIPMessage":18,"./Utils":25,"debug":33}],28:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],29:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],30:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],31:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],32:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":31,"_process":29,"inherits":30}],33:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":34}],34:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":35}],35:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],36:[function(require,module,exports){
var grammar = module.exports = {
  v: [{
      name: 'version',
      reg: /^(\d*)$/
  }],
  o: [{ //o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: 'origin',
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
    format: "%s %s %d %s IP%d %s"
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{ name: 'name' }],
  i: [{ name: 'description' }],
  u: [{ name: 'uri' }],
  e: [{ name: 'email' }],
  p: [{ name: 'phone' }],
  z: [{ name: 'timezones' }], // TODO: this one can actually be parsed properly..
  r: [{ name: 'repeats' }],   // TODO: this one can also be parsed properly
  //k: [{}], // outdated thing ignored
  t: [{ //t=0 0
    name: 'timing',
    reg: /^(\d*) (\d*)/,
    names: ['start', 'stop'],
    format: "%d %d"
  }],
  c: [{ //c=IN IP4 10.47.197.26
      name: 'connection',
      reg: /^IN IP(\d) (\S*)/,
      names: ['version', 'ip'],
      format: "IN IP%d %s"
  }],
  b: [{ //b=AS:4000
      push: 'bandwidth',
      reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
      names: ['type', 'limit'],
      format: "%s:%s"
  }],
  m: [{ //m=video 51744 RTP/AVP 126 97 98 34 31
      // NB: special - pushes to session
      // TODO: rtp/fmtp should be filtered by the payloads found here?
      reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
      names: ['type', 'port', 'protocol', 'payloads'],
      format: "%s %d %s %s"
  }],
  a: [
    { //a=rtpmap:110 opus/48000/2
      push: 'rtp',
      reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ['payload', 'codec', 'rate', 'encoding'],
      format: function (o) {
        return (o.encoding) ?
          "rtpmap:%d %s/%s/%s":
          o.rate ?
          "rtpmap:%d %s/%s":
          "rtpmap:%d %s";
      }
    },
    {
      //a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      //a=fmtp:111 minptime=10; useinbandfec=1
      push: 'fmtp',
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ['payload', 'config'],
      format: "fmtp:%d %s"
    },
    { //a=control:streamid=0
        name: 'control',
        reg: /^control:(.*)/,
        format: "control:%s"
    },
    { //a=rtcp:65179 IN IP4 193.84.77.194
      name: 'rtcp',
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ['port', 'netType', 'ipVer', 'address'],
      format: function (o) {
        return (o.address != null) ?
          "rtcp:%d %s IP%d %s":
          "rtcp:%d";
      }
    },
    { //a=rtcp-fb:98 trr-int 100
      push: 'rtcpFbTrrInt',
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ['payload', 'value'],
      format: "rtcp-fb:%d trr-int %d"
    },
    { //a=rtcp-fb:98 nack rpsi
      push: 'rtcpFb',
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ['payload', 'type', 'subtype'],
      format: function (o) {
        return (o.subtype != null) ?
          "rtcp-fb:%s %s %s":
          "rtcp-fb:%s %s";
      }
    },
    { //a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      //a=extmap:1/recvonly URI-gps-string
      push: 'ext',
      reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
      names: ['value', 'uri', 'config'], // value may include "/direction" suffix
      format: function (o) {
        return (o.config != null) ?
          "extmap:%s %s %s":
          "extmap:%s %s";
      }
    },
    {
      //a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: 'crypto',
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ['id', 'suite', 'config', 'sessionConfig'],
      format: function (o) {
        return (o.sessionConfig != null) ?
          "crypto:%d %s %s %s":
          "crypto:%d %s %s";
      }
    },
    { //a=setup:actpass
      name: 'setup',
      reg: /^setup:(\w*)/,
      format: "setup:%s"
    },
    { //a=mid:1
      name: 'mid',
      reg: /^mid:([^\s]*)/,
      format: "mid:%s"
    },
    { //a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: 'msid',
      reg: /^msid:(.*)/,
      format: "msid:%s"
    },
    { //a=ptime:20
      name: 'ptime',
      reg: /^ptime:(\d*)/,
      format: "ptime:%d"
    },
    { //a=maxptime:60
      name: 'maxptime',
      reg: /^maxptime:(\d*)/,
      format: "maxptime:%d"
    },
    { //a=sendrecv
      name: 'direction',
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    { //a=ice-lite
      name: 'icelite',
      reg: /^(ice-lite)/
    },
    { //a=ice-ufrag:F7gI
      name: 'iceUfrag',
      reg: /^ice-ufrag:(\S*)/,
      format: "ice-ufrag:%s"
    },
    { //a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: 'icePwd',
      reg: /^ice-pwd:(\S*)/,
      format: "ice-pwd:%s"
    },
    { //a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: 'fingerprint',
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ['type', 'hash'],
      format: "fingerprint:%s %s"
    },
    {
      //a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      //a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0
      //a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0
      //a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0
      //a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0
      push:'candidates',
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
      names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation'],
      format: function (o) {
        var str = "candidate:%s %d %s %d %s %d typ %s";

        str += (o.raddr != null) ? " raddr %s rport %d" : "%v%v";

        // NB: candidate has three optional chunks, so %void middles one if it's missing
        str += (o.tcptype != null) ? " tcptype %s" : "%v";

        if (o.generation != null) {
          str += " generation %d";
        }
        return str;
      }
    },
    { //a=end-of-candidates (keep after the candidates line for readability)
      name: 'endOfCandidates',
      reg: /^(end-of-candidates)/
    },
    { //a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: 'remoteCandidates',
      reg: /^remote-candidates:(.*)/,
      format: "remote-candidates:%s"
    },
    { //a=ice-options:google-ice
      name: 'iceOptions',
      reg: /^ice-options:(\S*)/,
      format: "ice-options:%s"
    },
    { //a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: "ssrcs",
      reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
      names: ['id', 'attribute', 'value'],
      format: "ssrc:%d %s:%s"
    },
    { //a=ssrc-group:FEC 1 2
      push: "ssrcGroups",
      reg: /^ssrc-group:(\w*) (.*)/,
      names: ['semantics', 'ssrcs'],
      format: "ssrc-group:%s %s"
    },
    { //a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: "msidSemantic",
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ['semantic', 'token'],
      format: "msid-semantic: %s %s" // space after ":" is not accidental
    },
    { //a=group:BUNDLE audio video
      push: 'groups',
      reg: /^group:(\w*) (.*)/,
      names: ['type', 'mids'],
      format: "group:%s %s"
    },
    { //a=rtcp-mux
      name: 'rtcpMux',
      reg: /^(rtcp-mux)/
    },
    { //a=rtcp-rsize
      name: 'rtcpRsize',
      reg: /^(rtcp-rsize)/
    },
    { //a=sctpmap:5000 webrtc-datachannel 1024
      name: 'sctpmap',
      reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
      names: ['sctpmapNumber', 'app', 'maxMessageSize'],
      format: function (o) {
        return (o.maxMessageSize != null) ?
          "sctpmap:%s %s %s" :
          "sctpmap:%s %s";
      }
    },
    { // any a= that we don't understand is kepts verbatim on media.invalid
      push: 'invalid',
      names: ["value"]
    }
  ]
};

// set sensible defaults to avoid polluting the grammar with boring details
Object.keys(grammar).forEach(function (key) {
  var objs = grammar[key];
  objs.forEach(function (obj) {
    if (!obj.reg) {
      obj.reg = /(.*)/;
    }
    if (!obj.format) {
      obj.format = "%s";
    }
  });
});

},{}],37:[function(require,module,exports){
var parser = require('./parser');
var writer = require('./writer');

exports.write = writer;
exports.parse = parser.parse;
exports.parseFmtpConfig = parser.parseFmtpConfig;
exports.parsePayloads = parser.parsePayloads;
exports.parseRemoteCandidates = parser.parseRemoteCandidates;

},{"./parser":38,"./writer":39}],38:[function(require,module,exports){
var toIntIfInt = function (v) {
  return String(Number(v)) === v ? Number(v) : v;
};

var attachProperties = function (match, location, names, rawName) {
  if (rawName && !names) {
    location[rawName] = toIntIfInt(match[1]);
  }
  else {
    for (var i = 0; i < names.length; i += 1) {
      if (match[i+1] != null) {
        location[names[i]] = toIntIfInt(match[i+1]);
      }
    }
  }
};

var parseReg = function (obj, location, content) {
  var needsBlank = obj.name && obj.names;
  if (obj.push && !location[obj.push]) {
    location[obj.push] = [];
  }
  else if (needsBlank && !location[obj.name]) {
    location[obj.name] = {};
  }
  var keyLocation = obj.push ?
    {} :  // blank object that will be pushed
    needsBlank ? location[obj.name] : location; // otherwise, named location or root

  attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);

  if (obj.push) {
    location[obj.push].push(keyLocation);
  }
};

var grammar = require('./grammar');
var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);

exports.parse = function (sdp) {
  var session = {}
    , media = []
    , location = session; // points at where properties go under (one of the above)

  // parse lines we understand
  sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
    var type = l[0];
    var content = l.slice(2);
    if (type === 'm') {
      media.push({rtp: [], fmtp: []});
      location = media[media.length-1]; // point at latest media line
    }

    for (var j = 0; j < (grammar[type] || []).length; j += 1) {
      var obj = grammar[type][j];
      if (obj.reg.test(content)) {
        return parseReg(obj, location, content);
      }
    }
  });

  session.media = media; // link it up
  return session;
};

var fmtpReducer = function (acc, expr) {
  var s = expr.split(/=(.+)/, 2);
  if (s.length === 2) {
    acc[s[0]] = toIntIfInt(s[1]);
  }
  return acc;
};

exports.parseFmtpConfig = function (str) {
  return str.split(/\;\s?/).reduce(fmtpReducer, {});
};

exports.parsePayloads = function (str) {
  return str.split(' ').map(Number);
};

exports.parseRemoteCandidates = function (str) {
  var candidates = [];
  var parts = str.split(' ').map(toIntIfInt);
  for (var i = 0; i < parts.length; i += 3) {
    candidates.push({
      component: parts[i],
      ip: parts[i + 1],
      port: parts[i + 2]
    });
  }
  return candidates;
};

},{"./grammar":36}],39:[function(require,module,exports){
var grammar = require('./grammar');

// customized util.format - discards excess arguments and can void middle ones
var formatRegExp = /%[sdv%]/g;
var format = function (formatStr) {
  var i = 1;
  var args = arguments;
  var len = args.length;
  return formatStr.replace(formatRegExp, function (x) {
    if (i >= len) {
      return x; // missing argument
    }
    var arg = args[i];
    i += 1;
    switch (x) {
      case '%%':
        return '%';
      case '%s':
        return String(arg);
      case '%d':
        return Number(arg);
      case '%v':
        return '';
    }
  });
  // NB: we discard excess arguments - they are typically undefined from makeLine
};

var makeLine = function (type, obj, location) {
  var str = obj.format instanceof Function ?
    (obj.format(obj.push ? location : location[obj.name])) :
    obj.format;

  var args = [type + '=' + str];
  if (obj.names) {
    for (var i = 0; i < obj.names.length; i += 1) {
      var n = obj.names[i];
      if (obj.name) {
        args.push(location[obj.name][n]);
      }
      else { // for mLine and push attributes
        args.push(location[obj.names[i]]);
      }
    }
  }
  else {
    args.push(location[obj.name]);
  }
  return format.apply(null, args);
};

// RFC specified order
// TODO: extend this with all the rest
var defaultOuterOrder = [
  'v', 'o', 's', 'i',
  'u', 'e', 'p', 'c',
  'b', 't', 'r', 'z', 'a'
];
var defaultInnerOrder = ['i', 'c', 'b', 'a'];


module.exports = function (session, opts) {
  opts = opts || {};
  // ensure certain properties exist
  if (session.version == null) {
    session.version = 0; // "v=0" must be there (only defined version atm)
  }
  if (session.name == null) {
    session.name = " "; // "s= " must be there if no meaningful name set
  }
  session.media.forEach(function (mLine) {
    if (mLine.payloads == null) {
      mLine.payloads = "";
    }
  });

  var outerOrder = opts.outerOrder || defaultOuterOrder;
  var innerOrder = opts.innerOrder || defaultInnerOrder;
  var sdp = [];

  // loop through outerOrder for matching properties on session
  outerOrder.forEach(function (type) {
    grammar[type].forEach(function (obj) {
      if (obj.name in session && session[obj.name] != null) {
        sdp.push(makeLine(type, obj, session));
      }
      else if (obj.push in session && session[obj.push] != null) {
        session[obj.push].forEach(function (el) {
          sdp.push(makeLine(type, obj, el));
        });
      }
    });
  });

  // then for each media line, follow the innerOrder
  session.media.forEach(function (mLine) {
    sdp.push(makeLine('m', grammar.m[0], mLine));

    innerOrder.forEach(function (type) {
      grammar[type].forEach(function (obj) {
        if (obj.name in mLine && mLine[obj.name] != null) {
          sdp.push(makeLine(type, obj, mLine));
        }
        else if (obj.push in mLine && mLine[obj.push] != null) {
          mLine[obj.push].forEach(function (el) {
            sdp.push(makeLine(type, obj, el));
          });
        }
      });
    });
  });

  return sdp.join('\r\n') + '\r\n';
};

},{"./grammar":36}],40:[function(require,module,exports){
module.exports={
  "name": "jssip",
  "title": "JsSIP",
  "description": "the Javascript SIP library",
  "version": "2.0.6",
  "homepage": "http://jssip.net",
  "author": "José Luis Millán <jmillan@aliax.net> (https://github.com/jmillan)",
  "contributors": [
    "Iñaki Baz Castillo <ibc@aliax.net> (https://github.com/ibc)",
    "Saúl Ibarra Corretgé <saghul@gmail.com> (https://github.com/saghul)"
  ],
  "main": "lib/JsSIP.js",
  "keywords": [
    "sip",
    "websocket",
    "webrtc",
    "node",
    "browser",
    "library"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/versatica/JsSIP.git"
  },
  "bugs": {
    "url": "https://github.com/versatica/JsSIP/issues"
  },
  "dependencies": {
    "debug": "^2.2.0",
    "rtcninja": "^0.7.0",
    "sdp-transform": "^1.6.2"
  },
  "devDependencies": {
    "browserify": "^13.1.0",
    "gulp": "git+https://github.com/gulpjs/gulp.git#4.0",
    "gulp-expect-file": "0.0.7",
    "gulp-header": "1.8.8",
    "gulp-jshint": "^2.0.1",
    "gulp-nodeunit-runner": "^0.2.2",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^2.0.0",
    "gulp-util": "^3.0.7",
    "jshint": "^2.9.3",
    "jshint-stylish": "^2.2.1",
    "pegjs": "0.7.0",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0"
  },
  "scripts": {
    "test": "gulp test"
  }
}

},{}],41:[function(require,module,exports){
(function (global){
'use strict';

// Expose the Adapter function/object.
module.exports = Adapter;


// Dependencies

var browser = require('bowser'),
	debug = require('debug')('rtcninja:Adapter'),
	debugerror = require('debug')('rtcninja:ERROR:Adapter'),

	// Internal vars
	getUserMedia = null,
	mediaDevices = null,
	RTCPeerConnection = null,
	RTCSessionDescription = null,
	RTCIceCandidate = null,
	MediaStreamTrack = null,
	getMediaDevices = null,
	attachMediaStream = null,
	canRenegotiate = false,
	oldSpecRTCOfferOptions = false,
	browserVersion = Number(browser.version) || 0,
	isDesktop = !!(!browser.mobile && (!browser.tablet || (browser.msie && browserVersion >= 10))),
	hasWebRTC = false,
	// Dirty trick to get this library working in a Node-webkit env with browserified libs
	virtGlobal = global.window || global,
	// Don't fail in Node
	virtNavigator = virtGlobal.navigator || {};

debugerror.log = console.warn.bind(console);


// Constructor.

function Adapter(options) {
	// Chrome desktop, Chrome Android, Opera desktop, Opera Android, Android native browser
	// or generic Webkit browser.
	if (
		(isDesktop && browser.chrome && browserVersion >= 32) ||
		(browser.android && browser.chrome && browserVersion >= 39) ||
		(isDesktop && browser.opera && browserVersion >= 27) ||
		(browser.android && browser.opera && browserVersion >= 24) ||
		(browser.android && browser.webkit && !browser.chrome && browserVersion >= 37) ||
		(virtNavigator.webkitGetUserMedia && virtGlobal.webkitRTCPeerConnection)
	) {
		hasWebRTC = true;
		getUserMedia = virtNavigator.webkitGetUserMedia.bind(virtNavigator);
		mediaDevices = virtNavigator.mediaDevices;
		RTCPeerConnection = virtGlobal.webkitRTCPeerConnection;
		RTCSessionDescription = virtGlobal.RTCSessionDescription;
		RTCIceCandidate = virtGlobal.RTCIceCandidate;
		MediaStreamTrack = virtGlobal.MediaStreamTrack;
		if (MediaStreamTrack && MediaStreamTrack.getSources) {
			getMediaDevices = MediaStreamTrack.getSources.bind(MediaStreamTrack);
		} else if (virtNavigator.getMediaDevices) {
			getMediaDevices = virtNavigator.getMediaDevices.bind(virtNavigator);
		}
		attachMediaStream = function (element, stream) {
			element.src = URL.createObjectURL(stream);
			return element;
		};
		canRenegotiate = true;
		oldSpecRTCOfferOptions = false;
	// Old Firefox desktop, old Firefox Android.
	} else if (
		(browser.firefox && browserVersion < 47) ||
		(virtNavigator.mozGetUserMedia && virtGlobal.mozRTCPeerConnection)
	) {
		hasWebRTC = true;
		getUserMedia = virtNavigator.mozGetUserMedia.bind(virtNavigator);
		mediaDevices = virtNavigator.mediaDevices;
		RTCPeerConnection = virtGlobal.mozRTCPeerConnection;
		RTCSessionDescription = virtGlobal.mozRTCSessionDescription;
		RTCIceCandidate = virtGlobal.mozRTCIceCandidate;
		MediaStreamTrack = virtGlobal.MediaStreamTrack;
		attachMediaStream = function (element, stream) {
			element.src = URL.createObjectURL(stream);
			return element;
		};
		canRenegotiate = false;
		oldSpecRTCOfferOptions = false;
	// Modern Firefox desktop, modern Firefox Android.
	} else if (
		((browser.firefox || browser.gecko) && browserVersion >= 47)
	) {
		hasWebRTC = true;
		getUserMedia = virtNavigator.mozGetUserMedia.bind(virtNavigator);
		mediaDevices = virtNavigator.mediaDevices;
		RTCPeerConnection = virtGlobal.RTCPeerConnection;
		RTCSessionDescription = virtGlobal.RTCSessionDescription;
		RTCIceCandidate = virtGlobal.RTCIceCandidate;
		MediaStreamTrack = virtGlobal.MediaStreamTrack;
		attachMediaStream = function (element, stream) {
			element.src = URL.createObjectURL(stream);
			return element;
		};
		canRenegotiate = false;
		oldSpecRTCOfferOptions = false;
		// WebRTC plugin required. For example IE or Safari with the Temasys plugin.
	} else if (
		options.plugin &&
		typeof options.plugin.isRequired === 'function' &&
		options.plugin.isRequired() &&
		typeof options.plugin.isInstalled === 'function' &&
		options.plugin.isInstalled()
	) {
		var pluginiface = options.plugin.interface;

		hasWebRTC = true;
		getUserMedia = pluginiface.getUserMedia;
		mediaDevices = pluginiface.mediaDevices;
		RTCPeerConnection = pluginiface.RTCPeerConnection;
		RTCSessionDescription = pluginiface.RTCSessionDescription;
		RTCIceCandidate = pluginiface.RTCIceCandidate;
		MediaStreamTrack = pluginiface.MediaStreamTrack;
		if (MediaStreamTrack && MediaStreamTrack.getSources) {
			getMediaDevices = MediaStreamTrack.getSources.bind(MediaStreamTrack);
		} else if (virtNavigator.getMediaDevices) {
			getMediaDevices = virtNavigator.getMediaDevices.bind(virtNavigator);
		}
		attachMediaStream = pluginiface.attachMediaStream;
		canRenegotiate = pluginiface.canRenegotiate;
		oldSpecRTCOfferOptions = true;
	// Best effort (may be adater.js is loaded).
	} else if (virtNavigator.getUserMedia && virtGlobal.RTCPeerConnection) {
		hasWebRTC = true;
		getUserMedia = virtNavigator.getUserMedia.bind(virtNavigator);
		mediaDevices = virtNavigator.mediaDevices;
		RTCPeerConnection = virtGlobal.RTCPeerConnection;
		RTCSessionDescription = virtGlobal.RTCSessionDescription;
		RTCIceCandidate = virtGlobal.RTCIceCandidate;
		MediaStreamTrack = virtGlobal.MediaStreamTrack;
		if (MediaStreamTrack && MediaStreamTrack.getSources) {
			getMediaDevices = MediaStreamTrack.getSources.bind(MediaStreamTrack);
		} else if (virtNavigator.getMediaDevices) {
			getMediaDevices = virtNavigator.getMediaDevices.bind(virtNavigator);
		}
		attachMediaStream = virtGlobal.attachMediaStream || function (element, stream) {
			element.src = URL.createObjectURL(stream);
			return element;
		};
		canRenegotiate = true;
		oldSpecRTCOfferOptions = false;
	}


	function throwNonSupported(item) {
		return function () {
			throw new Error('rtcninja: WebRTC not supported, missing ' + item +
			' [browser: ' + browser.name + ' ' + browser.version + ']');
		};
	}


	// Public API.

	// Expose a WebRTC checker.
	Adapter.hasWebRTC = function () {
		return hasWebRTC;
	};

	// Expose getUserMedia.
	if (getUserMedia) {
		Adapter.getUserMedia = function (constraints, successCallback, errorCallback) {
			debug('getUserMedia() | constraints: %o', constraints);

			try {
				getUserMedia(constraints,
					function (stream) {
						debug('getUserMedia() | success');
						if (successCallback) {
							successCallback(stream);
						}
					},
					function (error) {
						debug('getUserMedia() | error:', error);
						if (errorCallback) {
							errorCallback(error);
						}
					}
				);
			}
			catch (error) {
				debugerror('getUserMedia() | error:', error);
				if (errorCallback) {
					errorCallback(error);
				}
			}
		};
	} else {
		Adapter.getUserMedia = function (constraints, successCallback, errorCallback) {
			debugerror('getUserMedia() | WebRTC not supported');
			if (errorCallback) {
				errorCallback(new Error('rtcninja: WebRTC not supported, missing ' +
				'getUserMedia [browser: ' + browser.name + ' ' + browser.version + ']'));
			} else {
				throwNonSupported('getUserMedia');
			}
		};
	}

	// Expose mediaDevices.
	Adapter.mediaDevices = mediaDevices;

	// Expose RTCPeerConnection.
	Adapter.RTCPeerConnection = RTCPeerConnection || throwNonSupported('RTCPeerConnection');

	// Expose RTCSessionDescription.
	Adapter.RTCSessionDescription = RTCSessionDescription || throwNonSupported('RTCSessionDescription');

	// Expose RTCIceCandidate.
	Adapter.RTCIceCandidate = RTCIceCandidate || throwNonSupported('RTCIceCandidate');

	// Expose MediaStreamTrack.
	Adapter.MediaStreamTrack = MediaStreamTrack || throwNonSupported('MediaStreamTrack');

	// Expose getMediaDevices.
	Adapter.getMediaDevices = getMediaDevices;

	// Expose MediaStreamTrack.
	Adapter.attachMediaStream = attachMediaStream || throwNonSupported('attachMediaStream');

	// Expose canRenegotiate attribute.
	Adapter.canRenegotiate = canRenegotiate;

	// Expose closeMediaStream.
	Adapter.closeMediaStream = function (stream) {
		if (!stream) {
			return;
		}

		// Latest spec states that MediaStream has no stop() method and instead must
		// call stop() on every MediaStreamTrack.
		try {
			debug('closeMediaStream() | calling stop() on all the MediaStreamTrack');

			var tracks, i, len;

			if (stream.getTracks) {
				tracks = stream.getTracks();
				for (i = 0, len = tracks.length; i < len; i += 1) {
					tracks[i].stop();
				}
			} else {
				tracks = stream.getAudioTracks();
				for (i = 0, len = tracks.length; i < len; i += 1) {
					tracks[i].stop();
				}
				tracks = stream.getVideoTracks();
				for (i = 0, len = tracks.length; i < len; i += 1) {
					tracks[i].stop();
				}
			}
		} catch (error) {
			// Deprecated by the spec, but still in use.
			// NOTE: In Temasys IE plugin stream.stop is a callable 'object'.
			if (typeof stream.stop === 'function' || typeof stream.stop === 'object') {
				debug('closeMediaStream() | calling stop() on the MediaStream');

				stream.stop();
			}
		}
	};

	// Expose fixPeerConnectionConfig.
	Adapter.fixPeerConnectionConfig = function (pcConfig) {
		var i, len, iceServer, hasUrls, hasUrl;

		if (!Array.isArray(pcConfig.iceServers)) {
			pcConfig.iceServers = [];
		}

		for (i = 0, len = pcConfig.iceServers.length; i < len; i += 1) {
			iceServer = pcConfig.iceServers[i];
			hasUrls = iceServer.hasOwnProperty('urls');
			hasUrl = iceServer.hasOwnProperty('url');

			if (typeof iceServer === 'object') {
				// Has .urls but not .url, so add .url with a single string value.
				if (hasUrls && !hasUrl) {
					iceServer.url = (Array.isArray(iceServer.urls) ? iceServer.urls[0] : iceServer.urls);
				// Has .url but not .urls, so add .urls with same value.
				} else if (!hasUrls && hasUrl) {
					iceServer.urls = (Array.isArray(iceServer.url) ? iceServer.url.slice() : iceServer.url);
				}

				// Ensure .url is a single string.
				if (hasUrl && Array.isArray(iceServer.url)) {
					iceServer.url = iceServer.url[0];
				}
			}
		}
	};

	// Expose fixRTCOfferOptions.
	Adapter.fixRTCOfferOptions = function (options) {
		options = options || {};

		// New spec.
		if (!oldSpecRTCOfferOptions) {
			if (options.mandatory && options.mandatory.hasOwnProperty('OfferToReceiveAudio')) {
				options.offerToReceiveAudio = options.mandatory.OfferToReceiveAudio ? 1 : 0;
			}
			if (options.mandatory && options.mandatory.hasOwnProperty('OfferToReceiveVideo')) {
				options.offerToReceiveVideo = options.mandatory.OfferToReceiveVideo ? 1 : 0;
			}
			delete options.mandatory;
		// Old spec.
		} else {
			if (options.hasOwnProperty('offerToReceiveAudio')) {
				options.mandatory = options.mandatory || {};
				options.mandatory.OfferToReceiveAudio = options.offerToReceiveAudio ? true : false;
			}
			if (options.hasOwnProperty('offerToReceiveVideo')) {
				options.mandatory = options.mandatory || {};
				options.mandatory.OfferToReceiveVideo = options.offerToReceiveVideo ? true : false;
			}
		}
	};

	return Adapter;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"bowser":45,"debug":46}],42:[function(require,module,exports){
'use strict';

// Expose the RTCPeerConnection class.
module.exports = RTCPeerConnection;


// Dependencies.

var merge = require('merge'),
	debug = require('debug')('rtcninja:RTCPeerConnection'),
	debugerror = require('debug')('rtcninja:ERROR:RTCPeerConnection'),
	Adapter = require('./Adapter'),

	// Internal constants.
	C = {
		REGEXP_NORMALIZED_CANDIDATE: new RegExp(/^candidate:/i),
		REGEXP_FIX_CANDIDATE: new RegExp(/(^a=|\r|\n)/gi),
		REGEXP_RELAY_CANDIDATE: new RegExp(/ relay /i),
		REGEXP_SDP_CANDIDATES: new RegExp(/^a=candidate:.*\r\n/igm),
		REGEXP_SDP_NON_RELAY_CANDIDATES: new RegExp(/^a=candidate:(.(?!relay ))*\r\n/igm)
	},

	// Internal variables.
	VAR = {
		normalizeCandidate: null
	};

debugerror.log = console.warn.bind(console);


// Constructor

function RTCPeerConnection(pcConfig, pcConstraints) {
	debug('new | [pcConfig:%o, pcConstraints:%o]', pcConfig, pcConstraints);

	// Set this.pcConfig and this.options.
	setConfigurationAndOptions.call(this, pcConfig);

	// NOTE: Deprecated pcConstraints argument.
	this.pcConstraints = pcConstraints;

	// Own version of the localDescription.
	this.ourLocalDescription = null;

	// Latest values of PC attributes to avoid events with same value.
	this.ourSignalingState = null;
	this.ourIceConnectionState = null;
	this.ourIceGatheringState = null;

	// Timer for options.gatheringTimeout.
	this.timerGatheringTimeout = null;

	// Timer for options.gatheringTimeoutAfterRelay.
	this.timerGatheringTimeoutAfterRelay = null;

	// Flag to ignore new gathered ICE candidates.
	this.ignoreIceGathering = false;

	// Flag set when closed.
	this.closed = false;

	// Set RTCPeerConnection.
	setPeerConnection.call(this);

	// Set properties.
	setProperties.call(this);
}


// Public API.

RTCPeerConnection.prototype.createOffer = function (successCallback, failureCallback, options) {
	debug('createOffer()');

	var self = this;

	Adapter.fixRTCOfferOptions(options);

	this.pc.createOffer(
		function (offer) {
			if (isClosed.call(self)) {
				return;
			}
			debug('createOffer() | success');
			if (successCallback) {
				successCallback(offer);
			}
		},
		function (error) {
			if (isClosed.call(self)) {
				return;
			}
			debugerror('createOffer() | error:', error);
			if (failureCallback) {
				failureCallback(error);
			}
		},
		options
	);
};


RTCPeerConnection.prototype.createAnswer = function (successCallback, failureCallback, options) {
	debug('createAnswer()');

	var self = this;

	this.pc.createAnswer(
		function (answer) {
			if (isClosed.call(self)) {
				return;
			}
			debug('createAnswer() | success');
			if (successCallback) {
				successCallback(answer);
			}
		},
		function (error) {
			if (isClosed.call(self)) {
				return;
			}
			debugerror('createAnswer() | error:', error);
			if (failureCallback) {
				failureCallback(error);
			}
		},
		options
	);
};


RTCPeerConnection.prototype.setLocalDescription = function (description, successCallback, failureCallback) {
	debug('setLocalDescription()');

	var self = this;

	this.pc.setLocalDescription(
		description,
		// success.
		function () {
			if (isClosed.call(self)) {
				return;
			}
			debug('setLocalDescription() | success');

			// Clear gathering timers.
			clearTimeout(self.timerGatheringTimeout);
			delete self.timerGatheringTimeout;
			clearTimeout(self.timerGatheringTimeoutAfterRelay);
			delete self.timerGatheringTimeoutAfterRelay;

			runTimerGatheringTimeout();
			if (successCallback) {
				successCallback();
			}
		},
		// failure
		function (error) {
			if (isClosed.call(self)) {
				return;
			}
			debugerror('setLocalDescription() | error:', error);
			if (failureCallback) {
				failureCallback(error);
			}
		}
	);

	// Enable (again) ICE gathering.
	this.ignoreIceGathering = false;

	// Handle gatheringTimeout.
	function runTimerGatheringTimeout() {
		if (typeof self.options.gatheringTimeout !== 'number') {
			return;
		}
		// If setLocalDescription was already called, it may happen that
		// ICE gathering is not needed, so don't run this timer.
		if (self.pc.iceGatheringState === 'complete') {
			return;
		}

		debug('setLocalDescription() | ending gathering in %d ms (gatheringTimeout option)',
			self.options.gatheringTimeout);

		self.timerGatheringTimeout = setTimeout(function () {
			if (isClosed.call(self)) {
				return;
			}

			debug('forced end of candidates after gatheringTimeout timeout');

			// Clear gathering timers.
			delete self.timerGatheringTimeout;
			clearTimeout(self.timerGatheringTimeoutAfterRelay);
			delete self.timerGatheringTimeoutAfterRelay;

			// Ignore new candidates.
			self.ignoreIceGathering = true;
			if (self.onicecandidate) {
				self.onicecandidate({ candidate: null }, null);
			}

		}, self.options.gatheringTimeout);
	}
};


RTCPeerConnection.prototype.setRemoteDescription = function (description, successCallback, failureCallback) {
	debug('setRemoteDescription()');

	var self = this;

	this.pc.setRemoteDescription(
		description,
		function () {
			if (isClosed.call(self)) {
				return;
			}
			debug('setRemoteDescription() | success');
			if (successCallback) {
				successCallback();
			}
		},
		function (error) {
			if (isClosed.call(self)) {
				return;
			}
			debugerror('setRemoteDescription() | error:', error);
			if (failureCallback) {
				failureCallback(error);
			}
		}
	);
};


RTCPeerConnection.prototype.updateIce = function (pcConfig) {
	debug('updateIce() | pcConfig: %o', pcConfig);

	// Update this.pcConfig and this.options.
	setConfigurationAndOptions.call(this, pcConfig);

	this.pc.updateIce(this.pcConfig);

	// Enable (again) ICE gathering.
	this.ignoreIceGathering = false;
};


RTCPeerConnection.prototype.addIceCandidate = function (candidate, successCallback, failureCallback) {
	debug('addIceCandidate() | candidate: %o', candidate);

	var self = this;

	this.pc.addIceCandidate(
		candidate,
		function () {
			if (isClosed.call(self)) {
				return;
			}
			debug('addIceCandidate() | success');
			if (successCallback) {
				successCallback();
			}
		},
		function (error) {
			if (isClosed.call(self)) {
				return;
			}
			debugerror('addIceCandidate() | error:', error);
			if (failureCallback) {
				failureCallback(error);
			}
		}
	);
};


RTCPeerConnection.prototype.getConfiguration = function () {
	debug('getConfiguration()');

	return this.pc.getConfiguration();
};


RTCPeerConnection.prototype.getLocalStreams = function () {
	debug('getLocalStreams()');

	return this.pc.getLocalStreams();
};


RTCPeerConnection.prototype.getRemoteStreams = function () {
	debug('getRemoteStreams()');

	return this.pc.getRemoteStreams();
};


RTCPeerConnection.prototype.getStreamById = function (streamId) {
	debug('getStreamById() | streamId: %s', streamId);

	return this.pc.getStreamById(streamId);
};


RTCPeerConnection.prototype.addStream = function (stream) {
	debug('addStream() | stream: %s', stream);

	this.pc.addStream(stream);
};


RTCPeerConnection.prototype.removeStream = function (stream) {
	debug('removeStream() | stream: %o', stream);

	this.pc.removeStream(stream);
};


RTCPeerConnection.prototype.close = function () {
	debug('close()');

	this.closed = true;

	// Clear gathering timers.
	clearTimeout(this.timerGatheringTimeout);
	delete this.timerGatheringTimeout;
	clearTimeout(this.timerGatheringTimeoutAfterRelay);
	delete this.timerGatheringTimeoutAfterRelay;

	this.pc.close();
};


RTCPeerConnection.prototype.createDataChannel = function () {
	debug('createDataChannel()');

	return this.pc.createDataChannel.apply(this.pc, arguments);
};


RTCPeerConnection.prototype.createDTMFSender = function (track) {
	debug('createDTMFSender()');

	if (this.pc.createDTMFSender) {
		return this.pc.createDTMFSender(track);
	} else {
		return null;
	}
};


RTCPeerConnection.prototype.getStats = function () {
	debug('getStats()');

	return this.pc.getStats.apply(this.pc, arguments);
};


RTCPeerConnection.prototype.setIdentityProvider = function () {
	debug('setIdentityProvider()');

	return this.pc.setIdentityProvider.apply(this.pc, arguments);
};


RTCPeerConnection.prototype.getIdentityAssertion = function () {
	debug('getIdentityAssertion()');

	return this.pc.getIdentityAssertion();
};


RTCPeerConnection.prototype.reset = function (pcConfig) {
	debug('reset() | pcConfig: %o', pcConfig);

	var pc = this.pc;

	// Remove events in the old PC.
	pc.onnegotiationneeded = null;
	pc.onicecandidate = null;
	pc.onaddstream = null;
	pc.onremovestream = null;
	pc.ondatachannel = null;
	pc.onsignalingstatechange = null;
	pc.oniceconnectionstatechange = null;
	pc.onicegatheringstatechange = null;
	pc.onidentityresult = null;
	pc.onpeeridentity = null;
	pc.onidpassertionerror = null;
	pc.onidpvalidationerror = null;

	// Clear gathering timers.
	clearTimeout(this.timerGatheringTimeout);
	delete this.timerGatheringTimeout;
	clearTimeout(this.timerGatheringTimeoutAfterRelay);
	delete this.timerGatheringTimeoutAfterRelay;

	// Silently close the old PC.
	debug('reset() | closing current peerConnection');
	pc.close();

	// Set this.pcConfig and this.options.
	setConfigurationAndOptions.call(this, pcConfig);

	// Create a new PC.
	setPeerConnection.call(this);
};


// Private Helpers.

function setConfigurationAndOptions(pcConfig) {
	// Clone pcConfig.
	this.pcConfig = merge(true, pcConfig);

	// Fix pcConfig.
	Adapter.fixPeerConnectionConfig(this.pcConfig);

	this.options = {
		iceTransportsRelay: (this.pcConfig.iceTransports === 'relay'),
		iceTransportsNone: (this.pcConfig.iceTransports === 'none'),
		gatheringTimeout: this.pcConfig.gatheringTimeout,
		gatheringTimeoutAfterRelay: this.pcConfig.gatheringTimeoutAfterRelay
	};

	// Remove custom rtcninja.RTCPeerConnection options from pcConfig.
	delete this.pcConfig.gatheringTimeout;
	delete this.pcConfig.gatheringTimeoutAfterRelay;

	debug('setConfigurationAndOptions | processed pcConfig: %o', this.pcConfig);
}


function isClosed() {
	return ((this.closed) || (this.pc && this.pc.iceConnectionState === 'closed'));
}


function setEvents() {
	var self = this,
		pc = this.pc;

	pc.onnegotiationneeded = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onnegotiationneeded()');
		if (self.onnegotiationneeded) {
			self.onnegotiationneeded(event);
		}
	};

	pc.onicecandidate = function (event) {
		var candidate, isRelay, newCandidate;

		if (isClosed.call(self)) {
			return;
		}
		if (self.ignoreIceGathering) {
			return;
		}

		// Ignore any candidate (event the null one) if iceTransports:'none' is set.
		if (self.options.iceTransportsNone) {
			return;
		}

		candidate = event.candidate;

		if (candidate) {
			isRelay = C.REGEXP_RELAY_CANDIDATE.test(candidate.candidate);

			// Ignore if just relay candidates are requested.
			if (self.options.iceTransportsRelay && !isRelay) {
				return;
			}

			// Handle gatheringTimeoutAfterRelay.
			if (isRelay && !self.timerGatheringTimeoutAfterRelay &&
				(typeof self.options.gatheringTimeoutAfterRelay === 'number')) {
				debug('onicecandidate() | first relay candidate found, ending gathering in %d ms', self.options.gatheringTimeoutAfterRelay);

				self.timerGatheringTimeoutAfterRelay = setTimeout(function () {
					if (isClosed.call(self)) {
						return;
					}

					debug('forced end of candidates after timeout');

					// Clear gathering timers.
					delete self.timerGatheringTimeoutAfterRelay;
					clearTimeout(self.timerGatheringTimeout);
					delete self.timerGatheringTimeout;

					// Ignore new candidates.
					self.ignoreIceGathering = true;
					if (self.onicecandidate) {
						self.onicecandidate({candidate: null}, null);
					}
				}, self.options.gatheringTimeoutAfterRelay);
			}

			newCandidate = new Adapter.RTCIceCandidate({
				sdpMid: candidate.sdpMid,
				sdpMLineIndex: candidate.sdpMLineIndex,
				candidate: candidate.candidate
			});

			// Force correct candidate syntax (just check it once).
			if (VAR.normalizeCandidate === null) {
				if (C.REGEXP_NORMALIZED_CANDIDATE.test(candidate.candidate)) {
					VAR.normalizeCandidate = false;
				} else {
					debug('onicecandidate() | normalizing ICE candidates syntax (remove "a=" and "\\r\\n")');
					VAR.normalizeCandidate = true;
				}
			}
			if (VAR.normalizeCandidate) {
				newCandidate.candidate = candidate.candidate.replace(C.REGEXP_FIX_CANDIDATE, '');
			}

			debug(
				'onicecandidate() | m%d(%s) %s',
				newCandidate.sdpMLineIndex,
				newCandidate.sdpMid || 'no mid', newCandidate.candidate);
			if (self.onicecandidate) {
				self.onicecandidate(event, newCandidate);
			}
		// Null candidate (end of candidates).
		} else {
			debug('onicecandidate() | end of candidates');

			// Clear gathering timers.
			clearTimeout(self.timerGatheringTimeout);
			delete self.timerGatheringTimeout;
			clearTimeout(self.timerGatheringTimeoutAfterRelay);
			delete self.timerGatheringTimeoutAfterRelay;
			if (self.onicecandidate) {
				self.onicecandidate(event, null);
			}
		}
	};

	pc.onaddstream = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onaddstream() | stream: %o', event.stream);
		if (self.onaddstream) {
			self.onaddstream(event, event.stream);
		}
	};

	pc.onremovestream = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onremovestream() | stream: %o', event.stream);
		if (self.onremovestream) {
			self.onremovestream(event, event.stream);
		}
	};

	pc.ondatachannel = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('ondatachannel() | datachannel: %o', event.channel);
		if (self.ondatachannel) {
			self.ondatachannel(event, event.channel);
		}
	};

	pc.onsignalingstatechange = function (event) {
		if (pc.signalingState === self.ourSignalingState) {
			return;
		}

		debug('onsignalingstatechange() | signalingState: %s', pc.signalingState);
		self.ourSignalingState = pc.signalingState;
		if (self.onsignalingstatechange) {
			self.onsignalingstatechange(event, pc.signalingState);
		}
	};

	pc.oniceconnectionstatechange = function (event) {
		if (pc.iceConnectionState === self.ourIceConnectionState) {
			return;
		}

		debug('oniceconnectionstatechange() | iceConnectionState: %s', pc.iceConnectionState);
		self.ourIceConnectionState = pc.iceConnectionState;
		if (self.oniceconnectionstatechange) {
			self.oniceconnectionstatechange(event, pc.iceConnectionState);
		}
	};

	pc.onicegatheringstatechange = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		if (pc.iceGatheringState === self.ourIceGatheringState) {
			return;
		}

		debug('onicegatheringstatechange() | iceGatheringState: %s', pc.iceGatheringState);
		self.ourIceGatheringState = pc.iceGatheringState;
		if (self.onicegatheringstatechange) {
			self.onicegatheringstatechange(event, pc.iceGatheringState);
		}
	};

	pc.onidentityresult = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onidentityresult()');
		if (self.onidentityresult) {
			self.onidentityresult(event);
		}
	};

	pc.onpeeridentity = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onpeeridentity()');
		if (self.onpeeridentity) {
			self.onpeeridentity(event);
		}
	};

	pc.onidpassertionerror = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onidpassertionerror()');
		if (self.onidpassertionerror) {
			self.onidpassertionerror(event);
		}
	};

	pc.onidpvalidationerror = function (event) {
		if (isClosed.call(self)) {
			return;
		}

		debug('onidpvalidationerror()');
		if (self.onidpvalidationerror) {
			self.onidpvalidationerror(event);
		}
	};
}


function setPeerConnection() {
	// Create a RTCPeerConnection.
	if (!this.pcConstraints) {
		this.pc = new Adapter.RTCPeerConnection(this.pcConfig);
	} else {
		// NOTE: Deprecated.
		this.pc = new Adapter.RTCPeerConnection(this.pcConfig, this.pcConstraints);
	}

	// Set RTC events.
	setEvents.call(this);
}


function getLocalDescription() {
	var pc = this.pc,
		options = this.options,
		sdp = null;

	if (!pc.localDescription) {
		this.ourLocalDescription = null;
		return null;
	}

	// Mangle the SDP string.
	if (options.iceTransportsRelay) {
		sdp = pc.localDescription.sdp.replace(C.REGEXP_SDP_NON_RELAY_CANDIDATES, '');
	} else if (options.iceTransportsNone) {
		sdp = pc.localDescription.sdp.replace(C.REGEXP_SDP_CANDIDATES, '');
	}

	this.ourLocalDescription = new Adapter.RTCSessionDescription({
		type: pc.localDescription.type,
		sdp: sdp || pc.localDescription.sdp
	});

	return this.ourLocalDescription;
}


function setProperties() {
	var self = this;

	Object.defineProperties(this, {
		peerConnection: {
			get: function () {
				return self.pc;
			}
		},

		signalingState: {
			get: function () {
				return self.pc.signalingState;
			}
		},

		iceConnectionState: {
			get: function () {
				return self.pc.iceConnectionState;
			}
		},

		iceGatheringState: {
			get: function () {
				return self.pc.iceGatheringState;
			}
		},

		localDescription: {
			get: function () {
				return getLocalDescription.call(self);
			}
		},

		remoteDescription: {
			get: function () {
				return self.pc.remoteDescription;
			}
		},

		peerIdentity: {
			get: function () {
				return self.pc.peerIdentity;
			}
		}
	});
}

},{"./Adapter":41,"debug":46,"merge":49}],43:[function(require,module,exports){
'use strict';

module.exports = rtcninja;


// Dependencies.

var browser = require('bowser'),
	debug = require('debug')('rtcninja'),
	debugerror = require('debug')('rtcninja:ERROR'),
	version = require('./version'),
	Adapter = require('./Adapter'),
	RTCPeerConnection = require('./RTCPeerConnection'),

	// Internal vars.
	called = false;

debugerror.log = console.warn.bind(console);
debug('version %s', version);
debug('detected browser: %s %s [mobile:%s, tablet:%s, android:%s, ios:%s]',
		browser.name, browser.version, !!browser.mobile, !!browser.tablet,
		!!browser.android, !!browser.ios);


// Constructor.

function rtcninja(options) {
	// Load adapter
	var iface = Adapter(options || {});  // jshint ignore:line

	called = true;

	// Expose RTCPeerConnection class.
	rtcninja.RTCPeerConnection = RTCPeerConnection;

	// Expose WebRTC API and utils.
	rtcninja.getUserMedia = iface.getUserMedia;
	rtcninja.mediaDevices = iface.mediaDevices;
	rtcninja.RTCSessionDescription = iface.RTCSessionDescription;
	rtcninja.RTCIceCandidate = iface.RTCIceCandidate;
	rtcninja.MediaStreamTrack = iface.MediaStreamTrack;
	rtcninja.getMediaDevices = iface.getMediaDevices;
	rtcninja.attachMediaStream = iface.attachMediaStream;
	rtcninja.closeMediaStream = iface.closeMediaStream;
	rtcninja.canRenegotiate = iface.canRenegotiate;

	// Log WebRTC support.
	if (iface.hasWebRTC()) {
		debug('WebRTC supported');
		return true;
	} else {
		debugerror('WebRTC not supported');
		return false;
	}
}


// Public API.

// If called without calling rtcninja(), call it.
rtcninja.hasWebRTC = function () {
	if (!called) {
		rtcninja();
	}

	return Adapter.hasWebRTC();
};


// Expose version property.
Object.defineProperty(rtcninja, 'version', {
	get: function () {
		return version;
	}
});


// Expose called property.
Object.defineProperty(rtcninja, 'called', {
	get: function () {
		return called;
	}
});


// Exposing stuff.

rtcninja.debug = require('debug');
rtcninja.browser = browser;

},{"./Adapter":41,"./RTCPeerConnection":42,"./version":44,"bowser":45,"debug":46}],44:[function(require,module,exports){
'use strict';

// Expose the 'version' field of package.json.
module.exports = require('../package.json').version;


},{"../package.json":50}],45:[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],46:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./debug":47,"dup":33}],47:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34,"ms":48}],48:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],49:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}],50:[function(require,module,exports){
module.exports={
  "name": "rtcninja",
  "version": "0.7.0",
  "description": "WebRTC API wrapper to deal with different browsers",
  "author": "Iñaki Baz Castillo <inaki.baz@eface2face.com> (http://eface2face.com)",
  "contributors": [
    "Jesús Pérez <jesus.perez@eface2face.com>"
  ],
  "license": "MIT",
  "main": "lib/rtcninja.js",
  "homepage": "https://github.com/eface2face/rtcninja.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/eface2face/rtcninja.js.git"
  },
  "keywords": [
    "webrtc"
  ],
  "engines": {
    "node": ">=0.12.0"
  },
  "dependencies": {
    "bowser": "^1.4.6",
    "debug": "^2.2.0",
    "merge": "^1.2.0"
  },
  "devDependencies": {
    "browserify": "^13.1.0",
    "gulp": "git+https://github.com/gulpjs/gulp.git#4.0",
    "gulp-expect-file": "0.0.7",
    "gulp-filelog": "^0.4.1",
    "gulp-header": "^1.8.8",
    "gulp-jscs": "^3.0.2",
    "gulp-jscs-stylish": "^1.4.0",
    "gulp-jshint": "^2.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^1.5.4",
    "jshint": "^2.9.3",
    "jshint-stylish": "^2.2.1",
    "vinyl-source-stream": "^1.1.0"
  }
}

},{}]},{},[7])(7)
});

/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 * as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2013
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */

 /**
  * SUPPORTED_ALGS is the stub for a compile flag that will cause pruning of
  * functions that are not needed when a limited number of SHA families are
  * selected
  *
  * @define {number} ORed value of SHA variants to be supported
  *   1 = SHA-1, 2 = SHA-224/SHA-256, 4 = SHA-384/SHA-512
  */
var SUPPORTED_ALGS = 4 | 2 | 1;

(function (global)
{
  "use strict";
  /**
   * Int_64 is a object for 2 32-bit numbers emulating a 64-bit number
   *
   * @private
   * @constructor
   * @this {Int_64}
   * @param {number} msint_32 The most significant 32-bits of a 64-bit number
   * @param {number} lsint_32 The least significant 32-bits of a 64-bit number
   */
  function Int_64(msint_32, lsint_32)
  {
    this.highOrder = msint_32;
    this.lowOrder = lsint_32;
  }

  /**
   * Convert a string to an array of big-endian words
   *
   * @private
   * @param {string} str String to be converted to binary representation
   * @param {string} utfType The Unicode type, UTF8 or UTF16, to use to
   *   encode the source string
   * @return {{value : Array.<number>, binLen : number}} Hash list where
   *   "value" contains the output number array and "binLen" is the binary
   *   length of "value"
   */
  function str2binb(str, utfType)
  {
    var bin = [], codePnt, binArr = [], byteCnt = 0, i, j;

    if ("UTF8" === utfType)
    {
      for (i = 0; i < str.length; i += 1)
      {
        codePnt = str.charCodeAt(i);
        binArr = [];

        if (0x800 < codePnt)
        {
          binArr[0] = 0xE0 | ((codePnt & 0xF000) >>> 12);
          binArr[1] = 0x80 | ((codePnt & 0xFC0) >>> 6);
          binArr[2] = 0x80 | (codePnt & 0x3F);
        }
        else if (0x80 < codePnt)
        {
          binArr[0] = 0xC0 | ((codePnt & 0x7C0) >>> 6);
          binArr[1] = 0x80 | (codePnt & 0x3F);
        }
        else
        {
          binArr[0] = codePnt;
        }

        for (j = 0; j < binArr.length; j += 1)
        {
          bin[byteCnt >>> 2] |= binArr[j] << (24 - (8 * (byteCnt % 4)));
          byteCnt += 1;
        }
      }
    }
    else if ("UTF16" === utfType)
    {
      for (i = 0; i < str.length; i += 1)
      {
        codePnt = str.charCodeAt(i);

        bin[byteCnt >>> 2] |= str.charCodeAt(i) << (16 - (8 * (byteCnt % 4)));
        byteCnt += 2;
      }
    }
    return {"value" : bin, "binLen" : byteCnt * 8};
  }

  /**
   * Convert a hex string to an array of big-endian words
   *
   * @private
   * @param {string} str String to be converted to binary representation
   * @return {{value : Array.<number>, binLen : number}} Hash list where
   *   "value" contains the output number array and "binLen" is the binary
   *   length of "value"
   */
  function hex2binb(str)
  {
    var bin = [], length = str.length, i, num;

    if (0 !== (length % 2))
    {
      throw "String of HEX type must be in byte increments";
    }

    for (i = 0; i < length; i += 2)
    {
      num = parseInt(str.substr(i, 2), 16);
      if (!isNaN(num))
      {
        bin[i >>> 3] |= num << (24 - (4 * (i % 8)));
      }
      else
      {
        throw "String of HEX type contains invalid characters";
      }
    }

    return {"value" : bin, "binLen" : length * 4};
  }

  /**
   * Convert a base-64 string to an array of big-endian words
   *
   * @private
   * @param {string} str String to be converted to binary representation
   * @return {{value : Array.<number>, binLen : number}} Hash list where
   *   "value" contains the output number array and "binLen" is the binary
   *   length of "value"
   */
  function b642binb(str)
  {
    var retVal = [], byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual,
      b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/))
    {
      throw "Invalid character in base-64 string";
    }
    firstEqual = str.indexOf('=');
    str = str.replace(/\=/g, '');
    if ((-1 !== firstEqual) && (firstEqual < str.length))
    {
      throw "Invalid '=' found in base-64 string";
    }

    for (i = 0; i < str.length; i += 4)
    {
      strPart = str.substr(i, 4);
      tmpInt = 0;

      for (j = 0; j < strPart.length; j += 1)
      {
        index = b64Tab.indexOf(strPart[j]);
        tmpInt |= index << (18 - (6 * j));
      }

      for (j = 0; j < strPart.length - 1; j += 1)
      {
        retVal[byteCnt >> 2] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) <<
          (24 - (8 * (byteCnt % 4)));
        byteCnt += 1;
      }
    }

    return {"value" : retVal, "binLen" : byteCnt * 8};
  }

  /**
   * Convert an array of big-endian words to a hex string.
   *
   * @private
   * @param {Array.<number>} binarray Array of integers to be converted to
   *   hexidecimal representation
   * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
   *   containing validated output formatting options
   * @return {string} Hexidecimal representation of the parameter in String
   *   form
   */
  function binb2hex(binarray, formatOpts)
  {
    var hex_tab = "0123456789abcdef", str = "",
      length = binarray.length * 4, i, srcByte;

    for (i = 0; i < length; i += 1)
    {
      srcByte = binarray[i >>> 2] >>> ((3 - (i % 4)) * 8);
      str += hex_tab.charAt((srcByte >>> 4) & 0xF) +
        hex_tab.charAt(srcByte & 0xF);
    }

    return (formatOpts["outputUpper"]) ? str.toUpperCase() : str;
  }

  /**
   * Convert an array of big-endian words to a base-64 string
   *
   * @private
   * @param {Array.<number>} binarray Array of integers to be converted to
   *   base-64 representation
   * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
   *   containing validated output formatting options
   * @return {string} Base-64 encoded representation of the parameter in
   *   String form
   */
  function binb2b64(binarray, formatOpts)
  {
    var str = "", length = binarray.length * 4, i, j, triplet,
      b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    for (i = 0; i < length; i += 3)
    {
      triplet = (((binarray[i >>> 2] >>> 8 * (3 - i % 4)) & 0xFF) << 16) |
        (((binarray[i + 1 >>> 2] >>> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) |
        ((binarray[i + 2 >>> 2] >>> 8 * (3 - (i + 2) % 4)) & 0xFF);
      for (j = 0; j < 4; j += 1)
      {
        if (i * 8 + j * 6 <= binarray.length * 32)
        {
          str += b64Tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
        else
        {
          str += formatOpts["b64Pad"];
        }
      }
    }
    return str;
  }

  /**
   * Validate hash list containing output formatting options, ensuring
   * presence of every option or adding the default value
   *
   * @private
   * @param {{outputUpper : boolean, b64Pad : string}|undefined} outputOpts
   *   Hash list of output formatting options
   * @return {{outputUpper : boolean, b64Pad : string}} Validated hash list
   *   containing output formatting options
   */
  function getOutputOpts(outputOpts)
  {
    var retVal = {"outputUpper" : false, "b64Pad" : "="};

    try
    {
      if (outputOpts.hasOwnProperty("outputUpper"))
      {
        retVal["outputUpper"] = outputOpts["outputUpper"];
      }

      if (outputOpts.hasOwnProperty("b64Pad"))
      {
        retVal["b64Pad"] = outputOpts["b64Pad"];
      }
    }
    catch(ignore)
    {}

    if ("boolean" !== typeof(retVal["outputUpper"]))
    {
      throw "Invalid outputUpper formatting option";
    }

    if ("string" !== typeof(retVal["b64Pad"]))
    {
      throw "Invalid b64Pad formatting option";
    }

    return retVal;
  }

  /**
   * The 32-bit implementation of circular rotate left
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @param {number} n The number of bits to shift
   * @return {number} The x shifted circularly by n bits
   */
  function rotl_32(x, n)
  {
    return (x << n) | (x >>> (32 - n));
  }

  /**
   * The 32-bit implementation of circular rotate right
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @param {number} n The number of bits to shift
   * @return {number} The x shifted circularly by n bits
   */
  function rotr_32(x, n)
  {
    return (x >>> n) | (x << (32 - n));
  }

  /**
   * The 64-bit implementation of circular rotate right
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @param {number} n The number of bits to shift
   * @return {Int_64} The x shifted circularly by n bits
   */
  function rotr_64(x, n)
  {
    var retVal = null, tmp = new Int_64(x.highOrder, x.lowOrder);

    if (32 >= n)
    {
      retVal = new Int_64(
          (tmp.highOrder >>> n) | ((tmp.lowOrder << (32 - n)) & 0xFFFFFFFF),
          (tmp.lowOrder >>> n) | ((tmp.highOrder << (32 - n)) & 0xFFFFFFFF)
        );
    }
    else
    {
      retVal = new Int_64(
          (tmp.lowOrder >>> (n - 32)) | ((tmp.highOrder << (64 - n)) & 0xFFFFFFFF),
          (tmp.highOrder >>> (n - 32)) | ((tmp.lowOrder << (64 - n)) & 0xFFFFFFFF)
        );
    }

    return retVal;
  }

  /**
   * The 32-bit implementation of shift right
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @param {number} n The number of bits to shift
   * @return {number} The x shifted by n bits
   */
  function shr_32(x, n)
  {
    return x >>> n;
  }

  /**
   * The 64-bit implementation of shift right
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @param {number} n The number of bits to shift
   * @return {Int_64} The x shifted by n bits
   */
  function shr_64(x, n)
  {
    var retVal = null;

    if (32 >= n)
    {
      retVal = new Int_64(
          x.highOrder >>> n,
          x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
        );
    }
    else
    {
      retVal = new Int_64(
          0,
          x.highOrder >>> (n - 32)
        );
    }

    return retVal;
  }

  /**
   * The 32-bit implementation of the NIST specified Parity function
   *
   * @private
   * @param {number} x The first 32-bit integer argument
   * @param {number} y The second 32-bit integer argument
   * @param {number} z The third 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function parity_32(x, y, z)
  {
    return x ^ y ^ z;
  }

  /**
   * The 32-bit implementation of the NIST specified Ch function
   *
   * @private
   * @param {number} x The first 32-bit integer argument
   * @param {number} y The second 32-bit integer argument
   * @param {number} z The third 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function ch_32(x, y, z)
  {
    return (x & y) ^ (~x & z);
  }

  /**
   * The 64-bit implementation of the NIST specified Ch function
   *
   * @private
   * @param {Int_64} x The first 64-bit integer argument
   * @param {Int_64} y The second 64-bit integer argument
   * @param {Int_64} z The third 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function ch_64(x, y, z)
  {
    return new Int_64(
        (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
        (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
      );
  }

  /**
   * The 32-bit implementation of the NIST specified Maj function
   *
   * @private
   * @param {number} x The first 32-bit integer argument
   * @param {number} y The second 32-bit integer argument
   * @param {number} z The third 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function maj_32(x, y, z)
  {
    return (x & y) ^ (x & z) ^ (y & z);
  }

  /**
   * The 64-bit implementation of the NIST specified Maj function
   *
   * @private
   * @param {Int_64} x The first 64-bit integer argument
   * @param {Int_64} y The second 64-bit integer argument
   * @param {Int_64} z The third 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function maj_64(x, y, z)
  {
    return new Int_64(
        (x.highOrder & y.highOrder) ^
        (x.highOrder & z.highOrder) ^
        (y.highOrder & z.highOrder),
        (x.lowOrder & y.lowOrder) ^
        (x.lowOrder & z.lowOrder) ^
        (y.lowOrder & z.lowOrder)
      );
  }

  /**
   * The 32-bit implementation of the NIST specified Sigma0 function
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function sigma0_32(x)
  {
    return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
  }

  /**
   * The 64-bit implementation of the NIST specified Sigma0 function
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function sigma0_64(x)
  {
    var rotr28 = rotr_64(x, 28), rotr34 = rotr_64(x, 34),
      rotr39 = rotr_64(x, 39);

    return new Int_64(
        rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
        rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
  }

  /**
   * The 32-bit implementation of the NIST specified Sigma1 function
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function sigma1_32(x)
  {
    return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
  }

  /**
   * The 64-bit implementation of the NIST specified Sigma1 function
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function sigma1_64(x)
  {
    var rotr14 = rotr_64(x, 14), rotr18 = rotr_64(x, 18),
      rotr41 = rotr_64(x, 41);

    return new Int_64(
        rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
        rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
  }

  /**
   * The 32-bit implementation of the NIST specified Gamma0 function
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function gamma0_32(x)
  {
    return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
  }

  /**
   * The 64-bit implementation of the NIST specified Gamma0 function
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function gamma0_64(x)
  {
    var rotr1 = rotr_64(x, 1), rotr8 = rotr_64(x, 8), shr7 = shr_64(x, 7);

    return new Int_64(
        rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
        rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
      );
  }

  /**
   * The 32-bit implementation of the NIST specified Gamma1 function
   *
   * @private
   * @param {number} x The 32-bit integer argument
   * @return {number} The NIST specified output of the function
   */
  function gamma1_32(x)
  {
    return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
  }

  /**
   * The 64-bit implementation of the NIST specified Gamma1 function
   *
   * @private
   * @param {Int_64} x The 64-bit integer argument
   * @return {Int_64} The NIST specified output of the function
   */
  function gamma1_64(x)
  {
    var rotr19 = rotr_64(x, 19), rotr61 = rotr_64(x, 61),
      shr6 = shr_64(x, 6);

    return new Int_64(
        rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
        rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
      );
  }

  /**
   * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {number} a The first 32-bit integer argument to be added
   * @param {number} b The second 32-bit integer argument to be added
   * @return {number} The sum of a + b
   */
  function safeAdd_32_2(a, b)
  {
    var lsw = (a & 0xFFFF) + (b & 0xFFFF),
      msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

    return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
  }

  /**
   * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {number} a The first 32-bit integer argument to be added
   * @param {number} b The second 32-bit integer argument to be added
   * @param {number} c The third 32-bit integer argument to be added
   * @param {number} d The fourth 32-bit integer argument to be added
   * @return {number} The sum of a + b + c + d
   */
  function safeAdd_32_4(a, b, c, d)
  {
    var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
      msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
        (lsw >>> 16);

    return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
  }

  /**
   * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {number} a The first 32-bit integer argument to be added
   * @param {number} b The second 32-bit integer argument to be added
   * @param {number} c The third 32-bit integer argument to be added
   * @param {number} d The fourth 32-bit integer argument to be added
   * @param {number} e The fifth 32-bit integer argument to be added
   * @return {number} The sum of a + b + c + d + e
   */
  function safeAdd_32_5(a, b, c, d, e)
  {
    var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
        (e & 0xFFFF),
      msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
        (e >>> 16) + (lsw >>> 16);

    return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
  }

  /**
   * Add two 64-bit integers, wrapping at 2^64. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {Int_64} x The first 64-bit integer argument to be added
   * @param {Int_64} y The second 64-bit integer argument to be added
   * @return {Int_64} The sum of x + y
   */
  function safeAdd_64_2(x, y)
  {
    var lsw, msw, lowOrder, highOrder;

    lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
    msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new Int_64(highOrder, lowOrder);
  }

  /**
   * Add four 64-bit integers, wrapping at 2^64. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {Int_64} a The first 64-bit integer argument to be added
   * @param {Int_64} b The second 64-bit integer argument to be added
   * @param {Int_64} c The third 64-bit integer argument to be added
   * @param {Int_64} d The fouth 64-bit integer argument to be added
   * @return {Int_64} The sum of a + b + c + d
   */
  function safeAdd_64_4(a, b, c, d)
  {
    var lsw, msw, lowOrder, highOrder;

    lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
      (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
    msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
      (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
      (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
      (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new Int_64(highOrder, lowOrder);
  }

  /**
   * Add five 64-bit integers, wrapping at 2^64. This uses 16-bit operations
   * internally to work around bugs in some JS interpreters.
   *
   * @private
   * @param {Int_64} a The first 64-bit integer argument to be added
   * @param {Int_64} b The second 64-bit integer argument to be added
   * @param {Int_64} c The third 64-bit integer argument to be added
   * @param {Int_64} d The fouth 64-bit integer argument to be added
   * @param {Int_64} e The fouth 64-bit integer argument to be added
   * @return {Int_64} The sum of a + b + c + d + e
   */
  function safeAdd_64_5(a, b, c, d, e)
  {
    var lsw, msw, lowOrder, highOrder;

    lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
      (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) +
      (e.lowOrder & 0xFFFF);
    msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
      (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) +
      (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
      (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) +
      (e.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
      (c.highOrder >>> 16) + (d.highOrder >>> 16) +
      (e.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new Int_64(highOrder, lowOrder);
  }

  /**
   * Calculates the SHA-1 hash of the string set at instantiation
   *
   * @private
   * @param {Array.<number>} message The binary array representation of the
   *   string to hash
   * @param {number} messageLen The number of bits in the message
   * @return {Array.<number>} The array of integers representing the SHA-1
   *   hash of message
   */
  function coreSHA1(message, messageLen)
  {
    var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
      maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, i, t,
      safeAdd_5 = safeAdd_32_5, appendedMessageLength,
      H = [
        0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
      ];

    /* Append '1' at the end of the binary string */
    message[messageLen >>> 5] |= 0x80 << (24 - (messageLen % 32));
    /* Append length of binary string in the position such that the new
    length is a multiple of 512.  Logic does not work for even multiples
    of 512 but there can never be even multiples of 512 */
    message[(((messageLen + 65) >>> 9) << 4) + 15] = messageLen;

    appendedMessageLength = message.length;

    for (i = 0; i < appendedMessageLength; i += 16)
    {
      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];

      for (t = 0; t < 80; t += 1)
      {
        if (t < 16)
        {
          W[t] = message[t + i];
        }
        else
        {
          W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }

        if (t < 20)
        {
          T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, 0x5a827999, W[t]);
        }
        else if (t < 40)
        {
          T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0x6ed9eba1, W[t]);
        }
        else if (t < 60)
        {
          T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, 0x8f1bbcdc, W[t]);
        } else {
          T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0xca62c1d6, W[t]);
        }

        e = d;
        d = c;
        c = rotl(b, 30);
        b = a;
        a = T;
      }

      H[0] = safeAdd_2(a, H[0]);
      H[1] = safeAdd_2(b, H[1]);
      H[2] = safeAdd_2(c, H[2]);
      H[3] = safeAdd_2(d, H[3]);
      H[4] = safeAdd_2(e, H[4]);
    }

    return H;
  }

  /**
   * Calculates the desired SHA-2 hash of the string set at instantiation
   *
   * @private
   * @param {Array.<number>} message The binary array representation of the
   *   string to hash
   * @param {number} messageLen The number of bits in message
   * @param {string} variant The desired SHA-2 variant
   * @return {Array.<number>} The array of integers representing the SHA-2
   *   hash of message
   */
  function coreSHA2(message, messageLen, variant)
  {
    var a, b, c, d, e, f, g, h, T1, T2, H, numRounds, lengthPosition, i, t,
      binaryStringInc, binaryStringMult, safeAdd_2, safeAdd_4, safeAdd_5,
      gamma0, gamma1, sigma0, sigma1, ch, maj, Int, W = [],
      appendedMessageLength, retVal,
      K = [
        0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
        0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
        0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
        0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
        0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
        0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
        0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
        0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
        0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
        0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
        0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
        0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
        0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
        0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
        0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
        0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
      ],
      H_trunc = [
        0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
        0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
      ],
      H_full = [
        0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
        0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
      ];

    /* Set up the various function handles and variable for the specific
     * variant */
    if ((variant === "SHA-224" || variant === "SHA-256") &&
      (2 & SUPPORTED_ALGS))
    {
      /* 32-bit variant */
      numRounds = 64;
      lengthPosition = (((messageLen + 65) >>> 9) << 4) + 15;
      binaryStringInc = 16;
      binaryStringMult = 1;
      Int = Number;
      safeAdd_2 = safeAdd_32_2;
      safeAdd_4 = safeAdd_32_4;
      safeAdd_5 = safeAdd_32_5;
      gamma0 = gamma0_32;
      gamma1 = gamma1_32;
      sigma0 = sigma0_32;
      sigma1 = sigma1_32;
      maj = maj_32;
      ch = ch_32;

      if ("SHA-224" === variant)
      {
        H = H_trunc;
      }
      else /* "SHA-256" === variant */
      {
        H = H_full;
      }
    }
    else if ((variant === "SHA-384" || variant === "SHA-512") &&
      (4 & SUPPORTED_ALGS))
    {
      /* 64-bit variant */
      numRounds = 80;
      lengthPosition = (((messageLen + 128) >>> 10) << 5) + 31;
      binaryStringInc = 32;
      binaryStringMult = 2;
      Int = Int_64;
      safeAdd_2 = safeAdd_64_2;
      safeAdd_4 = safeAdd_64_4;
      safeAdd_5 = safeAdd_64_5;
      gamma0 = gamma0_64;
      gamma1 = gamma1_64;
      sigma0 = sigma0_64;
      sigma1 = sigma1_64;
      maj = maj_64;
      ch = ch_64;

      K = [
        new Int(K[ 0], 0xd728ae22), new Int(K[ 1], 0x23ef65cd),
        new Int(K[ 2], 0xec4d3b2f), new Int(K[ 3], 0x8189dbbc),
        new Int(K[ 4], 0xf348b538), new Int(K[ 5], 0xb605d019),
        new Int(K[ 6], 0xaf194f9b), new Int(K[ 7], 0xda6d8118),
        new Int(K[ 8], 0xa3030242), new Int(K[ 9], 0x45706fbe),
        new Int(K[10], 0x4ee4b28c), new Int(K[11], 0xd5ffb4e2),
        new Int(K[12], 0xf27b896f), new Int(K[13], 0x3b1696b1),
        new Int(K[14], 0x25c71235), new Int(K[15], 0xcf692694),
        new Int(K[16], 0x9ef14ad2), new Int(K[17], 0x384f25e3),
        new Int(K[18], 0x8b8cd5b5), new Int(K[19], 0x77ac9c65),
        new Int(K[20], 0x592b0275), new Int(K[21], 0x6ea6e483),
        new Int(K[22], 0xbd41fbd4), new Int(K[23], 0x831153b5),
        new Int(K[24], 0xee66dfab), new Int(K[25], 0x2db43210),
        new Int(K[26], 0x98fb213f), new Int(K[27], 0xbeef0ee4),
        new Int(K[28], 0x3da88fc2), new Int(K[29], 0x930aa725),
        new Int(K[30], 0xe003826f), new Int(K[31], 0x0a0e6e70),
        new Int(K[32], 0x46d22ffc), new Int(K[33], 0x5c26c926),
        new Int(K[34], 0x5ac42aed), new Int(K[35], 0x9d95b3df),
        new Int(K[36], 0x8baf63de), new Int(K[37], 0x3c77b2a8),
        new Int(K[38], 0x47edaee6), new Int(K[39], 0x1482353b),
        new Int(K[40], 0x4cf10364), new Int(K[41], 0xbc423001),
        new Int(K[42], 0xd0f89791), new Int(K[43], 0x0654be30),
        new Int(K[44], 0xd6ef5218), new Int(K[45], 0x5565a910),
        new Int(K[46], 0x5771202a), new Int(K[47], 0x32bbd1b8),
        new Int(K[48], 0xb8d2d0c8), new Int(K[49], 0x5141ab53),
        new Int(K[50], 0xdf8eeb99), new Int(K[51], 0xe19b48a8),
        new Int(K[52], 0xc5c95a63), new Int(K[53], 0xe3418acb),
        new Int(K[54], 0x7763e373), new Int(K[55], 0xd6b2b8a3),
        new Int(K[56], 0x5defb2fc), new Int(K[57], 0x43172f60),
        new Int(K[58], 0xa1f0ab72), new Int(K[59], 0x1a6439ec),
        new Int(K[60], 0x23631e28), new Int(K[61], 0xde82bde9),
        new Int(K[62], 0xb2c67915), new Int(K[63], 0xe372532b),
        new Int(0xca273ece, 0xea26619c), new Int(0xd186b8c7, 0x21c0c207),
        new Int(0xeada7dd6, 0xcde0eb1e), new Int(0xf57d4f7f, 0xee6ed178),
        new Int(0x06f067aa, 0x72176fba), new Int(0x0a637dc5, 0xa2c898a6),
        new Int(0x113f9804, 0xbef90dae), new Int(0x1b710b35, 0x131c471b),
        new Int(0x28db77f5, 0x23047d84), new Int(0x32caab7b, 0x40c72493),
        new Int(0x3c9ebe0a, 0x15c9bebc), new Int(0x431d67c4, 0x9c100d4c),
        new Int(0x4cc5d4be, 0xcb3e42b6), new Int(0x597f299c, 0xfc657e2a),
        new Int(0x5fcb6fab, 0x3ad6faec), new Int(0x6c44198c, 0x4a475817)
      ];

      if ("SHA-384" === variant)
      {
        H = [
          new Int(0xcbbb9d5d, H_trunc[0]), new Int(0x0629a292a, H_trunc[1]),
          new Int(0x9159015a, H_trunc[2]), new Int(0x0152fecd8, H_trunc[3]),
          new Int(0x67332667, H_trunc[4]), new Int(0x98eb44a87, H_trunc[5]),
          new Int(0xdb0c2e0d, H_trunc[6]), new Int(0x047b5481d, H_trunc[7])
        ];
      }
      else /* "SHA-512" === variant */
      {
        H = [
          new Int(H_full[0], 0xf3bcc908), new Int(H_full[1], 0x84caa73b),
          new Int(H_full[2], 0xfe94f82b), new Int(H_full[3], 0x5f1d36f1),
          new Int(H_full[4], 0xade682d1), new Int(H_full[5], 0x2b3e6c1f),
          new Int(H_full[6], 0xfb41bd6b), new Int(H_full[7], 0x137e2179)
        ];
      }
    }
    else
    {
      throw "Unexpected error in SHA-2 implementation";
    }

    /* Append '1' at the end of the binary string */
    message[messageLen >>> 5] |= 0x80 << (24 - messageLen % 32);
    /* Append length of binary string in the position such that the new
     * length is correct */
    message[lengthPosition] = messageLen;

    appendedMessageLength = message.length;

    for (i = 0; i < appendedMessageLength; i += binaryStringInc)
    {
      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];

      for (t = 0; t < numRounds; t += 1)
      {
        if (t < 16)
        {
          /* Bit of a hack - for 32-bit, the second term is ignored */
          W[t] = new Int(message[t * binaryStringMult + i],
              message[t * binaryStringMult + i + 1]);
        }
        else
        {
          W[t] = safeAdd_4(
              gamma1(W[t - 2]), W[t - 7],
              gamma0(W[t - 15]), W[t - 16]
            );
        }

        T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
        T2 = safeAdd_2(sigma0(a), maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safeAdd_2(d, T1);
        d = c;
        c = b;
        b = a;
        a = safeAdd_2(T1, T2);

      }

      H[0] = safeAdd_2(a, H[0]);
      H[1] = safeAdd_2(b, H[1]);
      H[2] = safeAdd_2(c, H[2]);
      H[3] = safeAdd_2(d, H[3]);
      H[4] = safeAdd_2(e, H[4]);
      H[5] = safeAdd_2(f, H[5]);
      H[6] = safeAdd_2(g, H[6]);
      H[7] = safeAdd_2(h, H[7]);
    }

    if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
    {
      retVal = [
        H[0], H[1], H[2], H[3],
        H[4], H[5], H[6]
      ];
    }
    else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
    {
      retVal = H;
    }
    else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
    {
      retVal = [
        H[0].highOrder, H[0].lowOrder,
        H[1].highOrder, H[1].lowOrder,
        H[2].highOrder, H[2].lowOrder,
        H[3].highOrder, H[3].lowOrder,
        H[4].highOrder, H[4].lowOrder,
        H[5].highOrder, H[5].lowOrder
      ];
    }
    else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
    {
      retVal = [
        H[0].highOrder, H[0].lowOrder,
        H[1].highOrder, H[1].lowOrder,
        H[2].highOrder, H[2].lowOrder,
        H[3].highOrder, H[3].lowOrder,
        H[4].highOrder, H[4].lowOrder,
        H[5].highOrder, H[5].lowOrder,
        H[6].highOrder, H[6].lowOrder,
        H[7].highOrder, H[7].lowOrder
      ];
    }
    else /* This should never be reached */
    {
      throw "Unexpected error in SHA-2 implementation";
    }

    return retVal;
  }

  /**
   * jsSHA is the workhorse of the library.  Instantiate it with the string to
   * be hashed as the parameter
   *
   * @constructor
   * @this {jsSHA}
   * @param {string} srcString The string to be hashed
   * @param {string} inputFormat The format of srcString, HEX, TEXT, or ASCII
   * @param {string=} encoding The text encoding to use to encode the source
   *   string
   */
  var jsSHA = function(srcString, inputFormat, encoding)
  {
    var strBinLen = 0, strToHash = [0], utfType = '', srcConvertRet = null;

    utfType = encoding || "UTF8";

    if (!(("UTF8" === utfType) || ("UTF16" === utfType)))
    {
      throw "encoding must be UTF8 or UTF16";
    }

    /* Convert the input string into the correct type */
    if ("HEX" === inputFormat)
    {
      if (0 !== (srcString.length % 2))
      {
        throw "srcString of HEX type must be in byte increments";
      }
      srcConvertRet = hex2binb(srcString);
      strBinLen = srcConvertRet["binLen"];
      strToHash = srcConvertRet["value"];
    }
    else if (("ASCII" === inputFormat) || ("TEXT" === inputFormat))
    {
      srcConvertRet = str2binb(srcString, utfType);
      strBinLen = srcConvertRet["binLen"];
      strToHash = srcConvertRet["value"];
    }
    else if ("B64" === inputFormat)
    {
      srcConvertRet = b642binb(srcString);
      strBinLen = srcConvertRet["binLen"];
      strToHash = srcConvertRet["value"];
    }
    else
    {
      throw "inputFormat must be HEX, TEXT, ASCII, or B64";
    }

    /**
     * Returns the desired SHA hash of the string specified at instantiation
     * using the specified parameters
     *
     * @expose
     * @param {string} variant The desired SHA variant (SHA-1, SHA-224,
     *   SHA-256, SHA-384, or SHA-512)
     * @param {string} format The desired output formatting (B64 or HEX)
     * @param {number=} numRounds The number of rounds of hashing to be
     *   executed
     * @param {{outputUpper : boolean, b64Pad : string}=} outputFormatOpts
     *   Hash list of output formatting options
     * @return {string} The string representation of the hash in the format
     *   specified
     */
    this.getHash = function(variant, format, numRounds, outputFormatOpts)
    {
      var formatFunc = null, message = strToHash.slice(),
        messageBinLen = strBinLen, i;

      /* Need to do argument patching since both numRounds and
         outputFormatOpts are optional */
      if (3 === arguments.length)
      {
        if ("number" !== typeof numRounds)
        {
          outputFormatOpts = numRounds;
          numRounds = 1;
        }
      }
      else if (2 === arguments.length)
      {
        numRounds = 1;
      }

      /* Validate the numRounds argument */
      if ((numRounds !== parseInt(numRounds, 10)) || (1 > numRounds))
      {
        throw "numRounds must a integer >= 1";
      }

      /* Validate the output format selection */
      switch (format)
      {
      case "HEX":
        formatFunc = binb2hex;
        break;
      case "B64":
        formatFunc = binb2b64;
        break;
      default:
        throw "format must be HEX or B64";
      }

      if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
      {
        for (i = 0; i < numRounds; i++)
        {
          message = coreSHA1(message, messageBinLen);
          messageBinLen = 160;
        }
      }
      else if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
      {
        for (i = 0; i < numRounds; i++)
        {
          message = coreSHA2(message, messageBinLen, variant);
          messageBinLen = 224;
        }
      }
      else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
      {
        for (i = 0; i < numRounds; i++)
        {
          message = coreSHA2(message, messageBinLen, variant);
          messageBinLen = 256;
        }
      }
      else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
      {
        for (i = 0; i < numRounds; i++)
        {
          message = coreSHA2(message, messageBinLen, variant);
          messageBinLen = 384;
        }
      }
      else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
      {
        for (i = 0; i < numRounds; i++)
        {
          message = coreSHA2(message, messageBinLen, variant);
          messageBinLen = 512;
        }
      }
      else
      {
        throw "Chosen SHA variant is not supported";
      }

      return formatFunc(message, getOutputOpts(outputFormatOpts));
    };

    /**
     * Returns the desired HMAC of the string specified at instantiation
     * using the key and variant parameter
     *
     * @expose
     * @param {string} key The key used to calculate the HMAC
     * @param {string} inputFormat The format of key, HEX or TEXT or ASCII
     * @param {string} variant The desired SHA variant (SHA-1, SHA-224,
     *   SHA-256, SHA-384, or SHA-512)
     * @param {string} outputFormat The desired output formatting
     *   (B64 or HEX)
     * @param {{outputUpper : boolean, b64Pad : string}=} outputFormatOpts
     *   associative array of output formatting options
     * @return {string} The string representation of the hash in the format
     *   specified
     */
    this.getHMAC = function(key, inputFormat, variant, outputFormat,
      outputFormatOpts)
    {
      var formatFunc, keyToUse, blockByteSize, blockBitSize, i,
        retVal, lastArrayIndex, keyBinLen, hashBitSize,
        keyWithIPad = [], keyWithOPad = [], keyConvertRet = null;

      /* Validate the output format selection */
      switch (outputFormat)
      {
      case "HEX":
        formatFunc = binb2hex;
        break;
      case "B64":
        formatFunc = binb2b64;
        break;
      default:
        throw "outputFormat must be HEX or B64";
      }

      /* Validate the hash variant selection and set needed variables */
      if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
      {
        blockByteSize = 64;
        hashBitSize = 160;
      }
      else if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
      {
        blockByteSize = 64;
        hashBitSize = 224;
      }
      else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
      {
        blockByteSize = 64;
        hashBitSize = 256;
      }
      else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
      {
        blockByteSize = 128;
        hashBitSize = 384;
      }
      else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
      {
        blockByteSize = 128;
        hashBitSize = 512;
      }
      else
      {
        throw "Chosen SHA variant is not supported";
      }

      /* Validate input format selection */
      if ("HEX" === inputFormat)
      {
        keyConvertRet = hex2binb(key);
        keyBinLen = keyConvertRet["binLen"];
        keyToUse = keyConvertRet["value"];
      }
      else if (("ASCII" === inputFormat) || ("TEXT" === inputFormat))
      {
        keyConvertRet = str2binb(key, utfType);
        keyBinLen = keyConvertRet["binLen"];
        keyToUse = keyConvertRet["value"];
      }
      else if ("B64" === inputFormat)
      {
        keyConvertRet = b642binb(key);
        keyBinLen = keyConvertRet["binLen"];
        keyToUse = keyConvertRet["value"];
      }
      else
      {
        throw "inputFormat must be HEX, TEXT, ASCII, or B64";
      }

      /* These are used multiple times, calculate and store them */
      blockBitSize = blockByteSize * 8;
      lastArrayIndex = (blockByteSize / 4) - 1;

      /* Figure out what to do with the key based on its size relative to
       * the hash's block size */
      if (blockByteSize < (keyBinLen / 8))
      {
        if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
        {
          keyToUse = coreSHA1(keyToUse, keyBinLen);
        }
        else if (6 & SUPPORTED_ALGS)
        {
          keyToUse = coreSHA2(keyToUse, keyBinLen, variant);
        }
        else
        {
          throw "Unexpected error in HMAC implementation";
        }
        /* For all variants, the block size is bigger than the output
         * size so there will never be a useful byte at the end of the
         * string */
        keyToUse[lastArrayIndex] &= 0xFFFFFF00;
      }
      else if (blockByteSize > (keyBinLen / 8))
      {
        /* If the blockByteSize is greater than the key length, there
         * will always be at LEAST one "useless" byte at the end of the
         * string */
        keyToUse[lastArrayIndex] &= 0xFFFFFF00;
      }

      /* Create ipad and opad */
      for (i = 0; i <= lastArrayIndex; i += 1)
      {
        keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
        keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
      }

      /* Calculate the HMAC */
      if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
      {
        retVal = coreSHA1(
          keyWithOPad.concat(
            coreSHA1(
              keyWithIPad.concat(strToHash),
              blockBitSize + strBinLen
            )
          ),
          blockBitSize + hashBitSize);
      }
      else if (6 & SUPPORTED_ALGS)
      {
        retVal = coreSHA2(
          keyWithOPad.concat(
            coreSHA2(
              keyWithIPad.concat(strToHash),
              blockBitSize + strBinLen,
              variant
            )
          ),
          blockBitSize + hashBitSize, variant);
      }
      else
      {
        throw "Unexpected error in HMAC implementation";
      }

      return formatFunc(retVal, getOutputOpts(outputFormatOpts));
    };
  };

  if (("function" === typeof define) && (typeof define["amd"])) /* AMD Support */
  {
    define(function()
    {
      return jsSHA;
    });
  } else if ("undefined" !== typeof exports) /* Node Support */
  {
    if (("undefined" !== typeof module) && module["exports"])
    {
      module["exports"] = exports = jsSHA;
    }
    else {
      exports = jsSHA;
    }
  } else { /* Browsers and Web Workers*/
    global["jsSHA"] = jsSHA;
  }
}(this));
/***
Copyright (c) 2013-2016, callstats.io
All rights reserved.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
***/

/*! callstats.js  version = 3.17.7 2017-02-15 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(b){"use strict";!function(){function c(){function b(){var a=(Math.random()+1).toString(36);return a.substring(2,a.length)}function c(){return window.performance.now?window.performance.now()+window.performance.timing.navigationStart:Date.now()}function d(){var a=c();return a+Wa.currentOffset}function e(){return window.performance.now?window.performance.now():null}function f(){"function"==typeof navigator.getBattery&&navigator.getBattery().then(function(a){pa=a})}function g(){if(pa)return pa.level}function h(){if(pa)return pa.charging}function i(a,b){return a.sort().toString()===b.sort().toString()}function j(a){navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices&&navigator.mediaDevices.enumerateDevices().then(function(b){oa?i(oa,b)||(oa=b,Sb(a)):(oa=b,Sb(a)),setTimeout(function(){j(a)},Ga)}).catch(function(){setTimeout(function(){j(a)},Ga)})}function k(){Ca||window.addEventListener("beforeunload",function(a){var b;for(b in Ua)Ua.hasOwnProperty(b)&&Pb(db.userLeft,null,b,Ua[b].ucID,null,null,null);return"Are you sure you want to close the call?"})}function l(a,b,c,d,f){var g=ac(c,d),h=null;g&&(h=e(),Pb(db.mediaPlaybackStartEvent,b,c,a,{ssrc:f,highResTs:h},g,null))}function m(a,b,c,d,f){var g=ac(c,d),h=null;g&&(h=e(),Pb(db.mediaSuspendedEvent,b,c,a,{ssrc:f,highResTs:h},g,null))}function n(a,b,c,d,e){var f=document.getElementById(c);if(f){var g=Ua[b].ucID;f.oncanplay=function(){l(g,a,b,d,e)},f.onsuspend=function(){m(g,a,b,d,e)}}}function o(a){var b=Ra.codebase,c=!1;if(null===a)c=!1;else if(b===wb.firefox){var d=typeof mozRTCPeerConnection,e=typeof RTCPeerConnection;"undefined"!==d&&a instanceof mozRTCPeerConnection?c=!0:"undefined"!==e&&a instanceof RTCPeerConnection&&(c=!0)}else null!==bb&&a instanceof bb&&(c=!0),"function"!=typeof a&&b!==wb.edge||(c=!0),void 0!==typeof a.createOffer&&(c=!0);return c}function p(a,b){var c;return a&&(b===wb.chrome?(c=a.googLocalAddress,c.concat(":",a.googRemoteAddress)):b===wb.firefox&&(c=a.localAddr,c.concat(":",a.remoteAddr))),Wb(c)}function q(){var a;return a=navigator.onLine===!0?"online":"offline"}function r(a,b,c,d){var e=null;c.ssrcMap.hasOwnProperty(a.data.ssrc)&&(c.ssrcMap[a.data.ssrc].mediaType=d,b===wb.chrome&&(e=a.data.googCodecName),c.ssrcMap[a.data.ssrc].codec=e,a.data.codecImplementationName&&(c.ssrcMap[a.data.ssrc].codecImplementationName=a.data.codecImplementationName))}function s(a,b){var c=xb.unknown;if(a&&a.data&&void 0!==a.data.mediaType)c=a.data.mediaType;else if(b===wb.chrome)void 0!==a&&(void 0!==a.data.googFrameRateReceived||void 0!==a.data.googFrameRateSent?c=xb.video:void 0===a.data.audioInputLevel&&void 0===a.data.audioOutputLevel||(c=xb.audio));else{if(b!==wb.firefox)return;void 0!==a&&void 0!==a.data.framerateMean&&(c=xb.video)}return c}function t(a,b){var c;return b===wb.chrome?void 0!==a.data.googFrameRateOutput?c=parseInt(a.data.googFrameRateOutput,10):void 0!==a.data.googFrameRateDecoded?c=parseInt(a.data.googFrameRateDecoded,10):void 0!==a.data.googFrameRateReceived?c=parseInt(a.data.googFrameRateReceived,10):void 0!==a.data.googFrameRateSent&&(c=parseInt(a.data.googFrameRateSent,10)):b===wb.firefox&&void 0!==a.data.framerateMean&&(c=parseInt(a.data.framerateMean,10)),void 0!==c&&(c=isNaN(c)||c<0?null:c),c}function u(a,b){var c,d,e,f="unavailable";return c=t(a,b),e=w(a,b),d=v(a,b),void 0!==c&&void 0!==e&&void 0!==d&&e>0&&d>0&&(f=e.concat("x",d,"@",c)),f}function v(a,b){var c;return b===wb.chrome?void 0!==a.data.googFrameHeightReceived?c=a.data.googFrameHeightReceived:void 0!==a.data.googFrameHeightSent&&(c=a.data.googFrameHeightSent):b===wb.firefox,c}function w(a,b){var c;return b===wb.chrome?void 0!==a.data.googFrameWidthReceived?c=a.data.googFrameWidthReceived:void 0!==a.data.googFrameWidthSent&&(c=a.data.googFrameWidthSent):b===wb.firefox,c}function x(a){var b;return b=isNaN(a)||a<0?null:a}function y(a,b){var c;if(b===wb.chrome){if(void 0!==a&&void 0!==a.data.googRtt)return c=x(parseInt(a.data.googRtt,10))}else if(b===wb.firefox){if(void 0!==a&&void 0!==a.data.mozRtt)return c=x(parseInt(a.data.mozRtt,10))}else if(b===wb.edge&&a&&a.data.roundTripTime)return c=x(parseInt(a.data.roundTripTime,10))}function z(a){var b=isNaN(a)?null:a;return b}function A(a,b){var c;if(b===wb.chrome){if(void 0!==a&&void 0!==a.data.googJitterReceived)return c=z(parseInt(a.data.googJitterReceived,10)),c&&(c/=1e3),c}else if(b===wb.firefox&&void 0!==a&&void 0!==a.data.jitter)return c=z(parseInt(a.data.jitter,10))}function B(a,b){if(b.sort(),b.length>0){var c=a/100*b.length;c=Math.ceil(c);var d=b[c-1];return d}}function C(a){var b,c;return a&&a.length>0&&(b=a.reduce(function(a,b){return a+b}),c=b/a.length),c}function D(a,b,c){var d;return b===xb.audio?a<c.audio.gThreshold?d=mb.excellent:a>c.audio.gThreshold&&a<c.audio.rThreshold?d=mb.fair:a>c.audio.rThreshold&&(d=mb.bad):b===xb.video&&(a<c.video.gThreshold?d=mb.excellent:a>c.video.gThreshold&&a<c.video.rThreshold?d=mb.fair:a>c.video.rThreshold&&(d=mb.bad)),d}function E(a,b,c){var d;return b===xb.audio?a>c.audio.gThreshold?d=mb.excellent:a>c.audio.rThreshold&&a<c.audio.gThreshold?d=mb.fair:a<c.audio.rThreshold&&(d=mb.bad):b===xb.video&&(a>c.video.gThreshold?d=mb.excellent:a>c.video.rThreshold&&a<c.video.gThreshold?d=mb.fair:a<c.video.rThreshold&&(d=mb.bad)),d}function F(){var a,b,c=0,d=0;for(a=0;a<arguments.length;a++)void 0!==arguments[a]&&null!==arguments[a]&&(c+=arguments[a],d++);return d>0&&(c/=d,c=Math.floor(c),c===mb.excellent?b=nb.excellent:c===mb.fair?b=nb.fair:c===mb.bad&&(b=nb.bad)),b}function G(a,b,c){var d,e,f,g,h,i,j,k,l=[];if(void 0!==a.lastStatsSent&&void 0!==a.lastStatsSent.statistics.Transport)for(f=a.lastStatsSent.statistics.Transport,g=a.latestEventSent,h=void 0,d=0;d<b.length;d++){for(h=void 0,e=0;e<f.length;e++)if(b[d].hash===f[e].hash){h=f[e];break}void 0!==h&&(i=parseInt(h.bytesReceived,10),j=parseInt(h.bytesSent,10),k=c-g,k>0&&(b[d].csioReceivedBwKbps=8*(parseInt(b[d].bytesReceived,10)-i)/k,b[d].csioSentBwKbps=8*(parseInt(b[d].bytesSent,10)-j)/k,b[d].csioIntBytesReceived=parseInt(b[d].bytesReceived,10)-i,b[d].csioIntBytesSent=parseInt(b[d].bytesSent,10)-j,void 0!==h.packetsSent&&void 0!==b[d].packetsSent&&(b[d].csioSentPacketRate=(parseInt(b[d].packetsSent,10)-parseInt(h.packetsSent,10))/(k/1e3),b[d].csioIntPacketsSent=parseInt(b[d].packetsSent,10)-parseInt(h.packetsSent,10)),void 0!==h.packetsReceived&&void 0!==b[d].packetsReceived&&(b[d].csioReceivedPacketRate=(parseInt(b[d].packetsReceived,10)-parseInt(h.packetsReceived,10))/(k/1e3),b[d].csioIntPacketsReceived=parseInt(b[d].packetsReceived,10)-parseInt(h.packetsReceived,10))),l.push(b[d]))}return l}function H(a,b,c,d){var e=[];return c===wb.firefox?e=null:c===wb.chrome&&(e=G(a,b,d)),e}function I(a){if(a=z(a),null!==a){var b=a<0?null:a;return b}}function J(a,b,c,d,e,f,g){return void 0===a[c]&&(a[c]={}),void 0===a[c].streams&&(a[c].streams={}),void 0===a[c].streams[b]&&(a[c].streams[b]={}),void 0===a[c].streams[b][e]&&(a[c].streams[b][e]={}),void 0===a[c].streams[b][e][d]&&(a[c].streams[b][e][d]={}),void 0===a[c].streams[b][e][d][f]&&(g?a[c].streams[b][e][d][f]=[]:a[c].streams[b][e][d][f]=0),a}function K(a,b,c,d,e,f,g){var h,i,j,k,l,m,n,o,p,q,x,A,G,H,K,L,N,O,P,Q,R,S,T,U,V,W,X,Y,Z=null,$=null,_=null,aa=b.reportType,ba=null,ca=null,da=null,ea=null,fa=null,ga=null,ha=null,ia=null,ja=null,ka=b.data,la=0,ma=M(c.streams,b.ssrc,"outbound",aa);ma?(h=z(parseInt(ma.data.bytesSent,10)),i=a.lastStatsSent.apiTS,K=z(parseInt(ma.data.packetsSent,10)),N=z(parseInt(ma.data.packetsLost,10)),O=z(parseInt(ma.data.discardedPackets,10))):(h=0,i=e,N=0,K=0,O=0),k=e,A=k-i,m=s(b,d),n=u(b,d),o=t(b,d),p=w(b,d),T=v(b,d),r(b,d,a,m),l=y(b,d),j=z(parseInt(ka.bytesSent,10)),null!==j&&null!==h&&j<h&&(h=0,Gb(ya,za,"log",{msg:"getstats: curBytesSent < prevBytesSent counter reset",conferenceID:f,ucID:g})),void 0!==ka.droppedFrames&&(P=I(parseInt(ka.droppedFrames,10)),null!==P&&null!==O&&P<O&&(O=0),null!==P&&null!==O&&(Q=P-O)),L=I(parseInt(ka.packetsLost,10)),null!==L&&null!==N&&($=L-N),H=I(parseInt(ka.packetsSent,10)),null!==H&&null!==K&&(G=H-K),null!==L&&null!==H&&L>0&&(la=L/H*100),void 0!==$&&void 0!==G&&G+$>0&&(_=$/(G+$)),A>0&&(null!==j&&null!==h&&(Z=8*(j-h)/A,H&&0!==H&&(U=j/H)),void 0!==G&&(ja=G/(A/1e3)));var na=b.ssrc;a=J(a,na,"rttInfo",aa,"outbound","rttArray",!0),a=J(a,na,"fractionalLossInfo",aa,"outbound","fractionalLossArray",!0),a=J(a,na,"timeElapse",aa,"outbound","totalTimeMs",!1),a=J(a,na,"frameWidthInfo",aa,"outbound","frameWidthArray",!0),a=J(a,na,"frameRateInfo",aa,"outbound","frameRateArray",!0),a=J(a,na,"frameHeightInfo",aa,"outbound","frameHeightArray",!0),void 0!==l&&null!==l&&a.rttInfo.streams[na].outbound[aa].rttArray.push(parseInt(l,10)),void 0!==_&&null!==_&&a.fractionalLossInfo.streams[na].outbound[aa].fractionalLossArray.push(_),void 0!==o&&null!==o&&a.frameRateInfo.streams[na].outbound[aa].frameRateArray.push(parseInt(o,10)),void 0!==p&&null!==p&&a.frameWidthInfo.streams[na].outbound[aa].frameWidthArray.push(parseInt(p,10)),void 0!==T&&null!==T&&a.frameHeightInfo.streams[na].outbound[aa].frameHeightArray.push(parseInt(T,10)),ba=B(95,a.rttInfo.streams[na].outbound[aa].rttArray),ea=B(95,a.fractionalLossInfo.streams[na].outbound[aa].fractionalLossArray),V=C(a.frameRateInfo.streams[na].outbound[aa].frameRateArray),W=B(50,a.frameHeightInfo.streams[na].outbound[aa].frameHeightArray),X=C(a.frameHeightInfo.streams[na].outbound[aa].frameHeightArray),Y=C(a.rttInfo.streams[na].outbound[aa].rttArray),null!==j&&null!==h&&j>h&&(a.timeElapse.streams[na].outbound[aa].totalTimeMs=a.timeElapse.streams[na].outbound[aa].totalTimeMs+A),a.timeElapse.streams[na].outbound[aa].totalTimeMs>0&&null!==j&&(ia=8*j/a.timeElapse.streams[na].outbound[aa].totalTimeMs);var oa={csioIntMs:A,csioIntFL:_,csioIntPR:ja,csioIntBRKbps:Z,csioMediaType:m,csioSig2Latency:ba,csioAvgBRKbps:ia,csioTimeElapseMs:a.timeElapse.streams[na].outbound[aa].totalTimeMs,csioRes:n,csioPercentileFl:ea,csioIntFramesDropped:Q,csioAvgRtt:Y,csioAvgFrameRate:V,csioMedianFrameHeight:W,csioAvgFrameHeight:X,csioAvgPacketSize:U,csioPktLossPercentage:la};for(R in ka)ka.hasOwnProperty(R)&&(oa[R]=ka[R]);return m===xb.audio?(S=ba+40,ca=D(S,m,vb),da=E(Z,m,rb),q=F(ca,da),oa.csioMark=q,oa.csioeM=S):m===xb.video&&(oa.csioPercentileFrameWidth=B(95,a.frameWidthInfo.streams[na].outbound[aa].frameWidthArray),oa.csioPercentileFrameRate=B(95,a.frameRateInfo.streams[na].outbound[aa].frameRateArray),x=parseInt(a.rttInfo.streams[na].outbound[aa].frameRate,10),fa=E(o/x,m,sb),ga=D(l,m,tb),ha=E(Z,m,rb),q=F(fa,ga,ha),a.rttInfo.streams[na].outbound[aa].frameRate=o,oa.csioMark=q),oa}function L(a,b,c,d,e,f,g){var h,i,j,k,l,m,n,o,p,q,x,G,H,K,L,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da=null,ea=null,fa=b.reportType,ga=null,ha=null,ia=null,ja=null,ka=null,la=null,ma=null,na=null,oa=null,pa=b.data,qa=0,ra=M(c.streams,b.ssrc,"inbound",fa);ra?(h=z(parseInt(ra.data.bytesReceived,10)),l=z(parseInt(ra.data.packetsLost,10)),R=z(parseInt(ra.data.packetsReceived,10)),i=a.lastStatsSent.apiTS,T=z(parseInt(ra.data.discardedPackets,10))):(h=0,i=e,l=0,R=0,T=0),o=s(b,d),p=u(b,d),x=t(b,d),q=A(b,d),X=w(b,d),n=y(b,d),Y=v(b,d),r(b,d,a,o),j=z(parseInt(pa.bytesReceived,10)),null!==j&&null!==h&&j<h&&(h=0,l=0,R=0,Gb(ya,za,"log",{msg:"getstats: curBytesReceived < prevBytesReceived counter reset",conferenceID:f,ucID:g})),m=I(parseInt(pa.packetsLost,10)),null!==m&&null!==l&&(ea=m-l),k=e,void 0!==pa.discardedPackets&&(S=I(parseInt(pa.discardedPackets,10)),null!==S&&null!==T&&S<T&&(T=0),null!==S&&null!==T&&(U=S-T)),Q=I(parseInt(pa.packetsReceived,10)),G=Q-R,void 0!==ea&&null!==G&&G+ea>0&&(ha=ea/(G+ea)),null!==m&&null!==Q&&m>0&&(qa=m/Q*100),P=k-i,P>0&&(null!==j&&null!==h&&(da=8*(j-h)/P,Q&&0!==Q&&(Z=j/Q)),null!==G&&(ga=G/(P/1e3)));var sa=b.ssrc;a=J(a,sa,"rttInfo",fa,"inbound","rttArray",!0),a=J(a,sa,"timeElapse",fa,"inbound","totalTimeMs",!1),a=J(a,sa,"jitterInfo",fa,"inbound","jitterArray",!0),a=J(a,sa,"fractionalLossInfo",fa,"inbound","fractionalLossArray",!0),a=J(a,sa,"frameWidthInfo",fa,"inbound","frameWidthArray",!0),a=J(a,sa,"frameRateInfo",fa,"inbound","frameRateArray",!0),a=J(a,sa,"frameHeightInfo",fa,"inbound","frameHeightArray",!0),void 0!==n&&null!==n&&a.rttInfo.streams[sa].inbound[fa].rttArray.push(parseInt(n,10)),void 0!==q&&null!==q&&a.jitterInfo.streams[sa].inbound[fa].jitterArray.push(parseInt(q,10)),void 0!==ha&&null!==ha&&a.fractionalLossInfo.streams[sa].inbound[fa].fractionalLossArray.push(ha),void 0!==x&&null!==x&&a.frameRateInfo.streams[sa].inbound[fa].frameRateArray.push(parseInt(x,10)),void 0!==X&&null!==X&&a.frameWidthInfo.streams[sa].inbound[fa].frameWidthArray.push(parseInt(X,10)),void 0!==Y&&null!==Y&&a.frameHeightInfo.streams[sa].inbound[fa].frameHeightArray.push(parseInt(Y,10)),ia=B(95,a.rttInfo.streams[sa].inbound[fa].rttArray),ja=B(95,a.jitterInfo.streams[sa].inbound[fa].jitterArray),ka=B(95,a.fractionalLossInfo.streams[sa].inbound[fa].fractionalLossArray),$=C(a.frameRateInfo.streams[sa].inbound[fa].frameRateArray),_=B(50,a.frameHeightInfo.streams[sa].inbound[fa].frameHeightArray),aa=C(a.frameHeightInfo.streams[sa].inbound[fa].frameHeightArray),ba=C(a.jitterInfo.streams[sa].inbound[fa].jitterArray),ca=C(a.rttInfo.streams[sa].inbound[fa].rttArray),null!==j&&null!==h&&j>h&&(a.timeElapse.streams[sa].inbound[fa].totalTimeMs=a.timeElapse.streams[sa].inbound[fa].totalTimeMs+P),null!==j&&a.timeElapse.streams[sa].inbound[fa].totalTimeMs>0&&(oa=8*j/a.timeElapse.streams[sa].inbound[fa].totalTimeMs);var ta={csioIntMs:P,csioIntFL:ha,csioIntPR:ga,csioIntBRKbps:da,csioSig2Latency:ia,csioAvgBRKbps:oa,csioMediaType:o,csioTimeElapseMs:a.timeElapse.streams[sa].inbound[fa].totalTimeMs,csioIntPktRcv:G,csioIntPktLoss:ea,csioPercentileJitter:ja,csioRes:p,csioPercentileFl:ka,csioIntPktDiscarded:U,csioAvgJitter:ba,csioAvgRtt:ca,csioAvgFrameRate:$,csioMedianFrameHeight:_,csioAvgFrameHeight:aa,csioAvgPacketSize:Z,csioPktLossPercentage:qa};for(V in pa)pa.hasOwnProperty(V)&&(ta[V]=pa[V]);return o===xb.audio?(W=ia+40,la=D(W,o,vb),ma=D(ha,o,ub),na=E(da,o,rb),H=F(la,ma,na),ta.csioMark=H,ta.csioeM=W):o===xb.video&&(ta.csioPercentileFrameRate=B(95,a.frameRateInfo.streams[sa].inbound[fa].frameRateArray),ta.csioPercentileFrameWidth=B(95,a.frameWidthInfo.streams[sa].inbound[fa].frameWidthArray),K=a.rttInfo.streams[sa].inbound[fa].frameRate,L=E(x/K,o,sb),N=D(n,o,tb),O=E(da,o,rb),H=F(L,N,O),a.rttInfo.streams[sa].inbound[fa].frameRate=x,ta.csioMark=H),ta}function M(a,b,c,d){var e=a.filter(function(a){return a.ssrc===b&&a.streamType===c&&a.reportType===d});return e.length>0?e[0]:null}function N(a,b,c,d,e,f){var g={streams:[]};g.fabricState=a.pcState,g.connectionState=q();var h=null;return h=a.lastStatsSent?a.lastStatsSent.statistics:{streams:[]},b.streams.forEach(function(b){var i={cname:b.cname,usage:b.usage,msid:b.msid,userID:b.userID,associatedVideoTag:b.associatedVideoTag,ssrc:b.ssrc,streamType:b.streamType,reportType:b.reportType};"inbound"===b.streamType?i.data=L(a,b,h,c,d,e,f):i.data=K(a,b,h,c,d,e,f),g.streams.push(i)}),g}function O(a){var b,c,d;for(b in a.streams)if(a.streams.hasOwnProperty(b)){if(a.streams[b].inbound)for(d in a.streams[b].inbound)a.streams[b].inbound.hasOwnProperty(d)&&(c=a.streams[b].inbound[d].mark,c===nb.bad?a.streams[b].inbound[d].mark=2:c===nb.fair?a.streams[b].inbound[d].mark=1:a.streams[b].inbound[d].mark=0);if(a.streams[b].outbound)for(d in a.streams[b].outbound)a.streams[b].outbound.hasOwnProperty(d)&&(c=a.streams[b].outbound[d].mark,c===nb.bad?a.streams[b].outbound[d].mark=2:c===nb.fair?a.streams[b].outbound[d].mark=1:a.streams[b].outbound[d].mark=0)}return a}function P(a,b,c){var d,e,f;for(d=0;d<a.length;d++)e=b[a[d].localCandidateId],f=c[a[d].remoteCandidateId],a[d].localAddr=e.ipAddress+":"+e.portNumber,a[d].remoteAddr=f.ipAddress+":"+f.portNumber,a[d].localAddrType=e.candidateType,a[d].remoteAddrType=f.candidateType,a[d].transportType=e.transport;return a}function Q(a){var b={},c=Rc.getConferenceURL();return a.connectionState&&(b.connectionState=a.connectionState),a.fabricState&&(b.fabricState=a.fabricState),c&&(b.conferenceURL=c),b.streams={},a.streams.forEach(function(a){var c={cname:a.cname,ssrc:a.ssrc,msid:a.msid,remoteUserID:a.userID,usageLabel:a.usage,associatedVideoTag:a.associatedVideoTag};a.data.hasOwnProperty("csioIntFL")&&(c.fractionLoss=a.data.csioIntFL),a.data.hasOwnProperty("csioIntBRKbps")&&(c.bitrate=a.data.csioIntBRKbps),a.data.hasOwnProperty("csioMark")&&(c.quality=a.data.csioMark),a.data.hasOwnProperty("csioMediaType")&&(c.mediaType=a.data.csioMediaType),a.data.hasOwnProperty("googRtt")&&(c.rtt=a.data.googRtt),a.data.hasOwnProperty("mozRtt")&&(c.rtt=a.data.mozRtt),a.data.hasOwnProperty("roundTripTime")&&(c.rtt=a.data.roundTripTime),a.data.hasOwnProperty("jitter")&&(c.jitter=a.data.jitter),a.data.hasOwnProperty("googJitterReceived")&&(c.jitter=a.data.googJitterReceived),a.data.hasOwnProperty("audioOutputLevel")&&(c.audioOutputLevel=a.data.audioOutputLevel),a.data.hasOwnProperty("audioInputLevel")&&(c.audioInputLevel=a.data.audioInputLevel),a.data.hasOwnProperty("csioAvgRtt")&&(c.averageRTT=a.data.csioAvgRtt),a.data.hasOwnProperty("csioAvgJitter")&&(c.averageJitter=a.data.csioAvgJitter),a.data.hasOwnProperty("csioPktLossPercentage")&&(c.packetLossPercentage=a.data.csioPktLossPercentage),b.streams[a.ssrc]=c}),b}function R(a,b,c,e,f,g){var h=d();a.hasOwnProperty("token")&&a.hasOwnProperty("ucID")&&!Xa?(ia(eb.processedStats,a,g),b.latestEventSent=h,b.lastFabricState=b.pcState):(a.clockUnsynced=Xa,Na.cacheEvent({channel:eb.processedStats,data:a}),a.hasOwnProperty("token")||Pa.sendAuthenticationRequest(ya,f))}function S(a,b,e,f,i,j,k){function l(l){var m=d(),n=c();void 0===j.lastRawStatsSentInterval||null===j.lastRawStatsSentInterval?j.lastRawStatsSentInterval=n-j.statsPollingStart:j.lastRawStatsSentInterval=n-j.rawstatsTS+j.lastRawStatsSentInterval,void 0===j.lastProcessedStatsSentInterval||null===j.lastProcessedStatsSentInterval?j.lastProcessedStatsSentInterval=n-j.statsPollingStart:j.lastProcessedStatsSentInterval=n-j.rawstatsTS+j.lastProcessedStatsSentInterval,j.rawstatsTS=n;var o={},q=Ra.codebase;o.version=ua,o.appID=ya,o.conferenceID=encodeURIComponent(f),o.apiTS=m,o.timeShift=0,o.fabricState=j.pcState,o.pcID=j.pcHash,void 0!==i&&(o.ucID=i),Pa.authToken?o.token=Pa.authToken:Pa.sendAuthenticationRequest(ya,b),o.localID=encodeURIComponent(b),o.remoteID=encodeURIComponent(e),o.deviceID=Ba;var r,s,t,u,v,w,x,y={streams:[]},z=null,A=!1,B=!1,C={},D={};for(z=dc(l),r=0;r<z.length;++r)if(s=X(z[r]),t=U(JSON.parse(s),q),!Y(t))if(t.hasOwnProperty("Transport"))u="Transport",y.hasOwnProperty(u)||(y[u]=[]),q!==wb.firefox?(parseInt(t[u].bytesReceived,10)>0||parseInt(t[u].bytesSent,10)>0)&&(y[u].push(t[u]),"true"===t[u].googActiveConnection&&(o.activeConnectionIndex=y[u].length)):(y[u].push(t[u]),"true"===t[u].selected&&(o.activeConnectionIndex=y[u].length));else if(t.localCandidate)C[t.localCandidate.id]=t.localCandidate;else if(t.remoteCandidate)D[t.remoteCandidate.id]=t.remoteCandidate;else if(t.bwe)y.bwe=t.bwe;else{w=Mb(j,t.ssrc),void 0!==w&&w.localStartTime||(x=Ob(e,f,i,j,k,null),x&&(B=!0),w=Mb(j,t.ssrc)),w&&(v=w.remoteUserID),void 0===v&&(v=e);var E={userID:v,data:t.data,reportType:t.reportType,streamType:t.streamType,ssrc:t.ssrc};void 0!==w&&(E.cname=w.cname,E.msid=w.msid,E.associatedVideoTag=w.associatedVideoTag,E.usage=w.usageLabel),y.streams.push(E)}q===wb.firefox&&(y.Transport=P(y.Transport,C,D));var F;if(y.Transport)for(F=0;F<y.Transport.length;F++)y.Transport[F].hash=p(y.Transport[F],q);o.statistics=y,y.Transport&&(A=W(y.Transport,j)),A&&Kc(k,db.fabricTransportSwitch,f),j.pcState===ob.disrupted&&_(o);var G=N(j,y,q,m,f,i);if(y.Transport&&(G.Transport=H(j,y.Transport,q,m)),y.bwe&&(G.bwe=y.bwe),void 0===j.processedStatsTupleArray&&(j.processedStatsTupleArray=[]),qa){var I=Q(G);qa(I)}G.apiTS=m,G.batteryStatus={},G.batteryStatus.batteryLevel=g(),G.batteryStatus.isBatteryCharging=h(),G=O(G),j.processedStatsTupleArray.push(G),o.processedStatistics=j.processedStatsTupleArray,j.lastStatsSent=o;var J=ka(o),K=ka(o);delete J.processedStatistics,delete K.statistics,B&&Pb(db.ssrcMap,e,f,i,Nb(j),j.pcHash),(j.lastProcessedStatsSentInterval>=Fa||j.initialPhaseOver)&&(j.processedStatsTupleArray=[],R(K,j,f,e,b,a),j.lastProcessedStatsSentInterval=0)}return l}function T(a){var b;return pb.hasOwnProperty(a)?a===pb.createOffer||a===pb.createAnswer||a===pb.setRemoteDescription?b=qb.negotiationFailure:a===pb.setLocalDescription?b=qb.sdpError:a===pb.addIceCandidate?b=qb.sdpError:a===pb.getUserMedia?b=qb.mediaConfigError:a===pb.iceConnectionFailure?b=qb.iceFailure:a===pb.signalingError?b=qb.signalingError:(a===pb.applicationLog||pb.applicationError)&&(b=qb.applicationLog):b=Hb.invalidWebRTCFunctionName,b}function U(a,b){var c={};return b===wb.firefox?"inboundrtp"===a.type||"outboundrtp"===a.type?(c.ssrc=a.ssrc,c.streamType="inboundrtp"===a.type?"inbound":"outbound",c.data=a,c.mediaType=a.mediaType,c.reportType="true"===a.isRemote?"remote":"local"):"candidatepair"===a.type&&a.selected?c.Transport=a:"localcandidate"===a.type?c.localCandidate=a:"remotecandidate"===a.type&&(c.remoteCandidate=a):b===wb.chrome?"ssrc"===a.type?(c.reportType="local",a.bytesSent?c.streamType="outbound":c.streamType="inbound",c.ssrc=a.ssrc,c.data=a):"googCandidatePair"===a.type?c.Transport=a:"localcandidate"===a.type?c.localCandidate=a:"remotecandidate"===a.type?c.remoteCandidate=a:"VideoBwe"===a.type&&(c.bwe=a):b===wb.edge&&("inbound-rtp"===a.type||"outbound-rtp"===a.type?(c.ssrc=a.ssrc,c.streamType="inbound-rtp"===a.type?"inbound":"outbound",c.data=a,c.reportType="local"):"transport"===a.type?c.Transport=a:"localcandidate"===a.type?c.localCandidate=a:"remotecandidate"===a.type&&(c.remoteCandidate=a)),c}function V(a){var b="None";switch(a){case 0:b="TURN/TLS";break;case 1:b="TURN/TCP";break;case 2:b="TURN/UDP"}return b}function W(a,b){var c,d,e,f,g,h,i,j,k=!1,l="None",m=!1,n=function(a){var b=a.typePreference>>24;return"rtp"===a.protocol&&a.address===c&&(b>=0&&b<=2&&(l=V(b)),!0)};for(i=0;i<a.length;i++)if(j=a[i],navigator.mozGetUserMedia&&"candidatepair"===j.type&&"true"===j.selected?(m=!0,c=j.localAddr,d=j.remoteAddr,e=j.localAddrType,f=j.remoteAddrType,g=j.transportType):"googCandidatePair"===j.type&&"true"===j.googActiveConnection&&(m=!0,c=j.googLocalAddress,d=j.googRemoteAddress,e=j.googLocalCandidateType,f=j.googRemoteCandidateType,g=j.googTransportType),m){h=0===c.indexOf("["),b.iceCandidates.some(n);break}if(!m)return k;var o=b.transportData;return void 0!==o&&o.localAddr===c&&o.remoteAddr===d&&o.transportType===g||(b.transportData={localAddr:c,remoteAddr:d,localAddrType:e,remoteAddrType:f,transportType:g,ipv6:h,relayType:l},k=!0),k}function X(a){var b="";b+='{"Timestamp":"',b+=a.timestamp instanceof Date?a.timestamp.getTime().toString():a.timestamp,b+='",',a.type&&(b+='"type" : "'+a.type+'",');var c=0;if(a.names){var d=a.names();for(c=0;c<d.length;++c)b+='"',b+=d[c],b+='" : "',b+=a.stat(d[c]),b+='"',c+1!==d.length&&(b+=",")}else{var e=Object.keys(a).length;c=0;var f;for(f in a)a.hasOwnProperty(f)&&(c++,"timestamp"!==f&&(b+='"',b+=f,b+='" : "',b+=a[f],b+='"',c<e&&(b+=",")))}return b+="}"}function Y(a){if(null===a)return!0;if(a.length>0)return!1;if(0===a.length)return!0;var b;for(b in a)if(a.hasOwnProperty(b))return!1;return!0}function Z(a){return{magicKey:a,statsSubmissionInterval:Ia,endpoint:Ta,localUserIDObject:Aa}}function $(a,b,c){var d=Ua[a];void 0===d&&(Ua[a]={},Ua[a].participants=null,c&&(Ua[a].userJoinedSent=!0),b&&(Ua[a].refreshPresence=b))}function _(a){var b,c=a.statistics.outbound;if(void 0!==c)for(b in c)c.hasOwnProperty(b)&&(navigator.mozGetUserMedia&&c[b].data.mozRtt?c[b].data.mozRtt=0:c[b].data.googRtt&&(c[b].data.googRtt=0))}function aa(a){return clearInterval(a),null}function ba(){var a;for(a in Ua)Ua.hasOwnProperty(a)&&(Ua[a].refreshPresence=aa(Ua[a].refreshPresence),delete Ua[a].refreshPresence);ma()}function ca(a){var b=Ua[a],c=!1;return void 0!==b&&b.participants&&b.participants.length>0&&(c=!0),c}function da(a,b){var c=Ua[a],d=[];if(void 0===c)d.push(b),Ua[a].participants=d;else{var e=c.participants;null===e?(d.push(b),c.participants=d):e.push(b)}}function ea(a){var b=!1;if(!Ua[a])return{conferenceFinished:b,ucID:null};var c=Ua[a].ucID;return 0===Ua[a].participants.length&&(aa(Ua[a].refreshPresence),ma(),Na.sendCachedEvents(Pa),delete Ua[a],b=!0),{conferenceFinished:b,ucID:c}}function fa(a,b){Pb(db.userLeft,null,a,b,null,null,null),Za=aa(Za),ma(),Ya=Kb,Kb=null}function ga(){var a,b=function(a){return setInterval(function(){Tb(a)},Ka)};for(a in Ua)Ua.hasOwnProperty(a)&&(Tb(a),Ua[a].refreshPresence=b(a));na()}function ha(a){var b=JSON.parse(window.sessionStorage.getItem("csio_ucid_data"));return b[a]?b[a].ucID:null}function ia(a,b,c){var d=b.action;b.channel=a,Pa._isTokenValid(Pa.authToken,ya,za)?Xa&&zb.indexOf(d)===-1?(b.clockUnsynced=Xa,Na.cacheEvent({channel:a,data:b,callback:c})):(b.token=Pa.authToken,Sc(a,b,c),c&&c(gb.success,d+" sent to the backend.")):Pa.sendAuthenticationRequest(ya,za,function(e,f){e!==gb.success?(e===hb.authOngoing&&(b.clockUnsynced=Xa,Na.cacheEvent({channel:a,data:b,callback:c})),c&&e!==hb.authOngoing&&c(e,f)):e===gb.success&&"SDK authentication successful."===f&&(Xa&&zb.indexOf(d)===-1?(b.clockUnsynced=Xa,Na.cacheEvent({channel:a,data:b,callback:c})):(b.token=Pa.authToken,Sc(a,b,c),c&&c(gb.success,d+" sent to the backend.")))})}function ja(a){a&&a(hb.authOngoing,null)}function ka(a){if(null===a||"object"!=typeof a)return a;var b,c=new a.constructor;for(b in a)a.hasOwnProperty(b)&&(c[b]=ka(a[b]));return c}function la(){var a={};Object.keys(Ua).forEach(function(b){var c=Ua[b];if(!c)return!0;var d,e,f={ucID:c.ucID,userJoinedSent:c.userJoinedSent},g=[];if(c.participants){var h,i=c.participants;for(d=0;d<i.length;d++)e={},h=i[d],e={pcID:h.pcHash,pcState:h.pcState,iceConnectionState:h.iceConnectionState,iceGatheringState:h.iceGatheringState,iceCandidatesNumber:h.iceCandidates.length,remoteUserID:h.remoteUserID},g.push(e)}f.participants=g,a[b]=f});var b={authStatus:!!Pa.tokenData,clockSync:!Xa,stateMachine:a,pageURL:window.location.href,eventType:"warn",version:ua};b.wsStatus=Rc.getWSConnectionState(),Gb(ya,za,"stateMachine",b)}function ma(){$a||($a=setInterval(function(){la()},_a))}function na(){aa($a),$a=null}var oa,pa,qa,ra=a("./callstatsUtils"),sa="https://collector.callstats.io:443/",ta="https://auth.callstats.io/",ua="3.17.7",va="wss://collector.callstats.io:443/csiows/collectCallStats",wa="https://dashboard.callstats.io/apps/",xa="https://dashboard.callstats.io/api-internal/v1/qmodelthresholds",ya=null,za=null,Aa=null,Ba=null,Ca=!1,Da=!1,Ea=3e4,Fa=1e4,Ga=1e4,Ha=2e4,Ia=15e3,Ja=!1,Ka=1e4,La=5e3,Ma=function(){function a(a,b){setTimeout(function(){var b=d(),c=b-a.data.apiTS;a.data.timeShift=c,ia(a.channel,a.data,a.callback)},b)}var b=[];this.sendCachedEvents=function(c,e,f,g,h,i){if(!c.authToken)return void c.sendAuthenticationRequest(ya,za);if(!e){var j,k,l,m,n=d(),o=[],p=Math.max(Ia/b.length,ab);for(j=0;j<b.length;j++)if(l=b[j],l.data.action!==db.userJoined){if(l.data.token=c.authToken,f&&l.data.apiTS>=n-g||!l.data.ucID)if(m=decodeURIComponent(l.data.conferenceID),Ua[m]&&Ua[m].ucID)l.data.ucID=Ua[m].ucID;else{if(m!==h){o.push(b[j]);continue}l.data.ucID=i}if(l.data.clockUnsynced&&(l.data.apiTS+=Wa.currentOffset),l.channel===eb.processedStats&&l.data.clockUnsynced&&l.data.processedStatistics&&l.data.processedStatistics.length>0)for(k=0;k<l.data.processedStatistics.length;k++)l.data.processedStatistics[k].apiTS+=Wa.currentOffset;delete l.data.clockUnsynced,a(l,p*(j+1))}else o.push(b[j]);b=o}},this.sendCachedUserJoinedEvents=function(c){if(!c.authToken)return void c.sendAuthenticationRequest(ya,za);var d,e,f=[],g=Math.max(Ia/b.length,ab);for(d=0;d<b.length;d++)e=b[d],e.data.action===db.userJoined||e.data.action===cb.fabricSetupFailed?(e.data.token=c.authToken,e.data.clockUnsynced&&(e.data.apiTS=e.data.apiTS+Wa.currentOffset),e.data.value&&(e.data.value.statsSubmissionInterval=Ia),a(e,g*(d+1))):f.push(b[d]);b=f},this.cacheEvent=function(a){b.push(a)},this.sendCachedFeedback=function(){var a=Bb("feedback"),b=JSON.parse(Bb("csio_auth_data"));if(a&&b){var c=JSON.parse(a),d=b===c.token;d||za!==c.userID||(c.token=b,d=!0),d?ia(eb.userFeedback,c):Cb("feedback")}}},Na=new Ma,Oa=function(){var a=this,b="urn:x-callstats:auth:errorActions",c=.9,e=3600;this.authInProgress=!1,this.tokenData=null,this.authToken=null,this.tokenGenerator=function(a,b){b("Token generator not set")};var f=null,g=null,h=!1,i=window.atob,j=window.btoa,k=function(a){return j(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")},l=function(a){for(var b=i(a.replace(/[ \r\n]+$/,"")),c=[],d=0;d<b.length;++d){var e=b.charCodeAt(d).toString(16);1===e.length&&(e="0"+e),c.push(e)}return c.join("")},m={};m.cryptotype=null,window.crypto&&window.crypto.subtle?(m.cryptotype="standard",m.subtlecrypto=window.crypto.subtle):window.crypto&&!window.crypto.subtle&&window.crypto.webkitSubtle?(m.cryptotype="webkit",m.subtlecrypto=window.crypto.webkitSubtle):window.msCrypto&&window.msCrypto.subtle?(m.cryptotype="ie",m.subtlecrypto=window.msCrypto.subtle):(m.subtlecrypto=null,console.info("WebCryptography API not supported in this browser.")),m.sign=function(a,b,c,d){if("HS256"!==a.alg)return d("Use header.alg=HS256");a=JSON.stringify(a),"string"!=typeof b&&(b=JSON.stringify(b));for(var e=k(a)+"."+k(b),f=new ArrayBuffer(e.length),g=new Uint8Array(f),h=e.length-1;h>=0;h--)g[h]=e.charCodeAt(h);var i=function(a){for(var b="",c=new Uint8Array(a),f=c.byteLength,g=0;g<f;g++)b+=String.fromCharCode(c[g]);return e+="."+k(b),d(null,e)},j=function(a){return d(a)},l={name:"HMAC"};"ie"!==m.cryptotype&&"webkit"!==m.cryptotype||(l.hash={name:"sha-256"});var n=m.subtlecrypto.sign(l,c,g);"ie"===m.cryptotype?(n.onerror=j,n.oncomplete=function(a){i(a.target.result)}):n.then(i).catch(j)},m.decode=function(a){try{return JSON.parse(i(a.split(".")[1]))}catch(a){return null}},m.importKey=function(a,b,c){if("webkit"===m.cryptotype)for(;a.length<32;)a+="\0";var d={kty:"oct",k:k(a),alg:"HS256"},e={name:"HMAC",hash:{name:"SHA-256"}};if("ie"===m.cryptotype?d.extractable=!1:d.ext=!1,"webkit"===m.cryptotype&&(e=null,d.use="sig"),"ie"===m.cryptotype||"webkit"===m.cryptotype){var f=JSON.stringify(d);d=new Uint8Array(f.length);for(var g=0;g<f.length;g++)d[g]=f.charCodeAt(g)}var h=m.subtlecrypto.importKey("jwk",d,e,!1,["sign"]);"ie"===m.cryptotype?(h.onerror=c,h.oncomplete=function(a){b(a.target.result)}):h.then(b).catch(c)},this._isTokenValid=function(a,b,c){var e=!1;if(null===a)return!1;try{var f=m.decode(a);if(null!==f&&f.appID===b&&f.userID===encodeURIComponent(c)){var g=null;if(navigator.mozGetUserMedia){var h=f.expiry.split(" ").join("T");g=Date.parse(h)}else g=new Date(f.expiry);var i=new Date(d());i<g&&(e=!0)}return e}catch(a){}return!1},this.setupAuthToken=function(a){Ab("csio_auth_data",JSON.stringify(a)),this.authToken=a,this.tokenData=m.decode(a),Ia=parseInt(this.tokenData.submissionInterval,10),Ja=this.tokenData.collectSDP},this.sendAuthenticationRequest=function(d,e,g){if(d&&e){if(a.authInProgress)return void ja(g);null!==f&&(clearTimeout(f),f=null),n(),a.authInProgress=!0,a.tokenGenerator(h,function(i,j){if(null!==i)return a.authInProgress=!1,void(g&&g(gb.tokenGenerationError,i.toString()));var k=ta+"authenticate",l={client_id:e+"@"+ya,code:j,grant_type:"authorization_code"};Mc(k,l,function(i){var j=null;a.authInProgress=!1;try{j=JSON.parse(i.response)}catch(a){}if(!j)return void(f=setTimeout(a.sendAuthenticationRequest,La,d,e,g));if(200===i.status){if("bearer"!==j.token_type)return void(f=setTimeout(a.sendAuthenticationRequest,La,d,e,g));a.setupAuthToken(j.access_token);var k=parseInt(1e3*parseInt(j.expires_in)*c);o(k,d,e,g),h=!1,g&&g(gb.success,"SDK authentication successful."),
Rc._isChannelReady()?(Na.sendCachedUserJoinedEvents(Pa),g&&g(gb.success,"WebSocket establishment successful.")):Rc._setupWebSocketConnection(function(a,b){void 0!==g&&g(a,b)})}else{if(j[b]&&j[b].length>0)return p(d,e,g,j[b]);f=setTimeout(a.sendAuthenticationRequest,La,d,e,g)}})})}};var n=function(){null!==g&&(clearTimeout(g),g=null)},o=function(b,c,d,e){n(),g=setTimeout(function(){a.sendAuthenticationRequest(c,d,e)},b)},p=function(a,b,c,d){if(0!==d.length){var e=d.shift();return e.action===Ib.RETRY?(o(e.params.timeout,a,b,c),p(a,b,c,d)):e.action===Ib.GET_NEW_TOKEN?(h=!0,p(a,b,c,d)):e.action===Ib.REPORT_ERROR?p(a,b,c,d):void 0}};this.appSecretTokenGenerator=function(b){var c=null,f=null,g=!1,h=null;b.indexOf(":")>-1&&(h=l(b.split(":")[0]),b=b.split(":")[1]);var i=function(a){b=null,c=a},j=function(a){g=!0,b=null};return m.importKey(b,i,j),function(b,i){if(g)return i("appsecret based token generation failed");if(!b&&null!==f)return i(null,f);if(null===c)return setTimeout(function(){a.tokenGenerator(b,i)},100);var j={userID:za,appID:ya,exp:parseInt(d()/1e3)+e,nbf:parseInt(d()/1e3)-e};h&&(j.keyID=h),m.sign({alg:"HS256"},j,c,function(a,b){return a?i(a):(f=b,i(null,b))})}}},Pa=new Oa,Qa=new ra,Ra=Qa.detectBrowserInfo(),Sa=Qa.measureAppLoadingPerformance(Ra),Ta={type:"browser",name:Ra.name,ver:Ra.ver,os:Ra.os,osVersion:Ra.osVersion,userAgent:Ra.userAgent},Ua={},Va={statsSubmissionIntervalInMS:[1e3,2e3,5e3,1e4],statsSubmissionPhaseDurationInMS:[1e4,3e4,8e4,18e4]},Wa={currentOffset:0,offsetResults:[],syncStartTime:null,syncAttempts:5,syncHandler:null,maxAllowedLatency:6e4},Xa=!0,Ya=null,Za=null,$a=null,_a=2e4,ab=100,bb=null;"Firefox"===Ra.name?bb=mozRTCPeerConnection:"Chrome"===Ra.name||"Opera"===Ra.name?bb=webkitRTCPeerConnection:"Safari"===Ra.name||"Edge"===Ra.name&&(bb=window.RTCPeerConnection);var cb={fabricSetup:"fabricSetup",fabricSetupFailed:"fabricSetupFailed",fabricHold:"fabricHold",fabricResume:"fabricResume",audioMute:"audioMute",audioUnmute:"audioUnmute",videoPause:"videoPause",videoResume:"videoResume",fabricUsageEvent:"fabricUsageEvent",fabricStats:"fabricStats",fabricTerminated:"fabricTerminated",screenShareStart:"screenShareStart",screenShareStop:"screenShareStop",dominantSpeaker:"dominantSpeaker",userIDChangedEvent:"userIDChangedEvent",activeDeviceList:"activeDeviceList",applicationErrorLog:"applicationErrorLog"},db={autoFabricSetup:"autoFabricSetup",autoFabricSetupFailed:"autoFabricSetupFailed",userJoined:"userJoined",userLeft:"userLeft",fabricStatsCaching:"fabricStatsCaching",refreshPresence:"userAlive",ssrcMap:"ssrcMap",mediaPlaybackStartEvent:"mediaPlaybackStartEvent",mediaSuspendedEvent:"mediaSuspendedEvent",fabricStateChange:"fabricStateChange",iceDisruptionStart:"iceDisruptionStart",iceDisruptionEnd:"iceDisruptionEnd",fabricTransportSwitch:"fabricTransportSwitch",iceConnectionDisruptionStart:"iceConnectionDisruptionStart",iceConnectionDisruptionEnd:"iceConnectionDisruptionEnd",iceAborted:"iceAborted",iceTerminated:"iceTerminated",iceFailed:"iceFailed",iceRestarted:"iceRestarted",fabricDropped:"fabricDropped",connectedDevices:"connectedDevices"},eb={sdpSubmission:"sdpSubmissionEvent",rtpStats:"rtpStats",processedStats:"processedStats",callStatsEvent:"callStatsEvent",registerPresence:"registerPresence",userFeedback:"userFeedbackEvent",clockSync:"clockSync"},fb={success:"success",failure:"failure"},gb={httpError:"httpError",authError:"authError",wsChannelFailure:"wsChannelFailure",success:"success",csProtoError:"csProtoError",appConnectivityError:"appConnectivityError",tokenGenerationError:"tokenGenerationError",ok:"OK"},hb={authOngoing:"authOngoing"},ib={audio:"audio",video:"video",data:"data",screen:"screen",multiplex:"multiplex",unbundled:"unbundled"},jb={local:"local",remote:"remote"},kb={excellent:5,good:4,fair:3,poor:2,bad:1},lb={local:"local",remote:"remote",inbound:"inbound",outbound:"outbound"},mb={excellent:3,fair:2,bad:1},nb={excellent:"excellent",fair:"fair",bad:"bad"},ob={established:"established",initializing:"initializing",failed:"failed",disrupted:"disrupted",checkingDisrupted:"checkingDisrupted"},pb={createOffer:"createOffer",createAnswer:"createAnswer",setLocalDescription:"setLocalDescription",setRemoteDescription:"setRemoteDescription",addIceCandidate:"addIceCandidate",getUserMedia:"getUserMedia",iceConnectionFailure:"iceConnectionFailure",signalingError:"signalingError",applicationError:"applicationError",applicationLog:"applicationLog"},qb={mediaConfigError:"MediaConfigError",negotiationFailure:"NegotiationFailure",sdpError:"SDPGenerationError",iceFailure:"IceConnectionFailure",transportFailure:"TransportFailure",signalingError:"SignalingError",applicationError:"ApplicationError",applicationLog:"ApplicationLog"},rb={video:{gThreshold:1024,rThreshold:256},audio:{gThreshold:30,rThreshold:8}},sb={video:{gThreshold:.8,rThreshold:.3}},tb={video:{gThreshold:400,rThreshold:1e3}},ub={video:{gThreshold:10,rThreshold:50},audio:{gThreshold:15,rThreshold:30}},vb={audio:{gThreshold:240,rThreshold:400}},wb={chrome:"Chrome",firefox:"Firefox",edge:"Edge"},xb={unknown:"unknown",audio:"audio",video:"video"},yb={signalingState:"signalingState",iceConnectionState:"iceConnectionState",iceGatheringState:"iceGatheringState"},zb=[db.userJoined,db.refreshPresence,cb.fabricSetupFailed,cb.applicationErrorLog],Ab=function(a,b){try{window&&window.localStorage&&window.localStorage.setItem(a,b)}catch(a){return}},Bb=function(a){try{if(window&&window.localStorage)return window.localStorage.getItem(a)}catch(a){return null}return null},Cb=function(a){try{window&&window.localStorage&&window.localStorage.removeItem(a)}catch(a){return}},Db=function(){if(Ba=Bb("endpointID"),null===Ba){var a=c(),b=Math.random()*a;pc(b.toString(),function(a){Ba=a,Ab("endpointID",Ba)})}},Eb=function(a,b){var d=null,e=null,f=null,g=new XMLHttpRequest;g.timeout=5e3,g&&(g.open("GET",encodeURI(a)),d=c(),g.onload=function(){e=c(),f=e-d,b(g,f)},g.ontimeout=function(){Xa&&Oc()},g.send())},Fb=function(a,b,c){var d=new XMLHttpRequest;d&&(d.open("POST",encodeURI(a)),d.setRequestHeader("Content-Type","application/json"),d.onload=function(){c(d)},d.send(b))},Gb=function(a,b,c,d){var e=sa+"generics",f={appID:a,userID:encodeURIComponent(b),version:ua,eventType:c,data:d};Fb(e,JSON.stringify(f),function(a){200===a.status||200!==a.status})};window.addEventListener("error",function(a){if(a&&a.filename&&a.filename.indexOf("callstats")>-1){var b,c=!1,d={fileName:a.filename,line:a.lineno,col:a.colno,jsVersion:ua,eventType:"error",message:a.message,pageURL:window.location.href};for(b in Ua)Ua.hasOwnProperty(b)&&(d.conferenceID=b,Gb(ya,za,"onErrorLog",d),c=!0);c||Gb(ya,za,"onErrorLog",d)}});var Hb={invalidWebRTCFunctionName:"Invalid WebRTC function name"},Ib={RETRY:0,GET_NEW_TOKEN:1,REPORT_ERROR:2},Jb="fabricSetupFailed error reported by the developer",Kb=b(),Lb=function(a,b,e){var f=RegExp.prototype.test.bind(/^([a-z])=(.*)/),g=/^ssrc:(\d*) ([\w_]*):(.*)/,h=/^ssrc-group:SIM (\d*)/;b.split(/(\r\n|\r|\n)/).filter(f).forEach(function(b){var f=b[0],i=b.slice(2);if("a"===f){if(g.test(i)){var j=i.match(g),k=j[1];void 0===a.ssrcMap[k]&&(a.ssrcMap[k]={}),a.ssrcMap[k][j[2]]=j[3],a.ssrcMap[k].localStartTime=c(),a.ssrcMap[k].syncedStartTime=d(),a.ssrcMap[k].streamType=e}h.test(i)&&(void 0===a.ssrcMap.ssrcGroup&&(a.ssrcMap.ssrcGroup={},a.ssrcMap.ssrcGroup[e]={}),a.ssrcMap.ssrcGroup[e].simulcastGroup=i.match(/\d+/g))}})},Mb=function(a,b){return a.ssrcMap[b]},Nb=function(a){return a.ssrcMap},Ob=function(a,b,c,d,e,f){if(!e.localDescription||!e.remoteDescription)return!1;var g=e.localDescription.sdp,h=e.remoteDescription.sdp;if(!g||!h||g===d.localSDP&&h===d.remoteSDP)return!1;if(Lb(d,g,lb.outbound),Lb(d,h,lb.inbound),Ja){var i={sdp:{}};i.sdp.localSDP=g!==d.localSDP?g:-1,i.sdp.remoteSDP=h!==d.remoteSDP?h:-1,Qb(a,b,c,i,d.pcHash,f)}return d.localSDP=g,d.remoteSDP=h,!0},Pb=function(a,b,c,e,f,g,h){if(!a)return void console.error("sendEvent: Invalid eventType ");var i=d(),j={version:ua,apiTS:i,action:a,localID:encodeURIComponent(za),remoteID:encodeURIComponent(b),conferenceID:encodeURIComponent(c),timeShift:0,appID:ya,ucID:e,pcID:g,deviceID:Ba,value:f};return null===b&&(j.remoteID=null),null===c?void Gb(ya,za,"log",{msg:"conferenceID is null in sendEvent for "+a}):void(e&&!Xa||a===db.userJoined||a===cb.fabricSetupFailed||a===db.refreshPresence?(j.token=Pa.authToken,ia(eb.callStatsEvent,j,h)):(j.clockUnsynced=Xa,a!==db.fabricStatsCaching&&a!==db.refreshPresence&&Na.cacheEvent({channel:eb.callStatsEvent,data:j,callback:h})))},Qb=function(a,b,c,e,f,g){var h=d(),i={version:ua,appID:ya,conferenceID:encodeURIComponent(b),ucID:c,apiTS:h,localID:encodeURIComponent(za),remoteID:encodeURIComponent(a),pcID:f,deviceID:Ba,sdpPayload:e};Pa.authToken&&c&&!Xa?(i.token=Pa.authToken,ia(eb.sdpSubmission,i,g)):(i.clockUnsynced=Xa,Na.cacheEvent({channel:eb.sdpSubmission,data:i,callback:g}),Pa.authToken||Pa.sendAuthenticationRequest(ya,za))},Rb=function(a,b,c,d){var e=bc(a);if(e){var f=e.conferenceID,g=e.fabric,h=g.remoteUserID,i=Ua[f],j={changedState:b,currPair:g.activeIceCandidatePair,prevState:c,newState:d};Pb(db.fabricStateChange,h,f,i.ucID,j,g.pcHash)}},Sb=function(a){var b={connectedDevices:oa},c=Ua[a]?Ua[a].ucID:null;Pb(db.connectedDevices,null,a,c,b,null)},Tb=function(a){var b={ucID:Ua[a].ucID,endpoint:Ta,magicKey:Kb};Pb(db.refreshPresence,null,a,Ua[a].ucID,b,null)},Ub=function(){var a={appID:ya,userID:encodeURIComponent(za),version:ua,endpoint:Ta,pagePerf:Sa,endpointID:Ba,action:"registerPresence",channel:eb.registerPresence};ya!==-1&&Pa.authToken&&(a.token=Pa.authToken,Sc(eb.registerPresence,"registerPresence",a))},Vb=function(a,b){var c={};return c.status=a,b&&(c.message=b),c},Wb=function(a,b){var c,d,e,f=0;for(c=0,e=a.length;c<e;c++)d=a.charCodeAt(c),f=(f<<5)-f+d,f|=0;return b&&b(f),f},Xb=function(a,b,c,d,e,f){if(!a||!c||!b)return console.error("initialize: Argument missing/invalid"),Vb(fb.failure,"initialize: Argument missing/invalid");if("function"!=typeof b){if(!(window.crypto&&(window.crypto.subtle||window.crypto.webkitSubtle)||window.msCrypto&&window.msCrypto.subtle))return d(gb.tokenGenerationError,"Browser does not support Web Cryptography API. App secret based authentication requires Web Cryptography API"),Vb(fb.failure,"Browser does not support Web Cryptography API. App secret based authentication requires Web Cryptography API");b=Pa.appSecretTokenGenerator(b)}if("string"==typeof a&&(a=parseInt(a,10)),ya=a,"object"==typeof c?(za=c.aliasName,Aa=c):za=c,Gb(ya,za,"log",{msg:"callstats initialize in progress"}),Pa.tokenGenerator=b,Bb("csio_auth_data"))try{var g=JSON.parse(Bb("csio_auth_data"));Pa._isTokenValid(g,ya,za)&&(d&&d(gb.success,"SDK authentication successful."),Pa.setupAuthToken(g),Rc._isChannelReady()||Rc._setupWebSocketConnection(d))}catch(a){}return f&&(f.disableBeforeUnloadHandler===!0&&(Ca=!0),null===f.applicationVersion&&void 0===f.applicationVersion||(Ta.appVer=f.applicationVersion)),k(),qa=e,Pa.sendAuthenticationRequest(ya,za,d),Vb(fb.success)},Yb=function(a){return function(b){if(b.remoteUserID===a)return!0}},Zb=function(a,b){var c=!1,d=null;return Ua[a]&&Ua[a].participants&&(d=Ua[a].participants.filter(Yb(b))),c=!!(d&&d.length>0)},$b=function(a){return function(b){return b.pc===a||(!(!a.callstatsID||b.pcHash!==a.callstatsID)||void 0)}},_b=function(a,b){var c=null,d=null;return Ua[a]&&Ua[a].participants&&(d=Ua[a].participants.filter($b(b))),c=d&&d.length>0?d[0]:null},ac=function(a,b){var c=null,d=null;return c=_b(a,b),c&&(d=c.pcHash),d},bc=function(a){var b=null,c=null,d=null;for(b in Ua)if(Ua.hasOwnProperty(b)&&(d=_b(b,a))){c={fabric:d,conferenceID:b};break}return c},cc=function(a,b){var c=0;if(a&&Ua[b].participants)for(c=0;c<Ua[b].participants.length;c++)if(Ua[b].participants[c].pcHash===a.pcHash){Ua[b].participants.splice(c,1);break}},dc=function(a){var b=Ra.codebase,c=null,d=0;if(b===wb.firefox&&"Safari"!==Ra.name)c=[],a.forEach(function(a){c.push(a)});else if(b===wb.chrome&&"Safari"!==Ra.name)a&&(c=a.result());else{c=[];for(d in a)a.hasOwnProperty(d)&&c.push(a[d])}return c},ec=function(a){var b=null,c=null,d=null,e=[],f=[],g=[],h=0,i=Ra.codebase;if(b=dc(a),!b)return{localCandidates:e,remoteCandidates:f};for(h=0;h<b.length;++h)c=X(b[h]),d=U(JSON.parse(c),i),d.localCandidate?e.push(d.localCandidate):d.remoteCandidate?f.push(d.remoteCandidate):d.Transport&&g.push(d.Transport);return{localCandidates:e,remoteCandidates:f,iceCandidatePairs:g}},fc=function(a){function b(b){var c={};c=ec(b),a(c)}return b},gc=function(a,b,c,d,e,f,g,h){var i=Ra.codebase,j=Ra.name;i===wb.firefox||"Safari"===j?a.getStats(null,c(b,d,e,f,g,h,a),function(a){Gb(ya,d,"log",{msg:"### "+i+" getStats reports error "+JSON.stringify(a)})}):i===wb.chrome?a.getStats(c(b,d,e,f,g,h,a)):i===wb.edge&&a.getStats().then(c(b,d,e,f,g,h,a)).catch(function(a){Gb(ya,d,"log",{msg:"### "+i+" getStats reports error "+JSON.stringify(a)})})},hc=function(a,b){gc(a,b,fc)},ic=function(a,b,d,e){if(!a||!b||!d)return console.error("sendFabricEvent: Arguments missing/Invalid"),Vb(fb.failure,"sendFabricEvent: Arguments missing/Invalid");if(!ya||!za||!Ua[d])return console.error("sendFabricEvent: SDK is not initialized or no Fabrics added."),Vb(fb.failure,"sendFabricEvent: SDK is not initialized or no Fabrics added.");if(b===cb.fabricSetupFailed)return console.error("sendFabricEvent: Unsupported fabricEvent fabricSetupFailed"),Vb(fb.failure,"sendFabricEvent: Unsupported fabricEvent fabricSetupFailed");if(!o(a))return console.error("sendFabricEvent: Invalid PeerConnection object passed"),Vb(fb.failure,"sendFabricEvent: Invalid PeerConnection object passed");if(!cb.hasOwnProperty(b)&&!db.hasOwnProperty(b))return console.error("sendFabricEvent: Invalid fabricEvents value: ",b),Vb(fb.failure,"sendFabricEvent: Invalid fabricEvents value: "+b);var f={},g=null,h=c(),i=Ua[d],j=null;if(void 0===i)return console.error("sendFabricEvent: Conference ID not found!"),Vb(fb.failure,"sendFabricEvent: Conference ID not found!");if(j=_b(d,a),null===j)return console.error("sendFabricEvent: fabricData is null"),Vb(fb.failure,"sendFabricEvent: fabricData is null");g=j.remoteUserID;var k=j.startTime;if(b===cb.fabricSetupFailed){var l=h-k;f={failureDelay:l,reason:qb.iceFailure,domError:Jb,fabricState:j.pcState,iceConnectionState:j.pc.iceConnectionState,function:pb.iceConnectionFailure,magicKey:Kb,endpoint:Ta}}else if(b===cb.activeDeviceList){if(!e||!e.deviceList)return console.error("sendFabricEvent: Arguments missing/Invalid"),Vb(fb.failure,"sendFabricEvent: Arguments missing/Invalid");f={magicKey:Kb,endpoint:Ta,activeDevicelist:e.deviceList}}if(Pb(b,g,d,i.ucID,f,j.pcHash,j.pcCallback),(b===cb.fabricTerminated||b===db.autoFabricSetupFailed||b===cb.fabricSetupFailed)&&Ua[d].participants){j&&(j.statsInterval=aa(j.statsInterval),cc(j,d));var m=ea(d);m.conferenceFinished&&fa(d,m.ucID)}return Vb(fb.success)},jc=function(a){return a.length>Ha&&(console.log("Log exceeds 20kb, It will be truncated"),a=a.substring(0,Ha)),a},kc=function(a){return a&&"string"==typeof a?a=jc(a):a&&"object"==typeof a&&a.message&&(a.message=jc(a.message)),a},lc=function(a,b,c){return b?b:a&&a[c]?a[c].sdp:-1},mc=function(a,d,e,f,g,h){if(void 0===a||!e||!d)return console.error("reportError: Arguments missing/invalid"),Vb(fb.error,"reportError: Arguments missing/invalid");if(!ya||!za)return console.error("reportError: SDK is not initialized"),Vb(fb.error,"reportError: SDK is not initialized");if(!pb.hasOwnProperty(e))return console.error("reportError: Invalid webRTC functionName value: %o",e),Vb(fb.error,"reportError: Invalid webRTC functionName value: "+e);void 0===f&&console.warn("reportError: Missing dom error parameter");var i,j=null,k=null,l=c(),m=Ua[d],n=null;if(i=T(e),f&&f instanceof DOMException)f={message:f.message,name:f.name};else if(f&&"object"==typeof f){var p={};f.message&&(p.message=f.message),f.name&&(p.name=f.name),f.constraintName&&(p.constraintName=f.constraintName),f.stack&&(p.stack=f.stack),f=p}if(f=kc(f),o(a)){if(void 0===m)return console.error("reportError: Conference ID not found!"),Vb(fb.error,"reportError: Conference ID not found!");if(n=_b(d,a),null===n)return console.error("reportError: Invalid pcObject passed as argument"),Vb(fb.error,"reportError: Invalid pcObject passed as argument");k=n.remoteUserID;var q=n.startTime,r=l-q;if(j={failureDelay:r,reason:i,domError:f,fabricState:n.pcState,iceConnectionState:n.pc.iceConnectionState,function:e,magicKey:Kb,endpoint:Ta},e===pb.applicationLog||e===pb.applicationError?Pb(cb.applicationErrorLog,k,d,m.ucID,j,n.pcHash,n.pcCallback):Pb(cb.fabricSetupFailed,k,d,m.ucID,j,n.pcHash,n.pcCallback),g||h||a&&a.localDescription||a&&a.remoteDescription){var s={sdp:{}};s.sdp.localSDP=lc(a,g,"localDescription"),s.sdp.remoteSDP=lc(a,h,"remoteDescription"),Qb(k,d,m.ucID,s,n.pcHash)}}else{null===Kb&&(Kb=b());var t=null;e!==pb.getUserMedia&&(t=b()),j={failureDelay:0,reason:i,domError:f,function:e,magicKey:Kb,endpoint:Ta},e===pb.applicationLog||e===pb.applicationError?Pb(cb.applicationErrorLog,k,d,null,j,null,null):Pb(cb.fabricSetupFailed,k,d,null,j,t,null)}return Vb(fb.success)},nc=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);d<128?b[b.length]=d:d>127&&d<2048?(b[b.length]=d>>6|192,b[b.length]=63&d|128):(b[b.length]=d>>12|224,b[b.length]=d>>6&63|128,b[b.length]=63&d|128)}return new Uint8Array(b).buffer},oc=function(a){for(var b,c=new DataView(a),d="",e=0;e<c.byteLength;e++)b=c.getUint8(e).toString(16),b.length<2&&(b="0"+b),d+=b;return d},pc=function(a,b){var c={name:"SHA-256"};if(window.crypto){var d=window.crypto.subtle||window.crypto.webkitSubtle;if(!d)return void Wb(a,b);d.digest(c,nc(a)).then(function(a){b(oc(a))}).catch(function(){Wb(a,b)})}else if(window.msCrypto){if(!window.msCrypto.subtle)return void Wb(a,b);var e=window.msCrypto.subtle.digest(c,nc(a));e.oncomplete=function(a){a.target&&b(oc(a.target.result))},e.onerror=function(){Wb(a,b)}}else Wb(a,b)},qc=function(a,b,c){var d;if(!b||!a)return console.error("sendUserFeedback: Arguments missing/Invalid"),Vb(fb.error,"sendUserFeedback: Arguments missing/Invalid");if("object"!=typeof b)return console.error("sendUserFeedback: Invalid feedback object."),Vb(fb.error,"sendUserFeedback: Invalid feedback object.");if(0===Object.keys(b).length)return console.error("sendUserFeedback: Feedback data object must not be empty."),Vb(fb.error,"sendUserFeedback: Feedback data object must not be empty.");if(!b.hasOwnProperty("overall"))return console.error("sendUserFeedback: Feedback data object must contain 'conferenceID', 'userID' and 'overall' keys."),Vb(fb.error,"sendUserFeedback: Feedback data object must contain 'conferenceID', 'userID' and 'overall' keys.");var e=Ua[a],f=null;void 0!==e&&void 0!==e.ucID&&(f=e.ucID);var g=null;if(g=null===Kb?Ya:Kb,null===f&&(f=ha(a)),null===f)return console.error("sendUserFeedback: ucID unavailable"),Vb(fb.error,"sendUserFeedback: ucID unavailable");d="object"==typeof b.userID?b.userID.aliasName:b.userID;var h={conferenceID:encodeURIComponent(a),magicKey:g,appID:ya,version:ua,ucID:f,userID:encodeURIComponent(d),userQoe:{overall:b.overall}};return b.video?h.userQoe.video=b.video:h.userQoe.video=-1,b.audio?h.userQoe.audio=b.audio:h.userQoe.audio=-1,b.screen?h.userQoe.screen=b.screen:h.userQoe.screen=-1,b.comment?h.userQoe.comment=b.comment:h.userQoe.comment=-1,Pa.authToken&&!Xa?(h.token=Pa.authToken,Ab("feedback",JSON.stringify(h)),ia(eb.userFeedback,h,c)):(h.clockUnsynced=Xa,Na.cacheEvent({channel:eb.userFeedback,data:h,callback:c}),Pa.sendAuthenticationRequest(ya,d)),Vb(fb.success)},rc=function(a,b,c,d,e,f){var g=null;if(g="object"==typeof b?b.aliasName:b,!(a&&c&&g&&d&&e))return console.error("associateMstWithUserID: Arguments missing"),Vb(fb.error,"associateMstWithUserID: Arguments missing");if(""===c||""===g||""===d||""===e)return console.error("associateMstWithUserID: conferenceID or remoteUserID or ssrc MUST not be empty"),Vb(fb.error,"associateMstWithUserID: conferenceID or remoteUserID or ssrc MUST not be empty");if(!o(a))return console.error("associateMstWithUserID: Invalid PeerConnection object passed"),Vb(fb.error,"associateMstWithUserID: Invalid PeerConnection object passed");var h=Ua[c];if(void 0===h)return console.error("associateMstWithUserID: conferenceID doesn't exist"),Vb(fb.error,"associateMstWithUserID: conferenceID doesn't exist");var i=null;if(i=_b(c,a),null===i)return console.error("associateMstWithUserID: Unknown pcObject passed"),Vb(fb.error,"associateMstWithUserID: Unknown pcObject passed");var j=Mb(i,d);return void 0===j&&(i.ssrcMap[d]={},j=Mb(i,d)),j.remoteUserID=g,j.ssrc=d,j.associatedVideoTag=f,j.usageLabel=e,f&&g!==za&&n(g,c,f,a,d),Vb(fb.success)},sc=function(a,d,e,f,g){var h=null,i={authStatus:!!Pa.tokenData,clockSync:!Xa,msg:"addNewFabric called",eventType:"warn",pageURL:window.location.href,conferenceID:f,version:ua};if(Gb(ya,za,"stateMachine",i),h="object"==typeof d?d.aliasName:d,!(a&&h&&e&&f))return console.error("addNewFabric: Arguments missing/Invalid"),Vb(fb.error,"addNewFabric: Arguments missing/Invalid");if(!ya||!za)return console.error("addNewFabric: SDK not initialized."),Vb(fb.error,"addNewFabric: SDK not initialized");if(""===f||""===h)return console.error("addNewFabric: conferenceID or remoteUserID MUST not be empty"),Vb(fb.error,"addNewFabric: conferenceID or remoteUserID MUST not be empty");if(!o(a))return console.error("addNewFabric: Invalid PeerConnection object passed"),Vb(fb.error,"addNewFabric: Invalid PeerConnection object passed");if(!ib.hasOwnProperty(e)||e instanceof Function)return console.error("addNewFabric: Invalid fabricUsage value"),Vb(fb.error,"addNewFabric: Invalid fabricUsage value");var k=c();null===Kb&&(Kb=b());var l=null,m=!1;if(!ca(f)){var n=Z(Kb);Pb(db.userJoined,null,f,null,n,null,null),m=!0,i={authStatus:!!Pa.tokenData,clockSync:!Xa,msg:"userJoined sent",pageURL:window.location.href,eventType:"warn",conferenceID:f,version:ua},Gb(ya,za,"stateMachine",i)}if($(f,l,m),!_b(f,a)){a&&a.addEventListener&&(a.addEventListener("icecandidate",Gc,!1),a.addEventListener("iceconnectionstatechange",Fc,!1),a.addEventListener("signalingstatechange",vc,!1),a.addEventListener("negotiationneeded",Ec,!1));var p=b(),q={pc:a,remoteUserID:h,fabricUsage:e,magicKey:Kb,startTime:k,pcCallback:g,pcState:ob.initializing,fabricSetupSent:!1,iceCandidates:[],iceConnectionState:a.iceConnectionState,latestEventSent:k,pcHash:p,localSDP:-1,remoteSDP:-1,statsInterval:null,initialPhaseOver:!1,intervalAdaptionPhase:!0,gatheringIceCandidatesDelay:0,connectivityIceStatusDelay:0,numNegotiationNeededCalls:0,currentActivePhaseIndex:0,ssrcMap:{}};"function"!=typeof a||a.callstatsID||(a.callstatsID=p),"connected"!==a.iceConnectionState&&"completed"!==a.iceConnectionState||(q.pcState=ob.established),da(f,q),q.pcState===ob.established&&(Jc(a,db.autoFabricSetup,f),wc(q,a,f,h))}return j(f),Vb(fb.success)},tc=function(a,b,c,d){if(!(a&&c&&d&&b))return console.error("reportUserIDChange: Arguments missing/Invalid"),Vb(fb.error,"reportUserIDChange: Arguments missing/Invalid");if(!ya||!za)return console.error("reportUserIDChange: SDK not initialized."),Vb(fb.error,"reportUserIDChange: SDK not initialized");if(""===c||""===b)return console.error("reportUserIDChange: id or  conferenceID MUST not be empty"),Vb(fb.error,"reportUserIDChange: id or  conferenceID MUST not be empty");if(!o(a))return console.error("reportUserIDChange: Invalid PeerConnection object passed"),Vb(fb.error,"reportUserIDChange: Invalid PeerConnection object passed");var e,f=null,g=Ua[b];if(void 0===g)return console.error("reportUserIDChange: Conference ID not found!"),Vb(fb.error,"reportUserIDChange: Conference ID not found!");var h=null;if(void 0===g.ucID)return console.error("reportUserIDChange: addNewFabric was not called"),Gb(ya,za,"log",{msg:"### reportUserIDChange: addNewFabric was not called"}),Vb(fb.error,"reportUserIDChange: addNewFabric was not called");if(h=g.ucID,f=_b(b,a),null===f)return console.error("reportUserIDChange: Invalid pcObject passed as argument"),Vb(fb.error,"reportUserIDChange: Invalid pcObject passed as argument");var i={id:c,idType:d};return Pb(cb.userIDChangedEvent,e,b,h,i,null,f.pcCallback),Vb(fb.success)},uc=function(a){var b=null;if(a&&a.length>0){var c=a.filter(function(a){return"true"===a.selected||"true"===a.googActiveConnection});c.length>0&&(b=c[0])}return b},vc=function(a){if(a){var b,c,d=Ra.codebase,e=null;if(d===wb.firefox)b=a.target;else if(d===wb.chrome)b=a.srcElement;else{if(d!==wb.edge)return void console.error("PeerConnection signaling state changed: unsupported code base");b=a.pc}if(void 0!==b){var f=b.signalingState;e=bc(b),e&&e.fabric&&("closed"===f&&ic(b,cb.fabricTerminated,e.conferenceID),c=e.fabric.signalingState,e.fabric.signalingState=f),Rb(b,yb.signalingState,c,f)}}},wc=function(a,b,d,e){null===a.statsInterval&&(a.statsPollingStart=c(),Ic(b,d,e),a.statsInterval=setInterval(Ic,Va.statsSubmissionIntervalInMS[a.currentActivePhaseIndex],b,d,e))},xc=function(a,b,c,d,e,f){hc(a,function(a){b.localCandidates=a.localIceCandidates,b.remoteCandidates=a.remoteCandidates,b.iceCandidatePairs=a.iceCandidatePairs,b.activeIceCandidatePair=uc(b.iceCandidatePairs),f.localCandidates=b.localCandidates,Pb(db.iceFailed,c,d,e,f,b.pcHash,b.pcCallback)})},yc=function(a,b,c,d){var e=b.iceConnectionState,f=b.remoteUserID,g=Ua[c],h={prevIceConnectionState:e,currIceConnectionState:a.iceConnectionState,currPair:b.activeIceCandidatePair,failureDelay:d};b.pcState=ob.failed,"checking"===e?xc(a,b,f,c,g.ucID,h):"completed"===e||"connected"===e?Pb(db.fabricDropped,f,c,g.ucID,h,b.pcHash,b.pcCallback):"disconnected"===e&&b.established?Pb(db.fabricDropped,f,c,g.ucID,h,b.pcHash,b.pcCallback):"disconnected"===e&&xc(a,b,f,c,g.ucID,h)},zc=function(a,b,d,e){var f=b.iceConnectionState,g=b.remoteUserID,h=Ua[d],i=c(),j={prevIceConnectionState:f,currIceConnectionState:a.iceConnectionState,prevPair:b.activeIceCandidatePair},k=b.pcState===ob.disrupted;b.connectivityIceStatusDelay=e,b.established=!0,hc(a,function(a){b.localCandidates=a.localIceCandidates,b.remoteCandidates=a.remoteCandidates,b.iceCandidatePairs=a.iceCandidatePairs,b.activeIceCandidatePair=uc(b.iceCandidatePairs),j.currPair=b.activeIceCandidatePair,j.disruptionDelay=i-b.disruptedTS,k&&Pb(db.iceDisruptionEnd,g,d,h.ucID,j,b.pcHash,b.pcCallback)}),Jc(b.pc,db.autoFabricSetup,d),b.pcState=ob.established,wc(b,a,d,g)},Ac=function(a,b,d){var e=b.iceConnectionState,f=b.remoteUserID,g=Ua[d],h=c(),i={prevIceConnectionState:e,currIceConnectionState:a.iceConnectionState,prevIceConnectionStateTs:b.iceConnectionStateTS,currPair:b.activeIceCandidatePair};b.startTime=h,"connected"===e||"completed"===e?(b.pcState=ob.disrupted,b.disruptedTS=h,Pb(db.iceDisruptionStart,f,d,g.ucID,i,b.pcHash,b.pcCallback),b.pcCallback&&b.pcCallback(gb.appConnectivityError,"Connectivity check for PC object to "+f+" failed.")):"checking"===e&&(b.pcState=ob.checkingDisrupted,b.disruptedTS=h,Pb(db.iceConnectionDisruptionStart,f,d,g.ucID,i,b.pcHash,b.pcCallback),b.pcCallback&&b.pcCallback(gb.appConnectivityError,"Connectivity check for PC object to "+f+" failed."))},Bc=function(a,b,c,d){var e=b.iceConnectionState,f=b.remoteUserID,g=Ua[c],h={prevIceConnectionState:e,currIceConnectionState:a.iceConnectionState};"new"===e||"checking"===e?(h.failureDelay=d,Pb(db.iceAborted,f,c,g.ucID,h,b.pcHash,b.pcCallback)):(h.currPair=b.activeIceCandidatePair,Pb(db.iceTerminated,f,c,g.ucID,h,b.pcHash,b.pcCallback))},Cc=function(a,b,c){var d=b.iceConnectionState,e=b.remoteUserID,f=Ua[c],g={prevIceConnectionState:d,currIceConnectionState:a.iceConnectionState,prevPair:b.activeIceCandidatePair};"new"!==d&&(b.established=!1,Pb(db.iceRestarted,e,c,f.ucID,g,b.pcHash,b.pcCallback))},Dc=function(a,b,d,e){var f=b.iceConnectionState,g=b.remoteUserID,h=Ua[d],i=c(),j={prevIceConnectionState:f,currIceConnectionState:a.iceConnectionState};b.gatheringIceCandidatesDelay=e,"disconnected"===f&&b.pcState===ob.checkingDisrupted&&(j.disruptionDelay=i-b.disruptedTS,Pb(db.iceConnectionDisruptionEnd,g,d,h.ucID,j,b.pcHash,b.pcCallback))},Ec=function(a){if(a){var b,c=Ra.codebase;if(c===wb.firefox)b=a.target;else if(c===wb.chrome)b=a.srcElement;else{if(c!==wb.edge)return void console.error("PeerConnection negotiation needed: unsupported code base");b=a.pc}if(void 0!==b){var d=null;d=bc(b),d&&d.fabric&&d.fabric.numNegotiationNeededCalls++}}},Fc=function(a){if(a){var b,d=Ra.codebase;if(d===wb.firefox)b=a.target;else if(d===wb.chrome)b=a.srcElement;else{if(d!==wb.edge)return void console.error("PeerConnection ICE connection state changed: unsupported code base");b=a.pc}if(void 0!==b){var e,f,g,h,i,j=null,k=null;k=bc(b),k&&k.fabric&&(j=k.fabric,e=k.conferenceID,f=c(),g=f-j.startTime,h=j.iceConnectionState,i=j.iceGatheringState,"complete"===b.iceGatheringState&&"checking"===b.iceConnectionState&&Dc(b,j,e,g),"connected"===b.iceConnectionState||"completed"===b.iceConnectionState?zc(b,j,e,g):"failed"===b.iceConnectionState?yc(b,j,e,g):"disconnected"===b.iceConnectionState?Ac(b,j,e):"closed"===b.iceConnectionState?Bc(b,j,e,g):"new"===b.iceConnectionState&&Cc(),j.iceConnectionState=b.iceConnectionState,j.iceGatheringState=b.iceGatheringState,j.iceConnectionStateTS=c()),i!==b.iceGatheringState&&Rb(b,yb.iceGatheringState,i,b.iceGatheringState),Rb(b,yb.iceConnectionState,h,b.iceConnectionState)}}},Gc=function(a){var b,c,d;if(null!==a.candidate){var e=a.candidate.candidate;c=e.split(" ");var f="1"===c[1]?"rtp":"rtcp";"0"!==c[5]&&(d=c[4].indexOf(":")!==-1,b={transport:c[2],protocol:f,typePreference:c[3],address:d?"["+c[4]+"]:"+c[5]:c[4]+":"+c[5],type:c[7],media:a.candidate.sdpMid})}var g,h=Ra.codebase;if(h===wb.firefox)g=a.target;else if(h===wb.chrome)g=a.srcElement;else{if(h!==wb.edge)return void console.error("PeerConnection ICE candidate found: unsupported code base");g=a.pc}if(void 0!==g){var i=null;i=bc(g),i&&i.fabric&&void 0!==b&&i.fabric.iceCandidates.indexOf(b)===-1&&i.fabric.iceCandidates.push(b)}},Hc=function(a){var b,c=5e3;return Da?(b=Ea,a.intervalAdaptionPhase=!1,Da=!1):a.currentActivePhaseIndex<Va.statsSubmissionIntervalInMS.length-1?(a.currentActivePhaseIndex+=1,b=Va.statsSubmissionIntervalInMS[a.currentActivePhaseIndex],b>Ia&&(b=Ia,a.intervalAdaptionPhase=!1,a.initialPhaseOver=!0)):(b=Ia,a.intervalAdaptionPhase=!1),b>c&&(a.initialPhaseOver=!0),b},Ic=function(a,b,d){if(!Ua.hasOwnProperty(b))return void console.error("ConferenceID %o doesn't exist. Can't call getStats for it.",b);if(!Zb(b,d))return void console.error("Remote user ID %o doesn't exist. Can't call getStats for it.",d);if("closed"===a.signalingState)return ic(a,cb.fabricTerminated,b),!0;var e=_b(b,a);if(e.pcState!==ob.established&&e.lastFabricState===e.pcState&&"connected"!==a.iceConnectionState&&"completed"!==a.iceConnectionState)return!0;var f=Ua[b].ucID;gc(a,e.pcCallback,S,za,d,b,f,e);var g,h=c(),i=h-e.statsPollingStart;(i>Va.statsSubmissionPhaseDurationInMS[e.currentActivePhaseIndex]&&e.intervalAdaptionPhase||Da===!0)&&(aa(e.statsInterval),g=Hc(e),e.statsInterval=setInterval(Ic,g,a,b,d))},Jc=function(a,b,d){var e,f=null,g=Ua[d],h=null,i=c();if(void 0===g&&console.error("sendAutoFabricSetupEvent: Conference ID not found!"),h=_b(d,a),null===h&&console.error("sendAutoFabricSetupEvent: fabricData is null"),!h.fabricSetupSent){f=h.remoteUserID,e=i-h.startTime;var j={setupDelay:e,iceGatheringDelay:h.gatheringIceCandidatesDelay,iceConnectivityDelay:h.connectivityIceStatusDelay};Xa||(j.clockSyncOffset=Wa.currentOffset),hc(a,function(a){j.localCandidates=a.localCandidates,j.remoteCandidates=a.remoteCandidates,j.iceCandidatePairs=a.iceCandidatePairs,h.localCandidates=a.localCandidates,h.remoteCandidates=a.remoteCandidates,h.iceCandidatePairs=a.iceCandidatePairs,h.pcState=ob.established,h.fabricSetupSent=!0,h.activeIceCandidatePair=uc(h.iceCandidatePairs),Pb(b,f,d,g.ucID,j,h.pcHash,h.pcCallback)})}},Kc=function(a,b,c){var d={},e=null,f=Ua[c],g=null;void 0===f&&console.error("sendFabricTransportSwitchEvent: Conference ID not found!"),g=_b(c,a),null===g&&console.error("sendFabricTransportSwitchEvent: fabricData is null"),
e=g.remoteUserID,d.prevPair=g.activeIceCandidatePair,hc(a,function(a){d.currPair=uc(a.iceCandidatePairs),g.activeIceCandidatePair=d.currPair,d.switchDelay=null,d.relayType=g.transportData.relayType,Pb(b,e,c,f.ucID,d,g.pcHash,g.pcCallback)})},Lc=function(a,b,c){b.hasOwnProperty(a)&&(b[a].hasOwnProperty("video")&&(b[a].video.isGreaterBetter?(c.video.gThreshold=b[a].video.upperThreshold,c.video.rThreshold=b[a].video.lowerThreshold):(c.video.gThreshold=b[a].video.lowerThreshold,c.video.rThreshold=b[a].video.upperThreshold)),b[a].hasOwnProperty("audio")&&(b[a].audio.isGreaterBetter?(c.audio.gThreshold=b[a].audio.upperThreshold,c.audio.rThreshold=b[a].audio.lowerThreshold):(c.audio.gThreshold=b[a].audio.lowerThreshold,c.audio.rThreshold=b[a].audio.upperThreshold)))},Mc=function(a,b,c){var d=[];for(var e in b)b.hasOwnProperty(e)&&d.push(encodeURIComponent(e)+"="+encodeURIComponent(b[e]));var f=d.join("&"),g=new XMLHttpRequest;g.open("POST",a),g.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),g.onload=function(){c(g)},g.send(f)},Nc=function(){Eb(xa,function(a){if(200===a.status)try{var b=JSON.parse(a.responseText);Lc("eModelThreshold",b,vb),Lc("throughputThreshold",b,rb),Lc("fractionalLossThreshold",b,ub),Lc("rttThreshold",b,tb),Lc("currOverPrevFrameRateThreshold",b,sb)}catch(a){return a}})},Oc=function(){var a=sa+"clockSync",b=null,d=null;Eb(a,function(a,e){200===a.status?(b=JSON.parse(a.response),d=c(),Pc(b,e,d)):Xa&&setTimeout(function(){Oc()},100)})},Pc=function(a,b,c){if(Xa){var d=b/2;if(d>Wa.maxAllowedLatency)Wa.offsetResults=[],Gb(ya,za,"log",{msg:"clockSync restarting"});else{var e=a.now+d,f=e-c;Wa.offsetResults.push(f)}if(Wa.offsetResults.length>=Wa.syncAttempts){var g=Wa.offsetResults.reduce(function(a,b){return a+b});Wa.currentOffset=g/Wa.offsetResults.length,Wa.offsetResults=[],Xa=!1,Gb(ya,za,"log",{msg:"clockSync Done"}),Na.sendCachedUserJoinedEvents(Pa),Na.sendCachedEvents(Pa,Xa)}else Xa&&setTimeout(function(){Oc()},100)}},Qc=function(){var a=this,b=null,d=!1,e=!1,f={},g={initiated:"initiated",connected:"connected",closed:"closed"};this._wsConnectionState=g.closed;var h=function(a,b){var c=JSON.parse(window.sessionStorage.getItem("csio_ucid_data"));c||(c={}),c[a]||(c[a]={}),c[a].ucID=b,window.sessionStorage.setItem("csio_ucid_data",JSON.stringify(c)),f[a]=wa+ya+"/conferences/"+encodeURIComponent(a)+"/"+b+"/general"};this.getConferenceURL=function(){return f},this._setupWebSocketConnection=function(f){return a._wsConnectionState===g.initiated||a._wsConnectionState===g.connected?(Gb(ya,za,"log",{msg:"### _setupWebSocketConnection is called when already connected!"}),void(f&&f(gb.success,"WebSocket establishment successful."))):(a._wsConnectionState=g.initiated,b=new WebSocket(va,"echo-protocol"),b.onopen=function(){Gb(ya,za,"log",{msg:"Successfully connected to the backend"}),a._wsConnectionState=g.connected,d?e=!0:d=!0,Wa.syncHandler||(Gb(ya,za,"log",{msg:"start clockSync"}),Wa.offsetResults=[],Oc(),Wa.syncHandler=!0),Na.sendCachedUserJoinedEvents(Pa),e?(ga(),Na.sendCachedEvents(Pa)):Ub(),e=!1},b.onclose=function(){a._wsConnectionState=g.closed,Gb(ya,za,"log",{msg:"Connection to the server closed."}),ba(),Xa&&(Wa.offsetResults=[],Wa.syncHandler=null,Xa=!1),b&&(b=null),f&&f(gb.httpError,"Connection to the server closed.")},b.onerror=function(b){a._wsConnectionState=g.closed,Gb(ya,za,"log",{msg:"WebSocket establishment failed."}),f&&f(gb.wsChannelFailure,"WebSocket establishment failed.",b)},void(b.onmessage=function(a){var b,d=a.data,e=c(),g=JSON.parse(d);if("Error"===g.status)"Invalid client token."===g.reason&&(Pa.tokenData=null,Pa.authToken=null,Pa.sendAuthenticationRequest(ya,za)),f&&f(gb.csProtoError,d.reason);else if("200 OK"===g.status)if("feedback"===g.event)Cb("feedback");else if(g.event===db.userJoined||g.event===db.refreshPresence){var i=!1,j=null;b=decodeURIComponent(g.conferenceID);var k=function(a){return setInterval(function(){Tb(a)},Ka)};Ua.hasOwnProperty(b)&&(Ua[b].ucID!==g.ucID&&(i=!0,h(b,g.ucID),j=g.conferenceCreationTS?g.conferenceCreationTS:g.conferenceDuration),g.event!==db.userJoined||Ua[b].refreshPresence||(Ua[b].refreshPresence=k(b),na()),Ua[b].ucID=g.ucID),Na.sendCachedFeedback(),Na.sendCachedEvents(Pa,Xa,i,j,b,g.ucID)}else g.event===eb.clockSync?Pc(g,e):g.event===cb.fabricSetupFailed&&(b=decodeURIComponent(g.conferenceID),g.ucID&&(h(b,g.ucID),Na.sendCachedFeedback(),Na.sendCachedEvents(Pa,Xa,!0,0,b,g.ucID)))}))},this._isChannelReady=function(){return!(!b||1!==b.readyState)},this.getWSConnectionState=function(){return b?b.readyState:-1},this.send=function(a){b.send(JSON.stringify(a))}},Rc=new Qc,Sc=function(a,b,c){if(Rc._isChannelReady())try{Rc.send(b)}catch(d){d&&"InvalidStateError"===d.name&&Na.cacheEvent({channel:a,data:b,callback:c})}else Na.cacheEvent({channel:a,data:b,callback:c}),Rc._setupWebSocketConnection()};return f(),Nc(),Oc(),ma(),Db(),{version:ua,initialize:Xb,fabricEvent:cb,addNewFabric:sc,sendFabricEvent:ic,sendUserFeedback:qc,associateMstWithUserID:rc,csError:gb,fabricUsage:ib,qualityRating:kb,webRTCFunctions:pb,reportError:mc,reportUserIDChange:tc,userIDType:jb,callStatsAPIReturnStatus:fb}}"function"==typeof define&&define.amd?define("callstats",[],c):b.callstats=c}("undefined"!=typeof window?window:"undefined"!=typeof b?b:this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./callstatsUtils":2}],2:[function(a,b,c){"use strict";function d(){}d.prototype.measureAppLoadingPerformance=function(a){var b=0,c=Number.MAX_VALUE,d=0,e="",f="",g=window.performance;if(!("performance"in window&&"timing"in window.performance&&"navigation"in window.performance))return{support:"none",total:void 0};var h=g.timing.loadEventEnd-g.timing.navigationStart;if("Chrome"===a.name||"Opera"===a.name){var i,j=g.getEntriesByType("resource");for(i=0;i<j.length;i++)j[i].duration>d&&(f=j[i].name.substr(j[i].name.lastIndexOf("/")+1),d=j[i].duration),j[i].duration<c&&(e=j[i].name.substr(j[i].name.lastIndexOf("/")+1),c=j[i].duration),j[i].name.indexOf("CALLSTATS_SRC_URLstatic/callstats")>-1&&(b=j[i].duration);return{support:"full",callstats:b,min:{name:e,time:c},max:{name:f,time:d},total:h}}return"Firefox"===a.name?{support:"limited",total:h}:void 0},d.prototype.detectBrowserInfo=function(){var a,b,c=navigator.userAgent,d=navigator.appName,e=navigator.appVersion,f=""+parseFloat(navigator.appVersion),g={goog:"Chrome",moz:"Firefox",plugin:"Plugin",edge:"Edge"};(a=c.indexOf("Opera"))!==-1?(d="Opera",f=c.substring(a+6),(a=c.indexOf("Version"))!==-1&&(f=c.substring(a+8)),b=g.goog):(a=c.indexOf("OPR"))!==-1?(d="Opera",f=c.substring(a+4),(a=c.indexOf("Version"))!==-1&&(f=c.substring(a+8)),b=g.goog):(a=c.indexOf("MSIE"))!==-1?(d="Microsoft Internet Explorer",f=c.substring(a+5),b=g.goog):(a=c.indexOf("Edge"))!==-1?(d=g.edge,f=c.substring(a+5),b=g.edge):(a=c.indexOf("Chrome"))!==-1?(d=g.goog,f=c.substring(a+7),b=g.goog):(a=c.indexOf("Safari"))!==-1?(d="Safari",f=c.substring(a+7),(a=c.indexOf("Version"))!==-1&&(f=c.substring(a+8)),b=g.goog):(a=c.indexOf("Firefox"))!==-1?(d="Firefox",f=c.substring(a+8),b=g.moz):(a=c.indexOf("Trident"))!==-1&&(d="Microsoft Internet Explorer",a=c.indexOf("rv"),f=c.substring(a+3,a+7),b=g.goog);var h,i,j=null,k=[{s:"Windows 3.11",r:/Win16/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 10",r:/(Windows 10|Windows NT 10.0)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows ME",r:/Windows ME/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Linux",r:/(Linux|X11)/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(h in k)if(i=k[h],i.r.test(c)){j=i.s;break}var l=null;switch(/Windows/.test(j)&&(l=/Windows (.*)/.exec(j)[1],j="Windows"),j){case"Mac OS X":l=/Mac OS X (10[\.\_\d]+)/.exec(c)[1];break;case"Android":l=/Android ([\.\_\d]+)/.exec(c)[1];break;case"iOS":l=/OS (\d+)_(\d+)_?(\d+)?/.exec(e),l=l[1]+"."+l[2]+"."+(0|l[3])}return{name:d,ver:f.toString(),os:j,osVersion:l,codebase:b,userAgent:c}},b.exports=d},{}]},{},[1]);
/**
 * Part of this code was taken from the JsSIP source code
 * and modified a bit to make it run as wanted
 */

var T1 = 500,
    T2 = 4000,
    T4 = 5000;


var Timers = {
    T1: T1,
    T2: T2,
    T4: T4,
    TIMER_B: 64 * T1,
    TIMER_D: 0 * T1,
    TIMER_F: 64 * T1,
    TIMER_H: 64 * T1,
    TIMER_I: 0 * T1,
    TIMER_J: 0 * T1,
    TIMER_K: 0 * T4,
    TIMER_L: 64 * T1,
    TIMER_M: 64 * T1,
    PROVISIONAL_RESPONSE_INTERVAL: 60000  // See RFC 3261 Section 13.3.1.1
};

/**
 * Handle SessionTimers for an incoming INVITE or UPDATE.
 * @param  {IncomingRequest} request
 * @param  {Array} responseExtraHeaders  Extra headers for the 200 response.
 */
function handleSessionTimersInIncomingRequest(request, responseExtraHeaders) {
    if (!this.sessionTimers.enabled) { return; }

    var session_expires_refresher;

    if (request.session_expires && request.session_expires >= JsSIP.C.MIN_SESSION_EXPIRES) {
        this.sessionTimers.currentExpires = request.session_expires;
        session_expires_refresher = request.session_expires_refresher || 'uas';
    }
    else {
        this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires;
        session_expires_refresher = 'uas';
    }

    responseExtraHeaders.push('Session-Expires: ' + this.sessionTimers.currentExpires + ';refresher=' + session_expires_refresher);

    this.sessionTimers.refresher = (session_expires_refresher === 'uas');
    runSessionTimer.call(this);
}

/**
 * Handle SessionTimers for an incoming response to INVITE or UPDATE.
 * @param  {IncomingResponse} response
 */
function handleSessionTimersInIncomingResponse(response) {
    if (!this.sessionTimers.enabled) { return; }

    var session_expires_refresher;

    if (response.session_expires && response.session_expires >= JsSIP_C.MIN_SESSION_EXPIRES) {
        this.sessionTimers.currentExpires = response.session_expires;
        session_expires_refresher = response.session_expires_refresher || 'uac';
    }
    else {
        this.sessionTimers.currentExpires = this.sessionTimers.defaultExpires;
        session_expires_refresher = 'uac';
    }

    this.sessionTimers.refresher = (session_expires_refresher === 'uac');
    runSessionTimer.call(this);
}

function runSessionTimer() {
    var self = this;
    var expires = this.sessionTimers.currentExpires;

    this.sessionTimers.running = true;

    clearTimeout(this.sessionTimers.timer);

    // I'm the refresher.
    if (this.sessionTimers.refresher) {
        this.sessionTimers.timer = setTimeout(function () {
            if (self.status === JsSIP.C.STATUS_TERMINATED) { return; }

            sendUpdate.call(self, {
                eventHandlers: {
                    succeeded: function (response) {
                        handleSessionTimersInIncomingResponse.call(self, response);
                    }
                }
            });
        }, expires * 500);  // Half the given interval (as the RFC states).
    }

    // I'm not the refresher.
    else {
        this.sessionTimers.timer = setTimeout(function () {
            if (self.status === JsSIP.C.STATUS_TERMINATED) { return; }

            self.terminate({
                cause: JsSIP_C.causes.REQUEST_TIMEOUT,
                status_code: 408,
                reason_phrase: 'Session Timer Expired'
            });
        }, expires * 1100);
    }
}


function setInvite2xxTimer(request, body) {
    var
        self = this,
        timeout = Timers.T1;

    this.timers.invite2xxTimer = setTimeout(function invite2xxRetransmission() {
        if (self.status !== JsSIP.C.STATUS_WAITING_FOR_ACK) {
            return;
        }

        request.reply(200, null, ['Contact: ' + self.contact], body);

        if (timeout < Timers.T2) {
            timeout = timeout * 2;
            if (timeout > Timers.T2) {
                timeout = Timers.T2;
            }
        }
        self.timers.invite2xxTimer = setTimeout(
            invite2xxRetransmission, timeout
        );
    }, timeout);
}


/**
 * RFC3261 14.2
 * If a UAS generates a 2xx response and never receives an ACK,
 *  it SHOULD generate a BYE to terminate the dialog.
 */
function setACKTimer() {
    var self = this;

    this.timers.ackTimer = setTimeout(function () {
        if (self.status === JsSIP.C.STATUS_WAITING_FOR_ACK) {
            clearTimeout(self.timers.invite2xxTimer);
            sendRequest.call(self, JsSIP.C.BYE);
            ended.call(self, 'remote', null, JsSIP.C.causes.NO_ACK);
        }
    }, Timers.TIMER_H);
}

function ended(originator, message, cause) {
    this.end_time = new Date();

    this.close();
    this.emit('ended', {
        originator: originator,
        message: message || null,
        cause: cause
    });
}

// extend.js
// Written by Andrew Dupont, optimized by Addy Osmani
function extend(destination, source) {

	var toString = Object.prototype.toString,
		objTest = toString.call({});

	for (var property in source) {
		if (source[property] && objTest === toString.call(source[property])) {
			destination[property] = destination[property] || {};
			extend(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;

}

var voxbone = voxbone || {};

/**
 * Handles ajax requests in order to avoid using jQuery
*/
extend(voxbone, {
  Request: {
    param: function (data) {
      var encodedString = '';
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (encodedString.length > 0) {
            encodedString += '&';
          }
          encodedString += prop + '=' + encodeURIComponent(data[prop]);
        }
      }
      return encodedString;
    },

    post: function(url, data, callback) {
      var request = new XMLHttpRequest();
      var postData = this.param(data);

      request.open('POST', url);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = function() {
        if (typeof callback === 'function') {
          callback({
            status: request.status,
            message: request.responseText
          });
        }
      };

      request.send(postData);
    },

    jsonp: function(url, data) {
      var src = url + (url.indexOf('?') + 1 ? '&' : '?');
      var head = document.getElementsByTagName('head')[0];
      var newScript = document.createElement('script');

      src += this.param(data);
      newScript.type = 'text/javascript';
      newScript.src = src;

      if (this.currentScript) head.removeChild(currentScript);
      head.appendChild(newScript);
    }
  }
});

// some overrides
JsSIP.C.SESSION_EXPIRES = 3600;

// first make sure that we enable the verbose mode of JsSIP
JsSIP.debug.enable('JsSIP:*');

// then we monkey patch the debug function to buffer the log messages
JsSIP.debug.log = function () {
	var logger = (arguments[0].indexOf('ERROR') === -1) ? JsSIP.VoxboneLogger.loginfo : JsSIP.VoxboneLogger.logerror;
	return logger.apply(this, arguments);
};

JsSIP.VoxboneLogger = {
	loginfo: function () {
		var args = Array.prototype.slice.call(arguments);
		info.apply(console, args);
	},
	logerror: function () {
		var args = Array.prototype.slice.call(arguments);
		error.apply(console, args);
	},
	setError: function (fn) { error = fn; },
	setInfo: function (fn) { info = fn; }
};

JsSIP.VoxboneLogger.setInfo(function() {
	var args = Array.prototype.slice.call(arguments);
	if (voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.INFO) {
		console.log.apply(console,args);
	}
	if (args.length == 5) {
		voxbone.Logger.addLogToBuffer("INFO: "+args[0]);
		voxbone.Logger.addLogToBuffer("INFO: "+args[3]);
	} else {
		voxbone.Logger.addLogToBuffer("INFO: "+args[0]);
	}
});

JsSIP.VoxboneLogger.setError = function () {
	var args = Array.prototype.slice.call(arguments);
	if (voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.ERROR) {
		console.error.apply(console, args);
	}
	if (args.length == 5) {
		voxbone.Logger.addLogToBuffer("ERROR: "+args[0]);
		voxbone.Logger.addLogToBuffer("ERROR: "+args[3]);
	} else {
		voxbone.Logger.addLogToBuffer("ERROR: "+args[0]);
	}
};

extend(voxbone, {
	Logger : {
		loginfo : function(log) {
			if (voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.INFO) {
				console.log(log);
			}
			voxbone.Logger.addLogToBuffer("INFO: "+ log);
		},
		logerror : function(log) {
			if (voxbone.WebRTC.configuration.log_level >= voxbone.Logger.log_level.ERROR) {
				console.log(log);
			}
			voxbone.Logger.addLogToBuffer("ERROR: "+ log);
		},
		addLogToBuffer : function(log) {
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat("\r\n");
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat(log);
		},
		log_level : {NONE : 0, ERROR : 1, INFO : 2}
	}
});

/**
 * Pinger Logic & Best POP Selection for WebRTC
 */
extend(voxbone, {
	Pinger: {
		/**
		 * Placeholder for ping result
		 */
		pingResults: [],

		/**
		 * Load an image and compute the time it took to load.
		 * Loading time is then stored into pingResult for further processing.
		 * Each pop will host a small http server to serve the image.
		 *
		 * If a ping fails, a value of -1 will be stored
		 *
		 * @param pop Name of the Pop to ping, mainly used as an identifier for storing ping result.
		 * @param url URL of the Pop to ping
		 */
		ping: function (pop, url) {
			var started = new Date().getTime();
			var _that = this;
			var callback = this.recordPingResult;

			this.img = new Image();
			_that.inUse = true;

			this.img.onload = function () {
				var elapsed = new Date().getTime() - started;
				callback(pop, elapsed);
				_that.inUse = false;
			};

			this.img.onerror = function (e) {
				_that.inUse = false;
				callback(pop, -1);
			};

			this.img.src = url + "?" + new Date().getTime();
			this.timer = setTimeout(function () {
				if (_that.inUse) {
					_that.inUse = false;
					callback(pop, -1);
				}
			}, 1500);
		},

		/**
		 * Record the ping result for a given pop and store it into a placeholder
		 * A duration of -1 will be used in the event a ping has timeout or URL doesn't resolve.
		 *
		 * @param pop Pop identifier
		 * @param duration ping duration
		 */
		recordPingResult: function (pop, duration) {
			//if(duration < 0 ) return;
            		voxbone.Logger.loginfo("[ping] "+pop+" replied in "+duration);
			var entry = {
				name: pop,
				ping: duration
			};

			voxbone.Pinger.pingResults.push(entry);
		},

		/**
		 * Extract which Pop is best from all the pinged Pop.
		 * It iterate over all stored ping result and returns the best one excluding ping of -1.
		 *
		 * @returns Name of the Pop which has the best ping
		 */
		getBestPop: function () {
			var bestPop;
            //If no proper ping server found, default to BE
            if(this.pingResults.length === 0){
                bestPop =  {
                    name:'BE',
                    ping: -1
                };
            //Else find the fastest
            }else{
                for (var i = 0; i < this.pingResults.length; i++) {
                    var result = this.pingResults[i];
                    if ((bestPop === undefined) || (result.ping > 0 && ((bestPop.ping < 0) || (result.ping < bestPop.ping) ))) {
                        bestPop = result;
                    }
                }
            }
			return bestPop;
		}
	}
});

/**
 *
 */
extend(voxbone, {

	WebRTC: {
                callStats : undefined,
		/**
		 * id of the <audio/> html tag.
		 * If an audio element with this id already exists in the page, the script will load it and attach audio stream to it.
		 * If not found, the script will create the audio component and attach the audio stream to it.
		 */
		audioComponentName: 'peer-audio',

    /**
     * id of the <video/> html tag.
     * If a video element with this id already exists in the page, the script will load it and attach video stream to it.
     * If not found, the script will create the video component and attach the stream to it.
     */
    videoComponentName: 'peer-video',

    /**
     * Indiciate if video should be used or not.
     * If video is set to true, then the user will be prompted for webcam access.
     *
     */
    allowVideo : false,

		/**
		 * URL of voxbone ephemeral auth server
		 */
		authServerURL: 'https://webrtc.voxbone.com/rest/authentication/createToken',

		/**
		 * URL of voxbone ephemeral auth server for basic auth
		 */
		basicAuthServerURL: 'https://webrtc.voxbone.com/rest/authentication/basicToken',

		/**
		 * Blob containing the logs for a webrtc session
		 */
		webrtcLogs: "",

		/**
		 * The actual WebRTC session
		 */
		rtcSession: {},
		/**
		 * SIP call id for current session
		 */
		callid: "",
		/**
		 * SIP call id of previous session
		 */
		previous_callid: "",
		/**
		 * The web audiocontext
		 */
		audioContext: undefined,

		/**
		 * local media volume
		 */
		localVolume: 0,

		/**
		 * The callback timer for local media volume
		 */
		localVolumeTimer: undefined,

		/**
		 * Timer used if customer wants to insert a add
		 * some gap between the digits
		 */
		dtmfTimer: undefined,

		/**
		 * The script processor for local media volume
		 */
		audioScriptProcessor: {},

		/**
		 * Used to bypass ping mechanism and enforce the POP to be used
		 * If set to 'undefined' ping will be triggered and best pop will be set as preferedPop
		 */
		preferedPop: undefined,

		/**
		 * Configuration object use to hold authentication data as well as the list of Web Socket Servers.
		 * This Configuration object is the native JsSip configuration object.
		 */
		configuration: {
			'authorization_user': undefined,
			'password': undefined,
			'ws_servers': undefined,
			'stun_servers': undefined,
			'turn_servers': undefined,
			'log_level': voxbone.Logger.log_level.INFO,
			'post_logs': false,
			/**
			It controls if we want to push
			the logs for a web session where
			the user didn't make any call attempt
			**/
			'post_logs_nocall': false,
			'webrtc_log': undefined,
			'uri': 'sip:voxrtc@voxbone.com',
			'trace_sip': true,
			'register': false,
			/**
			 * dialer_string
			 * Digits to dial after call is established
			 * dialer string is comma separated, to define a specfic pause between digits,
			 * we add another entry like 1,700ms,2, this will add a 700ms of pause between
			 * digits 1 & 2.
			 * Example = '1,2,3,1200ms,4,5,900ms,6,#'
			*/
			'dialer_string': undefined,
			'digit_duration': 100,  // duration of a digit
			'digit_gap': 500 // pause between two digits
		},

		customEventHandler: {
			'progress': function (e) {
			},
			'accepted': function (e) {
			},
			'getUserMediaFailed': function (e) {
				voxbone.Logger.logerror("Failed to access mic/camera");
			},
			'localMediaVolume': function (e) {
			},
			'failed': function (e) {
			},
			'ended': function (e) {
			},
			'authExpired': function (e) {
			},
			'getUserMediaAccepted': function(e) {
				voxbone.Logger.loginfo("local media accepted");
			}
		},

		/**
		 * Actual JsSIP User-Agent
		 */
		phone: undefined,

		/**
		 * Context is a variable which will hold anything you want to be transparently carried to the call
		 */
		context: undefined,

		/**
		 * Authenticate toward voxbone ephemeral server and get jsonp callback onto voxbone.WebRTC.processAuthData
		 * in order to process authentication result data.
		 *
		 * @param credentials credentials to be used against ephemeral auth server
		 */
		init: function (credentials) {
			voxbone.Logger.loginfo('auth server: ' + this.authServerURL);

			var data = {
				'username': credentials.username,
				'key': credentials.key,
				'expires': credentials.expires,
				'jsonp': 'voxbone.WebRTC.processAuthData'
			};

			voxbone.Request.jsonp(this.authServerURL, data);
		},

		/**
		 * Same as init, only difference is that it is used for basic authentication
		 * @param username: webrtc username of the customer
		 * @param key: webrtc key in plain text of the customer
		 */
		basicAuthInit: function (username, key) {
			voxbone.Logger.loginfo('auth server: ' + this.basicAuthServerURL);

			var data = {
				'username': username,
				'key': key,
				'jsonp': 'voxbone.WebRTC.processAuthData'
			};

      var callback = function (data) {};
			voxbone.Request.jsonp(this.basicAuthServerURL, data);
		},

		/**
		 * Process the Authentication data from Voxbone ephemeral auth server.
		 * It retrieves the list of ping servers and invoke voxbone.Pinger.ping on each of them.
		 * It also store the URI of websocket server and authorization data.
		 *
		 * @param data the Data from voxbone ephemeral server to process
		 */
		processAuthData: function (data) {
			this.configuration.ws_servers = data.wss;
			this.configuration.stun_servers = data.stunServers;
			this.configuration.turn_servers = data.turnServers;
			this.configuration.webrtc_log = data.log;

			this.configuration.authorization_user = data.username;
			this.configuration.password = data.password;


			// If no prefered Pop is defined, ping and determine which one to prefer
			if (typeof this.preferedPop === 'undefined') {
				voxbone.Logger.loginfo("prefered pop undefined, pinging....");
				this.pingServers = data.pingServers;
				for (var i = 0; i < this.pingServers.length; i++) {
					voxbone.Pinger.ping(i, this.pingServers[i]);
				}
			} else {
				voxbone.Logger.loginfo("preferred pop already set to " + this.preferedPop);
			}

			var timeout = this.getAuthExpiration();
			if (timeout > 0) {
				voxbone.Logger.loginfo("Credential expires in " + timeout + " seconds");
				// refresh at 75% of duration
				setTimeout(this.customEventHandler.authExpired, timeout * 750);
			}

			var callstats_credentials = data.callStatsCredentials;
			voxbone.WebRTC.callStats = new callstats(null, null, jsSHA);

			var csInitCallback = function(csError, csMsg) {
				voxbone.Logger.loginfo("callStats Status: errCode= " + csError + " Msg= " + csMsg );
			};
			var localUserId = ((data.username).split(":"))[1];
			voxbone.WebRTC.callStats.initialize(callstats_credentials.appId, callstats_credentials.appSecret, localUserId, csInitCallback, null, null);
		},

		/**
		 * Calculates the number of seconds until the current WebRTC token expires
		 *
		 * @returns time until expration in seconds
		 */

		getAuthExpiration: function (data) {
			var now = Math.floor((new Date()).getTime()/1000);
			var fields = this.configuration.authorization_user.split(/:/);
			return fields[0] - now;
		},


		/**
		 * Check if the document contains an audio element with the provided id.
		 * If no audio element exists, it creates it. prior to bind audio stream to it.
		 *
		 * @param id id of the audio element
		 * @param audioStream audio stream from the WebSocket
		 * @returns {HTMLElement}
		 */
		initAudioElement: function (id, audioStream) {
			var audio = document.getElementById(id);
			//If Audio element doesn't exist, create it
			if (!audio) {
				audio = document.createElement('audio');
				audio.id = id;
				audio.hidden = false;
				audio.autoplay = true;
                document.body.appendChild(audio);
			}
			//Bind audio stream to audio element
			audio.src = (window.URL ? URL : webkitURL).createObjectURL(audioStream);
			return audio;
		},

    /**
     * Check if the document contains a video element  with the provided id.
     * If no video element exists, it created it prior to bind video stream to it
     *
     * @param id of the video element
     * @param videoStream video stream from the WebSocket
     * @returns {HTMLElement}
     */
    initVideoElement : function(id, videoStream) {
        var video = document.getElementById(id);
        if(!video){
            video = document.createElement('video');
            video.id = id;
            video.hidden = false;
            video.autoplay = true;
            document.body.appendChild(video);
        }
        //Bind video stream to video element
        video.src = (window.URL ? URL : webkitURL).createObjectURL(videoStream);
        return video;
    },


    sendPreConfiguredDtmf : function(digitsPending) {
			var digit;
			var pause = 0;
			var digit_sent = false;

			if (voxbone.WebRTC.dtmfTimer !== undefined) {
				clearTimeout(voxbone.WebRTC.dtmfTimer);
				voxbone.WebRTC.dtmfTime = undefined;
			}
			if (digitsPending.length > 0) {
				if (digitsPending[0].indexOf('ms') != -1) {
					/*Calculate the pause in this case*/
					pause = parseInt(digitsPending[0].substring(0,digitsPending[0].indexOf('ms')));
				} else {
					/*We found a digit*/
					digit = digitsPending[0];
				}
				digitsPending = digitsPending.slice(1, digitsPending.length);
				if (digit !== undefined) {
					var d = Date.now();
					voxbone.WebRTC.rtcSession.sendDTMF(digit);
					digit_sent = true;
				}
				if (digitsPending.length > 0) {
					var nextDigitGap = pause > 0 ? (pause - voxbone.WebRTC.configuration.digit_gap) : (voxbone.WebRTC.configuration.digit_gap + voxbone.WebRTC.configuration.digit_duration);
					if (nextDigitGap < 0) {
						/*We can't have a negative pause between digits*/
						nextDigitGap = 0;
					}
					voxbone.WebRTC.dtmfTimer = setTimeout(function () {
						voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
						}, nextDigitGap);
				}

			}
		},

    postCallRating : function(e164, rating, comment, url) {
			if (voxbone.WebRTC.previous_callid !== undefined) {
				var data = {
					'payload_type': "webrtc_call_rating",
					'username': voxbone.WebRTC.configuration.authorization_user,
					'password': voxbone.WebRTC.configuration.password,
					'callid' : voxbone.WebRTC.previous_callid,
					'e164' : e164,
					'url' : url,
					'rating' : rating,
					'comment' : comment
				};
				var postUrl = voxbone.WebRTC.configuration.webrtc_log;
				voxbone.Request.post(postUrl, data);


				/*
				 *We are assuming that postCallRating is the
				 *only function using previous_callid, so
				 *we can nuke it here
				*/
				voxbone.WebRTC.previous_callid = undefined;
			}
		},

    postLogsToServer : function() {
			if (voxbone.WebRTC.configuration.post_logs === true) {
				/* Push the webrtc logs to the logging server */
				if (voxbone.WebRTC.configuration.webrtc_log !== undefined) {

          var url = voxbone.WebRTC.configuration.webrtc_log;
          var data = {
            'payload_type': "webrtc_logs",
            'username': voxbone.WebRTC.configuration.authorization_user,
            'password': voxbone.WebRTC.configuration.password,
            'callid' : voxbone.WebRTC.callid,
            'pop' : voxbone.WebRTC.preferedPop,
            'context' : voxbone.WebRTC.context,
            'uri' : voxbone.WebRTC.configuration.uri,
            'logs' : voxbone.WebRTC.webrtcLogs
          };
          voxbone.Request.post(url, data);
				}
			}
		},

		// Clean up the webrtc object, resets any ongoing timers and
		// other data specific to the current call
    cleanUp: function () {
			if (voxbone.WebRTC.localVolumeTimer !== undefined) {
				clearInterval(voxbone.WebRTC.localVolumeTimer);
				voxbone.WebRTC.localVolumeTimer = undefined;
			}

			if (voxbone.WebRTC.audioScriptProcessor !== undefined) {
				if (voxbone.WebRTC.audioContext !== undefined && voxbone.WebRTC.audioContext.destination !== undefined)
				{
					voxbone.WebRTC.audioScriptProcessor.disconnect(voxbone.WebRTC.audioContext.destination);
				}
				voxbone.WebRTC.audioScriptProcessor = undefined;
			}
			if (voxbone.WebRTC.dtmfTimer !== undefined) {
				clearTimeout(voxbone.WebRTC.dtmfTimer);
				voxbone.WebRTC.dtmfTimer = undefined;
			}
			voxbone.WebRTC.cleanAudioElement(voxbone.WebRTC.audioComponentName);
			voxbone.WebRTC.previous_callid = voxbone.WebRTC.callid;
			voxbone.WebRTC.callid = "";
			voxbone.WebRTC.webrtcLogs = "";
			voxbone.WebRTC.rtcSession = {};
			delete voxbone.WebRTC.phone;
		},

		/**
		 * Check if the document contains an audio element with the provided id.
		 * If audio element exists, cleans the src attr and reload it to
		 * avoid having the sound icon enabled in some browser
		 *
		 * @param id of the audio element
		 * @returns {HTMLElement}
		 */
		cleanAudioElement: function (id) {
			var audio = document.getElementById(id);
			// check if audio element really exists
			if (audio) {
				audio.removeAttribute('src');
				audio.load();
			}

			return audio;
		},

		/**
		 * Place a call on a given phone number.
		 * Prior to place the call, it will lookup for best possible POP to use
		 * and set the X-Voxbone-Pop header accordingly
		 *
		 * @param destPhone phone number to dial in E164 format.
		 */
		call: function (destPhone) {
			var uri = new JsSIP.URI('sip', destPhone, 'voxout.voxbone.com');
			if (this.preferedPop === undefined) {
				this.preferedPop = voxbone.Pinger.getBestPop().name;
			}
			voxbone.Logger.loginfo("prefered pop: ", this.preferedPop);

			var headers = [];
			headers.push('X-Voxbone-Pop: ' + this.preferedPop);

			if (this.context) {
				headers.push('X-Voxbone-Context: ' + this.context);
			}

			var options = {
				'eventHandlers': {
					'peerconnection': function (e) {
						var streams = e.peerconnection.getLocalStreams();
						voxbone.Logger.loginfo("streams "+ streams.length);
						for (var i = 0; i < streams.length; i++) {
							if (streams[i].getAudioTracks().length > 0) {
								/*activate the local volume monitoring*/
								try {
									if (voxbone.WebRTC.audioContext === undefined)
									{
										voxbone.WebRTC.audioContext = new AudioContext();
									}
								}
								catch (err) {
									voxbone.Logger.logerror("Web Audio API not supported " + err);
								}
								voxbone.WebRTC.audioScriptProcessor = voxbone.WebRTC.audioContext.createScriptProcessor(0, 1, 1);
								var mic = voxbone.WebRTC.audioContext.createMediaStreamSource(streams[i]);
								mic.connect(voxbone.WebRTC.audioScriptProcessor);
								voxbone.WebRTC.audioScriptProcessor.connect(voxbone.WebRTC.audioContext.destination);

								/* jshint loopfunc:true */
								voxbone.WebRTC.audioScriptProcessor.onaudioprocess = function(event) {
									var input = event.inputBuffer.getChannelData(0);
									var i;
									var sum = 0.0;
									for (i = 0; i < input.length; ++i) {
										sum += input[i] * input[i];
									}
									voxbone.WebRTC.localVolume = Math.sqrt(sum / input.length);
								};
								voxbone.WebRTC.localVolumeTimer = setInterval(function() {
									var e = { localVolume : voxbone.WebRTC.localVolume.toFixed(2)};
									voxbone.WebRTC.customEventHandler.localMediaVolume(e);
								}, 200);
								break;
							}
						}
					},
					'sending': function (e) {
						voxbone.WebRTC.callid = e.request.call_id;
						var  pc = voxbone.WebRTC.rtcSession.connection.pc;
						var remoteUserId  = voxbone.WebRTC.rtcSession.remote_identity.uri.user;
						voxbone.WebRTC.callStats.addNewFabric(pc, remoteUserId, voxbone.WebRTC.callStats.fabricUsage.audio, voxbone.WebRTC.callid, null);
					},
					'progress': function (e) {
						voxbone.WebRTC.customEventHandler.progress(e);
					},
					'failed': function (e) {
						var pcObject;
						var conferenceID = voxbone.WebRTC.callid;
						var callStats = voxbone.WebRTC.callStats;

						voxbone.Logger.logerror("Call (" + conferenceID + ") failed. Cause: " + e.cause);

						if (typeof voxbone.WebRTC.rtcSession.connection !== 'undefined')
							pcObject = voxbone.WebRTC.rtcSession.connection.pc;

						switch(e.cause) {
							case JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS:
								if (typeof pcObject === 'object')
									callStats.reportError(pcObject, conferenceID, callStats.webRTCFunctions.getUserMedia);
								voxbone.WebRTC.customEventHandler.getUserMediaFailed(e);
								break;

							case JsSIP.C.causes.INCOMPATIBLE_SDP:
							case JsSIP.C.causes.MISSING_SDP:
								if (typeof pcObject === 'object')
									callStats.reportError(pcObject, conferenceID, callStats.webRTCFunctions.createOffer);
								break;

							case JsSIP.C.causes.BYE:
							case JsSIP.C.causes.CANCELED:
							case JsSIP.C.causes.NO_ANSWER:
							case JsSIP.C.causes.EXPIRES:
							case JsSIP.C.causes.NO_ACK:
							case JsSIP.C.causes.BUSY:
							case JsSIP.C.causes.REJECTED:
							case JsSIP.C.causes.REDIRECTED:
							case JsSIP.C.causes.UNAVAILABLE:
							case JsSIP.C.causes.NOT_FOUND:
								if (typeof pcObject === 'object')
									callStats.reportError(pcObject, conferenceID, callStats.webRTCFunctions.applicationError);
								break;

							// case JsSIP.C.causes.DIALOG_ERROR:
							// case JsSIP.C.causes.BAD_MEDIA_DESCRIPTION:
							// case JsSIP.C.causes.RTP_TIMEOUT:
							// case JsSIP.C.causes.SIP_FAILURE_CODE:
							// case JsSIP.C.causes.REQUEST_TIMEOUT:
							// case JsSIP.C.causes.CONNECTION_ERROR:
							// case JsSIP.C.causes.INTERNAL_ERROR:
							// case JsSIP.C.causes.ADDRESS_INCOMPLETE:
							// case JsSIP.C.causes.AUTHENTICATION_ERROR:
							default:
								if (typeof pcObject === 'object')
									callStats.reportError(pcObject, conferenceID, callStats.webRTCFunctions.signalingError);
								break;
						}

						voxbone.WebRTC.postLogsToServer();
						voxbone.WebRTC.cleanUp();
						voxbone.WebRTC.customEventHandler.failed(e);
					},
					'accepted': function (e) {
						//voxbone.WebRTC.rtcSession = e.sender;
						voxbone.WebRTC.customEventHandler.accepted(e);
					},
					'addstream': function (e) {
						if(voxbone.WebRTC.allowVideo){
							voxbone.WebRTC.initVideoElement(voxbone.WebRTC.videoComponentName, e.stream);
						} else{
							voxbone.WebRTC.initAudioElement(voxbone.WebRTC.audioComponentName, e.stream);
						}
					},
					'confirmed': function (e) {
						//Check if the customer has configured any dialer string, use that to bypass IVRs
						if (voxbone.WebRTC.configuration.dialer_string !== undefined && voxbone.WebRTC.configuration.dialer_string.length > 0) {
							var digitsPending = voxbone.WebRTC.configuration.dialer_string.split(',');
							voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
						}
					},
					'ended': function (e) {
						voxbone.WebRTC.postLogsToServer();
						voxbone.WebRTC.cleanUp();
						voxbone.WebRTC.customEventHandler.ended(e);
					},
				},
				'extraHeaders': [],
				'pcConfig': { rtcpMuxPolicy: "negotiate" },
				'mediaConstraints': {'audio': true, 'video': voxbone.WebRTC.allowVideo}
			};
			if (this.configuration.stun_servers !== undefined || this.configuration.turn_servers !== undefined) {
				var i;
				var ice_servers = [];

				for (i = 0; i < this.configuration.stun_servers.length; i++) {
					ice_servers.push(this.configuration.stun_servers[i]);
				}
				for (i = 0; i < this.configuration.turn_servers.length; i++) {
					ice_servers.push(this.configuration.turn_servers[i]);
				}
				options.pcConfig.iceServers = ice_servers;

				/**
				  * Stop the ice gathering process 10 seconds after we
				  * we have atleast 1 relay candidate
				*/
				options.pcConfig.gatheringTimeoutAfterRelay = 5000;
			}
			options.pcConfig.iceCandidatePoolSize=10;


			options.extraHeaders = headers;
			if (this.phone === undefined) {
				this.phone = new JsSIP.UA(this.configuration);
				this.phone.once('connected', function() { voxbone.WebRTC.rtcSession = voxbone.WebRTC.phone.call(uri.toAor(), options);});
				this.phone.on('newRTCSession', function(data) {
					data.session.on('connecting', function(e) {
						voxbone.WebRTC.customEventHandler.getUserMediaAccepted(e);
					});

					data.session.on('reinvite', function (info) {
						request = info.request;

						var extraHeaders = ['Contact: ' + data.session.contact];
						handleSessionTimersInIncomingRequest.call(data.session, request, extraHeaders);

						request.reply(200, null, extraHeaders, null,
							function () {
								self.status = JsSIP.C.STATUS_WAITING_FOR_ACK;
								setInvite2xxTimer.call(data.session, request, null);
								setACKTimer.call(data.session);
							}
						);
					});
				});
				this.phone.start();
			} else {
				this.phone.configuration = this.configuration;
				this.rtcSession = this.phone.call(uri.toAor(), options);
			}
		},

		/**
		 * Checks if user is in an established
                 * call or if a call attempt is in progress,
		 * returns true if any of the above conditions
		 * is true otherwise returns false
		 *
		 * @returns {boolean}
		 */
		isCallOpen : function() {
			if (typeof voxbone.WebRTC.rtcSession.isEstablished === "function" && typeof voxbone.WebRTC.rtcSession.isInProgress === "function") {
				if ((voxbone.WebRTC.rtcSession.isInProgress() === true) || (voxbone.WebRTC.rtcSession.isEstablished() === true)) {
					return true;
				}
			}
			return false;
		},

        sendDTMF : function(tone){
            this.rtcSession.sendDTMF(tone);
        },

		/**
		 * Terminate the WebRTC session
		 */
		hangup: function () {
      if (this.rtcSession !== undefined) {
				this.rtcSession.terminate();
			}
		},

		/**
		 * Indicates if the client microphone is muted or not
		 */
		isMuted: false,

		/**
		 * Mute microphone
		 */
		mute: function () {
			var streams = this.rtcSession.connection.getLocalStreams();
			for (var i = 0; i < streams.length; i++) {
				for (var j = 0; j < streams[i].getAudioTracks().length; j++) {
					streams[i].getAudioTracks()[j].enabled = false;
				}
			}
			this.isMuted = true;
			voxbone.WebRTC.callStats.sendFabricEvent(this.rtcSession.connection.pc, voxbone.WebRTC.callStats.fabricEvent.audioMute, voxbone.WebRTC.callid);
		},

		/**
		 * unmute microphone
		 */
		unmute: function () {
			var streams = this.rtcSession.connection.getLocalStreams();
			for (var i = 0; i < streams.length; i++) {
				for (var j = 0; j < streams[i].getAudioTracks().length; j++) {
					streams[i].getAudioTracks()[j].enabled = true;
				}
			}
			this.isMuted = false;
			voxbone.WebRTC.callStats.sendFabricEvent(this.rtcSession.connection.pc, voxbone.WebRTC.callStats.fabricEvent.audioUnmute, voxbone.WebRTC.callid);
		},

		/**
		 * voxbone handler for page unload
		 * It will hangup any ongoing calls
		 * and post the logs
		 */
		unloadHandler: function () {
			if (voxbone.WebRTC.isCallOpen()) {
					voxbone.Logger.loginfo("Page unloading while a call was in progress, hanging up");
					voxbone.WebRTC.hangup();
					voxbone.WebRTC.postLogsToServer();
			} else if (voxbone.WebRTC.configuration.post_logs_nocall === true) {
				/*Don't care if any calls were made, we still want logs*/
				voxbone.WebRTC.postLogsToServer();
			}

		},
		/**
		 * Checks if the client browser supports WebRTC or not.
		 *
		 * @returns {boolean}
		 */
		isWebRTCSupported: function () {
			if (!window.navigator.webkitGetUserMedia && !window.navigator.mozGetUserMedia) {
				return false;
			}
			else {
				var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
				if (is_firefox) {
					var patt = new RegExp("firefox/([0-9])+");
					var patt2 = new RegExp("([0-9])+");
					var user_agent = patt.exec(navigator.userAgent.toLowerCase())[0];
					var version = patt2.exec(user_agent)[0];
					if (version < 23) {
						return false;
					}
				}

				return true;
			}
		}
	}
});
