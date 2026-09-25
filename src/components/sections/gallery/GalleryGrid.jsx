import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Images } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useGallery } from '../../../hooks/useGallery'

const galleryCategories = [
  { label: 'All', value: 'all' },
  { label: 'Acne', value: 'Acne' },
  { label: 'Hair', value: 'Hair' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
  { label: 'Vitiligo', value: 'Vitiligo' },
]

export default function GalleryGrid() {
  const { gallery, loading } = useGallery()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory)

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'text-white'
                  : 'text-textSecondary hover:text-primary hover:bg-primary-50 border border-borderLight'
              }`}
            >
              {activeCategory === cat.value && (
                <motion.span
                  layoutId="gallery-cat-active"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredItems.map((item, i) => (
                  <BeforeAfterSlider key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon={Images}
                title="No results found"
                description="Try a different category."
              />
            )}
          </AnimatePresence>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs text-textMuted mt-12 max-w-2xl mx-auto"
        >
          * All images are shared with patient consent. Results may vary from person to person.
        </motion.p>
      </div>
    </section>
  )
}