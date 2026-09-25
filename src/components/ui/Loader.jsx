import { cn } from '../../utils/cn'

export default function Loader({ size = 'md', className = '', text = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'border-primary/20 border-t-primary rounded-full animate-spin',
          sizeClasses[size]
        )}
        style={{ borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px' }}
      />
      {text && <p className="text-sm text-textMuted font-medium">{text}</p>}
    </div>
  )
}

export function FullPageLoader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  )
}