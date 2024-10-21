const mongoose = require("mongoose")

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  image: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  link: String
})

const Hotel = mongoose.model("Hotel", hotelSchema)
module.exports = { Hotel }
