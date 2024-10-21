const { Review } = require('../models/Review')

//create
exports.reviews_add_post = (req, res) => {
  // Save this data to a database probably
  console.log('CREATE: ', req.body)
  console.log('CREATE: ', res.locals.payload.id)

  try {
    let review = new Review({ ...req.body, user: res.locals.payload.id })
    review.save()
    res.send(review)
  } catch (error) {
    console.error('Error adding review:', error)
    res.status(500).send('Error adding review')
  }
}

//delete
exports.reviews_delete = async (req, res) => {
  const { id } = req.params
  try {
    await Review.findByIdAndDelete(id)
    res.status(200).send('Review deleted successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting review')
  }
}

//get
exports.reviews_view_get = async (req, res) => {
  try {
    const dbResponse = await Review.find()
    res.json(dbResponse)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching reviews')
  }
}

//edit
exports.review_update_put = async (req, res) => {
  const { id } = req.params
  const currentUser = res.locals.payload.id
  try {
    const response = await Review.findById(id)
    if (response.user != currentUser) {
      res.status(401).send('you are not allowed to update this review')
    } else {
      const responsePut = await Review.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.json(responsePut)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating the review')
  }
}
