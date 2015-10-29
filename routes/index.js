var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email });
});

router.get('/signup', function(req, res, next){
  if(req.query.email){
    console.log("email present");
    Account.findOne({ email: req.query.email }, function(err, the_account){
      if(the_account){
        if(the_account.temporary == true){
          res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
        }else {
          res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email });
        }
      }else{
        var an_account = new Account({
          email: req.query.email,
          password: req.query.password,
          temporary: true 
        });

        an_account.save(function(err) {
          if (err) throw err;
          res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
        });
      }
    });
  } else{
    res.render('login', { title: 'Voxbone Demo v0.1' });
  }
});

//POST /signup fetch the account with that email, set the new password and temporary to false.
router.post('/signup', function(req, res, next){
  var formData = req.body;
  var result = { message: "", errors: null, redirect: '/login', email: formData.email }
  //TODO check if temp_password is the same as the account's password, else return error
  Account.findOne({ email: formData.email }, function(err, the_account){
    the_account.password = formData.password;
    the_account.temporary = false;
    the_account.save(function(err){
      if(err) throw err;
      res.status(200).json(result);
    });
  });

});

router.get('/', function(req, res, next) {
  res.render('widget', { title: 'Voxbone Demo v0.1' });
});

module.exports = router;
