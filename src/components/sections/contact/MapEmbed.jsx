import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { CONTACT_INFO } from '../../../utils/constants'

export default function MapEmbed() {
  const address = `${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.line2}, ${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state} ${CONTACT_INFO.address.pincode}`

  const mapQuery = encodeURIComponent(address)
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Visit Us
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            Find Our Clinic
          </h2>
          <p className="text-textSecondary text-lg">
            Conveniently located on Bailey Road — easy to reach from anywhere in Patna.
          </p>
        </motion.div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-borderLight shadow-large bg-white"
        >
          {/* Info strip above map */}
          <div className="p-5 md:p-6 border-b border-borderLight flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shrink-0 shadow-glow">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-heading font-semibold text-secondary text-lg leading-tight">
                  {CONTACT_INFO.address.line1}
                </p>
                <p className="text-sm text-textSecondary mt-1">
                  {CONTACT_INFO.address.line2}, {CONTACT_INFO.address.city},{' '}
                  {CONTACT_INFO.address.state} — {CONTACT_INFO.address.pincode}
                </p>
              </div>
            </div>

            <a
              href={mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline shrink-0 text-sm"
            >
              Open in Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Map iframe */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100">
            <iframe
              title="Kiran Dermatology Location"
              src={mapEmbedUrl}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}