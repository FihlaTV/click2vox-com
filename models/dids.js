var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var Schema = mongoose.Schema;

var didSchema = new Schema({
  assigned: Boolean,
  did: Schema.Types.Long,
  didId: Number,
  sip_uri: String
});

var Did = mongoose.model('Did', didSchema);

module.exports = Did;
