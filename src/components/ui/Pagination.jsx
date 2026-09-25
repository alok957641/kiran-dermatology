import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={cn('flex items-center justify-center gap-1.5', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg border border-borderLight text-textSecondary',
          'hover:bg-primary-50 hover:text-primary hover:border-primary/30 transition-colors',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-textMuted select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all',
              page === currentPage
                ? 'bg-primary text-white shadow-glow'
                : 'border border-borderLight text-textSecondary hover:bg-primary-50 hover:text-primary hover:border-primary/30'
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg border border-borderLight text-textSecondary',
          'hover:bg-primary-50 hover:text-primary hover:border-primary/30 transition-colors',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}