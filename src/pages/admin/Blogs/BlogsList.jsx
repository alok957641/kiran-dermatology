import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Plus, Search, Edit, Trash2, BookOpen, X,
  Eye, EyeOff, ExternalLink,
} from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import StatusBadge from '../../../components/admin/StatusBadge'
import DeleteConfirmModal from '../../../components/admin/DeleteConfirmModal'
import Table from '../../../components/ui/Table'
import Button from '../../../components/ui/Button'
import EmptyState from '../../../components/ui/EmptyState'
import { useBlogs } from '../../../hooks/useBlogs'
import { deleteBlog, updateBlog } from '../../../services/blogService'
import { formatDate } from '../../../utils/formatDate'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'drafts' },
]

export default function BlogsList() {
  const { blogs, loading, refetch } = useBlogs(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const filtered = blogs
    .filter((b) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.slug?.toLowerCase().includes(q)

      let matchesStatus = true
      if (statusFilter === 'published') matchesStatus = b.published === true
      else if (statusFilter === 'drafts') matchesStatus = b.published === false

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))

  const counts = {
    all: blogs.length,
    published: blogs.filter((b) => b.published).length,
    drafts: blogs.filter((b) => !b.published).length,
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await deleteBlog(deleteTarget.id)
      toast.success('Blog deleted')
      setDeleteTarget(null)
      refetch?.()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const togglePublished = async (item) => {
    try {
      setTogglingId(item.id)
      await updateBlog(item.id, { published: !item.published })
      toast.success(item.published ? 'Moved to drafts' : 'Published!')
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
      header: 'Blog Post',
      key: 'title',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-50 overflow-hidden shrink-0">
            {row.cover_image ? (
              <img
                src={row.cover_image}
                alt={row.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-800 text-sm line-clamp-1">
              {row.title}
            </p>
            <p className="text-xs text-slate-500 truncate">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      render: (val) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
          {val || '—'}
        </span>
      ),
    },
    {
      header: 'Published At',
      key: 'published_at',
      render: (val) => (
        <span className="text-xs text-slate-500">
          {val ? formatDate(val, 'dd MMM yyyy') : '—'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'published',
      align: 'center',
      render: (val, row) => (
        <button
          onClick={() => togglePublished(row)}
          disabled={togglingId === row.id}
          className="transition-opacity disabled:opacity-50"
          title="Click to toggle publish"
        >
          {val ? (
            <StatusBadge status="confirmed" />
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-slate-100 text-slate-700 border-slate-200">
              Draft
            </span>
          )}
        </button>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          {row.published && (
            <Link
              to={`/blog/${row.slug}`}
              target="_blank"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="View on site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
          <Link
            to={`/admin/blogs/edit/${row.id}`}
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
        title="Blog Posts"
        description="Manage articles and insights"
        count={blogs.length}
        action={
          <Link to="/admin/blogs/new">
            <Button leftIcon={Plus}>New Post</Button>
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
              placeholder="Search blogs..."
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
            icon={BookOpen}
            title={
              searchQuery || statusFilter !== 'all'
                ? 'No matching blogs'
                : 'No blogs yet'
            }
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting filters.'
                : 'Write your first article to get started.'
            }
            action={
              !searchQuery &&
              statusFilter === 'all' && (
                <Link to="/admin/blogs/new">
                  <Button leftIcon={Plus}>New Post</Button>
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
        title="Delete Blog Post"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
      />
    </>
  )
}