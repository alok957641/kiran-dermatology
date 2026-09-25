import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '../../../utils/constants'
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'
import Button from '../../ui/Button'

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
}

export default function NavbarMobile({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[100] lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-white z-[101] flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-borderLight">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="font-heading text-white text-xl font-bold">K</span>
                </div>
                <div className="leading-tight">
                  <p className="font-heading font-bold text-secondary">Kiran</p>
                  <p className="text-[10px] text-textMuted font-medium tracking-widest uppercase">
                    Dermatology
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-5">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-textPrimary font-medium hover:bg-primary-50 hover:text-primary transition-colors group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-textMuted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="px-5 pb-5 space-y-3">
              <Link to="/appointment" onClick={onClose} className="block">
                <Button fullWidth size="md" leftIcon={Calendar}>
                  Book Appointment
                </Button>
              </Link>

              <div className="pt-4 border-t border-borderLight space-y-3">
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-textSecondary hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{CONTACT_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-textSecondary hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium truncate">{CONTACT_INFO.email}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-textSecondary">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">
                    {CONTACT_INFO.address.line1}, {CONTACT_INFO.address.city}
                  </span>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 pt-3">
                {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                  const Icon = socialIcons[key]
                  if (!Icon) return null
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-primary-50 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors"
                      aria-label={key}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}