import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, Stethoscope } from 'lucide-react'
import doctor from '../../../data/doctor'

const qualifications = [
  {
    icon: GraduationCap,
    degree: 'MBBS',
    institute: 'Armed Forces Medical College (AFMC), Pune',
    badge: 'Premier Institution',
    description:
      "India's most respected medical college, known for producing some of the country's finest doctors.",
  },
  {
    icon: Award,
    degree: 'MD — Dermatology, Venereology & Leprosy',
    institute: 'C.H. K.G.M.U., Lucknow',
    badge: 'Gold Medalist',
    description:
      'Ranked first in the university — awarded the prestigious Gold Medal for academic excellence.',
  },
  {
    icon: Stethoscope,
    degree: 'Senior Residency',
    institute: 'AIIMS Patna',
    badge: 'Advanced Training',
    description:
      'Completed senior residency at one of India\'s top medical institutes, specializing in complex dermatology cases.',
  },
  {
    icon: BookOpen,
    degree: 'Fellowship — Hair Transplant',
    institute: 'Advanced Hair Restoration Training',
    badge: 'Fellowship',
    description:
      'Trained in advanced FUE hair transplant techniques and hair restoration protocols.',
  },
  {
    icon: Award,
    degree: 'Fellowship — Laser Surgery',
    institute: 'Advanced Laser Training',
    badge: 'Fellowship',
    description:
      'Certified in the safe and effective use of US-FDA approved lasers for skin treatments.',
  },
]

export default function Qualifications() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            Qualifications
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            A Journey of Academic Excellence
          </h2>
          <p className="text-textSecondary text-lg">
            From India's premier medical institutions to advanced fellowships — every step
            shaped the doctor we trust today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-5">
            {qualifications.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-24"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 items-center justify-center shadow-glow">
                  <item.icon className="w-7 h-7 text-white" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 border border-borderLight shadow-soft hover:shadow-large hover:-translate-y-1 transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <h3 className="font-heading font-semibold text-lg md:text-xl text-secondary leading-snug">
                      {item.degree}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-[10px] font-bold text-primary-700 uppercase tracking-wider self-start shrink-0">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-sm text-primary font-medium mb-3">
                    {item.institute}
                  </p>

                  <p className="text-sm text-textSecondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-borderLight shadow-soft">
            <h3 className="font-heading font-semibold text-lg text-secondary mb-5 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Professional Memberships
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {doctor.memberships.map((membership, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-textSecondary leading-relaxed"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  {membership}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}