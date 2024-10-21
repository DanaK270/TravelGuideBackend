const { Hotel } = require('../models/Hotel')
const { Country } = require('../models/Country')
const { populate } = require('dotenv')

const GetHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find()
    res.send(hotel)
  } catch (error) {
    throw error
  }
}

const GetHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotel_id)
      .populate('country')
      .populate('reviews')

    if (!hotel) {
      return res.status(404).send('Hotel not found')
    }
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
    const existingHotel = await Hotel.findById(req.params.hotel_id)

    if (!existingHotel) {
      return res.status(404).send('Hotel not found')
    }

    const newCountryId = req.body.country
    const oldCountryId = existingHotel.country.toString()

    let updatedData = req.body

    if (req.file) {
      updatedData.image = req.file.filename
    }

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.hotel_id,
      updatedData,
      {
        new: true
      }
    )

    // If the country has changed, update the relevant countries
    if (newCountryId && newCountryId !== oldCountryId) {
      // Remove the hotel from the old country
      const oldCountry = await Country.findById(oldCountryId)
      if (oldCountry) {
        oldCountry.hotels.pull(hotel._id)
        await oldCountry.save()
      }

      // Add the hotel to the new country
      const newCountry = await Country.findById(newCountryId)
      if (newCountry) {
        newCountry.hotels.push(hotel._id)
        await newCountry.save()
      }
    }

    res.send(hotel)
  } catch (error) {
    console.log('Error updating hotel:', error)
    res.status(500).send('Error updating hotel')
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
  DeleteHotel,
  GetHotelById
}
