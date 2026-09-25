import { motion } from 'framer-motion'
import { Quote, Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import doctor from '../../../data/doctor'

const values = [
  {
    icon: Heart,
    title: 'Empathy First',
    description: "Every patient's concern is valid. We listen before we prescribe.",
  },
  {
    icon: ShieldCheck,
    title: 'Evidence-Based',
    description: 'No shortcuts, no false promises. Only treatments backed by science.',
  },
  {
    icon: Sparkles,
    title: 'Long-Term Results',
    description: 'We treat the root cause, not just the symptom — for lasting wellness.',
  },
]

export default function Philosophy() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Soft blobs */}
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ============================================
              LEFT — Big Quote Card WITH BG IMAGE
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 lg:sticky lg:top-32"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/whychoose3.png)',
                    backgroundColor: '#2A5235',
                  }}
                />

                {/* Green Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800/95 via-primary-700/90 to-primary-900/95" />

                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

                {/* Quote pattern */}
                <div className="absolute top-8 right-8 opacity-20">
                  <Quote className="w-24 h-24 text-white fill-white" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 mb-8">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-[11px] font-semibold text-white tracking-widest uppercase">
                      Our Philosophy
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="font-heading text-2xl md:text-3xl lg:text-[2rem] leading-snug text-white font-medium mb-8">
                    "Every patient is unique, and so is their skin. My goal is
                    not just to treat the condition — but to understand the{' '}
                    <span className="text-primary-200 italic">person behind it.</span>"
                  </p>

                  {/* Signature */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/15">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-white text-xl">
                        A
                      </span>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-white text-lg leading-tight">
                        Dr. (Major) Asmita Singh
                      </p>
                      <p className="text-sm text-white/60 mt-0.5">
                        Founder & Chief Dermatologist
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow pointer-events-none" />
            </div>
          </motion.div>

          {/* ============================================
              RIGHT — Values List (Same)
              ============================================ */}
          <div className="lg:col-span-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
                What We Stand For
              </span>
              <h2 className="font-heading font-bold text-display-sm md:text-3xl lg:text-4xl text-secondary leading-tight mb-3 text-balance">
                Core Values That <span className="text-primary">Drive Us</span>
              </h2>
              <p className="text-textSecondary leading-relaxed">
                Three principles that shape every consultation, every treatment
                plan, and every interaction at Kiran Dermatology.
              </p>
            </motion.div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 border border-borderLight hover:border-primary/40 hover:shadow-large transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary group-hover:to-primary-600 transition-all duration-500">
                        <value.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-soft">
                        <span className="font-heading font-bold text-xs">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-secondary text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-sm text-textSecondary leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary/20"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-heading font-semibold text-secondary text-base mb-1">
                    Experience our care firsthand
                  </p>
                  <p className="text-xs text-textMuted">
                    Book a consultation with Dr. Singh
                  </p>
                </div>
                <a
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium text-sm transition-all hover:-translate-y-0.5 hover:shadow-glow shrink-0"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}