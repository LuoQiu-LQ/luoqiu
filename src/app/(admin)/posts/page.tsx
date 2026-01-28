import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Filter } from 'lucide-react'

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  const { status = 'all', page = '1' } = await searchParams
  const supabase = await createClient()
  const limit = 10
  const offset = (Number(page) - 1) * limit

  let query = supabase.from('posts').select('*', { count: 'exact' })

  if (status !== 'all') {
    query = query.eq('status', status)
  }

  const { data: posts, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          文章管理
        </h1>
        <Link href="/posts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新建文章
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/posts?status=all">
              <Button variant={status === 'all' ? 'primary' : 'secondary'} size="sm">
                全部
              </Button>
            </Link>
            <Link href="/posts?status=published">
              <Button variant={status === 'published' ? 'primary' : 'secondary'} size="sm">
                已发布
              </Button>
            </Link>
            <Link href="/posts?status=draft">
              <Button variant={status === 'draft' ? 'primary' : 'secondary'} size="sm">
                草稿
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Posts List */}
      <Card>
        {error || posts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {error ? '加载失败' : '暂无文章'}
            </p>
            {!error && (
              <Link href="/posts/new" className="mt-4 inline-block">
                <Button>新建第一篇文章</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-500">
                    标题
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-500">
                    状态
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-500">
                    发布时间
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-500">
                    阅读量
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-500">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900 dark:text-white truncate max-w-[300px]">
                        {post.title}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                        }`}
                      >
                        {post.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500">
                      {formatDate(post.published_at || post.created_at)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500">
                      {post.view_count}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                          编辑
                        </Link>
                        <button className="text-sm text-red-500 hover:underline">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {count && count > limit && (
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="secondary" disabled={Number(page) <= 1}>
              上一页
            </Button>
            <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-500">
              第 {page} 页 / 共 {Math.ceil(count / limit)} 页
            </span>
            <Button variant="secondary" disabled={Number(page) >= Math.ceil(count / limit)}>
              下一页
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
