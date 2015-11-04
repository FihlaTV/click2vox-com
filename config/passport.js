var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

module.exports = function(passport) {
  
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log("entered use.....");
    Account.findOne({ 'email' :  email }, function(err, account) {
      if (err){
        console.log("FOUND error: ");
        console.log(err);
        return done(err);
      }
      if (!account){
        console.log("NO ACCOUNT found.");
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!account.validPassword(password)){
        console.log("ACCOUNT found, but password is incorrect");
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      console.log("FOUND the account, all good!");
      return done(null, account);
    });

  }));

  passport.serializeUser(function(account, done) {
    console.log("entered serialize");
    done(null, account.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, account) {
      done(err, account);
    });
  });
}
