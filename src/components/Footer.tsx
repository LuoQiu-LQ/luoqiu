import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0b] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                L
              </div>
              <span>落秋工坊</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              专注于技术分享与数字产品开发的个人网站。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  工具
                </Link>
              </li>
              <li>
                <Link href="/guestbook" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  留言板
                </Link>
              </li>
              <li>
                <Link href="/links" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  友链
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">社交</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://t.me/l58023" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:00510liu@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  邮箱
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} 落秋工坊. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Powered by Next.js + Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
