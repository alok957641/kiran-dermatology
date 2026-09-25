import { motion } from 'framer-motion'

export default function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.12,
  className = '',
  once = true,
  amount = 0.2,
  ...props
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Child wrapper for stagger items
export function StaggerItem({
  children,
  y = 30,
  className = '',
  duration = 0.5,
}) {
  const item = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}