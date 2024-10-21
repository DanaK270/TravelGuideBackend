const { Blog } = require('../models/Blog');

// Get all blog posts for a specific user
const GetUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.params.userId });
    res.send(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Error fetching blogs');
  }
};

// Create a new blog post
const CreateBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, user: req.body.userId });
    await blog.save();
    res.send(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Error creating blog');
  }
};

module.exports = { GetUserBlogs, CreateBlog };
