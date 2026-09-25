import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  Star,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { CONTACT_INFO } from '../../../utils/constants'

export default function AppointmentHero() {
  const stats = [
    { icon: Clock, value: '15 min', label: 'Avg. Wait' },
    { icon: Star, value: '4.9', label: 'Rating' },
    { icon: ShieldCheck, value: 'Free', label: 'Cancellation' },
  ]

  const benefits = [
    'No waiting — booked slot',
    'Confirmation on WhatsApp',
    'Flexible timings',
  ]

  const timeSlots = [
    { time: '10:00', label: 'AM', available: true },
    { time: '11:30', label: 'AM', available: true },
    { time: '02:00', label: 'PM', available: false },
    { time: '04:30', label: 'PM', available: true },
    { time: '06:00', label: 'PM', available: true },
    { time: '07:30', label: 'PM', available: false },
  ]

  const whatsappMessage = encodeURIComponent(
    `Hello Kiran Dermatology, I would like to book an appointment.`
  )
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`

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
          <span className="text-primary font-medium">Book Appointment</span>
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
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                Book Appointment
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {['Schedule', 'Your'].map((word, i) => (
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
                transition={{ duration: 0.6, delay: 0.36 }}
                className="inline-block text-primary"
              >
                Consultation
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              Book your appointment in a few clicks. Choose your preferred date
              and time — we'll confirm your slot shortly.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
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

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="space-y-2.5 mb-8"
            >
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-textSecondary font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#appointment-form"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-borderLight text-secondary hover:border-primary hover:text-primary font-medium transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — Booking Card Visual
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
              <div className="relative">
                {/* Main Booking Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="relative bg-white rounded-3xl border border-borderLight shadow-large overflow-hidden"
                >
                  {/* Green top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

                  {/* Decorative blob */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                  <div className="relative p-6 md:p-7">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-5 pb-5 border-b border-borderLight">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold text-primary-700 uppercase tracking-widest mb-0.5">
                          Available Slots
                        </p>
                        <h3 className="font-heading font-bold text-secondary text-base leading-tight">
                          Today's Schedule
                        </h3>
                      </div>
                      {/* Live badge */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                          Live
                        </span>
                      </div>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-3 gap-2.5 mb-5">
                      {timeSlots.map((slot, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                          className={`group relative p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                            slot.available
                              ? 'bg-primary-50/60 border-primary/20 hover:bg-primary hover:border-primary hover:scale-105 hover:shadow-glow'
                              : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <p
                            className={`font-heading font-bold text-base leading-none mb-1 ${
                              slot.available
                                ? 'text-primary group-hover:text-white'
                                : 'text-gray-400'
                            } transition-colors`}
                          >
                            {slot.time}
                          </p>
                          <p
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                              slot.available
                                ? 'text-primary/70 group-hover:text-white/80'
                                : 'text-gray-400'
                            } transition-colors`}
                          >
                            {slot.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Availability Note */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-primary-50/50 border border-primary/10 mb-5">
                      <Sparkles className="w-4 h-4 text-primary shrink-0" />
                      <p className="text-xs text-textSecondary leading-relaxed">
                        <span className="font-semibold text-secondary">4 slots</span>{' '}
                        available today — book yours now
                      </p>
                    </div>

                    {/* Mini info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider">
                            Call
                          </p>
                          <p className="text-xs font-semibold text-secondary truncate">
                            {CONTACT_INFO.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider">
                            Hours
                          </p>
                          <p className="text-xs font-semibold text-secondary truncate">
                            10 AM – 7 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge — Fast Confirmation (top left) */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight anim-float-slow z-10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-xs leading-none">
                        Fast
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Confirmation
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge — 4.9 Rating (bottom right) */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight anim-float-medium z-10"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-xs leading-none">
                        4.9
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Rating
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative dashed ring */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow pointer-events-none -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}