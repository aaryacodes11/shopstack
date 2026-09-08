import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/cartSlice'

function Home() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('All')
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filteredProducts =
    category === 'All' ? products : products.filter((p) => p.category === category)

  return (
    <div>
      <h1>ShopStack</h1>
      <p>Discover our products</p>

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? 'filter-btn active' : 'filter-btn'}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`} className="card-link">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.category}</p>
            </Link>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home