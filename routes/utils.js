var _ = require('lodash');

// Here it goes only utility methods
module.exports = {

  apiCredentials: {
    'user': process.env.VOXBONE_API_USERNAME,
    'pass': process.env.VOXBONE_API_PASSWORD
  },

  jsonHeaders: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },

  // Keep the starting slash
  click2voxJsFileName: "/click2vox.js",

  defaultBtnLabel: process.env.DEFAULT_BUTTON_LABEL || 'Call Sales',

  defaultSipUris: function () {
    var demoSips = require('../config/demo-sips.json');
    return Object.keys(demoSips);
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  },

  redirectToWidgetIfLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return res.redirect('/account/widgets');
    return next();
  },

  accountLoggedIn: function (req) {
    return req.isAuthenticated();
  },

  userGravatarUrl: function (res) {
    var crypto = require('crypto');
    var md5_email = crypto.createHash('md5').update(res.locals.currentUser.email).digest("hex");
    return "https://www.gravatar.com/avatar/" + md5_email + "/?s=20&d=mm";
  },

  objectNotFound: function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

  uuid4: function () {
    // I leave this approach commented out just for general culture :)
    // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    //     return v.toString(16);
    // });

    function b (a) {return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
    return b();
  },

  provisionSIP: function (account, sipUri, callback) {
    var request = require('request');
    var async = require('async');
    var utils = this;
    var myDid;

    account.getDidFor(sipUri, function (foundDid) {
      myDid = foundDid;
    });

    // do not provision if is a demo sip uri
    if (utils.defaultSipUris().indexOf(sipUri) !== -1) {
      console.log('Jumping provisioning since it is a demo sip uris');
      return callback();
    }

    var verifySIP = function (done) {
      // step 1 Check if SIP is already linked
      // if so, return the corresponding VoiceUriId

      var url = "https://api.voxbone.com/ws-voxbone/services/rest/configuration/voiceuri?pageNumber=0&pageSize=1000&uri=" + sipUri;

      request.get(url, {
          auth: utils.apiCredentials,
          headers: utils.jsonHeaders
        },
        function (err, response, body) {

          if (err) return done(err);

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
        "didIds": [myDid.didId],
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
  },

  widgetDivHtmlCode: function (widget, did) {
    var jade = require('jade');
    var script = process.env.APP_URL + this.click2voxJsFileName;
    var label = widget.button_label || process.env.DEFAULT_BUTTON_LABEL;

    var params = {
      did: did,
      script: script,
      id: widget._id,
      label: escape(label),
      the_widget: widget
    };

    return jade.renderFile('./views/voxbone_widget_div.jade', params);
  },

  getVoxRoutes: function () {
    var app = require('../app');
    var routes = [];

    _.each(app._voxPaths, function(used) {
      // On each route of the router
      _.each(used.router.stack, function(stackElement) {
        if (stackElement.route) {
          var base = used.urlBase;
          var path = stackElement.route.path;

          routes.push({
            method: stackElement.route.stack[0].method,
            path: (used.urlBase === '/') ? path : (base + path)
          });
        }
      });
    });

    return routes;
  }

};
