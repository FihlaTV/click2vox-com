var LocalStrategy = require('passport-local').Strategy;

module.exports = function(Account, passport) {
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      Account.findOne({ 'email' : email, 'temporary': false }, function(err, account) {
        if (err){
          var errorMessage = { error: 'generic-error', type: 'danger', message: err };
          return done(req.flash('loginMessage', errorMessage));
        }
        if (!account){
          var errorMessage = { error: 'account-not-found', type: 'danger', message: 'Account not found' };
          return done(null, false, req.flash('loginMessage', errorMessage));
        }
        if (!account.validPassword(password)){
          var errorMessage = { error: 'wrong-password', type: 'danger', message: 'Wrong password. Try again' };
          return done(null, false, req.flash('loginMessage', errorMessage));
        }
        return done(null, account);
      });
    }
  ));
};
