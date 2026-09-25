import { motion } from 'framer-motion'

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  className = '',
  once = true,
  amount = 0.3,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}