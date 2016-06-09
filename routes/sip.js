// This module is to put all the functionality related to
// user account and profile stuff

var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');

// GET to add a new SIP URI
router.get('/new', utils.isLoggedIn, function (req, res) {
  var showWizard = (utils.defaultSipUris().length === req.user.getSipURIs().length);

  res.render('sip/new', {
    showWizard: showWizard
  });
});

// POST to add a new SIP URI
router.post('/new', utils.isLoggedIn, function (req, res) {
  var sipUri = req.body.sip_uri;
  var result = {};

  var sucessCallback = function (result) {
    result.redirect_to = (req.user.sip_uris.length === 0) ?
      '/widget/new?sip=' + sipUri :
      '/account/widgets';
    result.message = 'Success';
    return res.status(200).json(result);
  };

  Account
    .findOne({_id: req.user._id})
    .exec(function (err, account) {

      if (account) {
        utils.provisionSIP(
          account, sipUri,
          function (err) {
            result = { errors: null };
            if (err) {
              console.log('An error ocurred: ', err);
              result.errors = err;
              return res.status(err.httpStatusCode || 500).json(result);
            } else {
              // append the sipURI in is not already there
              if (account.sip_uris.indexOf(sipUri) === -1) {
                account.sip_uris.push(sipUri);
                account.save(function (err) {
                  if (err) throw err;
                  return sucessCallback(result);
                });
              } else
                return sucessCallback(result);
            }
          });
      } else {
        var result = { message: 'Object not found', errors: null };
        return res.status(404).json(result);
      }
    }
  );
});

module.exports = router;