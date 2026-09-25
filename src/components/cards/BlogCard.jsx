import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

export default function BlogCard({ blog, index = 0 }) {
  // Support both Supabase (snake_case) and static (camelCase)
  const coverImage = blog.cover_image || blog.coverImage
  const publishedAt = blog.published_at || blog.publishedAt
  const readTime = blog.read_time || blog.readTime

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link
        to={`/blog/${blog.slug}`}
        className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-borderLight transition-all duration-500 hover:shadow-large hover:-translate-y-1.5"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-br from-primary-100 to-secondary-100">
          {coverImage ? (
            <img
              src={coverImage}
              alt={blog.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-heading text-5xl font-bold text-primary/30">
                {blog.title?.charAt(0) || 'B'}
              </span>
            </div>
          )}

          {/* Category */}
          {blog.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary uppercase tracking-wider">
                {blog.category}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-textMuted mb-3">
            {publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(publishedAt, 'dd MMM yyyy')}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-lg text-secondary leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-textSecondary leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-primary mt-auto">
            <span>Read article</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}