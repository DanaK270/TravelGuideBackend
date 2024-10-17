const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: String,
  image: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  // ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  link: String
})

const Place = mongoose.model('Place', placeSchema)
module.exports = { Place }
