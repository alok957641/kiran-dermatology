import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen } from 'lucide-react'
import BlogCard from '../../cards/BlogCard'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useBlogs } from '../../../hooks/useBlogs'

const blogCategories = [
  { label: 'All', value: 'all' },
  { label: 'Skincare', value: 'Skincare' },
  { label: 'Hair Care', value: 'Hair Care' },
  { label: 'Acne', value: 'Acne' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
]

export default function BlogGrid() {
  const { blogs, loading } = useBlogs(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesCat =
        activeCategory === 'all' || blog.category === activeCategory
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        blog.title?.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.category?.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.publishedAt || 0)
      const dateB = new Date(b.published_at || b.publishedAt || 0)
      return dateB - dateA
    })

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'text-white'
                    : 'text-textSecondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                {activeCategory === cat.value && (
                  <motion.span
                    layoutId="blog-cat-active"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-background border border-borderLight text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-textSecondary" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-sm text-textMuted">
              Showing{' '}
              <span className="font-semibold text-secondary">
                {filteredBlogs.length}
              </span>{' '}
              {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredBlogs.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredBlogs.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No articles found"
                description="Try a different search or category."
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}