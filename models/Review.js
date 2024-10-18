const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Review', reviewSchema)
