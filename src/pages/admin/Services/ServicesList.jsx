import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Plus, Search, Eye, Edit, Trash2, Stethoscope, X, ExternalLink,
} from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import StatusBadge from '../../../components/admin/StatusBadge'
import DeleteConfirmModal from '../../../components/admin/DeleteConfirmModal'
import Table from '../../../components/ui/Table'
import Button from '../../../components/ui/Button'
import EmptyState from '../../../components/ui/EmptyState'
import { useServices } from '../../../hooks/useServices'
import { deleteService } from '../../../services/serviceService'

export default function ServicesList() {
  const { services, loading, refetch } = useServices()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = services.filter((s) => {
    const q = searchQuery.toLowerCase()
    return (
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q)
    )
  })

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await deleteService(deleteTarget.id)
      toast.success('Service deleted')
      setDeleteTarget(null)
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete service')
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    {
      header: 'Service',
      key: 'name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-800 text-sm truncate">
              {row.name}
            </p>
            <p className="text-xs text-slate-500 truncate">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Short Description',
      key: 'short_description',
      render: (val) => (
        <span className="text-sm text-slate-600 line-clamp-1 max-w-[300px]">
          {val || '—'}
        </span>
      ),
    },
    {
      header: 'Featured',
      key: 'featured',
      align: 'center',
      render: (val) =>
        val ? (
          <StatusBadge status="confirmed" />
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
    {
      header: 'Order',
      key: 'display_order',
      align: 'center',
      render: (val) => (
        <span className="text-sm text-slate-600 font-mono">{val || 0}</span>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/services/${row.slug}`}
            target="_blank"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title="View on site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            to={`/admin/services/edit/${row.id}`}
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
        title="Services"
        description="Manage your clinic's services"
        count={services.length}
        action={
          <Link to="/admin/services/new">
            <Button leftIcon={Plus}>Add Service</Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5">
        <div className="relative w-full lg:w-72 ml-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {!loading && filtered.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title={
              searchQuery ? 'No matching services' : 'No services yet'
            }
            description={
              searchQuery
                ? 'Try a different search.'
                : 'Add your first service to get started.'
            }
            action={
              !searchQuery && (
                <Link to="/admin/services/new">
                  <Button leftIcon={Plus}>Add Service</Button>
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
        title="Delete Service"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </>
  )
}