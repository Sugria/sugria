import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
}

const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-6 py-3 transition-all duration-200',
        variant === 'primary' && 'bg-sugria-green text-white hover:bg-opacity-90',
        variant === 'outline' && 'border border-current hover:bg-opacity-10',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button 