import { motion } from 'framer-motion'

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.92,
  className = '',
  once = true,
  amount = 0.3,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}