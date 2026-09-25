import { motion } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { CONTACT_INFO, SITE_INFO } from '../../../utils/constants'

export default function WhatsAppCTA() {
  const whatsappMessage = encodeURIComponent(
    `Hello ${SITE_INFO.name}, I would like to book an appointment. Please share your available slots.`
  )
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`

  return (
    <section className="section bg-gradient-to-b from-background to-primary-50/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-borderLight shadow-large relative overflow-hidden"
        >
          {/* Decorative blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-3xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-large"
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading font-bold text-secondary text-2xl mb-2">
                Prefer WhatsApp?
              </h3>
              <p className="text-textSecondary leading-relaxed mb-5">
                Message us on WhatsApp for instant slot availability and quick
                booking. Our team responds within minutes.
              </p>

              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-medium transition-colors shadow-soft"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}