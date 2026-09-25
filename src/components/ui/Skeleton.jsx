import { cn } from '../../utils/cn'

export default function Skeleton({ className = '', variant = 'rect', ...props }) {
  const base = 'animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]'

  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  }

  return <div className={cn(base, variants[variant], className)} {...props} />
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4 shadow-soft">
      <Skeleton className="w-full h-48" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-full" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="w-full h-14" />
      ))}
    </div>
  )
}