import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowLeft, Save, ArrowRight } from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import ImageUploader from '../../../components/admin/ImageUploader'
import Input from '../../../components/ui/Input'
import Textarea from '../../../components/ui/Textarea'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import Loader from '../../../components/ui/Loader'
import {
  createGalleryItem,
  updateGalleryItem,
} from '../../../services/galleryService'
import { supabase } from '../../../lib/supabase'

const CATEGORIES = [
  { label: 'Acne', value: 'Acne' },
  { label: 'Hair', value: 'Hair' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
  { label: 'Vitiligo', value: 'Vitiligo' },
  { label: 'Other', value: 'Other' },
]

export default function GalleryForm() {
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
      title: '',
      category: 'Acne',
      before_image: '',
      after_image: '',
      description: '',
      sessions: '',
      display_order: 0,
    },
  })

  const beforeImageValue = watch('before_image')
  const afterImageValue = watch('after_image')

  useEffect(() => {
    if (!isEdit) return
    const fetchItem = async () => {
      try {
        setFetching(true)
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        reset(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load item')
        navigate('/admin/gallery')
      } finally {
        setFetching(false)
      }
    }
    fetchItem()
  }, [id, isEdit, reset, navigate])

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)

      if (!data.before_image) {
        toast.error('Before image is required')
        return
      }
      if (!data.after_image) {
        toast.error('After image is required')
        return
      }

      const payload = {
        title: data.title,
        category: data.category,
        before_image: data.before_image,
        after_image: data.after_image,
        description: data.description || null,
        sessions: data.sessions || null,
        display_order: Number(data.display_order) || 0,
      }

      if (isEdit) {
        await updateGalleryItem(id, payload)
        toast.success('Gallery item updated!')
      } else {
        await createGalleryItem(payload)
        toast.success('Gallery item created!')
      }
      navigate('/admin/gallery')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading..." />
      </div>
    )
  }

  return (
    <>
      <AdminPageHeader
        title={isEdit ? 'Edit Gallery Item' : 'Add Gallery Item'}
        description={
          isEdit
            ? 'Update the before/after details.'
            : 'Upload a new before/after transformation.'
        }
        action={
          <Link to="/admin/gallery">
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

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT — Images */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Before & After Images
              </h3>

              <div className="grid sm:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                {/* Before */}
                <div>
                  <ImageUploader
                    bucket="gallery"
                    folder="before"
                    value={beforeImageValue}
                    onChange={(url) => setValue('before_image', url)}
                    label="Before"
                    aspect="square"
                    hint="Required"
                  />
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary-50 items-center justify-center mx-auto">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* After */}
                <div>
                  <ImageUploader
                    bucket="gallery"
                    folder="after"
                    value={afterImageValue}
                    onChange={(url) => setValue('after_image', url)}
                    label="After"
                    aspect="square"
                    hint="Required"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Details
              </h3>

              <div className="space-y-4">
                <Input
                  label="Title"
                  placeholder="e.g. Acne Scar Treatment"
                  required
                  error={errors.title?.message}
                  {...register('title', { required: 'Title is required' })}
                />

                <Textarea
                  label="Description"
                  placeholder="Brief description of the treatment..."
                  rows={3}
                  {...register('description')}
                />

                <Input
                  label="Sessions"
                  placeholder="e.g. 5 sessions over 4 months"
                  {...register('sessions')}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Meta */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Category
              </h3>

              <Select options={CATEGORIES} {...register('category')} />

              <Input
                label="Display Order"
                type="number"
                placeholder="0"
                hint="Lower appears first"
                className="mt-4"
                {...register('display_order')}
              />

              <div className="mt-6 pt-5 border-t border-slate-100">
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
                    ? 'Update Item'
                    : 'Create Item'}
                </Button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                💡 Tips
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Use consistent lighting for before/after
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Same angle in both photos works best
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Always get patient consent before publishing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}