import { motion } from 'framer-motion'

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.3,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}