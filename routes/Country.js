const express = require('express')
const router = express.Router()

//controller
const countryCtrl = require('../controllers/country')

router.get('/', countryCtrl.getCountries)
router.post('/', countryCtrl.createCountryPost)
// router.put('/:country_id', countryCtrl.updateCountry)
// router.delete('/:country_id', countryCtrl.deleteCountry)

module.exports = router
