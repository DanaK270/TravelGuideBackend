const router = require('express').Router()

//controller
const countryCtrl = require('../controllers/CountryController')

//routes
router.get('/', countryCtrl.GetCountry)
router.post('/', countryCtrl.CreateCountryPost)
router.put('/:country_id', countryCtrl.UpdateCountry)
router.delete('/:country_id', countryCtrl.DeleteCountry)

module.exports = router
