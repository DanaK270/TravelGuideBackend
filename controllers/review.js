const { Review } = require('../models/Review')
const { Hotel } = require('../models/Hotel')
const { Place } = require('../models/Place')

//create
exports.reviews_add_post = async (req, res) => {
  // Save this data to a database probably
  console.log('CREATE: ', req.body)
  console.log('CREATE: ', res.locals.payload.id)

  try {
    let review = new Review({ ...req.body, user: res.locals.payload.id })
    review.save()

    // Find the relevant hotel or place and update its reviews array
    if (req.body.hotel) {
      let hotelObj = await Hotel.findById(req.body.hotel)
      if (hotelObj) {
        hotelObj.reviews.push(review._id) // Add the new hotel's ID to the hotel's hotels array
        await hotelObj.save() // Save the updated hotel
      }
    } else {
      let placeObj = await Place.findById(req.body.place)
      if (placeObj) {
        placeObj.reviews.push(review._id)
        await placeObj.save()
      }
    }

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
    const rev = await Review.findById(id)
    if (rev.user != res.locals.payload.id) {
      res.status(401).send('you are not allowed to delete this review')
    } else {
      await Review.findByIdAndDelete(id)
      res.status(200).send('Review deleted successfully')
    }
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
