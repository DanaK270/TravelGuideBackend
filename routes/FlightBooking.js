const router = require('express').Router();
const { CreateFlightBooking, GetUserFlightBookings } = require('../controllers/FlightBooking');
const { stripToken, verifyToken } = require('../middleware');

router.post('/book-flight', stripToken, verifyToken, CreateFlightBooking);
router.get('/user/:userId', stripToken, verifyToken, GetUserFlightBookings);

module.exports = router;
