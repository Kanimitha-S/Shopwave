const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: './.env' })

const app = express()
app.use(cors())
app.use(express.json())

// Connect Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err))

// API Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))

// ✅ Serve Frontend
app.use(express.static(path.join(__dirname, '../client')))

// ✅ Home route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})