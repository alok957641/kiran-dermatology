import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react'
import TestimonialCard from '../../cards/TestimonialCard'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useTestimonials } from '../../../hooks/useTestimonials'

export default function Testimonials() {
  const scrollRef = useRef(null)
  const { testimonials, loading } = useTestimonials(true)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = 380
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-primary-50/60 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              Patient Stories
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary text-balance"
            >
              What Our Patients Say
            </motion.h2>
          </div>

          {!loading && testimonials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-borderLight flex items-center justify-center text-textSecondary hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-borderLight flex items-center justify-center text-textSecondary hover:bg-primary hover:text-white hover:border-primary transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Slider */}
        {loading ? (
          <div className="flex gap-5 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[360px]">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <EmptyState
            icon={MessageSquareQuote}
            title="No Reviews Yet"
            description="Patient reviews will appear here soon."
          />
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className="min-w-[320px] md:min-w-[360px] max-w-[360px] flex-shrink-0"
              >
                <TestimonialCard testimonial={testimonial} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}