import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id)
        setProduct(found)
      })
  }, [id])

  if (!product) return <p style={{ textAlign: 'center' }}>Loading...</p>

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <div className="detail-card">
        <h2>{product.name}</h2>
        <p className="detail-price">₹{product.price}</p>
        <p>Category: {product.category}</p>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDetail