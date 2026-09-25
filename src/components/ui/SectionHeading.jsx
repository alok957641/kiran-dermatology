import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false,
}) {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex flex-col max-w-3xl',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto',
        alignClasses[align],
        className
      )}
    >
      {label && (
        <span
          className={cn(
            'inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4',
            light
              ? 'bg-white/10 text-accent border border-white/20'
              : 'bg-primary-50 text-primary-700'
          )}
        >
          {label}
        </span>
      )}

      {title && (
        <h2
          className={cn(
            'font-heading font-semibold text-display-sm md:text-display-md mb-4 text-balance',
            light ? 'text-white' : 'text-secondary'
          )}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={cn(
            'text-base md:text-lg leading-relaxed',
            light ? 'text-white/70' : 'text-textSecondary'
          )}
        >
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          'w-16 h-1 rounded-full mt-6 bg-gradient-to-r from-primary to-accent',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto'
        )}
      />
    </motion.div>
  )
}