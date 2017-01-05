// This module is to put all the functionality related to
// user account and profile stuff

var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Widget = require('../models/widget');
var Did = require('../models/dids');
var utils = require('./utils');

// GET to add a new SIP URI
router.get('/new', utils.isLoggedIn, function (req, res) {
  if (req.user.sipsLimitReached()) {
    req.flash(
      'messages', {
        type: 'danger',
        message: 'You have reached the limit of allowed SIP URIs per user.'
      });
    return res.redirect('/account/widgets');
  }

  res.render('sip/new', { title: title });
});

// POST to add a new SIP URI
router.post('/new', utils.isLoggedIn, function (req, res) {
  if (req.user.sipsLimitReached())
    return res.send('Limit reached');

  var sipUri = req.body.sip_uri;
  var result = {};

  var sucessCallback = function (result) {
    result.redirect_to = (req.user.sip_uris.length === 0) ?
      '/widget/new?sip=' + encodeURIComponent(sipUri) :
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
              account.saveSipURI(sipUri);
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

// POST to edit SIP URI
router.post('/edit', utils.isLoggedIn, function (req, res) {
  var result = {};
  var user = req.user;
  var sipUri = req.body.sip_uri;
  var original = req.body.original;

  if (!original || !sipUri) {
    result.message = 'Object not found';
    return res.status(404).json(result);
  }

  // if user is trying to edit the testing sips, check if has space or is paid
  // or if the user is renaming the sip with one already in sip_uris field
  // if (utils.defaultSipUris().indexOf(original) > -1 && (user.sip_uris.length > 0) &&
  //   user.sip_uris.indexOf(sipUri) === -1) {
  //   result.message = 'You are not allowed to execute this action';
  //   return res.status(403).json(result); // should we change to 402: "Payment Required" ??
  // }

  var success = function () {
    result.message = 'Updated successfully!';
    return res.status(200).json(result);
  };

  // first, let's provisiong the new sip uri
  utils.provisionSIP(user, sipUri, function (err) {
    if (err) {
      console.log('Error while provisioning demo sip uri: ', err);
      result.message = 'An error occurred while provisioning your SIP URI. Please try again';
      return res.status(err.httpStatusCode).json(result);
    } else {
      user.removeSipURI(original);
      // check if new sip is not on of the testing ones
      if (utils.defaultSipUris().indexOf(sipUri) === -1)
        user.saveSipURI(sipUri);
      //Get the updated DID for the SIPURI
      Did.findOne({sip_uri: sipUri})
        .then(function(theDid, err) {
          if (err || !theDid) {
            result.message = 'DID not found';
            return res.status(500).json(result);
          }
          //Update the Widget with the new SIPURI and DID
          Widget.update(
            {_account: user._id, sip_uri: original},
            {sip_uri: sipUri, did: theDid.did, didId: theDid.didId},
            {multi: true},
            function (err, numUpdated) {
              console.log(numUpdated, 'updated documents');
              if (err) {
                result.message = 'Error while updating the registries.';
                return res.status(500).json(result);
              } else
                return success();
            }
          );
        });
    }
  });
});

router.delete('/:id', utils.isLoggedIn, function(req, res) {
  var status = 200;
  var result = {
    msg: "SIP URI Deleted successfully",
    errors: null
  };
  var sipUri = req.url.replace('/','');
  var user = req.user;

  if (utils.defaultSipUris().indexOf(sipUri) > -1) {
    result.msg = 'SIP URI cannot be deleted';
    status = 500;
    return res.status(status).json(result);
  }

  user.removeSipURI(sipUri);
  //Check if any Widgets are associated with this SIP URI.
  Widget.find({_account: user._id, sip_uri: sipUri}).then(
    function(theWidget,err){

      if (err) {
        result.message = 'Error while getting the Widget Data';
        return res.status(500).json(result);
      }

      if (theWidget.length > 0) {
        Widget.update(
          {_account: user._id, sip_uri: sipUri},
          {sip_uri: "", did: 0, didId: 0},
          {multi: true},
          function(err, numUpdated) {
            console.log(numUpdated, 'updated documents');
            if (err) {
              result.message = 'Error while updating the registries.';
              return res.status(500).json(result);
            }
          }
        );
      }

    });
  return res.status(status).json(result);
});

module.exports = router;
