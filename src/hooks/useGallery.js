import { useState, useEffect, useCallback } from 'react'
import { getGallery } from '../services/galleryService'

export const useGallery = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getGallery()
      setGallery(data || [])
    } catch (err) {
      console.error('Gallery fetch error:', err)
      setError(err.message)
      setGallery([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  return { gallery, loading, error, refetch: fetchGallery }
}