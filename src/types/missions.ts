export interface Mission {
  id: string
  title: string
  description: string
  points: number
  category: 'basic' | 'intermediate' | 'advanced'
  frequency: 'weekly' | 'monthly' | 'special'
  progress: number
  maxProgress: number
  completed: boolean
  icon: string
  color: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  criteria: string
  icon: string
  color: string
  bonus: number
  earned: boolean
  earnedDate?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  animated?: boolean
}

export interface UserProgress {
  totalRecycled: number
  totalCO2Saved: number
  centersVisited: number
  qrScanned: number
  usersInvited: number
  campaignsParticipated: number
  consecutiveWeeks: number
  consecutiveMonths: number
  registeredRecycling: number
}