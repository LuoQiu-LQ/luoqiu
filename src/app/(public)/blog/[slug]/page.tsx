import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { createClient } from '@/lib/supabase-server'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // 获取文章
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, name, avatar_url, bio),
      categories:categories(id, name, slug),
      tags:tags(id, name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    notFound()
  }

  // 增加阅读量
  await supabase.rpc('increment_view_count', { post_id: post.id })

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.categories?.map((cat: { id: number; name: string }) => (
            <Badge key={cat.id} variant="primary">
              {cat.name}
            </Badge>
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {formatDate(post.published_at || post.created_at)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {post.view_count} 阅读
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar
            src={post.author?.avatar_url}
            name={post.author?.name || '作者'}
            size="lg"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {post.author?.name || '匿名'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {post.author?.bio || '落秋工坊作者'}
            </p>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="mb-8 rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="markdown">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag: { id: number; name: string }) => (
              <Badge key={tag.id} variant="default">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex justify-between">
        <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← 返回博客
        </a>
      </div>
    </article>
  )
}
