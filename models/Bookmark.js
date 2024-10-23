const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)
module.exports = { Bookmark }
