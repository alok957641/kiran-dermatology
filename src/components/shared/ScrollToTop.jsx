import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Route change pe page ko top pe scroll kar deta hai
 * Layout me mount karna hai
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}