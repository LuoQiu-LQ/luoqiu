import { createClient } from '@/lib/supabase-server'
import { User } from '@/types'

export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile as User | null
}

export async function requireUser(): Promise<User> {
  const user = await getUser()
  
  if (!user) {
    throw new Error('请先登录')
  }
  
  return user
}
