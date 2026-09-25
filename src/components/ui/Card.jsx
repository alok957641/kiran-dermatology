import { cn } from '../../utils/cn'

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-soft transition-all duration-500 ease-smooth',
        hover && 'hover:shadow-large hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={cn('p-6', className)}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={cn('p-6 pt-4 border-t border-borderLight', className)}>
      {children}
    </div>
  )
}

export default Card