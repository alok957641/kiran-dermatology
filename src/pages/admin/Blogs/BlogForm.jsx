import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import ImageUploader from '../../../components/admin/ImageUploader'
import RichTextEditor from '../../../components/admin/RichTextEditor'
import Input from '../../../components/ui/Input'
import Textarea from '../../../components/ui/Textarea'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import Loader from '../../../components/ui/Loader'
import { createBlog, updateBlog } from '../../../services/blogService'
import { supabase } from '../../../lib/supabase'
import { slugify } from '../../../utils/slugify'

const CATEGORIES = [
  { label: 'Skincare', value: 'Skincare' },
  { label: 'Hair Care', value: 'Hair Care' },
  { label: 'Acne', value: 'Acne' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
  { label: 'General', value: 'General' },
]

export default function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [fetching, setFetching] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      cover_image: '',
      category: 'Skincare',
      author: 'Dr. (Major) Asmita Singh',
      tags: '',
      read_time: '5 min read',
      published: false,
    },
  })

  const titleValue = watch('title')
  const contentValue = watch('content')
  const coverImageValue = watch('cover_image')
  const publishedValue = watch('published')

  // Auto-generate slug
  useEffect(() => {
    if (!isEdit && titleValue) {
      setValue('slug', slugify(titleValue))
    }
  }, [titleValue, isEdit, setValue])

  // Load blog if editing
  useEffect(() => {
    if (!isEdit) return
    const fetchBlog = async () => {
      try {
        setFetching(true)
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error

        reset({
          ...data,
          tags: (data.tags || []).join(', '),
        })
      } catch (err) {
        console.error(err)
        toast.error('Failed to load blog')
        navigate('/admin/blogs')
      } finally {
        setFetching(false)
      }
    }
    fetchBlog()
  }, [id, isEdit, reset, navigate])

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)

      const payload = {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        cover_image: data.cover_image || null,
        category: data.category,
        author: data.author,
        tags: data.tags
          ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        read_time: data.read_time,
        published: data.published || false,
        published_at: data.published ? new Date().toISOString() : null,
      }

      if (isEdit) {
        await updateBlog(id, payload)
        toast.success('Blog updated!')
      } else {
        await createBlog(payload)
        toast.success('Blog created!')
      }
      navigate('/admin/blogs')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to save blog')
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading blog..." />
      </div>
    )
  }

  return (
    <>
      <AdminPageHeader
        title={isEdit ? 'Edit Blog Post' : 'New Blog Post'}
        description={
          isEdit
            ? 'Update the article details.'
            : 'Write a new article for your blog.'
        }
        action={
          <Link to="/admin/blogs">
            <Button
              variant="ghost"
              leftIcon={ArrowLeft}
              className="border border-slate-200"
            >
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT — Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Basic Information
              </h3>

              <div className="space-y-4">
                <Input
                  label="Title"
                  placeholder="e.g. 7 Skincare Tips for Healthy Skin"
                  required
                  error={errors.title?.message}
                  {...register('title', { required: 'Title is required' })}
                />

                <Input
                  label="Slug (URL)"
                  placeholder="skincare-tips"
                  hint="Auto-generated. Lowercase with hyphens."
                  required
                  error={errors.slug?.message}
                  {...register('slug', { required: 'Slug is required' })}
                />

                <Textarea
                  label="Excerpt"
                  placeholder="Short 1-2 line summary shown in previews..."
                  rows={3}
                  required
                  error={errors.excerpt?.message}
                  {...register('excerpt', { required: 'Excerpt is required' })}
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Content
              </h3>

              <RichTextEditor
                value={contentValue}
                onChange={(val) => setValue('content', val)}
                placeholder="Write your blog content here..."
              />
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Publish
              </h3>

              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={publishedValue}
                  onChange={(e) => setValue('published', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 cursor-pointer"
                />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Publish immediately
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Unchecked = save as draft
                  </p>
                </div>
              </label>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={submitting}
                  leftIcon={!submitting ? Save : undefined}
                >
                  {submitting
                    ? 'Saving...'
                    : isEdit
                    ? 'Update Post'
                    : 'Create Post'}
                </Button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Cover Image
              </h3>

              <ImageUploader
                bucket="blog-images"
                value={coverImageValue}
                onChange={(url) => setValue('cover_image', url)}
                label=""
                aspect="video"
              />
            </div>

            {/* Category & Meta */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Category & Meta
              </h3>

              <div className="space-y-4">
                <Select
                  label="Category"
                  options={CATEGORIES}
                  {...register('category')}
                />

                <Input
                  label="Read Time"
                  placeholder="e.g. 5 min read"
                  {...register('read_time')}
                />

                <Input
                  label="Author"
                  {...register('author')}
                />

                <Input
                  label="Tags"
                  placeholder="Skincare, Sunscreen, Routine"
                  hint="Comma-separated"
                  {...register('tags')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}