import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useUI } from '../../../context/UIContext'
import Navbar from './Navbar'
import NavbarMobile from './NavbarMobile'
import Footer from './Footer'

export default function PublicLayout() {
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUI()
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenMobileMenu={openMobileMenu} />
      <NavbarMobile isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}