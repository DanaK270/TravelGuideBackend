const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true }, // Content must be provided
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Valid User reference
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` automatically
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
