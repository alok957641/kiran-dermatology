import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { cn } from '../../utils/cn'

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    ['link'],
    [{ align: [] }],
    ['clean'],
  ],
}

// ✅ 'bullet' hata diya — sirf 'list' rakha
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'blockquote',
  'link',
  'align',
]

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write your content here...',
  error,
  label,
  className = '',
}) {
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="label-field">{label}</label>}

      <div
        className={cn(
          'rich-editor-wrapper rounded-xl overflow-hidden border bg-white transition-colors',
          error
            ? 'border-red-400'
            : 'border-borderLight focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
        )}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}