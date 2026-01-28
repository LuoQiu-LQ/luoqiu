import { createClient } from '@/lib/supabase-server'
import { formatRelativeTime } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { MessageForm } from './MessageForm'
import { getUser } from '@/lib/auth'

export const revalidate = 60

export default async function GuestbookPage() {
  const supabase = await createClient()
  const user = await getUser()

  // 获取留言
  const { data: messages } = await supabase
    .from('messages')
    .select(`
      *,
      user:profiles(id, name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          留言板
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          有什么想说的？在这里留言吧！
        </p>
      </header>

      {/* Message Form */}
      <Card className="mb-12">
        <MessageForm user={user} />
      </Card>

      {/* Messages List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          留言 ({messages?.length || 0})
        </h2>

        {messages?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            暂无留言，快来抢占沙发！
          </p>
        ) : (
          messages?.map((message: any) => (
            <div key={message.id} className="flex gap-4">
              <Avatar
                src={message.user?.avatar_url}
                name={message.user?.name || '匿名'}
                size="md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.user?.name || '匿名用户'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {formatRelativeTime(message.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
