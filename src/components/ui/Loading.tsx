import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loading({ size = 'md', className }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-blue-500',
          sizeClasses[size]
        )}
      />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <Loading size="lg" className="mb-4" />
        <p className="text-gray-500 dark:text-gray-400">加载中...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4 mb-4" />
      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
    </div>
  )
}
