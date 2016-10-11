var Account = require('../models/account');
var dbURI = require('./configuration');

Account.updateSipUrisLimit(
  function(err, numUpdated) {
    console.log(numUpdated, 'updated documents on', new Date());
    process.exit();
  }
);
