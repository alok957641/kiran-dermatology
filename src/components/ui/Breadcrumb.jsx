import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <Link
        to="/"
        className="flex items-center gap-1.5 text-textMuted hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <div key={i} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-textMuted/60" />
            {isLast || !item.path ? (
              <span className="text-primary font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="text-textMuted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}