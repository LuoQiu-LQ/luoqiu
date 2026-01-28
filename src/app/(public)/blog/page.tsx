import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { LoadingCard } from '@/components/ui/Loading'
import { createClient } from '@/lib/supabase-server'
import { Post } from '@/types'

export const revalidate = 60 // 每分钟重新验证

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, name, avatar_url),
      categories:categories(id, name, slug),
      tags:tags(id, name, slug)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)

  if (error || !posts) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">博客</h1>
        <p className="text-gray-600 dark:text-gray-400">暂无文章</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">博客</h1>
        <p className="text-gray-600 dark:text-gray-400">
          技术分享、经验总结和生活感悟
        </p>
      </header>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className="px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium"
        >
          全部
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">暂无文章</p>
          </div>
        ) : (
          posts.map((post: Post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card hover className="flex flex-col md:flex-row gap-6">
                {post.cover_image && (
                  <div className="md:w-48 md:flex-shrink-0">
                    <div className="aspect-video md:aspect-square bg-gray-100 dark:bg-white/10 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {post.categories?.map((cat) => (
                      <Badge key={cat.id} variant="primary">
                        {cat.name}
                      </Badge>
                    ))}
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {post.excerpt || '点击查看全文...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.author?.avatar_url && (
                        // eslint-disable-next-line @next/next/no-img-element -->
                        <img
                          src={post.author.avatar_url}
                          alt={post.author.name || '作者'}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {post.author?.name || '匿名'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {post.view_count} 阅读
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {posts.length >= 20 && (
        <div className="mt-12 flex justify-center gap-2">
          <button className="btn btn-secondary" disabled>
            上一页
          </button>
          <button className="btn btn-secondary">
            下一页
          </button>
        </div>
      )}
    </div>
  )
}
