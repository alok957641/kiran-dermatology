import { supabase } from '../lib/supabase'

export const createAppointment = async (appointmentData) => {
  const { error } = await supabase
    .from('appointments')
    .insert([appointmentData])

  if (error) throw error
  return true
}

export const getAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getAppointmentById = async (id) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const updateAppointmentStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteAppointment = async (id) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}