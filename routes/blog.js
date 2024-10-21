const router = require('express').Router();
const { GetUserBlogs, CreateBlog } = require('../controllers/Blogs');
const { stripToken, verifyToken } = require('../middleware');

// Protected routes for blogs
router.get('/:userId', stripToken, verifyToken, GetUserBlogs);
router.post('/', stripToken, verifyToken, CreateBlog);

module.exports = router;
