import { Link, useNavigate } from 'react-router-dom'
import { presets } from '../data/ingredients'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <section className="hero">
        <h1>Sushi, your way.</h1>
        <p>Build your roll, watch it come together, and have it delivered.</p>
        <Link to="/build" className="cta link-cta">Build your own roll</Link>
      </section>

      <h2>Or start from a favorite</h2>
      <div className="preset-grid">
        {presets.map((p) => (
          <button
            key={p.id}
            className="preset-card"
            onClick={() => navigate('/build', { state: { preset: p.items } })}
          >
            <span className="emoji">{p.emoji}</span>
            <strong>{p.name}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}