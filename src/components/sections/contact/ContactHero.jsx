import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Home,
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  Navigation,
} from 'lucide-react'
import { CONTACT_INFO } from '../../../utils/constants'

export default function ContactHero() {
  const quickStats = [
    { icon: Phone, label: 'Call Us', value: CONTACT_INFO.phone },
    { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
    { icon: Clock, label: 'Mon–Fri', value: CONTACT_INFO.hours.weekdays },
  ]

  const contactDetails = [
    {
      icon: Phone,
      label: 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phoneRaw}`,
      color: 'bg-primary-50 text-primary',
    },
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: `${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.city}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        `${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.line2}, ${CONTACT_INFO.address.city}`
      )}`,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: CONTACT_INFO.hours.weekdays,
      color: 'bg-emerald-50 text-emerald-600',
    },
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
          <span className="text-primary font-medium">Contact</span>
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
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary-700 tracking-wider uppercase">
                Get In Touch
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[3.5rem] text-secondary leading-[1.1] mb-6 text-balance">
              {["We'd", 'Love', 'To'].map((word, i) => (
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
                Hear From You
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              Have a question, want to book a consultation, or need more
              information? Reach out to us — we usually respond within a few
              hours.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-3 max-w-lg mb-8"
            >
              {quickStats.map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-4 border border-borderLight hover:border-primary/40 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                    <stat.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="font-heading font-bold text-secondary text-xs md:text-sm leading-tight mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-textMuted font-medium leading-tight truncate">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-borderLight text-secondary hover:border-primary hover:text-primary font-medium transition-all duration-300"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* ============================================
              RIGHT — Contact Info Card
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
              <div className="relative">
                {/* Main Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="relative bg-white rounded-3xl border border-borderLight shadow-large overflow-hidden"
                >
                  {/* Green top bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

                  {/* Decorative blob */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                  <div className="relative p-6 md:p-8">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-borderLight">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow shrink-0">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-primary-700 uppercase tracking-widest mb-0.5">
                          Kiran Dermatology
                        </p>
                        <h3 className="font-heading font-bold text-secondary text-lg leading-tight">
                          Contact Information
                        </h3>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3">
                      {contactDetails.map((item, i) => {
                        const Wrapper = item.href ? 'a' : 'div'
                        const wrapperProps = item.href
                          ? {
                              href: item.href,
                              target: item.href.startsWith('http')
                                ? '_blank'
                                : undefined,
                              rel: item.href.startsWith('http')
                                ? 'noopener noreferrer'
                                : undefined,
                            }
                          : {}

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                          >
                            <Wrapper
                              {...wrapperProps}
                              className={`group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-primary-50/60 transition-colors duration-300 ${
                                item.href ? 'cursor-pointer' : ''
                              }`}
                            >
                              <div
                                className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                              >
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-textMuted uppercase tracking-wider mb-1">
                                  {item.label}
                                </p>
                                <p className="text-sm font-medium text-secondary leading-snug break-words">
                                  {item.value}
                                </p>
                              </div>
                              {item.href && (
                                <ChevronRight className="w-4 h-4 text-textMuted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-3" />
                              )}
                            </Wrapper>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Bottom Note */}
                    <div className="mt-6 pt-5 border-t border-borderLight flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-xs text-textMuted leading-relaxed">
                        We typically respond within a few hours during working
                        hours.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge — Location (top left) */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight anim-float-slow z-10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-xs leading-none">
                        Patna
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Bailey Road
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge — Fast Response (bottom right) */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-large border border-borderLight anim-float-medium z-10"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-secondary text-xs leading-none">
                        Fast
                      </p>
                      <p className="text-[9px] text-textMuted font-medium uppercase tracking-wider mt-0.5">
                        Response
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