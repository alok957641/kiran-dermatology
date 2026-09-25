import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  BookOpen,
  Sparkles,
  PenTool,
  Star,
  Heart,
  Clock,
  Calendar,
  TrendingUp,
} from 'lucide-react'

export default function BlogHero() {
  const stats = [
    { icon: PenTool, value: 'Expert', label: 'Written' },
    { icon: Sparkles, value: 'Evidence', label: 'Based' },
    { icon: Clock, value: '5 min', label: 'Read Time' },
  ]

  // Stacked blog posts — 2 cards
  const blogCards = [
    {
      title: 'How to Build a Simple Skincare Routine',
      category: 'Skincare',
      date: '15 Aug 2026',
      readTime: '5 min',
      image: '/skincare.jpg',
      rotate: -6,
      delay: 0.4,
    },
    {
      title: '7 Acne Myths Busted by a Dermatologist',
      category: 'Acne',
      date: '20 Sep 2026',
      readTime: '4 min',
      image: '/Acne.jpg',
      rotate: 6,
      delay: 0.55,
    },
  ]

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-primary-50/60 via-background to-background">
      {/* Soft green blobs */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-8"
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 text-textMuted hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-textMuted/60" />
          <span className="text-primary font-medium">Blog</span>
        </motion.nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ============================================
              LEFT — Content
              ============================================ */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-soft mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                Skin Health Blog
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {['Insights', 'From', 'Our'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className="inline-block mr-2.5"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.44 }}
                className="inline-block text-primary"
              >
                Dermatologist
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              Expert advice, treatment guides, and myth-busting on skin, hair,
              and everything dermatology — straight from Dr. Asmita Singh.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-3 max-w-lg mb-8"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-4 border border-borderLight hover:border-primary/40 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                    <stat.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="font-heading font-bold text-secondary text-base md:text-lg leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-textMuted font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#latest-posts"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                Read Articles
                <ChevronRight className="w-4 h-4" />
              </a>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-borderLight text-secondary hover:border-primary hover:text-primary font-medium transition-all duration-300"
              >
                Book Consultation
              </Link>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — Stacked Blog Card Collage
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
              <div className="relative aspect-square">
                {/* ============================================
                    BLOG CARD 1 (back left, tilted)
                    ============================================ */}
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: blogCards[0].delay }}
                  className="absolute top-8 left-0 w-[60%] bg-white rounded-3xl overflow-hidden shadow-large border border-borderLight"
                  style={{ transform: `rotate(${blogCards[0].rotate}deg)` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300" />
                    <img
                      src={blogCards[0].image}
                      alt={blogCards[0].title}
                      className="relative w-full h-full object-cover"
                      onError={(e) => (e.target.style.opacity = 0)}
                    />
                    {/* Category */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-primary uppercase tracking-widest">
                      {blogCards[0].category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="font-heading font-bold text-secondary text-sm leading-snug mb-2 line-clamp-2">
                      {blogCards[0].title}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-textMuted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blogCards[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blogCards[0].readTime}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ============================================
                    BLOG CARD 2 (front right, tilted other way)
                    ============================================ */}
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: blogCards[1].delay }}
                  className="absolute bottom-4 right-0 w-[60%] bg-white rounded-3xl overflow-hidden shadow-large border border-borderLight z-20"
                  style={{ transform: `rotate(${blogCards[1].rotate}deg)` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400" />
                    <img
                      src={blogCards[1].image}
                      alt={blogCards[1].title}
                      className="relative w-full h-full object-cover"
                      onError={(e) => (e.target.style.opacity = 0)}
                    />
                    {/* Category */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                      {blogCards[1].category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="font-heading font-bold text-secondary text-sm leading-snug mb-2 line-clamp-2">
                      {blogCards[1].title}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-textMuted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blogCards[1].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blogCards[1].readTime}
                      </span>
                    </div>
                  </div>

                  {/* Glow ring */}
                  <div className="absolute inset-0 ring-4 ring-primary/15 rounded-3xl pointer-events-none" />
                </motion.div>

                {/* Center decorative icon — Book */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.75, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-2xl bg-white shadow-large border-2 border-primary/20 flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                {/* Floating card — Rating (top right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, type: 'spring' }}
                  className="absolute -top-2 -right-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight z-30 anim-float-slow"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-sm leading-none">
                        4.9
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Rating
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card — Weekly (bottom left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.05, type: 'spring' }}
                  className="absolute bottom-0 -left-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight z-30 anim-float-medium"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-sm leading-none">
                        Weekly
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        New Posts
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative dashed ring */}
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow pointer-events-none" />

                {/* Soft green glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none -z-10" />

                {/* Small sparkles */}
                <div className="absolute top-16 right-4 text-primary/40 anim-float-slow z-20">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div
                  className="absolute bottom-20 left-0 text-primary/30 anim-float-medium z-20"
                  style={{ animationDelay: '1.2s' }}
                >
                  <Sparkles className="w-7 h-7" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}