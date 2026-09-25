import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Icons from 'lucide-react'
import { cn } from '../../utils/cn'

// Background images per stat — apne image paths daal
const STAT_IMAGES = {
  Award: '/counter1.png',
  Users: '/happypacence.jpeg',
  Stethoscope: '/counter3.jpg',
  Star: '/counter4.jpg',
}

export default function StatCard({ stat, index = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  const Icon = Icons[stat.icon] || Icons.Award
  const decimals = stat.decimals || 0
  const bgImage = STAT_IMAGES[stat.icon]

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const start = 0
    const end = stat.value
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(start + (end - start) * eased)

      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }

    requestAnimationFrame(animate)
  }, [isInView, stat.value])

  const displayValue =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString('en-IN')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'relative text-center p-6 md:p-8 rounded-2xl overflow-hidden',
        'border border-primary/20 hover:border-primary/50',
        'transition-all duration-500 group hover:-translate-y-1 hover:shadow-large'
      )}
    >
      {/* Background Image */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Fallback gradient if no image */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100" />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/90" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Value */}
        <div className="font-heading font-bold text-4xl md:text-5xl text-secondary mb-2 tabular-nums">
          {displayValue}
          <span className="text-primary">{stat.suffix}</span>
        </div>

        {/* Label */}
        <p className="text-sm text-textSecondary font-medium tracking-wide uppercase">
          {stat.label}
        </p>
      </div>
    </motion.div>
  )
}