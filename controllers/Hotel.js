const { Hotel } = require('../models/Hotel')
const { Country } = require('../models/Country')

const GetHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find()
    res.send(hotel)
  } catch (error) {
    throw error
  }
}

const CreateHotelPost = async (req, res) => {
  console.log(' CREATE: ', req.body)
  console.log(req.file)
  try {
    const imageName = req.file.filename
    let hotelData = {
      ...req.body,
      image: imageName
    }
    let hotel = new Hotel(hotelData)
    hotel.save()

    // Find the relevant country and update its hotels array
    let countryObj = await Country.findById(req.body.country)
    if (countryObj) {
      countryObj.hotels.push(hotel._id) // Add the new hotel's ID to the country's hotels array
      await countryObj.save() // Save the updated country
    }

    res.send(hotel)
  } catch (error) {
    console.error('Error adding hotel:', error)
    res.status(500).send('Error adding hotel')
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
