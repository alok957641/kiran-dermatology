import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Save, Plus, Trash2, X, AlertCircle,
} from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import ImageUploader from '../../../components/admin/ImageUploader'
import Input from '../../../components/ui/Input'
import Textarea from '../../../components/ui/Textarea'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import Loader from '../../../components/ui/Loader'
import {
  getServiceBySlug,
  createService,
  updateService,
} from '../../../services/serviceService'
import { supabase } from '../../../lib/supabase'
import { slugify } from '../../../utils/slugify'

/* ============================================
   CATEGORIES — Dropdown me dikhengi
   ============================================ */
const CATEGORIES = [
  { label: 'Hair & Scalp', value: 'hair' },
  { label: 'Laser & Energy', value: 'laser' },
  { label: 'Aesthetic Dermatology', value: 'aesthetic' },
  { label: 'Acne & Scar', value: 'acne' },
  { label: 'Pigmentation', value: 'pigmentation' },
  { label: 'Vitiligo', value: 'vitiligo' },
  { label: 'Skin Procedures', value: 'procedures' },
]

// Icon options from lucide
const ICON_OPTIONS = [
  'Sparkles', 'Scissors', 'Zap', 'Sun', 'Shield', 'Circle',
  'Bug', 'Baby', 'Stethoscope', 'Heart', 'Star', 'Award',
  'Droplet', 'Wind', 'Flower', 'Leaf', 'UserRound', 'User',
  'CircleDashed', 'ScanFace', 'Droplets', 'Sprout', 'Scan',
  'SunMedium', 'Eraser', 'Grid3X3', 'Smile', 'Waves', 'Clock',
  'CircleAlert', 'Target', 'Layers', 'CircleDot', 'Palette',
  'CircleX', 'Eye', 'Microscope',
]

