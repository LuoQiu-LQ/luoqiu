import Image from 'next/image'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const sizeMap = {
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '64px',
}

export function Avatar({ src, name = 'User', size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name || 'Avatar'}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
          className="object-cover"
          unoptimized
        />
      ) : (
        <span className="select-none">{getInitials(name)}</span>
      )}
    </div>
  )
}
