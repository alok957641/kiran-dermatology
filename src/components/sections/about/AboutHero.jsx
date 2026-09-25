import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Award,
  GraduationCap,
  Stethoscope,
  Sparkles,
  Star,
  Heart,
} from 'lucide-react'
import doctor from '../../../data/doctor'

export default function AboutHero() {
  const stats = [
    { icon: Award, value: '14+', label: 'Years Experience' },
    { icon: GraduationCap, value: 'Gold', label: 'Medalist MD' },
    { icon: Stethoscope, value: '10K+', label: 'Patients Treated' },
  ]

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-primary-50/60 via-background to-background">
      {/* Soft green blobs */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Decorative leaf pattern — top right */}
      <div className="absolute top-24 right-10 w-40 h-40 opacity-10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <path
            fill="currentColor"
            d="M100 10 C60 40, 20 80, 40 130 C60 180, 120 180, 140 130 C160 80, 120 40, 100 10 Z"
          />
        </svg>
      </div>

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
          <span className="text-primary font-medium">About</span>
        </motion.nav>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ============================================
              LEFT — Content
              ============================================ */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-soft mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                About Kiran Dermatology
              </span>
            </motion.div>

            {/* Heading — Word reveal */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {['Meet', 'the', 'doctor', 'behind'].map((word, i) => (
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
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block text-primary"
              >
                the vision.
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              A senior dermatologist's journey of healing skin, restoring
              confidence, and redefining dermatology care in Patna.
            </motion.p>

            {/* Stats Row — Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-3 md:gap-4 mb-8 max-w-lg"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-4 border border-borderLight hover:border-primary/30 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                    <stat.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="font-heading font-bold text-secondary text-lg leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-textMuted font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Small quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex items-start gap-3 max-w-lg"
            >
              <div className="w-1 h-12 rounded-full bg-primary/30 shrink-0" />
              <p className="font-heading italic text-textSecondary text-sm leading-relaxed">
                "Every patient is unique, and so is their skin."
              </p>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — Doctor Image with Floating Elements
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative max-w-md mx-auto">
              {/* Decorative dashed ring */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />

              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-large">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                <img
                  src={doctor.abouheroimg || doctor.image}
                  alt={doctor.name}
                  className="relative w-full h-full object-cover object-top"
                  onError={(e) => (e.target.style.opacity = 0)}
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>

              {/* Floating Card 1 — Top left (Rating) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute top-8 -left-4 md:-left-6 bg-white rounded-2xl p-3.5 shadow-large border border-borderLight anim-float-slow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-secondary text-base leading-none">
                      4.9
                    </p>
                    <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                      Rating
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 — Bottom right (Achievement) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-2xl p-3.5 shadow-large border border-borderLight anim-float-medium"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-secondary text-sm leading-none">
                      Gold Medalist
                    </p>
                    <p className="text-[10px] text-textMuted font-medium mt-0.5">
                      MD Dermatology
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating heart badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-1/3 -right-3 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow"
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}