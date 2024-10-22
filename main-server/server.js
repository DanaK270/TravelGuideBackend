const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const connectDB = require('../config/db') // Adjusted path to config/db.js

const app = express()
const PORT = process.env.PORT || 4000

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    console.log('Connected to MongoDB for Main Server')

    // Middleware
    app.use(express.json())
    app.use(cors())
    app.use('/images', express.static(path.join(__dirname, '../public/images')))

    // Routes
    const AuthRouter = require('../routes/AuthRouter') // Adjusted path
    const Place = require('../routes/Place')
    const Hotel = require('../routes/Hotel')
    const ReviewRouter = require('../routes/review')
    const CountryRouter = require('../routes/Country')
    const Profile = require('../routes/Profile')

    // Use routes
    app.use('/auth', AuthRouter)
    app.use('/place', Place)
    app.use('/hotel', Hotel)
    app.use('/review', ReviewRouter)
    app.use('/country', CountryRouter)
    app.use('/Profile', Profile)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })
