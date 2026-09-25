import { useState, useEffect, useCallback } from 'react'
import { getTestimonials } from '../services/testimonialService'

export const useTestimonials = (approvedOnly = true) => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTestimonials(approvedOnly)
      setTestimonials(data || [])
    } catch (err) {
      console.error('Testimonials fetch error:', err)
      setError(err.message)
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }, [approvedOnly])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  return { testimonials, loading, error, refetch: fetchTestimonials }
}