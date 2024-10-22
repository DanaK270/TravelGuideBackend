const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../public/images/') })

router.use(express.urlencoded({ extended: true }))

//controller
const profileCtrl = require('../controllers/Profile')

//routes
router.get('/', profileCtrl.GetUserInfo)

module.exports = router
