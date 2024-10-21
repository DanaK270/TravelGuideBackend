const router = require('express').Router();
const { GetFlightDetails } = require('../controllers/Flight');

// Public route to search for flight details
router.get('/track', GetFlightDetails);

module.exports = router;
