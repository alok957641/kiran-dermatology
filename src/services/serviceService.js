import { supabase } from '../lib/supabase'

export const getServices = async (featuredOnly = false) => {
  let query = supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })

  if (featuredOnly) query = query.eq('featured', true)

  const { data, error } = await query
  if (error) throw error
  return data
}

export const getServiceBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export const createService = async (serviceData) => {
  const { data, error } = await supabase
    .from('services')
    .insert([serviceData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateService = async (id, serviceData) => {
  const { data, error } = await supabase
    .from('services')
    .update(serviceData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteService = async (id) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}