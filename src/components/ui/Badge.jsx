import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  accent: 'bg-accent-50 text-accent-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-blue-700',
  outline: 'border border-borderLight text-textSecondary bg-transparent',
}

const sizes = {
  sm: 'px-2.5 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide uppercase',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'primary' && 'bg-primary',
            variant === 'accent' && 'bg-accent',
            variant === 'info' && 'bg-blue-500'
          )}
        />
      )}
      {children}
    </span>
  )
}