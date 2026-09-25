import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader'
import RatingInput from '../../../components/admin/RatingInput'
import Input from '../../../components/ui/Input'
import Textarea from '../../../components/ui/Textarea'
import Button from '../../../components/ui/Button'
import Loader from '../../../components/ui/Loader'
import {
  createTestimonial,
  updateTestimonial,
} from '../../../services/testimonialService'
import { supabase } from '../../../lib/supabase'

export default function TestimonialForm() {
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
      name: '',
      city: '',
      rating: 5,
      message: '',
      service: '',
      featured: false,
      approved: true,
      display_order: 0,
    },
  })

  const approvedValue = watch('approved')
  const featuredValue = watch('featured')

  useEffect(() => {
    if (!isEdit) return
    const fetchItem = async () => {
      try {
        setFetching(true)
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        reset(data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load testimonial')
        navigate('/admin/testimonials')
      } finally {
        setFetching(false)
      }
    }
    fetchItem()
  }, [id, isEdit, reset, navigate])

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)
      const payload = {
        name: data.name,
        city: data.city,
        rating: Number(data.rating) || 5,
        message: data.message,
        service: data.service || null,
        featured: data.featured || false,
        approved: data.approved || false,
        display_order: Number(data.display_order) || 0,
      }

      if (isEdit) {
        await updateTestimonial(id, payload)
        toast.success('Testimonial updated!')
      } else {
        await createTestimonial(payload)
        toast.success('Testimonial created!')
      }
      navigate('/admin/testimonials')
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
        title={isEdit ? 'Edit Testimonial' : 'Add Testimonial'}
        description={
          isEdit
            ? 'Update the testimonial details.'
            : 'Add a new patient review.'
        }
        action={
          <Link to="/admin/testimonials">
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

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Reviewer Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  placeholder="Patient name"
                  required
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />
                <Input
                  label="City"
                  placeholder="e.g. Patna"
                  {...register('city')}
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Service"
                  placeholder="e.g. Acne & Scar Treatment"
                  hint="Optional — which treatment was this for?"
                  {...register('service')}
                />
              </div>

              <div className="mt-5">
                <label className="label-field">Rating</label>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <RatingInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-lg mb-5">
                Review
              </h3>

              <Textarea
                placeholder="What did the patient say?"
                rows={6}
                required
                error={errors.message?.message}
                {...register('message', { required: 'Message is required' })}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-base mb-4">
                Settings
              </h3>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={approvedValue}
                    onChange={(e) => setValue('approved', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Approved
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Show this review on the website.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={featuredValue}
                    onChange={(e) => setValue('featured', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Featured
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Highlight on the home page.
                    </p>
                  </div>
                </label>
              </div>

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
                    ? 'Update'
                    : 'Create Testimonial'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}