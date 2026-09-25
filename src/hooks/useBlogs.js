import { useState, useEffect, useCallback } from 'react'
import { getBlogs, getBlogBySlug } from '../services/blogService'

export const useBlogs = (publishedOnly = true) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBlogs(publishedOnly)
      setBlogs(data || [])
    } catch (err) {
      console.error('Blogs fetch error:', err)
      setError(err.message)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [publishedOnly])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return { blogs, loading, error, refetch: fetchBlogs }
}

export const useBlog = (slug) => {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getBlogBySlug(slug)
        setBlog(data)
      } catch (err) {
        console.error('Blog fetch error:', err)
        setError(err.message)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  return { blog, loading, error }
}