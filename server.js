const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
//const path = require('path')

// PORT Configuration
const PORT = process.env.PORT

// Initialize Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

const db = require('./config/db')

// Import Routes
const AuthRouter = require('./routes/AuthRouter')
const ReviewRouter = require('./routes/review')

// CORS Configuration
app.use(cors())

// Mount Routes (after CORS)
app.use('/auth', AuthRouter)
app.use('/review', ReviewRouter)

// Start server
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`)
})