export default function ServiceForm() {
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: '',
      category: 'hair',
      name: '',
      short_description: '',
      icon: 'Sparkles',
      image: '',
      featured: false,
      overview: '',
      conditions: [{ value: '' }],
      procedures: [{ value: '' }],
      faqs: [{ question: '', answer: '' }],
      duration: '',
      sessions: '',
      display_order: 0,
    },
  })

  const {
    fields: conditionFields,
    append: appendCondition,
    remove: removeCondition,
  } = useFieldArray({ control, name: 'conditions' })

  const {
    fields: procedureFields,
    append: appendProcedure,
    remove: removeProcedure,
  } = useFieldArray({ control, name: 'procedures' })

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: 'faqs' })

  const nameValue = watch('name')
  const imageValue = watch('image')
  const featuredValue = watch('featured')

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && nameValue) {
      setValue('slug', slugify(nameValue))
    }
  }, [nameValue, isEdit, setValue])

  // Load service if editing
  useEffect(() => {
    if (!isEdit) return
    const fetchService = async () => {
      try {
        setFetching(true)
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error

        // Convert arrays to field-array format
        reset({
          ...data,
          category: data.category || 'hair',
          conditions: (data.conditions || []).map((v) => ({ value: v })),
          procedures: (data.procedures || []).map((v) => ({ value: v })),
          faqs: data.faqs || [{ question: '', answer: '' }],
        })
      } catch (err) {
        console.error(err)
        toast.error('Failed to load service')
        navigate('/admin/services')
      } finally {
        setFetching(false)
      }
    }
    fetchService()
  }, [id, isEdit, reset, navigate])

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)

      // Clean and convert
      const payload = {
        slug: data.slug,
        category: data.category, // ✅ Category add kiya
        name: data.name,
        short_description: data.short_description,
        icon: data.icon,
        image: data.image || null,
        featured: data.featured || false,
        overview: data.overview,
        conditions: (data.conditions || [])
          .map((c) => c.value?.trim())
          .filter(Boolean),
        procedures: (data.procedures || [])
          .map((p) => p.value?.trim())
          .filter(Boolean),
        faqs: (data.faqs || [])
          .filter((f) => f.question?.trim() && f.answer?.trim())
          .map((f) => ({
            question: f.question.trim(),
            answer: f.answer.trim(),
          })),
        duration: data.duration,
        sessions: data.sessions,
        display_order: Number(data.display_order) || 0,
      }

      if (isEdit) {
        await updateService(id, payload)
        toast.success('Service updated!')
      } else {
        await createService(payload)
        toast.success('Service created!')
      }

      navigate('/admin/services')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to save service')
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading service..." />
      </div>
    )
  }

  return (
    <>
      <AdminPageHeader
        title={isEdit ? 'Edit Service' : 'Add New Service'}
        description={
          isEdit
            ? 'Update the service details below.'
            : 'Create a new service for your clinic.'
        }
        action={
          <Link to="/admin/services">
            <Button variant="ghost" leftIcon={ArrowLeft} className="border border-slate-200">
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT — Main content (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Basic Information
              </h3>

              <div className="space-y-4">
                {/* ✅ Category Dropdown — Name se pehle */}
                <Select
                  label="Category"
                  placeholder="Select a category"
                  options={CATEGORIES}
                  required
                  error={errors.category?.message}
                  {...register('category', { required: 'Category is required' })}
                />

                <Input
                  label="Service Name"
                  placeholder="e.g. Acne & Scar Treatment"
                  required
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />

                <Input
                  label="Slug (URL)"
                  placeholder="acne-scar-treatment"
                  hint="Auto-generated from name. Used in the URL."
                  required
                  error={errors.slug?.message}
                  {...register('slug', { required: 'Slug is required' })}
                />

                <Textarea
                  label="Short Description"
                  placeholder="A brief 1-2 line description shown on cards..."
                  rows={2}
                  required
                  error={errors.short_description?.message}
                  {...register('short_description', {
                    required: 'Short description is required',
                  })}
                />
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Overview
              </h3>

              <Textarea
                placeholder="Detailed paragraph about this service — what it is, who needs it, how it helps..."
                rows={6}
                error={errors.overview?.message}
                {...register('overview')}
              />
            </div>

            {/* Conditions Treated */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-semibold text-slate-800 text-lg">
                  Conditions Treated
                </h3>
                <button
                  type="button"
                  onClick={() => appendCondition({ value: '' })}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {conditionFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Condition ${index + 1}`}
                      className="input-field"
                      {...register(`conditions.${index}.value`)}
                    />
                    <button
                      type="button"
                      onClick={() => removeCondition(index)}
                      className="p-2.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedures */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-semibold text-slate-800 text-lg">
                  Procedures / Treatments
                </h3>
                <button
                  type="button"
                  onClick={() => appendProcedure({ value: '' })}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {procedureFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Procedure ${index + 1}`}
                      className="input-field"
                      {...register(`procedures.${index}.value`)}
                    />
                    <button
                      type="button"
                      onClick={() => removeProcedure(index)}
                      className="p-2.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-semibold text-slate-800 text-lg">
                  FAQs
                </h3>
                <button
                  type="button"
                  onClick={() => appendFaq({ question: '', answer: '' })}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {faqFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3 pr-8">
                      <input
                        type="text"
                        placeholder="Question"
                        className="input-field"
                        {...register(`faqs.${index}.question`)}
                      />
                      <textarea
                        placeholder="Answer"
                        rows={3}
                        className="input-field resize-y"
                        {...register(`faqs.${index}.answer`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Publish Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Publish
              </h3>

              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={featuredValue}
                  onChange={(e) => setValue('featured', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 cursor-pointer"
                />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Featured Service
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Featured services show on the home page.
                  </p>
                </div>
              </label>

              <Input
                label="Display Order"
                type="number"
                placeholder="0"
                hint="Lower numbers appear first (e.g. 201, 202, 301...)"
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
                    ? 'Update Service'
                    : 'Create Service'}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Service Image
              </h3>

              <ImageUploader
                bucket="services"
                value={imageValue}
                onChange={(url) => setValue('image', url)}
                label=""
                aspect="video"
                hint="Optional"
              />
            </div>

            {/* Icon */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Icon
              </h3>

              <select
                className="input-field cursor-pointer"
                {...register('icon')}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 mt-2">
                Lucide icon name (used in cards)
              </p>
            </div>

            {/* Session Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Session Info
              </h3>

              <div className="space-y-4">
                <Input
                  label="Duration"
                  placeholder="e.g. 30–60 minutes"
                  {...register('duration')}
                />
                <Input
                  label="Sessions"
                  placeholder="e.g. 4–8 sessions"
                  {...register('sessions')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}