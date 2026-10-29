import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useCart, DELIVERY_FEE } from '../CartContext'

export default function Pay() {
  const { items, subtotal, placeOrder } = useCart()
  const navigate = useNavigate()
  const [secs, setSecs] = useState(300)
  const [ref] = useState(() => Math.floor(100000 + Math.random() * 900000))
  const total = subtotal + DELIVERY_FEE

  useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Nothing to pay for</h1>
        <Link to="/build" className="cta link-cta">Build a roll</Link>
      </div>
    )
  }

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  const paid = () => {
    placeOrder(total)
    navigate('/confirmation')
  }

  return (
    <div className="page pay">
      <h1>Pay with QR</h1>
      <p>Scan with GCash, Maya, or your bank app.</p>

      <div className="qr-card">
        <QRCodeSVG
          value={`SUSHAE-BOX-DEMO|REF=${ref}|AMOUNT=${total}`}
          size={220}
          marginSize={2}
        />
        <strong className="qr-amount">₱{total}</strong>
        <small>Ref #{ref}</small>
        <small>{secs > 0 ? `Code expires in ${mm}:${ss}` : 'Code expired'}</small>
      </div>

      <button className="cta" onClick={paid} disabled={secs <= 0}>
        Simulate payment received
      </button>
      <p className="demo-note">Demo only: no real payment is made.</p>
    </div>
  )
}