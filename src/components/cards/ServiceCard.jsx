import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'

export default function ServiceCard({ service, index = 0 }) {
  const Icon = Icons[service.icon] || Icons.Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block h-full bg-white rounded-2xl border border-borderLight p-6 md:p-7 transition-all duration-500 hover:shadow-large hover:-translate-y-1.5 hover:border-primary/30 relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/40 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

        <div className="relative z-10">
          {/* Icon / Image */}
          {service.image ? (
            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 shrink-0">
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary-600 transition-all duration-500">
              <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
          )}

          {/* Content */}
          <h3 className="font-heading font-semibold text-lg md:text-xl text-secondary mb-3 leading-snug pr-6">
            {service.name}
          </h3>
          <p className="text-sm text-textSecondary leading-relaxed mb-5 line-clamp-3">
            {service.short_description || service.shortDescription}
          </p>

          {/* Link */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span>Learn more</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Corner */}
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </div>
      </Link>
    </motion.div>
  )
}