import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import {
  Search, Eye, Trash2, Calendar, Phone, Mail, Clock,
  Stethoscope, MessageSquare, X, CheckCircle2, XCircle, Inbox,
} from 'lucide-react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import StatusBadge from '../../components/admin/StatusBadge'
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal'
import Modal from '../../components/ui/Modal'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { useAppointments } from '../../hooks/useAppointments'
import { formatDateTime, formatDate } from '../../utils/formatDate'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default function Appointments() {
  const { appointments, loading, changeStatus, removeAppointment } =
    useAppointments()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus =
        statusFilter === 'all' || apt.status === statusFilter
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        apt.name?.toLowerCase().includes(q) ||
        apt.phone?.toLowerCase().includes(q) ||
        apt.service?.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [appointments, statusFilter, searchQuery])

  const counts = useMemo(
    () => ({
      all: appointments.length,
      pending: appointments.filter((a) => a.status === 'pending').length,
      confirmed: appointments.filter((a) => a.status === 'confirmed').length,
      cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    }),
    [appointments]
  )

  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeStatus(id, newStatus)
      toast.success(`Marked as ${newStatus}`)
      if (selected?.id === id) {
        setSelected((prev) => ({ ...prev, status: newStatus }))
      }
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await removeAppointment(deleteTarget.id)
      toast.success('Appointment deleted')
      setDeleteTarget(null)
      if (selected?.id === deleteTarget.id) setSelected(null)
    } catch (err) {
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    {
      header: 'Patient',
      key: 'name',
      render: (_, row) => (
        <div>
          <p className="font-medium text-slate-800 text-sm">{row.name}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3" />
            {row.phone}
          </p>
        </div>
      ),
    },
    {
      header: 'Service',
      key: 'service',
      render: (val) => <span className="text-sm text-slate-700">{val}</span>,
    },
    {
      header: 'Preferred Slot',
      key: 'preferred_date',
      render: (_, row) => (
        <div>
          <p className="text-sm text-slate-700 font-medium">
            {formatDate(row.preferred_date, 'dd MMM yyyy')}
          </p>
          <p className="text-xs text-slate-500">{row.preferred_time}</p>
        </div>
      ),
    },
    {
      header: 'Received',
      key: 'created_at',
      render: (val) => (
        <span className="text-xs text-slate-500">{formatDateTime(val)}</span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelected(row)
            }}
            className="p-2 rounded-lg text-slate-500 hover:bg-primary-50 hover:text-primary transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setDeleteTarget(row)
            }}
            className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <AdminPageHeader
        title="Appointments"
        description="Manage patient appointment requests"
        count={appointments.length}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === f.value
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 text-xs ${
                    statusFilter === f.value
                      ? 'text-white/80'
                      : 'text-slate-400'
                  }`}
                >
                  {counts[f.value]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {!loading && filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={
              searchQuery || statusFilter !== 'all'
                ? 'No matching appointments'
                : 'No appointments yet'
            }
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters or search.'
                : 'Appointments booked from the website will appear here.'
            }
          />
        ) : (
          <Table
            columns={columns}
            data={filtered}
            loading={loading}
            onRowClick={setSelected}
          />
        )}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Appointment Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-soft">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-800">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Received {formatDateTime(selected.created_at)}
                  </p>
                </div>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${selected.phone}`}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Phone
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  {selected.phone}
                </p>
              </a>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium break-all">
                  {selected.email || '—'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Service
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  {selected.service}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Preferred Date
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  {formatDate(selected.preferred_date, 'dd MMM yyyy')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Preferred Time
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  {selected.preferred_time}
                </p>
              </div>
            </div>

            {selected.message && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Additional Notes
                </p>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Change Status
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange(selected.id, 'confirmed')}
                  disabled={selected.status === 'confirmed'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.status === 'confirmed'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-green-200 text-green-700 hover:bg-green-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(selected.id, 'pending')}
                  disabled={selected.status === 'pending'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.status === 'pending'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-amber-200 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Mark Pending
                </button>
                <button
                  onClick={() => handleStatusChange(selected.id, 'cancelled')}
                  disabled={selected.status === 'cancelled'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.status === 'cancelled'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-red-200 text-red-600 hover:bg-red-50'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDeleteTarget(selected)
                  setSelected(null)
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Appointment"
        message={`Are you sure you want to delete the appointment from "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </>
  )
}