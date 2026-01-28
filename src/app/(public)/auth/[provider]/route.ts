import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  const supabase = await createClient()
  const requestUrl = new URL(request.url)

  const providers: Record<string, string> = {
    github: 'github',
    google: 'google',
  }

  const authProvider = providers[provider]
  if (!authProvider) {
    return redirect('/auth/login?error=unsupported_provider')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: authProvider,
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  return redirect(data.url)
}
