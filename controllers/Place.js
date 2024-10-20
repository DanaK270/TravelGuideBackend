const { Place } = require('../models/Place')

const GetPlace = async (req, res) => {
  try {
    const place = await Place.find({})
    res.send(place)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPlace
}
