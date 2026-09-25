import { supabase } from '../lib/supabase'

export const uploadImage = async (bucket, file, folder = '') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return { path: data.path, publicUrl }
}

export const deleteImage = async (bucket, path) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) throw error
  return true
}