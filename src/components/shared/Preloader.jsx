import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SITE_INFO } from '../../utils/constants'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      {/* Animated Logo/Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
          Kiran
        </h1>
        <p className="font-heading text-xl md:text-2xl text-secondary tracking-widest uppercase">
          Dermatology
        </p>

        <p className="text-textMuted text-sm mt-3 font-medium">
          {SITE_INFO.tagline}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-12 w-64 md:w-80">
        <div className="h-1 bg-primary-50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
        <p className="text-center text-xs text-textMuted mt-3 font-medium">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-10 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </motion.div>
  )
}