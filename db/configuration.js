var mongoose = require('mongoose');
var Account = require('../models/account');
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/voxboneDB';

mongoose.connect(dbURI);

//Check for demo user for testing purposes
Account.findOne({email: "demo.widget@click2vox.com"}, function (err, demoAccount) {
  if (!demoAccount) {
    console.log("Generating demo user...");
    demoAccount = new Account(
      {
        email: "demo.widget@click2vox.com",
        verified: true,
        first_name: "Demo",
        last_name: "User",
        company: "Voxbone",
        phone: "+54123456",
        referrer: "no-referer",
        temporary: false
      }
    );
    demoAccount.password = demoAccount.generateHash("password");
    demoAccount.save(function (err) {
      if(err)
          console.log("Demo user couldnt be generated");
    });
  }
});

module.exports = dbURI;
