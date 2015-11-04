var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var async = require('async');

module.exports = function(passport){

  router.get('/login', function(req, res, next){
    res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email, account: accountLoggedIn(req) });
  });

  router.post('/login',
    passport.authenticate('local-login'),//returns 401 unauthorized if not logged in
    function(req, res, next){
      console.log("entered post for login");
      var formData = req.body;
      var result = { message: "", errors: null, redirect: '/', email: formData.email }
      res.status(200).json(result);
  });

  router.get('/forgot', function(req, res, next){
    console.log("entered forgot password");
  });

  router.get('/signup', function(req, res, next){
    if(req.query.email){
      Account.findOne({ email: req.query.email }, function(err, the_account){
        if(the_account){
          if(the_account.temporary == true){
            res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
          }else {
            if (accountLoggedIn(req)){
              res.render('/widget');
            }else{
              res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email, account: accountLoggedIn(req) });
            }
          }
        }else{
          var an_account = new Account({
            email: req.query.email,
            voxbone_password: req.query.password,
            temporary: true 
          });

          an_account.save(function(err) {
            if (err) throw err;
            res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
          });
        }
      });
    } else{
      res.render('login', { title: 'Voxbone Demo v0.1', account: accountLoggedIn(req) });
    }
  });

  //POST /signup fetch the account with that email, set the new password and temporary to false.
  router.post('/signup', function(req, res, next){
    var formData = req.body;
    var result = { message: "", errors: null, redirect: '/widget', email: formData.email }
    //TODO validate fields
    Account.findOne({ email: formData.email }, function(err, the_account){
      the_account.password = formData.password;
      the_account.temporary = false;
      the_account.save(function(err){
        if(err) throw err;
        req.logIn(the_account, function(err) {
          console.log("saved the account with new info");
          res.status(200).json(result);
        });
      });
    });

  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/widget', isLoggedIn, function(req, res, next) {
    res.render('widget', { title: 'Voxbone Demo v0.1', account: req.account });
  });

  router.get('/', function(req, res, next) {
    res.render('login', { title: 'Voxbone Demo v0.1' });
  });

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function accountLoggedIn(req) {
    if (req.isAuthenticated())
      return true;
    else
      return false;
  }

  return router;
}
