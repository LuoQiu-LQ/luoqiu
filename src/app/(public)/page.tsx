import Link from 'next/link'
import { ArrowRight, Github, Send, Mail } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar
            src="/avatar.png"
            name="落秋"
            size="xl"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              你好，我是落秋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
              开发者 & 设计师，专注于构建优雅的数字产品。
              热爱开源，热爱分享。
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link href="/blog" className="btn btn-primary">
                阅读博客
              </Link>
              <Link href="/guestbook" className="btn btn-secondary">
                留言交流
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:border-blue-500 transition-colors flex items-center gap-3"
          >
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href="https://t.me/l58023"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:border-blue-400 transition-colors flex items-center gap-3"
          >
            <Send className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium">Telegram</span>
          </a>
          <a
            href="mailto:00510liu@gmail.com"
            className="card hover:border-orange-500 transition-colors flex items-center gap-3"
          >
            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium">邮箱</span>
          </a>
          <Link href="/tools" className="card hover:border-purple-500 transition-colors flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium">工具箱</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-gray-200 dark:border-white/10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          我能做什么
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">全栈开发</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              前端后端都能做，从 UI 设计到 API 开发，打造完整的数字产品。
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">UI/UX 设计</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              注重用户体验，追求简洁优雅的设计风格。
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">性能优化</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              关注性能，用最佳实践打造快速响应的应用。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
