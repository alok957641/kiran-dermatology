import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../../ui/Button'
import GalleryItem from '../../cards/GalleryItem'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useGallery } from '../../../hooks/useGallery'

export default function GalleryPreview() {
  const { gallery, loading } = useGallery()
  const previewItems = gallery.slice(0, 3)

  return (
    <section className="section bg-gradient-to-b from-primary-50/30 to-background relative overflow-hidden">
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
              <Sparkles className="w-3.5 h-3.5" />
              Real Results
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary text-balance"
            >
              Before & After Transformations
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-textSecondary text-lg mt-4"
            >
              Real patients, real results — achieved with safe, evidence-based treatments.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/gallery">
              <Button variant="outline" rightIcon={ArrowRight}>
                View Full Gallery
              </Button>
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
        ) : previewItems.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Gallery Coming Soon"
            description="Before/after transformations will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewItems.map((item, i) => (
              <GalleryItem key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-textMuted mt-8 max-w-2xl mx-auto"
        >
          * Results may vary from person to person. All images shared with patient consent.
        </motion.p>
      </div>
    </section>
  )
}