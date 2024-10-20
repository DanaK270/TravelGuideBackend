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
