var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var didSchema = new Schema({
  assigned: Boolean,
  did: Number,
  didId: Number
});

var Did = mongoose.model('Did', didSchema);

module.exports = Did;
