import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Stethoscope,
  Sparkles,
  Award,
  Zap,
  Sun,
  Scissors,
  Shield,
  Heart,
  Star,
} from 'lucide-react'

export default function ServicesHero() {
  const stats = [
    { icon: Sparkles, value: '25+', label: 'Treatments' },
    { icon: Award, value: '14+', label: 'Years Exp.' },
    { icon: Heart, value: '10K+', label: 'Happy Patients' },
  ]

  // Floating service icons — for right side collage
  const floatingServices = [
    { icon: Sparkles, color: 'from-pink-100 to-pink-200', textColor: 'text-pink-600', delay: 0.4 },
    { icon: Zap, color: 'from-amber-100 to-amber-200', textColor: 'text-amber-600', delay: 0.5 },
    { icon: Sun, color: 'from-orange-100 to-orange-200', textColor: 'text-orange-600', delay: 0.6 },
    { icon: Scissors, color: 'from-blue-100 to-blue-200', textColor: 'text-blue-600', delay: 0.7 },
    { icon: Shield, color: 'from-emerald-100 to-emerald-200', textColor: 'text-emerald-600', delay: 0.8 },
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
          <span className="text-primary font-medium">Services</span>
        </motion.nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ============================================
              LEFT — Content
              ============================================ */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-soft mb-6"
            >
              <Stethoscope className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                Our Services
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {['Complete', 'Care', 'For', 'Your'].map((word, i) => (
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
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-block text-primary"
              >
                Skin, Hair & Nails
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-textSecondary leading-relaxed mb-10 max-w-xl"
            >
              From medical dermatology to advanced aesthetics — evidence-based
              treatments tailored to your unique skin and hair needs.
            </motion.p>

            {/* Stats Cards */}
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
              RIGHT — BIG PNG Image + Floating Icons
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative rings — background */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 anim-rotate-slow" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />

              {/* ============================================
                  CENTER — BIG PNG IMAGE (bigger than circles)
                  ============================================ */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                  className="relative w-[600px] h-[600px] xl:w-[680px] xl:h-[680px]"
                >
                  {/* PNG Image — circles se bahar nikalta hua */}
                  <img
                    src="/servicehero.png"
                    alt="Dermatology Care"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const fallback = e.target.parentElement.querySelector('.img-fallback')
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />

                  {/* Fallback icon — sirf tab dikhega jab image load na ho */}
                  <div className="img-fallback absolute inset-0 hidden items-center justify-center">
                    <Stethoscope className="w-40 h-40 md:w-52 md:h-52 text-primary/40" />
                  </div>
                </motion.div>
              </div>

              {/* Floating service icons — positioned in circle */}
              {floatingServices.map((item, i) => {
                const angle = (360 / floatingServices.length) * i - 90
                const rad = (angle * Math.PI) / 180
                const radius = 195
                const x = Math.cos(rad) * radius
                const y = Math.sin(rad) * radius

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    className="absolute top-1/2 left-1/2 z-40"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="anim-float-medium" style={{ animationDelay: `${i * 0.3}s` }}>
                      <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${item.color} shadow-large border border-white/60 flex items-center justify-center group hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon
                          className={`w-10 h-10 md:w-12 md:h-12 ${item.textColor}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Small floating sparkles */}
              <div className="absolute top-10 right-10 text-primary/40 anim-float-slow z-20">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute bottom-10 left-10 text-primary/30 anim-float-medium z-20" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}