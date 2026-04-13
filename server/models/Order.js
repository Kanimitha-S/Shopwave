const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items:    [{ product: String, qty: Number, price: Number }],
  total:    { type: Number },
  status:   { type: String, default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)