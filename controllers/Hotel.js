const { Hotel } = require('../models/Hotel')
const { Country } = require('../models/Country')

const GetHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find({})
    res.send(hotel)
  } catch (error) {
    throw error
  }
}

const CreateHotelPost = async (req, res) => {
  try {
    const { countryIds } = req.body
    const hotel = await Hotel.create({ ...req.body })
    await Country.updateMany(
      { _id: { $in: countryIds } },
      { $push: { hotels: hotel._id } }
    )
    res.send(hotel)
  } catch (error) {
    throw error
  }
}

const UpdateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.hotel_id, req.body, {
      new: true
    })
    res.send(hotel)
  } catch (error) {
    throw error
  }
}

const DeleteHotel = async (req, res) => {
  try {
    await Hotel.deleteOne({ _id: req.params.hotel_id })
    res.send({
      msg: 'Hotel Deleted',
      payload: req.params.hotel_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetHotel,
  CreateHotelPost,
  UpdateHotel,
  DeleteHotel
}
