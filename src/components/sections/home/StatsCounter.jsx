import { motion } from 'framer-motion'
import StatCard from '../../cards/StatCard'
import stats from '../../../data/stats'

export default function StatsCounter() {
  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden">
      {/* Decorative blobs — soft green */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 border border-primary/20 tracking-widest uppercase mb-4">
            By The Numbers
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary text-balance">
            Trusted by Thousands Across Patna
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}