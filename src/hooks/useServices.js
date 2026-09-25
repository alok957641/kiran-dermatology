import { useState, useEffect, useCallback } from 'react'
import { getServices, getServiceBySlug } from '../services/serviceService'

export const useServices = (featuredOnly = false) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getServices(featuredOnly)
      setServices(data || [])
    } catch (err) {
      console.error('Services fetch error:', err)
      setError(err.message)
      setServices([])
    } finally {
      setLoading(false)
    }
  }, [featuredOnly])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return { services, loading, error, refetch: fetchServices }
}

export const useService = (slug) => {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    const fetchService = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getServiceBySlug(slug)
        setService(data)
      } catch (err) {
        console.error('Service fetch error:', err)
        setError(err.message)
        setService(null)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [slug])

  return { service, loading, error }
}