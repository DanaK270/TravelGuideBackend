const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User'); // Ensure User model is imported
const connectDB = require('../config/db');
require('dotenv').config();

const PORT = process.env.CHAT_PORT || 5000;

connectDB().then(() => {
  console.log('Connected to MongoDB for Chat Server');

  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Allow requests from frontend
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send previous messages to the connected user
    Message.find()
      .sort({ createdAt: 1 })
      .populate('user', 'name')
      .then((messages) => {
        socket.emit('previousMessages', messages);
      })
      .catch((err) => console.error('Error loading messages:', err));

    // Listen for new messages from clients
    socket.on('message', async (msg, callback) => {
      try {
        const newMessage = new Message({
          content: msg.content,
          user: new mongoose.Types.ObjectId(msg.user),
          timestamp: msg.timestamp,
        });

        const savedMessage = await newMessage.save();
        const populatedMessage = await savedMessage.populate('user', 'name');

        console.log('Broadcasting new message:', populatedMessage);
        io.emit('message', populatedMessage); // Broadcast to all clients

        callback({ status: 'ok' });
      } catch (error) {
        console.error('Error saving message:', error);
        callback({ status: 'error', msg: 'Message could not be saved.' });
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
