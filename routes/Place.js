const router = require('express').Router()

const placeCtrl = require('../controllers/Place')

router.get('/', placeCtrl.GetPlace)
router.post('/', placeCtrl.CreatePlace)

module.exports = router
