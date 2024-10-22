const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; // Export the model correctly
