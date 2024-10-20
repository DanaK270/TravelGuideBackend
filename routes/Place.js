const router = require('express').Router()

const placeCtrl = require('../controllers/Place')

router.get('/', placeCtrl.GetPlace)
router.post('/', placeCtrl.CreatePlace)
router.put('/:place_id', placeCtrl.UpdatePlace)
router.delete('/:place_id', placeCtrl.DeletePlace)
module.exports = router
