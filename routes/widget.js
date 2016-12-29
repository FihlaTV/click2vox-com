// This module is to put all the functionality related to
// Widgets management

var express = require('express');
var router = express.Router();

var pjson = require('../package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

var async = require('async');
var _ = require('lodash');

var Account = require('../models/account');
var Widget = require('../models/widget');
var utils = require('./utils');

var PERMITTED_FIELDS = [
  'configuration_name', 'button_color','frame_color', 'button_label', 'button_style',
  'background_style', 'sip_uri', 'caller_id', 'context',
  'dial_pad', 'send_digits', 'hide_widget', 'updated_at',
  'link_button_to_a_page', 'show_text_html',
  'incompatible_browser_configuration', 'new_sip_uri',
  'show_frame', 'test_setup', 'rating', 'show_branding', 'ringback'
];

router.get('/new', utils.isLoggedIn, function (req, res, next) {
  Widget
    .find({_account: req.user._id})
    .exec(function (err, widgets) {
      res.render('widget/new', {
        defaultBtnLabel: utils.defaultBtnLabel,
        userSipUris: req.user.getSipURIs(),
        addedSip: req.query.sip,
        title: title
      });
    });
});

router.post('/new', utils.isLoggedIn, function (req, res, next) {
  var currentUser = req.user;
  var params = req.parameters;

  var widgetData = params.permit(PERMITTED_FIELDS);

  var result = { message: "", errors: null };

  currentUser.buttonsLimitReachedForSipUri(widgetData.sip_uri, function(limitReached){
    if(!limitReached){
      saveButton();
    } else {
      result.errors = 'You can only assign up to 5 buttons to this SIP URI, please delete one and try again or select a different SIP URI.';
      return res.status(401).json(result);
    }
  });

  var saveButton = function () {
    widgetData._account = currentUser._id;

    if (widgetData.new_sip_uri) {
      if (!currentUser.sipsLimitReached()) {
        widgetData.sip_uri = widgetData.new_sip_uri;
      } else {
        result.errors = 'To add a new SIP URI you will need to upgrade your account';
        return res.status(401).json(result);
      }
    }

    utils.provisionSIP(currentUser, widgetData.sip_uri, function (err) {
      if (err) {
        console.log('Error while provisioning demo sip uri: ', err);
        if (widgetData.new_sip_uri) currentUser.removeSipURI(widgetData.new_sip_uri);
        result.errors = 'An error occurred while saving your SIP URI. Please try again';
        return res.status(err.httpStatusCode || 500).json(result);
      } else {
        req.user.getDidFor(widgetData.sip_uri, function (foundDid) {
          widgetData.did = foundDid.did;
          widgetData.didId = foundDid.didId;

          Widget.create(widgetData, function (err, widget) {
            if (err) throw err;
            currentUser.saveSipURI(widgetData.sip_uri);
            result.redirect = '/widget/' + widget._id + '/edit';
            return res.status(200).json(result);
          });
        });
      }
    });
  };
});

router.get('/:id/edit', utils.isLoggedIn, function (req, res, next) {
  async.parallel({
    user: function (callback) {
      Account
        .findOne({_id: req.user._id})
        .exec(callback);
    },
    widget: function(callback){
      Widget
        .findOne({
          _account: req.user._id,
          _id: req.params.id
        })
        .populate('_account')
        .exec(callback);
    }
  },
  function (err, result) {
    if (!result.widget) return utils.error404(res);
    result.defaultBtnLabel = utils.defaultBtnLabel;
    result.widget_code = result.widget.generateDivHtmlCode();
    result.title = title;
    res.render('widget/edit', result);
  });
});

router.post('/:id/edit', utils.isLoggedIn, function (req, res, next) {
  var currentUser = req.user;
  var params = req.parameters;

  var updateData = params
    .merge({updated_at: new Date()})
    .permit(PERMITTED_FIELDS);

  var result = { message: "", errors: null };

  var successResponse = function (widget) {
    if (params.type === 'iframe') {
      result.widget_code = widget.generateHtmlCode();
    } else {
      result.widget_code = widget.generateDivHtmlCode();
    }
    result.widget_id = widget.id;
    result.widget = widget;
    result.didToCall = widget.didToCall();
    return res.status(200).json(result);
  };

  var errorResponse = function (msg, status) {
    result.errors = msg;
    return res.status(status || 500).json(result);
  };

  if (updateData.new_sip_uri) {
    if (!currentUser.sipsLimitReached()) {
      currentUser.saveSipURI(updateData.new_sip_uri);
      updateData.sip_uri = updateData.new_sip_uri;
    } else {
      return errorResponse(
        'To add a new SIP URI you will need to upgrade your account', 401);
    }
  }

  utils.provisionSIP(currentUser, updateData.sip_uri, function (err) {
    if (err) {
      console.log('Error while provisioning demo sip uri: ', err);
      if (updateData.new_sip_uri) currentUser.removeSipURI(updateData.new_sip_uri);
      return errorResponse(
        'An error occurred while provisioning your SIP URI. Please try again', err.httpStatusCode);
    } else {
      currentUser.getDidFor(updateData.sip_uri, function (foundDid) {
        updateData.did = foundDid.did;
        updateData.didId = foundDid.didId;

        Widget
          .findOneAndUpdate({
            _account: currentUser._id,
            _id: req.params.id
          }, updateData, {new: true})
          .populate('_account')
          .exec(
            function (err, widget) {
              if (err) {
                console.log('Error saving widget', err);
                return errorResponse(
                  'An error occurred while saving your button. Please try again', err.httpStatusCode);
              } else {
                result.message = 'Success';
                return successResponse(widget);
              }
            }
          );
      });
    }
  });
});

router.delete('/:id', utils.isLoggedIn, function(req, res) {
  var status = 200;
  var result = {
    msg: "Button sucessfully deleted!",
    errors: null
  };

  Widget
    .findOneAndRemove({
      _account: req.user._id,
      _id: req.params.id
    }, function(err, widget) {
      if (!widget) {
        status = 404;
        result.msg = "Button not found!";
      }

      if (err) {
        status = 500;
        result = {
          msg: "Unable to delete the button",
          errors: err
        };
      }

      return res.status(status).json(result);
    });
});

router.get('/demo', function (req, res, next) {
  var demoEmail = process.env.DEMO_USER_EMAIL || 'demo.widget@click2vox.com';
  var demoSipObject = utils.defaultDemoSipObject();

  var renderResponse = function (account) {
    res.render('widget/demo', {
      defaultBtnLabel: utils.defaultBtnLabel,
      demoSipUris: [demoSipObject.demoSip],
      demoDid: demoSipObject.demoDid,
      demoDidId: demoSipObject.demoDidId,
      demoUser: account,
      title: title
    });
  };

  // check if demo user exists
  Account.findOne({
    email: demoEmail
  }, function (err, account) {
    if (!account) {
      account = new Account({
        email: demoEmail,
        verified: true,
        temporary: false,
        first_name: 'Demo',
        last_name: 'User'
      });
      account.save();

      // let provision the default sip uri with demo account
      utils.provisionSIP(account, demoSip, function (err, result) {
        if (err) console.log('Error while provisioning demo sip uri: ', err);
        renderResponse(account);
      });
    } else
      renderResponse(account);
  });
});

var portalHandler = function(req, res, next) {
  // e164=3225887748
  // login=torrey
  // password=ChangeMe1*
  // basic_auth=1
  var params = req.parameters;
  var required = ['e164', 'login', 'password', 'basic_auth'];

  // check if required params are present
  var reqCheck = _.filter(required, function(n) {
    return (params[n] !== undefined);
  });

  if (reqCheck.length < 4)
    return utils.objectNotFound(res, req, next);

  var fakeWidget = {
    did: params.e164,
    sip_uri: 'echo@ivrs', // this is just a placeholder. we should remove it
    rating: true,
    dial_pad: true,
    show_frame: true,
    show_branding: true,
    test_setup: true,
    webrtc_username: params.login,
    webrtc_password: params.password,
    basic_auth: params.basic_auth
  };

  var result = {
    widget: fakeWidget,
    params: params,
    hideIframeTab: true
  };

  result.defaultBtnLabel = utils.defaultBtnLabel;
  result.widget_code = utils.widgetDivHtmlCode(fakeWidget, params.e164);
  result.title = title;
  res.render('widget/portal-widget', result);
};

router.get('/portal-widget', portalHandler);

router.post('/portal-widget/get-code', function(req, res, next) {
  var result = {};
  var params = req.parameters;

  _.each(['did', 'show_branding', 'webrtc_username', 'webrtc_password', 'basic_auth'], function (n) {
    PERMITTED_FIELDS.push(n);
  });

  var widgetData = params
    .merge({updated_at: new Date()})
    .permit(PERMITTED_FIELDS);

  try {
    result.widget_code = utils.widgetDivHtmlCode(widgetData, widgetData.did);
    return res.json(result);
  } catch (e) {
    return res.status(500).json({
      msg: 'Something went wrong while generating code!', err: e
    });
  }
});

router.post('/portal-widget/get-html', function(req, res, next){
  var result = {};
  var widget = req.parameters;

  try {
    result.widget_code = utils.widgetSecureDivHTML(widget, widget.did);
    console.log(result);
    res.render('widget/widget_html', result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Something went wrong while generating code!', err: e
    });
  }
});

/* This is used for the project sip2webrtc. We need to get the id of
the widget linked to a specific sipuri in order to render its iframe*/
router.get('/get-id', function (req, res) {

  if (!req.query.sipuri)
    return res.status(400).json();

  Widget
    .findOne({sip_uri: req.query.sipuri})
    .exec(function (err, the_widget) {

      if (!the_widget)
        return res.status(400).json();
      else
        res.send(the_widget._id);

    });
});

module.exports = {
  router: router,
  portalHandler: portalHandler
};
