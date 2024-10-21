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

const GetPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.place_id)
      .populate('country')
      .populate('reviews')

    if (!place) {
      return res.status(404).send('Place not found')
    }
    res.send(place)
  } catch (error) {
    throw error
  }
}

const CreatePlace = async (req, res) => {
  console.log(' CREATE: ', req.body)
  console.log(req.file)
  try {
    const imageName = req.file.filename
    let placeData = {
      ...req.body,
      image: imageName
    }
    let place = new Place(placeData)
    place.save()

    // Find the relevant country and update its places array
    let countryObj = await Country.findById(req.body.country)
    if (countryObj) {
      countryObj.places.push(place._id) // Add the new place's ID to the country's places array
      await countryObj.save() // Save the updated country
    }

    res.send(place)
  } catch (error) {
    console.error('Error adding place:', error)
    res.status(500).send('Error adding place')
  }
}

const UpdatePlace = async (req, res) => {
  try {
    const existingPlace = await Place.findById(req.params.place_id)

    if (!existingPlace) {
      return res.status(404).send('Place not found')
    }

    const newCountryId = req.body.country
    const oldCountryId = existingPlace.country.toString()

    let updatedData = req.body

    if (req.file) {
      updatedData.image = req.file.filename
    }

    const place = await Place.findByIdAndUpdate(
      req.params.place_id,
      updatedData,
      {
        new: true
      }
    )

    // If the country has changed, update the relevant countries
    if (newCountryId && newCountryId !== oldCountryId) {
      // Remove the place from the old country
      const oldCountry = await Country.findById(oldCountryId)
      if (oldCountry) {
        oldCountry.places.pull(place._id)
        await oldCountry.save()
      }

      // Add the place to the new country
      const newCountry = await Country.findById(newCountryId)
      if (newCountry) {
        newCountry.places.push(place._id)
        await newCountry.save()
      }
    }

    res.send(place)
  } catch (error) {
    console.log('Error updating place:', error)
    res.status(500).send('Error updating place')
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
  DeletePlace,
  GetPlaceById
}
