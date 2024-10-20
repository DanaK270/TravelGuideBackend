const router = require('express').Router()

const hotelCtrl = require('../controllers/Hotel')

router.get('/', hotelCtrl.GetHotel)

module.exports = router
