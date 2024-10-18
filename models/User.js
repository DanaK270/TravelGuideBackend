const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  },
  { timestamps: true }
)

module.exports = userSchema
