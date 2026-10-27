import { useState } from 'react'
import RollPreview from '../components/RollPreview'
import { ingredients, BASE_PRICE } from '../data/ingredients'
import './Builder.css'

export default function Builder() {
  const [selected, setSelected] = useState(['cheese', 'salmon', 'avocado', 'cucumber'])

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const chosen = ingredients.filter((i) => selected.includes(i.id))
  const total = BASE_PRICE + chosen.reduce((sum, i) => sum + i.price, 0)
  const allergens = [...new Set(chosen.flatMap((i) => i.allergens))]

  return (
    <div className="builder">
      <h1>Build your roll</h1>

      <div className="builder-body">
        <div className="preview">
          <RollPreview selected={selected} />
        </div>

        <div className="controls">
          <div className="chips">
            {ingredients.map((i) => (
              <button
                key={i.id}
                className={selected.includes(i.id) ? 'chip on' : 'chip'}
                onClick={() => toggle(i.id)}
              >
                <span className="dot" style={{ background: i.color }} />
                {i.name} <small>+₱{i.price}</small>
              </button>
            ))}
          </div>

          {allergens.length > 0 && (
            <p className="allergens">⚠️ Contains: {allergens.join(', ')}</p>
          )}

          <div className="total">
            <span>Total</span>
            <strong>₱{total}</strong>
          </div>
          <button className="cta">Add to cart</button>
        </div>
      </div>
    </div>
  )
}