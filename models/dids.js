var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var didSchema = new Schema({
  assigned: { type: Boolean, default: false },
  did: Number,
  didId: Number
});

var Did = mongoose.model('Did', didSchema);

module.exports = Did;
