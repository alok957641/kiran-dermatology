import { useEffect, useRef, useState } from 'react'

export default function useScrollAnimation(options = {}) {
  const { threshold = 0.2, once = true, rootMargin = '0px' } = options
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return { ref, isInView }
}