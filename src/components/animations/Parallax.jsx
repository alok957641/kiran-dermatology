import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Parallax({
  children,
  speed = 0.5,
  className = '',
  offset = ['start end', 'end start'],
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

export function ParallaxImage({ src, alt = '', speed = 0.3, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}