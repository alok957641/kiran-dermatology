import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import {
  Search, Eye, Trash2, Mail, Phone, MessageSquare, X,
  Tag, CheckCircle2, Inbox,
} from 'lucide-react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import StatusBadge from '../../components/admin/StatusBadge'
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal'
import Modal from '../../components/ui/Modal'
import Table from '../../components/ui/Table'
import EmptyState from '../../components/ui/EmptyState'
import { useContacts } from '../../hooks/useContacts'
import { formatDateTime } from '../../utils/formatDate'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
]

export default function Contacts() {
  const { contacts, loading, changeStatus, removeContact } = useContacts()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.subject?.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [contacts, statusFilter, searchQuery])

  const counts = useMemo(
    () => ({
      all: contacts.length,
      new: contacts.filter((c) => c.status === 'new').length,
      read: contacts.filter((c) => c.status === 'read').length,
      replied: contacts.filter((c) => c.status === 'replied').length,
    }),
    [contacts]
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

  const handleOpenDetail = (contact) => {
    setSelected(contact)
    if (contact.status === 'new') {
      handleStatusChange(contact.id, 'read')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await removeContact(deleteTarget.id)
      toast.success('Message deleted')
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
      header: 'Sender',
      key: 'name',
      render: (_, row) => (
        <div>
          <p className="font-medium text-slate-800 text-sm">{row.name}</p>
          <p className="text-xs text-slate-500 truncate max-w-[200px]">
            {row.email}
          </p>
        </div>
      ),
    },
    {
      header: 'Subject',
      key: 'subject',
      render: (val) => (
        <span className="text-sm text-slate-700 line-clamp-1">{val}</span>
      ),
    },
    {
      header: 'Phone',
      key: 'phone',
      render: (val) => <span className="text-sm text-slate-700">{val}</span>,
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
              handleOpenDetail(row)
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
        title="Contacts"
        description="Messages from the contact form"
        count={contacts.length}
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
              placeholder="Search messages..."
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
                ? 'No matching messages'
                : 'No messages yet'
            }
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters or search.'
                : 'Messages from the contact form will appear here.'
            }
          />
        ) : (
          <Table
            columns={columns}
            data={filtered}
            loading={loading}
            onRowClick={handleOpenDetail}
          />
        )}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Message Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center text-white font-bold text-xl shadow-soft">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-800">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {formatDateTime(selected.created_at)}
                  </p>
                </div>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href={`mailto:${selected.email}`}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium break-all">
                  {selected.email}
                </p>
              </a>

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
                  <Tag className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Subject
                  </p>
                </div>
                <p className="text-sm text-slate-800 font-medium">
                  {selected.subject}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Change Status
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange(selected.id, 'replied')}
                  disabled={selected.status === 'replied'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.status === 'replied'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-green-200 text-green-700 hover:bg-green-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Replied
                </button>
                <button
                  onClick={() => handleStatusChange(selected.id, 'read')}
                  disabled={selected.status === 'read'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.status === 'read'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Mark Read
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
              <div className="flex gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Reply
                </a>
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
          </div>
        )}
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Message"
        message={`Delete the message from "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </>
  )
}