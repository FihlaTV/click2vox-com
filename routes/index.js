var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email });
});

router.get('/signup', function(req, res, next){
  if(req.query.email){
    console.log("email present");
    Account.findOne({email: req.query.email}, function(err, the_account){
      if(the_account){
        console.log("found the account");
        console.log(the_account.email);
        if(the_account.temporary == true){
          res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
        }else {
          res.render('login', { title: 'Voxbone Demo v0.1', email: req.query.email });
        }
      }else{
        console.log("attempting to create the account");
        var an_account = new Account({
          email: req.query.email,
          password: req.query.password,
          temporary: true 
        });

        an_account.save(function(err) {
          console.log("saved or error");
          console.log(err);
          if (err) throw err;
          res.render('signup', { title: 'Voxbone Demo v0.1', email: req.query.email });
        });
      }
    });
  } else{
    res.render('login', { title: 'Voxbone Demo v0.1' });
  }
});

//TODO POST /signup fetch the account with that email, set the new password and temporary to false.
router.post('/signup', function(req, res, next){
  console.log("entered post.....");
  var formData = req.body;
  console.log(formData);
  var result = {message: "this is a test", errors: {name: 'error test'}, success: false}

  res.json(result, 200);	
});

router.get('/', function(req, res, next) {
  res.render('widget', { title: 'Voxbone Demo v0.1' });
});

module.exports = router;
