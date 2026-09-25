import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function TextReveal({
  text = '',
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
  amount = 0.3,
}) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 40, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn('inline-block', className)}
      style={{ perspective: 1000 }}
    >
      <Tag className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.1em' }}
          >
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </Tag>
    </motion.span>
  )
}