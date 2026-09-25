import { motion } from 'framer-motion'

const directions = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
}

export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.7,
  distance,
  className = '',
  once = true,
  amount = 0.3,
  ...props
}) {
  const base = directions[direction] || directions.left
  const initial = distance
    ? { x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0 }
    : base

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}