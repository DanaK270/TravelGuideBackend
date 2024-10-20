const router = require('express').Router()

const hotelCtrl = require('../controllers/Hotel')

router.get('/', hotelCtrl.GetHotel)
router.post('/', hotelCtrl.CreateHotelPost)
router.put('/:hotel_id', hotelCtrl.UpdateHotel)
router.delete('/:hotel_id', hotelCtrl.DeleteHotel)

module.exports = router
