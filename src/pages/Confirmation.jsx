import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext.jsx'

const steps = ['Order received', 'Rolling your sushi', 'Out for delivery', 'Delivered']

export default function Confirmation() {
  const { order } = useCart()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= steps.length - 1) return
    const t = setTimeout(() => setStep((s) => s + 1), 2500)
    return () => clearTimeout(t)
  }, [step])

  if (!order) {
    return (
      <div className="page">
        <h1>No order yet</h1>
        <Link to="/" className="cta link-cta">Back home</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Thanks! 🎉</h1>
      <p>Order #{order.number} · ₱{order.total}</p>

      <ol className="tracker">
        {steps.map((s, i) => (
          <li key={s} className={i <= step ? 'done' : ''}>{s}</li>
        ))}
      </ol>

      <Link to="/" className="cta link-cta">Order again</Link>
    </div>
  )
}