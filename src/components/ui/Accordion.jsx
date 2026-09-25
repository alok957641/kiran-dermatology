import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  className = '',
}) {
  return (
    <div
      className={cn(
        'border border-borderLight rounded-2xl overflow-hidden bg-white transition-all',
        isOpen && 'shadow-soft border-primary/30',
        className
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left hover:bg-primary-50/40 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-secondary text-base md:text-lg pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            isOpen ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
          )}
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-textSecondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items = [], allowMultiple = false, className = '' }) {
  const [openIndexes, setOpenIndexes] = useState([])

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndexes.includes(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}