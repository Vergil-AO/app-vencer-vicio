import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  clean_since: string | null
  total_days_clean: number
  current_streak: number
  longest_streak: number
  created_at: string
  updated_at: string
}

export type Addiction = {
  id: string
  user_id: string
  addiction_type: string
  severity: string | null
  triggers: string[] | null
  is_primary: boolean
  created_at: string
}

export type DailyCheckin = {
  id: string
  user_id: string
  strategy_id: string
  strategy_name: string
  completed: boolean
  checkin_date: string
  notes: string | null
  created_at: string
}

export type Goal = {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string | null
  target_days: number | null
  current_progress: number
  status: string
  deadline: string | null
  created_at: string
  completed_at: string | null
}

export type JournalEntry = {
  id: string
  user_id: string
  title: string | null
  content: string
  mood: string | null
  triggers: string[] | null
  entry_date: string
  is_private: boolean
  created_at: string
  updated_at: string
}

export type Reflection = {
  id: string
  user_id: string
  title: string
  content: string
  category: string | null
  is_favorite: boolean
  created_at: string
}

export type CommunityPost = {
  id: string
  user_id: string
  addiction_type: string
  title: string
  content: string
  likes_count: number
  comments_count: number
  created_at: string
  profiles?: {
    full_name: string | null
    avatar_url: string | null
  }
}

export type CommunityComment = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profiles?: {
    full_name: string | null
    avatar_url: string | null
  }
}

export type BlockedSite = {
  id: string
  user_id: string
  url: string
  category: string | null
  is_active: boolean
  created_at: string
}
