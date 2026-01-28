import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200': variant === 'default',
          'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300': variant === 'primary',
          'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300': variant === 'success',
          'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300': variant === 'warning',
          'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
