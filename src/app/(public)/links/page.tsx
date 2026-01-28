import { createClient } from '@/lib/supabase-server'
import { Card } from '@/components/ui/Card'
import Image from 'next/image'

export const revalidate = 3600 // 1小时缓存

export default async function LinksPage() {
  const supabase = await createClient()

  // 获取已通过的友链
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          友链
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          交换友链，一起成长
        </p>

        {/* Apply Link */}
        <Card className="text-center py-8">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
            申请友链
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            交换友链请在留言板留言或发送邮件
          </p>
          <a
            href="mailto:00510liu@gmail.com"
            className="btn btn-primary"
          >
            联系博主
          </a>
        </Card>
      </header>

      {/* Links List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          我的朋友们
        </h2>

        <div className="grid gap-4">
          {links?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              暂无友链
            </p>
          ) : (
            links?.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:border-blue-500 transition-colors flex items-center gap-4"
              >
                {link.avatar && (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10 flex-shrink-0">
                    <Image
                      src={link.avatar}
                      alt={link.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {link.description || '暂无描述'}
                  </p>
                </div>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
