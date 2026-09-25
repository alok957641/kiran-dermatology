import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../../ui/Button'
import ServiceCard from '../../cards/ServiceCard'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useServices } from '../../../hooks/useServices'
import { Stethoscope } from 'lucide-react'

export default function ServicesPreview() {
  const { services, loading } = useServices(true)
  const featured = services.slice(0, 6)

  return (
    <section className="section bg-gradient-to-b from-background to-primary-50/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4"
            >
              Our Specialties
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary text-balance"
            >
              Comprehensive Skin & Hair Treatments
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/services">
              <Button variant="outline" rightIcon={ArrowRight}>
                All Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="Services Coming Soon"
            description="Our services will be listed here shortly."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}