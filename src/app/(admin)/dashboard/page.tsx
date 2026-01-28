import { createClient } from '@/lib/supabase-server'
import { Card } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 获取统计数据
  const { data: stats } = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact' }),
    supabase.from('posts').select('id').eq('status', 'published'),
    supabase.from('comments').select('id', { count: 'exact' }),
    supabase.from('messages').select('id', { count: 'exact' }),
  ])

  const postCount = stats[0]?.count || 0
  const publishedCount = stats[1]?.count || 0
  const commentCount = stats[2]?.count || 0
  const messageCount = stats[3]?.count || 0

  // 获取最近文章
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        管理后台
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">文章总数</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{postCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">已发布</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{publishedCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">评论数</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{commentCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">留言数</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{messageCount}</p>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            最近文章
          </h2>
          <a href="/posts/new" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            新建文章 →
          </a>
        </div>

        {recentPosts?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            暂无文章
          </p>
        ) : (
          <div className="space-y-4">
            {recentPosts?.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 last:border-0"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {formatDate(post.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                    }`}
                  >
                    {post.status === 'published' ? '已发布' : '草稿'}
                  </span>
                  <a
                    href={`/posts/${post.id}/edit`}
                    className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    编辑
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
