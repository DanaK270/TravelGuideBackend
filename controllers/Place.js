const { Place } = require('../models/Place')

const GetPlace = async (req, res) => {
  try {
    const place = await Place.find({})
    res.send(place)
  } catch (error) {
    throw error
  }
}

const CreatePlace = async (req, res) => {
  try {
    const place = await Place.create({ ...req.body })
    res.send(place)
  } catch (error) {
    throw error
  }
}

const UpdatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.place_id, req.body, {
      new: true
    })
    res.send(place)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPlace,
  CreatePlace,
  UpdatePlace
}
