const router = require('express').Router()
const Product = require('../models/Product')

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }
    let products = Product.find(query)
    if (sort === 'price-asc') products = products.sort({ price: 1 })
    if (sort === 'price-desc') products = products.sort({ price: -1 })
    if (sort === 'rating') products = products.sort({ rating: -1 })
    const result = await products
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Add product (admin)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    )
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router