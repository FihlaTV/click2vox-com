var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/voxboneDB';

mongoose.connect(dbURI);
