import { motion } from 'framer-motion'
import { Trophy, Award, Mic, FileText } from 'lucide-react'

// Har achievement ki image — apne paths daal
const achievementImages = [
  { image: '/achivment1.png', alt: 'Gold Medalist — MD Dermatology' },
  { image: '/achivement2.png', alt: 'IADVL Textbook Contributor' },
  { image: '/achivment3.png', alt: 'Ex-Senior Resident, AIIMS Patna' },
  { image: '/achivment4.png', alt: 'Ex-Armed Forces Medical Officer' },
  { image: '/achivment5.png', alt: 'Fellowship in Hair Transplant' },
  { image: '/achivment6.png', alt: 'Fellowship in Laser Surgery' },
  { image: '/achivment7.png', alt: 'Publications in National Journals' },
  { image: '/achivement8.webp', alt: 'Speaker at National Conferences' },
]

export default function Achievements() {
  return (
    <section className="section bg-gradient-to-b from-white via-primary-50/20 to-white relative overflow-hidden">
      {/* Soft blobs */}
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

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
            <Trophy className="w-3.5 h-3.5" />
            Achievements
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            Recognitions & Contributions
          </h2>
          <p className="text-textSecondary text-lg">
            Awards, publications, and academic contributions — a testament to
            commitment beyond the clinic.
          </p>
        </motion.div>

        {/* ============================================
            IMAGE GRID — Only Images
            ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto">
          {achievementImages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundColor: '#75BE84',
                }}
              />

              {/* Fallback gradient (agar image nahi hai) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 opacity-30" />

              {/* Soft green overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* ============================================
            ACADEMIC CONTRIBUTIONS
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-large">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/achievements/academic-bg.jpg)',
                backgroundColor: '#2A5235',
              }}
            />

            {/* Green overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800/95 via-primary-700/90 to-primary-900/95" />

            {/* Decorative blobs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 p-8 md:p-12">
              {/* Top row */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-2">
                    Academic Contributions
                  </h3>
                  <p className="text-white/80 leading-relaxed max-w-2xl">
                    Authored chapters in the IADVL Textbook of Dermatology and
                    presented at multiple national conferences. Committed to
                    advancing dermatology education in India.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-white/15">
                {[
                  { icon: FileText, value: '5+', label: 'Publications' },
                  { icon: Mic, value: '10+', label: 'Conference Talks' },
                  { icon: Award, value: '2', label: 'Fellowships' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-heading font-bold text-white text-3xl md:text-4xl leading-none mb-2">
                      {item.value}
                    </p>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}