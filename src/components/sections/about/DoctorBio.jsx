import { motion } from 'framer-motion'
import { Quote, Award, Star, Users } from 'lucide-react'
import doctor from '../../../data/doctor'

export default function DoctorBio() {
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-primary-50/60 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-large">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50" />
                <img
                  src={doctor.aboutImage || doctor.image}
                  alt={doctor.name}
                  className="relative w-full h-full object-cover object-top"
                  onError={(e) => (e.target.style.opacity = 0)}
                />
              </div>

              {/* Floating badge — Award */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-medium"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-secondary text-sm leading-none">
                      Gold
                    </p>
                    <p className="text-[10px] text-textMuted font-medium mt-1 uppercase tracking-wider">
                      Medalist
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-slow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-secondary text-sm leading-none">
                      4.9
                    </p>
                    <p className="text-[10px] text-textMuted font-medium mt-1 uppercase tracking-wider">
                      Rating
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -z-10 -top-8 -left-8 w-40 h-40 rounded-full border-2 border-dashed border-primary/20 anim-rotate-slow" />
            </div>
          </motion.div>

          {/* RIGHT — Bio Content */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-5"
            >
              About the Doctor
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-3 text-balance"
            >
              {doctor.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-primary font-medium mb-6"
            >
              {doctor.specialization}
            </motion.p>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-gradient-to-br from-primary-50 to-accent-50/40 rounded-2xl p-6 md:p-7 border border-primary/10 mb-8"
            >
              <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/20" />
              <p className="font-heading italic text-secondary text-lg leading-relaxed pr-10">
                "{doctor.philosophy}"
              </p>
            </motion.div>

            {/* Full bio — paragraphs */}
            <div className="space-y-4">
              {doctor.fullBio
                .split('\n')
                .filter((p) => p.trim())
                .map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="text-textSecondary leading-relaxed"
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}
            </div>

            {/* Quick stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-borderLight"
            >
              {[
                { icon: Award, value: '14+', label: 'Years' },
                { icon: Users, value: '10K+', label: 'Patients' },
                { icon: Star, value: '4.9', label: 'Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-2.5">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-heading font-bold text-secondary text-2xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-textMuted font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}