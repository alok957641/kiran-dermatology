import { Star } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function RatingInput({ value = 5, onChange, className = '' }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className="p-1 transition-transform hover:scale-110 focus:outline-none"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            className={cn(
              'w-6 h-6 transition-colors',
              star <= value
                ? 'fill-accent text-accent'
                : 'text-slate-300 hover:text-accent/50'
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-medium text-slate-600">
        {value} / 5
      </span>
    </div>
  )
}