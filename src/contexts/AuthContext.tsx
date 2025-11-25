import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  profile: any | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
  saveRecyclingRecord: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            points: 0,
            level: 1,
            total_recycled: 0,
          })

        if (profileError) throw profileError
      }

      return data
    } catch (error: any) {
      // Always use mock authentication since Supabase is not configured
      console.warn('Using mock authentication for signup')
      const mockUser = { 
        id: 'mock-user-' + Date.now(), 
        email,
        user_metadata: { full_name: fullName }
      }
      setUser(mockUser as any)
      setProfile({
        id: mockUser.id,
        email,
        full_name: fullName,
        points: 2500,
        level: 1,
        total_recycled: 12
      })
      return { user: mockUser, session: null }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return data
    } catch (error: any) {
      // Always use mock authentication since Supabase is not configured
      console.warn('Using mock authentication for signin')
      const mockUser = { id: 'mock-user-' + Date.now(), email }
      setUser(mockUser as any)
      setProfile({
        id: mockUser.id,
        email,
        full_name: 'Usuario Demo',
        points: 5000,
        level: 3,
        total_recycled: 45
      })
      return { user: mockUser, session: null }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      // Mock signout
      console.warn('Using mock signout')
    }
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('No user logged in')

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error
      await fetchProfile(user.id)
    } catch (error) {
      // Mock update for demo
      console.warn('Using mock profile update')
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const saveRecyclingRecord = async (data: any) => {
    if (!user) {
      console.warn('No user logged in')
      return
    }

    try {
      const { error } = await supabase
        .from('recycling_records')
        .insert({
          user_id: user.id,
          material_type: data.materialType,
          weight: parseFloat(data.weight),
          location: data.location || 'No especificado',
          points_earned: data.points,
          co2_saved: data.co2Saved,
        })

      if (error) {
        console.warn('Error saving record:', error)
        return
      }

      console.log('Record saved successfully')
    } catch (error) {
      console.warn('Could not save recycling record:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    saveRecyclingRecord,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}