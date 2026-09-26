import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'

export default function ServiceCard({ service, index = 0 }) {
  const Icon = Icons[service.icon] || Icons.Sparkles
  const shortDesc = service.short_description || service.shortDescription

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative flex flex-col h-full bg-white rounded-3xl border border-borderLight overflow-hidden transition-all duration-500 hover:shadow-large hover:-translate-y-2 hover:border-primary/30"
      >
        {/* ============================================
            IMAGE SECTION — Full Width
            ============================================ */}
        <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200">
          {/* Image */}
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => (e.target.style.opacity = 0)}
            />
          ) : (
            /* Fallback — Big Icon in Center */
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                className="w-24 h-24 text-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                strokeWidth={1.5}
              />
            </div>
          )}

          {/* Gradient overlay — for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Top-left — Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-secondary uppercase tracking-wider shadow-md">
              <Sparkles className="w-3 h-3 text-primary" />
              Treatment
            </span>
          </div>

          {/* Top-right — Floating Icon Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-large flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
              <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
          </div>

          {/* Bottom-left — Arrow button on hover */}
          <div className="absolute bottom-4 left-4 z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold shadow-glow">
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* ============================================
            CONTENT SECTION
            ============================================ */}
        <div className="relative flex flex-col flex-1 p-6">
          {/* Title */}
          <h3 className="font-heading font-bold text-lg md:text-xl text-secondary leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-textSecondary leading-relaxed line-clamp-2 mb-5 flex-1">
            {shortDesc}
          </p>

          {/* Bottom row — divider + Learn more */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-borderLight">
            <span className="text-xs font-semibold text-textMuted uppercase tracking-widest">
              Learn More
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-50 group-hover:bg-primary flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* Subtle green accent — bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Link>
    </motion.div>
  )
}