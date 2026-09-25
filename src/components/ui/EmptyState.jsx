import { cn } from '../../utils/cn'

export default function EmptyState({
  icon: Icon,
  title = 'Nothing here yet',
  description = '',
  action = null,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
    >
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-5">
          <Icon className="w-10 h-10 text-primary" />
        </div>
      )}

      <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-textSecondary max-w-md mb-6">{description}</p>
      )}

      {action && <div>{action}</div>}
    </div>
  )
}