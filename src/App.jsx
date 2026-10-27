import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Builder from './pages/Builder'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import { useCart } from './CartContext.jsx'
import './App.css'

export default function App() {
  const { items } = useCart()

  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">🍣 Sushi App</Link>
        <div className="nav-links">
          <Link to="/build">Build</Link>
          <Link to="/cart">Cart ({items.length})</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Builder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  )
}