const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/review')
const middleware = require('../middleware/index')

//routes
router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  reviewsController.reviews_add_post
)

//delete
router.delete(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reviewsController.reviews_delete
)

//get
router.get('/view', reviewsController.reviews_view_get)

module.exports = router
