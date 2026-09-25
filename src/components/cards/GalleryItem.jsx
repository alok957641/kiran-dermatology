import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function GalleryItem({ item, index = 0 }) {
  // Support both Supabase (snake_case) and static (camelCase)
  const beforeImage = item.before_image || item.before
  const afterImage = item.after_image || item.after

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden border border-borderLight shadow-soft hover:shadow-large transition-all duration-500"
    >
      {/* Before / After Split */}
      <div className="grid grid-cols-2 aspect-[4/3] relative">
        {/* Before */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt={`${item.title} before`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
              BEFORE
            </div>
          )}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-secondary/90 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
            Before
          </span>
        </div>

        {/* After */}
        <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
          {afterImage ? (
            <img
              src={afterImage}
              alt={`${item.title} after`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary">
              AFTER
            </div>
          )}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
            After
          </span>
        </div>

        {/* Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white shadow-md z-10" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-semibold text-secondary text-base leading-snug">
            {item.title}
          </h3>
          {item.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-[10px] font-semibold text-primary-700 uppercase tracking-wide shrink-0">
              <Sparkles className="w-3 h-3" />
              {item.category}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-textSecondary mb-1.5">{item.description}</p>
        )}
        {item.sessions && (
          <p className="text-xs text-textMuted font-medium">{item.sessions}</p>
        )}
      </div>
    </motion.div>
  )
}