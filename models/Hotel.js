const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: String,
    image: String,
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    link: String,
  },
  { timestamps: true }
)

const Hotel = mongoose.model("Hotel", hotelSchema)
module.exports = { Hotel }
