const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who rated the place/hotel
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }, // Optional, depending on whether it's for a place or a hotel
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }, // Optional, depending on whether it's for a place or a hotel
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = { Review }
