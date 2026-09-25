import { supabase } from '../lib/supabase'

export const createContact = async (contactData) => {
  const { error } = await supabase
    .from('contacts')
    .insert([contactData])

  if (error) throw error
  return true
}

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const updateContactStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteContact = async (id) => {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}