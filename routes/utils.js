// Here it goes only utility methods
module.exports = {

  defaultSipUris: function () {
    var sip_uris = process.env.DEFAULT_SIP_URIS;
    return sip_uris.split(',');
  },

  apiCredentials: {
    'user': process.env.VOXBONE_API_USERNAME,
    'pass': process.env.VOXBONE_API_PASSWORD
  },

  jsonHeaders: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  },

  redirectToWidgetIfLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return res.redirect('/widget');
    return next();
  },

  accountLoggedIn: function (req) {
    return req.isAuthenticated();
  },

  objectNotFound: function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

  provisionSIP: function (account, sipUri, callback) {
    var request = require('request');
    var async = require('async');
    var utils = this;

    var verifySIP = function (done) {
      // step 1 Check if SIP is already linked
      // if so, return the corresponding VoiceUriId

      var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri?pageNumber=0&pageSize=1000";

      request.get(url, {
          auth: utils.apiCredentials,
          headers: utils.jsonHeaders
        },
        function (err, response, body) {

          if (err) return console.log('Error:', err);

          var responseBody = JSON.parse(body);
          var voiceUris = responseBody.voiceUris;
          var voiceUri = voiceUris.filter(function (vu) {
            return vu.uri == sipUri;
          });

          var voiceUriId;
          if (voiceUri[0])
            voiceUriId = voiceUri[0].voiceUriId;

          done(err, account, voiceUriId);
        }
      );
    };

    var createVoiceURI = function (account, voiceUriId, done) {
      // Step 2: create voiceUri for the given sip uri
      var postData = {
        "didIds": [account.didId],
        "voiceUriId": voiceUriId
      };

      // If the voice uri exists, directly link it
      if (voiceUriId) {
        done(null, postData);
        return;
      }

      // If not, create the voice uri
      var putData = {
        "voiceUri": {
          "voiceUriId": null,
          "backupUriId": null,
          "voiceUriProtocol": "SIP",
          "uri": sipUri,
          "description": "Voice URI for: " + account.email + " from promotional widget generator."
        }
      };

      console.log(putData);
      var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri";
      request.put(url, {
          auth: utils.apiCredentials,
          headers: utils.jsonHeaders,
          body: JSON.stringify(putData)
        },
        function (err, response, body) {
          if (err) {
            if (err.code === 'ETIMEDOUT' || err.connect === true)
              done({
                httpStatusCode: 503,
                comeback_errors: "Timeout",
                message: "Timeout - Could not create the voice uri for SIP URI: " + sipUri + " and user: " + account.email + " . Probably already exists. View previous logs for more details."
              });
            else
              console.log('Error:', err);

            return;
          }

          var responseBody = JSON.parse(body);
          if (responseBody['httpStatusCode'])
            done({
              httpStatusCode: responseBody['httpStatusCode'],
              comeback_errors: responseBody.errors[0],
              message: "Could not create the voice uri for SIP URI: " + sipUri + " and user: " + account.email + ". Probably already exists. View previous logs for more details."
            });
          else
            done(err, postData);
        }
      );
    };

    var linkVoiceWithSIP = function (postData, done) {
      // Step 3 link the voice uri id
      var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/configuration";
      request.post(url, {
          auth: utils.apiCredentials,
          headers: utils.jsonHeaders,
          body: JSON.stringify(postData)
        },
        function (err, response, body) {
          done(err);
        }
      );
    };

    async.waterfall([
        verifySIP, createVoiceURI,
        linkVoiceWithSIP
      ],
      callback
    );
  }

};
