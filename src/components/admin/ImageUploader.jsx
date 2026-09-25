import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { uploadImage, deleteImage } from '../../services/storageService'
import { cn } from '../../utils/cn'

export default function ImageUploader({
  bucket,
  folder = '',
  value = '',
  onChange,
  label = 'Upload Image',
  aspect = 'video',
  className = '',
  hint = 'PNG, JPG, WEBP · Max 5MB',
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const inputRef = useRef(null)

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const { publicUrl, path } = await uploadImage(bucket, file, folder)
      setPreview(publicUrl)
      onChange?.(publicUrl, path)
      toast.success('Image uploaded!')
    } catch (error) {
      console.error(error)
      toast.error('Upload failed. Try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!preview) return
    setPreview('')
    onChange?.('', '')
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="label-field">{label}</label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div
          className={cn(
            'relative rounded-xl overflow-hidden border-2 border-borderLight bg-slate-50 group',
            aspectClasses[aspect]
          )}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-2 rounded-lg bg-white text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors inline-flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'w-full rounded-xl border-2 border-dashed border-slate-300 hover:border-primary bg-slate-50 hover:bg-primary-50/30 transition-all flex flex-col items-center justify-center gap-2 group',
            aspectClasses[aspect],
            uploading && 'opacity-60 cursor-wait'
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="text-sm text-slate-500 font-medium">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Click to upload
              </span>
              {hint && (
                <span className="text-xs text-slate-400">{hint}</span>
              )}
            </>
          )}
        </button>
      )}
    </div>
  )
}