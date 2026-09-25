import { useState, useEffect } from 'react'
import { getContacts, updateContactStatus, deleteContact } from '../services/contactService'

export const useContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await getContacts()
      setContacts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const changeStatus = async (id, status) => {
    await updateContactStatus(id, status)
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    )
  }

  const removeContact = async (id) => {
    await deleteContact(id)
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  return {
    contacts,
    loading,
    error,
    refetch: fetchContacts,
    changeStatus,
    removeContact,
  }
}