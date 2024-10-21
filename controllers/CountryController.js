const { Country } = require('../models/Country')

const GetCountry = async (req, res) => {
  try {
    const country = await Country.find({})
    res.send(country)
  } catch (error) {
    throw error
  }
}

const CreateCountryPost = async (req, res) => {
  try {
    const { countryIds } = req.body
    const country = await Country.create({ ...req.body })

    res.send(country)
  } catch (error) {
    throw error
  }
}

const UpdateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.country_id,
      req.body,
      {
        new: true
      }
    )
    res.send(country)
  } catch (error) {
    throw error
  }
}

const DeleteCountry = async (req, res) => {
  try {
    await Country.deleteOne({ _id: req.params.country_id })
    res.send({
      msg: 'Country Deleted',
      payload: req.params.country_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCountry,
  CreateCountryPost,
  UpdateCountry,
  DeleteCountry
}
