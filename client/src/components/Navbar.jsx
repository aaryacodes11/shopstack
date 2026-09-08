import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const cart = useSelector((state) => state.cart)

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ShopStack</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </div>
    </nav>
  )
}

export default Navbar   