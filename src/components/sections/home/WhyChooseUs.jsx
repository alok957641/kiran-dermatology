import { motion } from 'framer-motion'
import {
  Award,
  Microscope,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react'

const features = [
  {
    icon: Award,
    title: '14+ Years',
    subtitle: 'Experience',
    description:
      'Senior dermatologist trained at AFMC, KGMU, and AIIMS Patna.',
    image: '/whychoose1.png',
  },
  {
    icon: Microscope,
    title: 'Advanced',
    subtitle: 'Technology',
    description:
      'US-FDA approved lasers, medical-grade equipment, and modern tools.',
    image: '/whychoose2.png',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-First',
    subtitle: 'Approach',
    description:
      'Personalized treatment plans tailored to your skin type and lifestyle.',
    image: '/whychoose3.png',
  },
  {
    icon: ShieldCheck,
    title: 'Safe &',
    subtitle: 'Evidence-Based',
    description:
      'All treatments follow international protocols with proven results.',
    image: '/whychoose4.png',
  },
  {
    icon: Clock,
    title: 'Flexible',
    subtitle: 'Timings',
    description:
      'Convenient appointment slots including evenings and weekends.',
    image: '/whychoose5.png',
  },
  {
    icon: Sparkles,
    title: 'Complete',
    subtitle: 'Care',
    description:
      'From medical dermatology to advanced aesthetics — all under one roof.',
    image: '/whychoose6.png',
  },
  {
    icon: Star,
    title: '5-Star',
    subtitle: 'Rated',
    description:
      'Trusted by thousands of patients with a 4.9-star average rating.',
    image: '/whychoose7.jpg',
  },
  {
    icon: Stethoscope,
    title: 'Expert',
    subtitle: 'Diagnosis',
    description:
      'Accurate diagnosis using advanced trichoscopy and dermoscopy tools.',
    image: '/whychoose8.png',
  },
]

export default function WhyChooseUs() {
  const containerSize = 900 // px
  const radius = 340 // px — orbit radius
  const total = features.length

  return (
    <section className="section bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            Your Skin Deserves The Best Care
          </h2>
          <p className="text-textSecondary text-lg">
            We combine medical expertise with a genuine commitment to your
            comfort and results.
          </p>
        </motion.div>

        {/* ============================================
            DESKTOP — Smooth Orbiting Carousel
            ============================================ */}
        <div className="hidden lg:block relative">
          <div
            className="relative mx-auto"
            style={{
              width: `${containerSize}px`,
              height: `${containerSize}px`,
            }}
          >
            {/* Center badge — FIXED */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-primary-600 shadow-glow flex items-center justify-center">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
            </div>

            {/* ROTATING WRAPPER — rotates continuously */}
            <div className="absolute inset-0 orbit-slow">
              {features.map((feature, i) => {
                const angle = (360 / total) * i
                const rad = (angle * Math.PI) / 180
                const x = Math.cos(rad) * radius
                const y = Math.sin(rad) * radius

                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    {/* Counter-rotating wrapper — keeps card upright */}
                    <div className="orbit-reverse-slow">
                      <CarouselCard feature={feature} index={i} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom hint */}
          <p className="text-center text-xs text-textMuted mt-8 tracking-widest uppercase">
            Hover card to pause · Auto-rotating
          </p>
        </div>

        {/* ============================================
            MOBILE — Grid Layout
            ============================================ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <MobileCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   Desktop Carousel Card
   ============================================ */
function CarouselCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <div className="carousel-card group relative">
      <div
        className="relative w-[220px] h-[270px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:shadow-large"
        style={{
          boxShadow: '0 10px 40px rgba(42, 82, 53, 0.15)',
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${feature.image})`,
            backgroundColor: '#75BE84',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A5235]/95 via-[#2A5235]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:bg-primary transition-colors duration-500">
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-lg leading-tight mb-1">
            {feature.title}
          </h3>
          <p className="font-heading font-semibold text-primary-200 text-base leading-tight mb-2">
            {feature.subtitle}
          </p>

          {/* Description — reveal on hover */}
          <p className="text-xs text-white/70 leading-snug max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================
   Mobile Card
   ============================================ */
function MobileCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-1"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${feature.image})`,
          backgroundColor: '#75BE84',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2A5235]/95 via-[#2A5235]/70 to-[#2A5235]/40" />

      <div className="relative z-10 p-6 text-white min-h-[240px] flex flex-col justify-end">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="font-heading font-bold text-xl leading-tight mb-1">
          {feature.title}
        </h3>
        <p className="font-heading font-semibold text-primary-200 text-base mb-3">
          {feature.subtitle}
        </p>
        <p className="text-sm text-white/80 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}