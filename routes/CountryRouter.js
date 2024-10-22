const router = require('express').Router()

//controller
const countryCtrl = require('../controllers/CountryController')

//routes
router.get('/view', countryCtrl.countries_view_get)
router.post('/addCountry', countryCtrl.countries_add_post)
router.get('/delete/:id', countryCtrl.countries_delete)

module.exports = router
