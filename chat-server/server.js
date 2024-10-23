const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('../models/Message'); // Import Message model
const User = require('../models/User'); // Import User model to register it
const connectDB = require('../config/db'); // Import DB connection
require('dotenv').config();

const PORT = process.env.CHAT_PORT || 5000;

connectDB()
  .then(() => {
    console.log('Connected to MongoDB for Chat Server');

    const server = http.createServer();
    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
      console.log('A user connected.');

      // Send previous messages to the connected user
      Message.find()
        .sort({ createdAt: 1 })
        .populate('user', 'name') // Ensure 'user' field matches schema
        .then((messages) => socket.emit('previousMessages', messages))
        .catch((err) => console.error('Error loading messages:', err));

      // Listen for new messages from clients
      socket.on('message', async (msg, callback) => {
        console.log('New message received from client:', msg);

        try {
          const userId = new mongoose.Types.ObjectId(msg.user);

          const newMessage = new Message({
            content: msg.content,
            user: userId,
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
        console.log('A user disconnected.');
      });
    });

    server.listen(PORT, () => {
      console.log(`Chat server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
