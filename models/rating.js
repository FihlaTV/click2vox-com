var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
  rate: { type: Number, required: true, min: 1, max: 5 },
  comment: String
});

var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
