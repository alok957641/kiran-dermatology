import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Plus, Search, Edit, Trash2, Images, X, ArrowRight,
} from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import DeleteConfirmModal from '../../../components/admin/DeleteConfirmModal'
import Table from '../../../components/ui/Table'
import Button from '../../../components/ui/Button'
import EmptyState from '../../../components/ui/EmptyState'
import { useGallery } from '../../../hooks/useGallery'
import { deleteGalleryItem } from '../../../services/galleryService'

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Acne', value: 'Acne' },
  { label: 'Hair', value: 'Hair' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
  { label: 'Vitiligo', value: 'Vitiligo' },
]

export default function GalleryList() {
  const { gallery, loading, refetch } = useGallery()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = gallery.filter((item) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const counts = {
    all: gallery.length,
    ...categoryFilters.slice(1).reduce((acc, cat) => {
      acc[cat.value] = gallery.filter((g) => g.category === cat.value).length
      return acc
    }, {}),
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await deleteGalleryItem(deleteTarget.id)
      toast.success('Gallery item deleted')
      setDeleteTarget(null)
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    {
      header: 'Before / After',
      key: 'title',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 shrink-0">
            {/* Before thumb */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              {row.before_image ? (
                <img
                  src={row.before_image}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-400 font-bold">
                  B
                </div>
              )}
            </div>

            <ArrowRight className="w-3 h-3 text-slate-400" />

            {/* After thumb */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary-50 border border-primary/20">
              {row.after_image ? (
                <img
                  src={row.after_image}
                  alt="After"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-primary font-bold">
                  A
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-medium text-slate-800 text-sm line-clamp-1">
              {row.title}
            </p>
            <p className="text-xs text-slate-500 line-clamp-1">
              {row.description || '—'}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      render: (val) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-50 text-xs font-medium text-primary-700">
          {val || '—'}
        </span>
      ),
    },
    {
      header: 'Sessions',
      key: 'sessions',
      render: (val) => (
        <span className="text-xs text-slate-500">{val || '—'}</span>
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
            to={`/admin/gallery/edit/${row.id}`}
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
        title="Gallery"
        description="Manage before & after transformations"
        count={gallery.length}
        action={
          <Link to="/admin/gallery/new">
            <Button leftIcon={Plus}>Add Item</Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setCategoryFilter(f.value)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  categoryFilter === f.value
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 text-xs ${
                    categoryFilter === f.value
                      ? 'text-white/80'
                      : 'text-slate-400'
                  }`}
                >
                  {counts[f.value] || 0}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search gallery..."
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
            icon={Images}
            title={
              searchQuery || categoryFilter !== 'all'
                ? 'No matching items'
                : 'No gallery items yet'
            }
            description={
              searchQuery || categoryFilter !== 'all'
                ? 'Try adjusting filters.'
                : 'Add before/after transformations to showcase.'
            }
            action={
              !searchQuery &&
              categoryFilter === 'all' && (
                <Link to="/admin/gallery/new">
                  <Button leftIcon={Plus}>Add Item</Button>
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
        title="Delete Gallery Item"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
      />
    </>
  )
}