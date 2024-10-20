const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const BlogRouter = require('./routes/blog');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/blogs', BlogRouter);

// Database Connection
const db = require('./config/db')

// Import Routes
const AuthRouter = require('./routes/AuthRouter');
const PlaceRouter = require('./routes/Place');
const HotelRouter = require('./routes/Hotel');
const ReviewRouter = require('./routes/review');
const BlogRouter = require('./routes/blogs');
const ChatRouter = require('./routes/chats');

// Mount Routes
app.use('/auth', AuthRouter);
app.use('/place', PlaceRouter);
app.use('/hotel', HotelRouter);
app.use('/review', ReviewRouter);
app.use('/blogs', BlogRouter);
app.use('/chats', ChatRouter);

const server = app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

// Socket.IO for real-time chat
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (msg) => {
    const Message = require('./models/Message');
    const message = new Message({ content: msg.content, user: msg.userId });
    await message.save();

    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
