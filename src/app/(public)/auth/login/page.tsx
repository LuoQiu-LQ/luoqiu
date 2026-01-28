import { Github } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function LoginPage() {
  const supabase = await createClient()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            登录
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            登录后可以评论、收藏文章
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/auth/github"
            className="btn btn-secondary w-full justify-center gap-2"
          >
            <Github className="w-5 h-5" />
            GitHub 登录
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500">
          登录即表示同意{' '}
          <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
            服务条款
          </Link>
          {' '}和{' '}
          <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
            隐私政策
          </Link>
        </p>
      </Card>
    </div>
  )
}
