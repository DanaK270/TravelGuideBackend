const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('../models/Message'); // Import Message model
const User = require('../models/User'); // Import User model to register it
const connectDB = require('../config/db'); // Connect to MongoDB
require('dotenv').config();

const PORT = process.env.CHAT_PORT || 5000;

// Ensure MongoDB connection before starting the server
connectDB().then(() => {
  console.log('Connected to MongoDB for Chat Server');

  const server = http.createServer();
  const io = new Server(server, { cors: { origin: '*' } }); // Enable CORS

  io.on('connection', (socket) => {
    console.log('A user connected.');

    // Send previous messages to the connected user
    Message.find()
      .sort({ createdAt: 1 })
      .populate('user', 'name') // Populate user field with name
      .then((messages) => socket.emit('previousMessages', messages))
      .catch((err) => console.error('Error loading messages:', err));

    // Listen for new messages from clients
    socket.on('message', async (msg, callback) => {
      try {
        const userId = new mongoose.Types.ObjectId(msg.user); // Create valid ObjectId

        const newMessage = new Message({
          content: msg.content,
          user: userId,
        });

        const savedMessage = await newMessage.save(); // Save message to DB
        const populatedMessage = await savedMessage.populate('user', 'name'); // Populate user data

        io.emit('message', populatedMessage); // Broadcast to all clients
        callback({ status: 'ok' }); // Send success acknowledgment
      } catch (error) {
        console.error('Detailed error:', error); // Log detailed error
        callback({ status: 'error', msg: 'Message could not be saved.' }); // Send error acknowledgment
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });

  server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
