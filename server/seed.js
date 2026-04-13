require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  { name: 'Wireless Headphones', category: 'Electronics', price: 4999, rating: 4.8, description: 'Premium noise-cancelling headphones' },
  { name: 'Smart Fitness Band', category: 'Electronics', price: 2499, rating: 4.5, description: 'Track your fitness 24/7' },
  { name: 'Cotton Oversized Tee', category: 'Fashion', price: 799, rating: 4.3, description: 'Ultra-soft 100% cotton tee' },
  { name: 'Leather Wallet', category: 'Fashion', price: 1499, rating: 4.7, description: 'Slim RFID-blocking wallet' },
  { name: 'Ceramic Mug Set', category: 'Home', price: 649, rating: 4.6, description: 'Set of 2 hand-crafted mugs' },
  { name: 'Vitamin C Serum', category: 'Beauty', price: 899, rating: 4.4, description: 'Brightening face serum' },
  { name: 'Yoga Mat Pro', category: 'Sports', price: 1299, rating: 4.9, description: 'Non-slip professional yoga mat' },
  { name: 'Bestseller Books Set', category: 'Books', price: 1199, rating: 4.8, description: 'Set of 3 bestselling novels' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log('✅ Products added to database!')
    process.exit()
  })
  .catch(err => {
    console.log('Error:', err)
    process.exit(1)
  })