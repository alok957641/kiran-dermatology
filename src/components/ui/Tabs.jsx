import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Tabs({
  tabs = [],
  defaultTab = 0,
  onChange,
  variant = 'pills',
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleChange = (index) => {
    setActiveTab(index)
    onChange?.(index, tabs[index])
  }

  const activeTabData = tabs[activeTab]

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div
        className={cn(
          'flex gap-1 overflow-x-auto no-scrollbar',
          variant === 'pills' &&
            'bg-white p-1.5 rounded-xl border border-borderLight w-fit max-w-full shadow-soft',
          variant === 'underline' && 'border-b border-borderLight gap-0',
          variant === 'buttons' && 'gap-2'
        )}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleChange(i)}
            className={cn(
              'relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all rounded-lg',
              activeTab === i
                ? variant === 'underline'
                  ? 'text-primary'
                  : 'text-white'
                : 'text-textSecondary hover:text-primary hover:bg-primary-50/50',
              variant === 'underline' && 'rounded-none px-5'
            )}
          >
            {activeTab === i && variant === 'pills' && (
              <motion.span
                layoutId="activeTabPill"
                className="absolute inset-0 bg-primary rounded-lg -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}

            {activeTab === i && variant === 'underline' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}

            {activeTab === i && variant === 'buttons' && (
              <motion.span
                layoutId="activeTabButton"
                className="absolute inset-0 bg-primary rounded-lg -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-full">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {activeTabData?.content}
      </motion.div>
    </div>
  )
}