import { createClient } from '@/lib/supabase-server'
import { formatRelativeTime } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

export default async function CommentsPage() {
  const supabase = await createClient()

  const { data: comments, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:profiles(id, name, avatar_url),
      post:posts(id, title, slug)
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        评论管理
      </h1>

      <Card>
        {error || comments?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {error ? '加载失败' : '暂无评论'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments?.map((comment: any) => (
              <div
                key={comment.id}
                className="flex gap-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0"
              >
                <Avatar
                  src={comment.user?.avatar_url}
                  name={comment.user?.name || '匿名'}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.user?.name || '匿名用户'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {formatRelativeTime(comment.created_at)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      评论了
                    </span>
                    <a
                      href={`/blog/${comment.post?.slug}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {comment.post?.title || '未知文章'}
                    </a>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    通过
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
