const { Place } = require('../models/Place')
const { Country } = require('../models/Country')

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
    const { countryIds } = req.body
    const place = await Place.create({ ...req.body })
    await Country.updateMany(
      { _id: { $in: countryIds } },
      { $push: { places: place._id } }
    )
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

const DeletePlace = async (req, res) => {
  try {
    await Place.deleteOne({ _id: req.params.place_id })
    res.send({
      msg: 'Place Deleted',
      payload: req.params.place_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPlace,
  CreatePlace,
  UpdatePlace,
  DeletePlace
}
