import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '../../ui/Button'
import BlogCard from '../../cards/BlogCard'
import { SkeletonCard } from '../../ui/Skeleton'
import EmptyState from '../../ui/EmptyState'
import { useBlogs } from '../../../hooks/useBlogs'

export default function BlogPreview() {
  const { blogs, loading } = useBlogs(true)
  const latestBlogs = blogs
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.publishedAt || 0)
      const dateB = new Date(b.published_at || b.publishedAt || 0)
      return dateB - dateA
    })
    .slice(0, 3)

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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Skin Health Blog
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary text-balance"
            >
              Insights From Our Dermatologist
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/blog">
              <Button variant="outline" rightIcon={ArrowRight}>
                All Articles
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
        ) : latestBlogs.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No Articles Yet"
            description="Blog articles will appear here soon."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}