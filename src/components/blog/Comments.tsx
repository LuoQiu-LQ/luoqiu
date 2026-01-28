'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { formatRelativeTime } from '@/lib/utils'
import { MessageSquare, Send } from 'lucide-react'

interface Comment {
  id: number
  content: string
  created_at: string
  user?: {
    id: string
    name: string | null
    avatar_url: string | null
  }
  replies?: Comment[]
}

interface CommentsProps {
  postId: number
  comments: Comment[]
  user: any
}

export function Comments({ postId, comments, user }: CommentsProps) {
  const router = useRouter()
  const supabase = createClient()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [replyTo, setReplyTo] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        user_id: user?.id,
        content,
        parent_id: replyTo,
      })

      if (error) throw error

      setContent('')
      setReplyTo(null)
      router.refresh()
    } catch (e: any) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <div className="flex gap-3">
        <Avatar
          src={comment.user?.avatar_url}
          name={comment.user?.name || '匿名'}
          size="sm"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-white text-sm">
              {comment.user?.name || '匿名用户'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {formatRelativeTime(comment.created_at)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
            {comment.content}
          </p>
          {user && (
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="mt-2 text-xs text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              回复
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.map((reply) => renderComment(reply, true))}

      {/* Reply Form */}
      {replyTo === comment.id && (
        <form onSubmit={handleSubmit} className="mt-4 ml-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`回复 ${comment.user?.name || '匿名'}...`}
              className="flex-1 px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" size="sm" disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  )

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          评论 ({comments?.length || 0})
        </h2>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的想法..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading || !content.trim()}>
              {loading ? '发送中...' : '发送评论'}
            </Button>
          </div>
        </form>
      ) : (
        <Card className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            登录后可以评论
          </p>
          <a href="/auth/login" className="btn btn-primary">
            登录后评论
          </a>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments?.map((comment) => renderComment(comment))}
      </div>

      {!comments?.length && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          暂无评论，快来抢沙发！
        </p>
      )}
    </div>
  )
}
