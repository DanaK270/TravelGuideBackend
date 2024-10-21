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

const createCountryPost = async (req, res) => {
  console.log(' CREATE: ', req.body)
  // console.log(req.file)
  try {
    // const imageName = req.file.filename
    let countryData = {
      ...req.body
      // image: imageName
    }
    let country = new Country(countryData)
    country.save()
    res.send(country)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getCountries,
  createCountryPost
  // updateCountry,
  // deleteCountry
}
