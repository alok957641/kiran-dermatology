import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { CONTACT_INFO, SITE_INFO } from '../../utils/constants'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000)
    const hideTimer = setTimeout(() => setShowTooltip(false), 9000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  const defaultMessage = encodeURIComponent(
    `Hello ${SITE_INFO.name}, I would like to book an appointment.`
  )

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${defaultMessage}`

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-large border border-borderLight px-4 py-3 max-w-[240px]"
          >
            <p className="text-sm font-medium text-secondary">
              👋 Need help? Chat with us on WhatsApp!
            </p>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary-600"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative group w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] shadow-large flex items-center justify-center text-white transition-colors"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
      </motion.a>
    </div>
  )
}