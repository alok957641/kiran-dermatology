import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Clock,
  Calendar,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import * as Icons from 'lucide-react'

export default function ServiceDetailHero({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles
  const topConditions = (service.conditions || []).slice(0, 3)

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
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 text-textMuted hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-textMuted/60" />
          <Link
            to="/services"
            className="text-textMuted hover:text-primary transition-colors"
          >
            Services
          </Link>
          <ChevronRight className="w-4 h-4 text-textMuted/60" />
          <span className="text-primary font-medium truncate max-w-[200px]">
            {service.name}
          </span>
        </motion.nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ============================================
              LEFT — Content
              ============================================ */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-soft mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-primary-700 tracking-widest uppercase">
                Expert Treatment
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-5 text-balance"
            >
              {service.name}
            </motion.h1>

            {/* Short description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              {service.shortDescription}
            </motion.p>

            {/* Info Cards — Duration & Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 mb-8 max-w-md"
            >
              {service.duration && (
                <div className="group bg-white rounded-2xl p-4 border border-borderLight hover:border-primary/30 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                    <Clock className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-textMuted uppercase tracking-wider font-semibold mb-1">
                    Duration
                  </p>
                  <p className="text-sm text-secondary font-bold leading-tight">
                    {service.duration}
                  </p>
                </div>
              )}
              {service.sessions && (
                <div className="group bg-white rounded-2xl p-4 border border-borderLight hover:border-primary/30 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                    <Calendar className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-textMuted uppercase tracking-wider font-semibold mb-1">
                    Sessions
                  </p>
                  <p className="text-sm text-secondary font-bold leading-tight">
                    {service.sessions}
                  </p>
                </div>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-borderLight text-secondary hover:border-primary hover:text-primary font-medium transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                All Services
              </Link>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — Visual Card with Service Image
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative max-w-md mx-auto">
              {/* Decorative dashed ring */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow pointer-events-none" />

              {/* Soft green blur */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

              {/* Main image card */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-large">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url(${service.image || '/images/services/default.jpg'})`,
                    backgroundColor: '#75BE84',
                  }}
                />

                {/* Fallback gradient */}
                {!service.image && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200" />
                )}

                {/* If no image, big icon */}
                {!service.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      className="w-40 h-40 md:w-56 md:h-56 text-primary/20"
                      strokeWidth={1}
                    />
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />

                {/* Bottom info plate */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-large border border-white/40">
                    <p className="text-[10px] font-semibold text-primary-700 uppercase tracking-widest mb-1.5">
                      Treatment Focus
                    </p>
                    <p className="font-heading font-bold text-secondary text-base leading-tight">
                      {topConditions[0] || 'Expert Dermatology Care'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card — Conditions count */}
              {topConditions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute top-8 -left-4 md:-left-6 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-slow max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
                      We Treat
                    </p>
                  </div>
                  <p className="font-heading font-bold text-secondary text-lg leading-tight">
                    {topConditions.length}+
                  </p>
                  <p className="text-[10px] text-textMuted font-medium mt-0.5">
                    Conditions
                  </p>
                </motion.div>
              )}

              {/* Floating card — Rating */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-medium"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-amber-500 text-lg">
                      ★
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-secondary text-base leading-none">
                      4.9
                    </p>
                    <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider mt-1">
                      Rated
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ============================================
            BOTTOM — Quick highlights strip
            ============================================ */}
        {topConditions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-3"
          >
            {topConditions.map((condition, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-soft hover:border-primary/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-medium text-secondary">
                  {condition}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}