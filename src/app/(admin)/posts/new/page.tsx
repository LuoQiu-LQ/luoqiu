'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase-client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    status: 'draft' as 'draft' | 'published',
    published_at: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('请输入标题')
      return
    }

    if (!formData.content.trim()) {
      setError('请输入内容')
      return
    }

    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase.from('posts').insert({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image || null,
        status: formData.status,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
        author_id: user?.id,
      })

      if (error) throw error

      router.push('/posts')
    } catch (e: any) {
      setError(e.message || '保存失败')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setFormData({ ...formData, slug })
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          新建文章
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                文章内容
              </h2>

              <div className="space-y-4">
                <Input
                  label="标题"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="输入文章标题"
                />

                <div className="flex items-center gap-2">
                  <Input
                    label="Slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="article-slug"
                  />
                  <Button type="button" variant="secondary" onClick={generateSlug} className="mt-6">
                    自动生成
                  </Button>
                </div>

                <Textarea
                  label="摘要"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="文章摘要（可选）"
                  rows={3}
                />

                <Textarea
                  label="内容 (支持 Markdown)"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="使用 Markdown 编写文章内容..."
                  rows={15}
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                发布设置
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    状态
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    className="w-full px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="draft">草稿</option>
                    <option value="published">立即发布</option>
                  </select>
                </div>

                <Input
                  label="封面图 URL"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </Card>

            {error && (
              <Card className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </Card>
            )}

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? '保存中...' : '保存文章'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
