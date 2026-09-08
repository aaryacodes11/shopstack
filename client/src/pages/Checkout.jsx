import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Checkout() {
  const cart = useSelector((state) => state.cart)
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>Order Confirmed 🎉</h2>
        <p>Thank you for your purchase!</p>
        <p style={{ fontWeight: 700 }}>Total paid: ₹{total}</p>
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Checkout