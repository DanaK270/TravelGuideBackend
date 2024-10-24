const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.model('User', userSchema);

module.exports = User;
