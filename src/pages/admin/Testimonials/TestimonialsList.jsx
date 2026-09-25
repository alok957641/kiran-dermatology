import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Plus, Search, Edit, Trash2, Star, X,
  CheckCircle2, XCircle, MessageSquareQuote,
} from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import StatusBadge from '../../../components/admin/StatusBadge'
import DeleteConfirmModal from '../../../components/admin/DeleteConfirmModal'
import Table from '../../../components/ui/Table'
import Button from '../../../components/ui/Button'
import EmptyState from '../../../components/ui/EmptyState'
import { useTestimonials } from '../../../hooks/useTestimonials'
import {
  deleteTestimonial,
  updateTestimonial,
} from '../../../services/testimonialService'
import { formatDate } from '../../../utils/formatDate'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: 'approved' },
  { label: 'Pending', value: 'pending' },
  { label: 'Featured', value: 'featured' },
]

export default function TestimonialsList() {
  const { testimonials, loading, refetch } = useTestimonials(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const filtered = testimonials.filter((t) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      t.name?.toLowerCase().includes(q) ||
      t.message?.toLowerCase().includes(q) ||
      t.city?.toLowerCase().includes(q)

    let matchesStatus = true
    if (statusFilter === 'approved') matchesStatus = t.approved === true
    else if (statusFilter === 'pending') matchesStatus = t.approved === false
    else if (statusFilter === 'featured') matchesStatus = t.featured === true

    return matchesSearch && matchesStatus
  })

  const counts = {
    all: testimonials.length,
    approved: testimonials.filter((t) => t.approved).length,
    pending: testimonials.filter((t) => !t.approved).length,
    featured: testimonials.filter((t) => t.featured).length,
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await deleteTestimonial(deleteTarget.id)
      toast.success('Testimonial deleted')
      setDeleteTarget(null)
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const toggleField = async (item, field) => {
    try {
      setTogglingId(item.id)
      await updateTestimonial(item.id, { [field]: !item[field] })
      toast.success(`${field === 'approved' ? 'Approval' : 'Featured'} updated`)
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error('Failed to update')
    } finally {
      setTogglingId(null)
    }
  }

  const columns = [
    {
      header: 'Reviewer',
      key: 'name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
            {row.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-800 text-sm truncate">
              {row.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{row.city}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (val) => (
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < val ? 'fill-accent text-accent' : 'text-slate-300'
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      header: 'Message',
      key: 'message',
      render: (val) => (
        <span className="text-sm text-slate-600 line-clamp-1 max-w-[280px]">
          {val}
        </span>
      ),
    },
    {
      header: 'Service',
      key: 'service',
      render: (val) => (
        <span className="text-xs text-slate-500">{val || '—'}</span>
      ),
    },
    {
      header: 'Status',
      key: 'approved',
      align: 'center',
      render: (val, row) => (
        <button
          onClick={() => toggleField(row, 'approved')}
          disabled={togglingId === row.id}
          className="transition-opacity disabled:opacity-50"
          title="Click to toggle approval"
        >
          {val ? (
            <StatusBadge status="confirmed" />
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-amber-50 text-amber-700 border-amber-200">
              Pending
            </span>
          )}
        </button>
      ),
    },
    {
      header: 'Featured',
      key: 'featured',
      align: 'center',
      render: (val, row) => (
        <button
          onClick={() => toggleField(row, 'featured')}
          disabled={togglingId === row.id}
          className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
            val
              ? 'bg-accent-50 text-accent-600 hover:bg-accent-100'
              : 'text-slate-400 hover:bg-slate-100'
          }`}
          title="Toggle featured"
        >
          <Star
            className={`w-4 h-4 ${val ? 'fill-current' : ''}`}
          />
        </button>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/admin/testimonials/edit/${row.id}`}
            className="p-2 rounded-lg text-slate-500 hover:bg-primary-50 hover:text-primary transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setDeleteTarget(row)
            }}
            className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Delete"
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
        title="Testimonials"
        description="Manage patient reviews"
        count={testimonials.length}
        action={
          <Link to="/admin/testimonials/new">
            <Button leftIcon={Plus}>Add Testimonial</Button>
          </Link>
        }
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
                    statusFilter === f.value ? 'text-white/80' : 'text-slate-400'
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
              placeholder="Search testimonials..."
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
            icon={MessageSquareQuote}
            title={
              searchQuery || statusFilter !== 'all'
                ? 'No matching testimonials'
                : 'No testimonials yet'
            }
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting filters.'
                : 'Add your first testimonial to get started.'
            }
            action={
              !searchQuery &&
              statusFilter === 'all' && (
                <Link to="/admin/testimonials/new">
                  <Button leftIcon={Plus}>Add Testimonial</Button>
                </Link>
              )
            }
          />
        ) : (
          <Table columns={columns} data={filtered} loading={loading} />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Testimonial"
        message={`Delete the review from "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </>
  )
}