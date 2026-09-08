require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
})
const Product = mongoose.model('Product', productSchema)

async function seedProducts() {
  const count = await Product.countDocuments()
  if (count === 0) {
    await Product.insertMany([
      { name: "Wireless Mouse", price: 599, category: "Electronics" },
      { name: "Coffee Mug", price: 199, category: "Home" },
      { name: "Notebook", price: 99, category: "Stationery" },
      { name: "Backpack", price: 1299, category: "Fashion" },
      { name: "Desk Lamp", price: 799, category: "Home" },
      { name: "Bluetooth Speaker", price: 1499, category: "Electronics" },
    ])
    console.log('Sample products added')
  }
}
seedProducts()

app.get('/api/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.get('/api/cart', (req, res) => {
  res.json({ message: 'Cart route ready' })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})