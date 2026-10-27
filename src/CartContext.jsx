import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [order, setOrder] = useState(null)

  const addItem = (item) =>
    setItems((prev) => [...prev, { ...item, uid: Date.now() + Math.random() }])
  const removeItem = (uid) =>
    setItems((prev) => prev.filter((i) => i.uid !== uid))
  const placeOrder = (total) => {
    setOrder({ items, total, number: Math.floor(1000 + Math.random() * 9000) })
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <CartContext.Provider value={{ items, order, addItem, removeItem, placeOrder, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)