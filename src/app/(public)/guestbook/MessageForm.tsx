'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase-client'
import { User } from '@/types'

interface MessageFormProps {
  user: User | null
}

export function MessageForm({ user }: MessageFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!content.trim()) {
      setError('请输入留言内容')
      return
    }

    if (!user) {
      setError('请先登录后再留言')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          content: content.trim(),
        })

      if (error) throw error

      setContent('')
      router.refresh()
    } catch (e: any) {
      setError(e.message || '发送失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        写留言
      </h2>

      {!user ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            登录后可以留言
          </p>
          <Button variant="secondary">
            登录后留言
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的想法..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? '发送中...' : '发送留言'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
