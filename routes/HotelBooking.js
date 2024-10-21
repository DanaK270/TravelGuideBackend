const router = require('express').Router();
const { CreateHotelBooking, GetUserHotelBookings } = require('../controllers/HotelBooking');
const { stripToken, verifyToken } = require('../middleware');

router.post('/book-hotel', stripToken, verifyToken, CreateHotelBooking);
router.get('/user/:userId', stripToken, verifyToken, GetUserHotelBookings);

module.exports = router;
