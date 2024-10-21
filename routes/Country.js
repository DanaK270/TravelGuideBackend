const express = require('express')
const router = express.Router()

//controller
const countryCtrl = require('../controllers/country')

router.get('/', countryCtrl.getCountries)
router.post('/', countryCtrl.createCountryPost)

router.delete('/:country_id', countryCtrl.deleteCountry)

module.exports = router
