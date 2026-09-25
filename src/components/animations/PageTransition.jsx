import { motion } from 'framer-motion'

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
}

export default function PageTransition({
  children,
  variant = 'fade',
  duration = 0.4,
}) {
  const v = variants[variant] || variants.fade

  return (
    <motion.div
      variants={v}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}