const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
