import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import Accordion from '../../ui/Accordion'

export default function ServiceFAQ({ service }) {
  if (!service.faqs || service.faqs.length === 0) return null

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-textSecondary text-lg">
              Common questions about {service.name.toLowerCase()}.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion items={service.faqs} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}