const { Country } = require('../models/Country')

const getCountries = async (req, res) => {
  try {
    // Fetch all countries from the database
    const countries = await Country.find()

    // Send the list of countries as a response
    res.send(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).send('Error fetching countries')
  }
}

module.exports = { getCountries }
