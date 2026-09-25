import { supabase } from '../lib/supabase'

export const getGallery = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export const createGalleryItem = async (galleryData) => {
  const { data, error } = await supabase
    .from('gallery')
    .insert([galleryData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateGalleryItem = async (id, galleryData) => {
  const { data, error } = await supabase
    .from('gallery')
    .update(galleryData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteGalleryItem = async (id) => {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}