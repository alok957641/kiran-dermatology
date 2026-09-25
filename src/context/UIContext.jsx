import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdminSidebarOpen, setAdminSidebarOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    const shouldLock = isMobileMenuOpen || isAdminSidebarOpen || isModalOpen
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen, isAdminSidebarOpen, isModalOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
        setAdminSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openModal = useCallback((data = null) => {
    setModalData(data)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setModalData(null)
  }, [])

  const value = {
    isMobileMenuOpen,
    toggleMobileMenu: () => setMobileMenuOpen((prev) => !prev),
    openMobileMenu: () => setMobileMenuOpen(true),
    closeMobileMenu: () => setMobileMenuOpen(false),
    isAdminSidebarOpen,
    toggleAdminSidebar: () => setAdminSidebarOpen((prev) => !prev),
    openAdminSidebar: () => setAdminSidebarOpen(true),
    closeAdminSidebar: () => setAdminSidebarOpen(false),
    isModalOpen, modalData, openModal, closeModal,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI must be used within a UIProvider')
  return context
}

export default UIContext