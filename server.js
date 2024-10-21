const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

// PORT Configuration
const PORT = process.env.PORT

// Initialize Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use('/images', express.static(path.join(__dirname, '/public/images')))

const db = require('./config/db')

// Import Routes
const AuthRouter = require('./routes/AuthRouter')
const Place = require('./routes/Place')
const Hotel = require('./routes/Hotel')
const ReviewRouter = require('./routes/review')
const CountryRouter = require('./routes/Country')
const Country = require('./routes/CountryRouter')

// CORS Configuration
app.use(cors())

// Mount Routes (after CORS)
app.use('/auth', AuthRouter)
app.use('/Place', Place)
app.use('/Hotel', Hotel)
app.use('/review', ReviewRouter)
app.use('/country', CountryRouter)
app.use('/CountryRouter', Country)

// Start server
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`)
})
