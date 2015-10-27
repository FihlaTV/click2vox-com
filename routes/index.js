var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('widget', { title: 'Voxbone Demo v0.1' });
});

module.exports = router;
