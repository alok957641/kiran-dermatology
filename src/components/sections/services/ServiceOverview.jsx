import { motion } from 'framer-motion'
import { CheckCircle2, Target } from 'lucide-react'

export default function ServiceOverview({ service }) {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — Overview text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-5">
              Overview
            </span>

            <h2 className="font-heading font-bold text-display-sm text-secondary mb-6 text-balance">
              Understanding {service.name}
            </h2>

            <p className="text-textSecondary leading-relaxed text-lg">
              {service.overview}
            </p>
          </motion.div>

          {/* RIGHT — Conditions treated */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-to-br from-primary-50/60 to-accent-50/40 rounded-3xl p-6 md:p-8 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-secondary text-lg">
                  Conditions We Treat
                </h3>
              </div>

              <ul className="space-y-3">
                {service.conditions?.map((condition, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-textSecondary leading-relaxed">
                      {condition}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}