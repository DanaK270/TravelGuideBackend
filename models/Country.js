const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
})

const Country = mongoose.model('Country', countrySchema)
module.exports = { Country }
