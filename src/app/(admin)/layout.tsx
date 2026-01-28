import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Home, FileText, MessageSquare, BarChart, Settings, LogOut } from 'lucide-react'

const adminNav = [
  { href: '/dashboard', label: '概览', icon: Home },
  { href: '/posts', label: '文章管理', icon: FileText },
  { href: '/comments', label: '评论管理', icon: MessageSquare },
  { href: '/settings', label: '系统设置', icon: Settings },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const supabase = await createClient()
  
  // 检查登录状态
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0b]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-white/5 border-r border-gray-200 dark:border-white/10">
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/" className="font-bold text-lg">
            落秋工坊 · 管理
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            返回前台
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
