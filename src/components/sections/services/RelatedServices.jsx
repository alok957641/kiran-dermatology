import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Stethoscope } from 'lucide-react'
import ServiceCard from '../../cards/ServiceCard'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useServices } from '../../../hooks/useServices'

export default function RelatedServices({ currentService }) {
  const { services, loading } = useServices(false)

  // Filter out current service, take 3 others
  const related = services
    .filter((s) => s.id !== currentService.id && s.slug !== currentService.slug)
    .slice(0, 3)

  // Hide section if no related services AND not loading
  if (!loading && related.length === 0) return null

  return (
    <section className="section bg-gradient-to-b from-primary-50/30 to-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4"
            >
              Explore More
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm text-secondary text-balance"
            >
              Other Services You May Need
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/services" className="btn-outline">
              All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : related.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="No related services"
            description="Check out all our services on the services page."
            action={
              <Link to="/services" className="btn-primary">
                View All Services
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}