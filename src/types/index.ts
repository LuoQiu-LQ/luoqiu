export interface Profile {
  id: string
  username: string | null
  name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  github_url: string | null
  twitter_url: string | null
  telegram_username: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: number
  slug: string
  title: string
  excerpt: string | null
  content: string
  cover_image: string | null
  status: 'draft' | 'published' | 'archived'
  view_count: number
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  author?: Profile
  categories?: Category[]
  tags?: Tag[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Comment {
  id: number
  post_id: number
  user_id: string | null
  parent_id: number | null
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  user?: Profile
  replies?: Comment[]
}

export interface Link {
  id: number
  name: string
  url: string
  description: string | null
  avatar: string | null
  status: 'pending' | 'approved' | 'rejected'
  contact: string | null
  created_at: string
}

export interface Message {
  id: number
  user_id: string | null
  content: string
  created_at: string
  user?: Profile
}

export interface PageView {
  id: number
  path: string
  referer: string | null
  user_agent: string | null
  country: string | null
  user_id: string | null
  created_at: string
}
