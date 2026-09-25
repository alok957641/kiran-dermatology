import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function ServiceProcedure({ service }) {
  return (
    <section className="section bg-gradient-to-b from-primary-50/30 to-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Our Approach
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            Procedures & Treatments
          </h2>
          <p className="text-textSecondary text-lg">
            Every treatment plan is customized to your skin type, condition, and goals.
          </p>
        </motion.div>

        {/* Procedure grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {service.procedures?.map((procedure, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl p-6 border border-borderLight hover:border-primary/30 hover:shadow-large transition-all duration-500 hover:-translate-y-1"
            >
              {/* Number */}
              <div className="absolute top-5 right-5 font-heading text-2xl font-bold text-primary/10 group-hover:text-primary/25 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary-600 transition-all duration-500">
                <Sparkles className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Text */}
              <p className="text-secondary font-medium leading-snug relative z-10">
                {procedure}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}