import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Calendar } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO, SITE_INFO } from '../../../utils/constants'
import { cn } from '../../../utils/cn'
import Button from '../../ui/Button'

export default function Navbar({ onOpenMobileMenu }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-6">
          {/* ============================================
              LOGO — Image + Fallback
              ============================================ */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {!logoError ? (
              /* Image Logo */
              <img
                src="/logopng.png"
                alt={SITE_INFO.name}
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={() => setLogoError(true)}
              />
            ) : (
              /* Fallback — Text Logo */
              <>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
                  <span className="font-heading text-white text-xl md:text-2xl font-bold">
                    K
                  </span>
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="font-heading font-bold text-secondary text-lg md:text-xl">
                    Kiran
                  </p>
                  <p className="text-[10px] md:text-xs text-textMuted font-medium tracking-[0.2em] uppercase">
                    Dermatology
                  </p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path)

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    isActive
                      ? 'text-primary'
                      : 'text-textSecondary hover:text-primary hover:bg-primary-50/50'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-textSecondary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              {CONTACT_INFO.phone}
            </a>

            <Link to="/appointment" className="hidden md:inline-flex">
              <Button size="sm" leftIcon={Calendar}>
                Book Now
              </Button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-primary-50 transition-colors"
              aria-label="Open menu"
            >
              <span className="w-5 h-0.5 bg-secondary rounded-full" />
              <span className="w-5 h-0.5 bg-secondary rounded-full" />
              <span className="w-3 h-0.5 bg-primary rounded-full self-end mr-[9px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}