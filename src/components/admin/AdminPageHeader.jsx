import { motion } from 'framer-motion'

export default function AdminPageHeader({
  title,
  description,
  action,
  count,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${className}`}
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-slate-800">
            {title}
          </h1>
          {typeof count === 'number' && (
            <span className="px-2.5 py-1 rounded-full bg-primary-50 text-xs font-bold text-primary-700">
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  )
}