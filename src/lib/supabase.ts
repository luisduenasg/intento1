import { createClient } from '@supabase/supabase-js'

// Mock Supabase configuration for demo purposes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key-for-binwise-app'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          points: number
          level: number
          total_recycled: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          points?: number
          level?: number
          total_recycled?: number
        }
        Update: {
          full_name?: string
          points?: number
          level?: number
          total_recycled?: number
        }
      }
      recycling_activities: {
        Row: {
          id: string
          user_id: string
          material_type: string
          quantity: number
          points_earned: number
          location: string
          created_at: string
        }
        Insert: {
          user_id: string
          material_type: string
          quantity: number
          points_earned: number
          location: string
        }
      }
      rewards: {
        Row: {
          id: string
          title: string
          description: string
          points_required: number
          partner_name: string
          image_url: string
          is_active: boolean
          created_at: string
        }
      }
      recycling_centers: {
        Row: {
          id: string
          name: string
          address: string
          latitude: number
          longitude: number
          materials_accepted: string[]
          phone: string
          hours: string
          is_active: boolean
        }
      }
    }
  }
}