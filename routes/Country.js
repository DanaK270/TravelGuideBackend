const express = require('express')
const { getCountries } = require('../controllers/country')
const router = express.Router()

router.get('/', getCountries)

module.exports = router
