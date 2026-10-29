import { Link, useNavigate } from 'react-router-dom'
import { useCart, DELIVERY_FEE } from '../CartContext.jsx'

export default function Cart() {
  const { items, removeItem, subtotal } = useCart()
  const navigate = useNavigate()
  const total = subtotal + DELIVERY_FEE

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your cart</h1>
        <p>Nothing here yet.</p>
        <Link to="/build" className="cta link-cta">Build a roll</Link>
      </div>
    )
  }

  const checkout = () => navigate('/pay')

  return (
    <div className="page">
      <h1>Your cart</h1>
      {items.map((item) => (
        <div key={item.uid} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <small>{item.details}</small>
          </div>
          <div className="cart-right">
            <span>₱{item.price}</span>
            <button className="remove" onClick={() => removeItem(item.uid)}>✕</button>
          </div>
        </div>
      ))}

      <div className="summary">
        <div><span>Subtotal</span><span>₱{subtotal}</span></div>
        <div><span>Delivery</span><span>₱{DELIVERY_FEE}</span></div>
        <div className="grand"><span>Total</span><strong>₱{total}</strong></div>
      </div>
      <button className="cta" onClick={checkout}>Place order</button>
    </div>
  )
}