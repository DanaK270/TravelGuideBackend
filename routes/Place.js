const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../public/images/') })

router.use(express.urlencoded({ extended: true }))

//controller
const placeCtrl = require('../controllers/Place')

//routes
router.get('/', placeCtrl.GetPlace)
router.post('/', upload.single('image'), placeCtrl.CreatePlace)
router.put('/:place_id', upload.single('image'), placeCtrl.UpdatePlace)
router.delete('/:place_id', placeCtrl.DeletePlace)
module.exports = router
