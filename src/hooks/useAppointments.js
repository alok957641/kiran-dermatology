import { useState, useEffect } from 'react'
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../services/appointmentService'

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const data = await getAppointments()
      setAppointments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const changeStatus = async (id, status) => {
    await updateAppointmentStatus(id, status)
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }

  const removeAppointment = async (id) => {
    await deleteAppointment(id)
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    changeStatus,
    removeAppointment,
  }
}