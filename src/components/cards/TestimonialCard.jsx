import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full bg-white rounded-2xl p-6 md:p-7 border border-borderLight shadow-soft hover:shadow-large hover:-translate-y-1 transition-all duration-500 relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
        <Quote className="w-5 h-5 text-primary" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < testimonial.rating
                ? 'w-4 h-4 fill-accent text-accent'
                : 'w-4 h-4 text-borderLight'
            }
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-textSecondary leading-relaxed mb-6 line-clamp-5">
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-borderLight">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
          <span className="font-heading font-bold text-white text-base">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-secondary text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-textMuted truncate">
            {testimonial.city}
            {testimonial.service && ` · ${testimonial.service}`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}