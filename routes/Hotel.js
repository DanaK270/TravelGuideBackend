const router = require('express').Router()

const hotelCtrl = require('../controllers/Hotel')

router.get('/', hotelCtrl.GetHotel)
router.post('/', hotelCtrl.CreateHotel)

module.exports = router
