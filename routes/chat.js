const router = require('express').Router();
const { GetMessages } = require('../controllers/chat');

// Public route to get all messages
router.get('/', GetMessages);

module.exports = router;
