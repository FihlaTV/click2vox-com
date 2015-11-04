var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

module.exports = function(passport) {
  
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    Account.findOne({ 'email' :  email }, function(err, account) {
      if (err){
        return done(err);
      }
      if (!account){
        return done(null, false, req.flash('loginMessage', 'No account found.'));
      }
      if (!account.validPassword(password)){
        return done(null, false, req.flash('loginMessage', 'Wrong password. Try again'));
      }
      return done(null, account);
    });

  }));

  passport.serializeUser(function(account, done) {
    done(null, account.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, account) {
      done(err, account);
    });
  });
}
