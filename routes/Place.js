const router = require('express').Router()

const placeCtrl = require('../controllers/Place')

router.get('/', placeCtrl.GetPlace)

module.exports = router
