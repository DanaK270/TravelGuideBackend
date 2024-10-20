const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../public/images/') })

router.use(express.urlencoded({ extended: true }))

//controller
const hotelCtrl = require('../controllers/Hotel')

//routes
router.get('/', hotelCtrl.GetHotel)
router.post('/', upload.single('image'), hotelCtrl.CreateHotelPost)
router.put('/:hotel_id', upload.single('image'), hotelCtrl.UpdateHotel)
router.delete('/:hotel_id', hotelCtrl.DeleteHotel)

module.exports = router
