// This module is to put all the functionality related to
// user account and profile stuff

var express = require('express');
var router = express.Router();

var passport = require('passport');

var callbackRedirects = {
  successRedirect : '/sip/new',
  failureRedirect : '/login'
};

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', callbackRedirects));

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', callbackRedirects));

router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/linkedin/callback', passport.authenticate('linkedin', callbackRedirects));

router.get('/windowslive', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.emails'] }));
router.get('/windowslive/callback', passport.authenticate('windowslive', callbackRedirects));

router.get('/voxbone', passport.authenticate('voxbone', { scope: [] }));
router.get('/voxbone/callback', passport.authenticate('voxbone', callbackRedirects));

module.exports = router;
