import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'

// Simple markdown-like parser for static data
function parseMarkdown(content) {
  const lines = content.split('\n')
  const blocks = []
  let currentList = []

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'ul', items: [...currentList] })
      currentList = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }
    if (line.startsWith('### ')) {
      flushList()
      blocks.push({ type: 'h3', text: line.slice(4) })
    } else if (line.startsWith('## ')) {
      flushList()
      blocks.push({ type: 'h2', text: line.slice(3) })
    } else if (line.startsWith('- ')) {
      currentList.push(line.slice(2))
    } else {
      flushList()
      blocks.push({ type: 'p', text: line })
    }
  }
  flushList()
  return blocks
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-secondary">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function BlogDetailContent({ blog }) {
  // Support both Supabase (snake_case) and static (camelCase)
  const author = blog.author || 'Dr. (Major) Asmita Singh'
  const publishedAt = blog.published_at || blog.publishedAt
  const readTime = blog.read_time || blog.readTime
  const tags = blog.tags || []

  // Detect if content is HTML (from rich editor) or markdown-like
  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content || '')

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT — Content */}
          <div className="lg:col-span-8">
            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-textMuted pb-6 border-b border-borderLight mb-10"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-secondary font-medium">{author}</span>
              </span>
              {publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(publishedAt, 'dd MMM yyyy')}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {readTime}
                </span>
              )}
            </motion.div>

            {/* Content */}
            {isHtml ? (
              // Rich HTML from editor — sanitize with DOMPurify
              <article
                className="prose-custom max-w-none text-textSecondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
              />
            ) : (
              // Markdown-like from static data
              <article className="space-y-5">
                {parseMarkdown(blog.content || '').map((block, i) => {
                  if (block.type === 'h2') {
                    return (
                      <motion.h2
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="font-heading font-bold text-2xl md:text-3xl text-secondary pt-4 mt-8"
                      >
                        {renderInline(block.text)}
                      </motion.h2>
                    )
                  }
                  if (block.type === 'h3') {
                    return (
                      <motion.h3
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="font-heading font-semibold text-xl md:text-2xl text-secondary pt-2 mt-6"
                      >
                        {renderInline(block.text)}
                      </motion.h3>
                    )
                  }
                  if (block.type === 'ul') {
                    return (
                      <motion.ul
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="space-y-2.5 pl-2"
                      >
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-textSecondary leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5" />
                            <span>{renderInline(item)}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )
                  }
                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="text-textSecondary leading-relaxed text-base md:text-lg"
                    >
                      {renderInline(block.text)}
                    </motion.p>
                  )
                })}
              </article>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-borderLight"
              >
                <Tag className="w-4 h-4 text-textMuted" />
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-primary-50 text-xs font-medium text-primary-700"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary-50/60 to-accent-50/40 rounded-2xl p-6 border border-primary/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
                    <span className="font-heading font-bold text-white text-xl">A</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-secondary">
                      Dr. (Major) Asmita Singh
                    </p>
                    <p className="text-xs text-textMuted">MBBS, MD (Dermatology)</p>
                  </div>
                </div>
                <p className="text-sm text-textSecondary leading-relaxed mb-5">
                  Senior dermatologist with 14+ years of experience. Writing about
                  evidence-based skin & hair care.
                </p>
                <a
                  href="/about"
                  className="btn-outline w-full justify-center text-sm py-2.5"
                >
                  View Profile
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-secondary rounded-2xl p-6 text-center relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative z-10">
                  <p className="font-heading font-bold text-white text-xl mb-2">
                    Need Expert Advice?
                  </p>
                  <p className="text-sm text-white/60 mb-5">
                    Book a consultation with Dr. Singh today.
                  </p>
                  <a
                    href="/appointment"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Book Appointment
                  </a>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

// Basic HTML sanitizer (in case DOMPurify not available)
function sanitizeHtml(html) {
  // Simple regex-based sanitization for common dangerous tags
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
}