import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-600 hover:shadow-glow',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 hover:shadow-large',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-secondary hover:bg-primary-50 hover:text-primary',
  accent: 'bg-accent text-secondary font-semibold hover:bg-accent-600 hover:text-white',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  success: 'bg-green-500 text-white hover:bg-green-600',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  icon: 'p-2.5 rounded-lg',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      loading = false,
      disabled = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium transition-all duration-300 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          'cursor-pointer select-none whitespace-nowrap',
          !isDisabled && 'hover:-translate-y-0.5 active:translate-y-0',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="w-4 h-4" />}
            {children}
            {RightIcon && <RightIcon className="w-4 h-4" />}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button