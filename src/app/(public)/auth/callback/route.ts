import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // 创建或更新用户资料
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || '用户',
            avatar_url: user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
            ignoreDuplicates: true,
          })

        if (profileError) {
          console.error('Profile upsert error:', profileError)
        }
      }

      return redirect(next)
    }
  }

  // OAuth 回调失败，返回登录页
  return redirect('/auth/login?error=auth_failed')
}
