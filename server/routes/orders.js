const router = require('express').Router()
const Order = require('../models/Order')

// Place order
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body)
    res.json({ message: 'Order placed!', order })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email')
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    )
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router