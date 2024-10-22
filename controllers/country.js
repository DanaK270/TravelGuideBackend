const { Country } = require('../models/Country')

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find()

    res.send(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).send('Error fetching countries')
  }
}

const GetCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.country_id)
      .populate('hotels')
      .populate('places')

    if (!country) {
      return res.status(404).send('Country not found')
    }
    res.send(country)
  } catch (error) {
    throw error
  }
}

const createCountryPost = async (req, res) => {
  console.log(' CREATE: ', req.body)
  try {
    let countryData = {
      ...req.body
    }
    let country = new Country(countryData)
    country.save()
    res.send(country)
  } catch (error) {
    throw error
  }
}

const deleteCountry = async (req, res) => {
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

const GetCountryById = async (req, res) => {  
  console.log(req.params.country_id, 'checking the country id')

  try {
    const country = await Country.findById(req.params.country_id)
      .populate('hotels')
      .populate('places')
    if (!country) {
      return res.status(404).send('Country not found')
    }
    res.send(country)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getCountries,
  createCountryPost,
  deleteCountry,
  GetCountryById
}
