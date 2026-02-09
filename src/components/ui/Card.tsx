import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'glass'
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles =
      'rounded-xl transition-all duration-300'

    const variants = {
      default:
        'bg-gray-900 border border-gray-800',
      hover:
        'bg-gray-900 border border-gray-800 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 cursor-pointer',
      glass:
        'bg-gray-900/50 backdrop-blur-lg border border-primary/20',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
