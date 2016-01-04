var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
  _widget : { type: Schema.Types.ObjectId, ref: 'Widget' },
  rate: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  url: String,
  created_at: Date,
  updated_at: Date
});

ratingSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) this.created_at = now;
  next();
});

var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
