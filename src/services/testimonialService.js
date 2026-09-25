import { supabase } from '../lib/supabase'

export const getTestimonials = async (approvedOnly = true) => {
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true })

  if (approvedOnly) query = query.eq('approved', true)

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createTestimonial = async (testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateTestimonial = async (id, testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteTestimonial = async (id) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}