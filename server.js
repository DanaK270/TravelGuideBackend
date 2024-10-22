const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const Message = require('./models/Message'); // Import Message model
require('./config/db'); // Ensure MongoDB is connected

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } }); // Enable CORS

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '/public/images')));

// Routes
const AuthRouter = require('./routes/AuthRouter');
const Place = require('./routes/Place');
const Hotel = require('./routes/Hotel');
const ReviewRouter = require('./routes/review');
const CountryRouter = require('./routes/Country');
const { Country } = require('./models/Country');

app.use('/auth', AuthRouter);
app.use('/Place', Place);
app.use('/Hotel', Hotel);
app.use('/review', ReviewRouter);
app.use('/country', Country);

// Socket.IO Setup
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Send previous messages to the connected user
  Message.find()
    .sort({ createdAt: 1 })
    .populate('user', 'name')
    .then((messages) => {
      console.log('Sending previ, ous messages:', messages);
      socket.emit('previousMessages', messages);
    })
    .catch((err) => console.error('Error loading messages:', err));

  // Listen for new messages from clients
  socket.on('message', async (msg) => {
    console.log('Received message:', msg);

    try {
      // Check if user ID is valid
      if (!mongoose.Types.ObjectId.isValid(msg.user)) {
        console.error('Invalid user ID:', msg.user);
        socket.emit('error', 'Invalid user ID. Please log in again.');
        return; // Stop if the userId is invalid
      }

      const newMessage = new Message({
        content: msg.content,
        user: mongoose.Types.ObjectId(msg.user), // Ensure ObjectId conversion
      });

      const savedMessage = await newMessage.save();
      const populatedMessage = await savedMessage.populate('user', 'name');

      console.log('Saved message:', populatedMessage);
      io.emit('message', populatedMessage); // Broadcast the message to all clients
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', 'Message could not be saved.');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
