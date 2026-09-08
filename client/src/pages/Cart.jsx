import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart } from '../redux/cartSlice'

function Cart() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name} — ₹{item.price}
                <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
              </li>
            ))}
          </ul>
          <p style={{ textAlign: 'center', fontWeight: 700 }}>Total: ₹{total}</p>
          <div style={{ textAlign: 'center' }}>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart