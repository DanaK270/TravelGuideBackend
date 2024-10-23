const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../public/images/') })

router.use(express.urlencoded({ extended: true }))

//controller
const ProfileCtrl = require('../controllers/Profile')

//routes
router.get('/users', ProfileCtrl.GetUsers)
router.get('/:user_id', ProfileCtrl.GetUserById)
router.put('/update/:user_id', ProfileCtrl.UpdateUser)
router.put('/UpdateUsers/:user_id', ProfileCtrl.UpdateUsers)
module.exports = router
