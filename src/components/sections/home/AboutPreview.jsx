import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Award, GraduationCap } from 'lucide-react'
import Button from '../../ui/Button'
import doctor from '../../../data/doctor'

export default function AboutPreview() {
  const highlights = [
    'MBBS from AFMC Pune — India\'s premier medical college',
    'MD Dermatology Gold Medalist from KGMU Lucknow',
    'Ex-Senior Resident at AIIMS Patna',
    'Fellowships in Hair Transplant & Laser Surgery',
  ]

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-primary-50/60 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-md rounded-3xl overflow-hidden shadow-large">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-50" />
              <img
                src={doctor.previewImage || doctor.image}
                alt={doctor.name}
                className="relative w-full h-full object-cover"
                onError={(e) => (e.target.style.opacity = 0)}
              />
            </div>

            {/* Small badge card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 left-4 md:left-0 bg-white rounded-2xl p-4 shadow-large border border-borderLight max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-secondary text-xl leading-none">
                    14+
                  </p>
                  <p className="text-[10px] text-textMuted font-medium uppercase tracking-wide mt-1">
                    Years
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-4 right-4 md:-right-6 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-medium"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-secondary text-sm leading-none">
                    Gold Medalist
                  </p>
                  <p className="text-[10px] text-textMuted font-medium mt-1">
                    MD Dermatology
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4"
            >
              About the Doctor
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-5 text-balance"
            >
              Meet {doctor.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-textSecondary leading-relaxed mb-6 text-lg"
            >
              A senior dermatologist with over 14 years of experience, Dr. Singh combines
              evidence-based medicine with a patient-first approach — helping thousands
              achieve healthy, confident skin.
            </motion.p>

            {/* Highlights list */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-textSecondary">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link to="/about">
                <Button variant="primary" size="md" rightIcon={ArrowRight}>
                  Read Full Profile
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}