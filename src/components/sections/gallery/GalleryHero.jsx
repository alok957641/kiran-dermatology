import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Images,
  Sparkles,
  Camera,
  Star,
  Heart,
  ShieldCheck,
} from 'lucide-react'

export default function GalleryHero() {
  const stats = [
    { icon: Camera, value: '100%', label: 'Real Patients' },
    { icon: ShieldCheck, value: 'Consent', label: 'Approved' },
    { icon: Sparkles, value: '25+', label: 'Treatments' },
  ]

  // 2 Images — Before & After
  const beforeImage = '/before.jpg'
  const afterImage = '/after.jpg'

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
          <span className="text-primary font-medium">Gallery</span>
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
              <Images className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                Before & After
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {['Real', 'Results', 'From'].map((word, i) => (
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
                Real Patients
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              Witness the transformations we've achieved — real patients, real
              results, achieved with safe, evidence-based treatments.
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
                  <p className="font-heading font-bold text-secondary text-xl md:text-2xl leading-none mb-1">
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
            >
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                Book Consultation
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — 2 Photo Collage
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
                    PHOTO 1 — BEFORE (back, tilted left)
                    ============================================ */}
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="absolute top-4 left-0 w-[58%] aspect-[4/5] rounded-3xl overflow-hidden shadow-large border-4 border-white"
                  style={{ transform: 'rotate(-8deg)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <img
                    src={beforeImage}
                    alt="Before"
                    className="relative w-full h-full object-cover"
                    onError={(e) => (e.target.style.opacity = 0)}
                  />
                  {/* Before Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-secondary uppercase tracking-widest shadow-md">
                    Before
                  </span>
                </motion.div>

                {/* ============================================
                    PHOTO 2 — AFTER (front, tilted right)
                    ============================================ */}
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="absolute top-8 right-0 w-[58%] aspect-[4/5] rounded-3xl overflow-hidden shadow-large border-4 border-white z-20"
                  style={{ transform: 'rotate(8deg)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300" />
                  <img
                    src={afterImage}
                    alt="After"
                    className="relative w-full h-full object-cover"
                    onError={(e) => (e.target.style.opacity = 0)}
                  />

                  {/* Glow ring */}
                  <div className="absolute inset-0 ring-4 ring-primary/25 rounded-3xl pointer-events-none" />

                  {/* After Badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                    After
                  </span>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-secondary/40 to-transparent" />

                  {/* Bottom text */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
                      ✨ Real Results
                    </p>
                  </div>
                </motion.div>

                {/* Center Connector — Plus Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.75, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-large border-2 border-primary/20 flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
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

                {/* Floating card — Patients (bottom left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.05, type: 'spring' }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight z-30 anim-float-medium"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 fill-primary text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-sm leading-none">
                        10K+
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Patients
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative dashed ring */}
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow pointer-events-none" />

                {/* Soft green glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}