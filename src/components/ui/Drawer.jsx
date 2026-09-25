import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

const positions = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  bottom: 'bottom-0 left-0 right-0 w-full',
}

const sizes = {
  sm: 'w-80 max-w-full',
  md: 'w-96 max-w-full',
  lg: 'w-[500px] max-w-full',
  full: 'w-full',
}

const slideVariants = {
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  className = '',
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const isBottom = position === 'bottom'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-secondary/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={slideVariants[position].initial}
            animate={slideVariants[position].animate}
            exit={slideVariants[position].exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'absolute bg-white shadow-large flex flex-col',
              positions[position],
              !isBottom && sizes[size],
              isBottom && 'rounded-t-3xl',
              className
            )}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-borderLight">
              {title && (
                <h3 className="text-lg font-heading font-semibold text-secondary">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-textMuted hover:bg-gray-100 hover:text-textPrimary transition-colors ml-auto"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}