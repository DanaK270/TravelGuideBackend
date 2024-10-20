const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  image: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  link: String,
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);
module.exports = { Place };
