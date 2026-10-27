import { motion, AnimatePresence } from 'framer-motion'
import { ingredients } from '../data/ingredients'

const sesameDots = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return [100 + 70 * Math.cos(a), 100 + 70 * Math.sin(a)]
})

const pop = {
  initial: { scale: 0, opacity: 0, y: -30 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 18 },
  style: { transformBox: 'fill-box', transformOrigin: 'center' },
}

export default function RollPreview({ selected }) {
  const active = ingredients.filter((i) => selected.includes(i.id))

  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: 360 }}>
      <circle cx="100" cy="100" r="92" fill="var(--nori)" />
      <circle cx="100" cy="100" r="80" fill="var(--rice)" />

      <AnimatePresence>
        {active.map((item) =>
          item.type === 'topping' ? (
            <motion.g key={item.id} {...pop}>
              {sesameDots.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill={item.color} />
              ))}
            </motion.g>
          ) : (
            <motion.circle
              key={item.id}
              cx={item.pos[0]}
              cy={item.pos[1]}
              r="14"
              fill={item.color}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
              {...pop}
            />
          )
        )}
      </AnimatePresence>
    </svg>
  )
}