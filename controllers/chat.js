const { Message } = require('../models/Message');

// Get all messages from the chat
const GetMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'name');
    res.send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
};

module.exports = { GetMessages };
