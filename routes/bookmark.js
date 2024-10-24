const express = require('express')
const router = express.Router()

//controller
const bookmarkCtrl = require('../controllers/bookmark')

router.get('/:user_id', bookmarkCtrl.getBookmark)
router.post('/', bookmarkCtrl.createBookmarkPost)
router.delete('/:bookmark_id', bookmarkCtrl.deleteBookmark)
module.exports = router
