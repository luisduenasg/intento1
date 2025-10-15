import React from 'react'
import { Home, Map, Gift, User, Target } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'missions', icon: Target, label: 'Misiones' },
    { id: 'map', icon: Map, label: 'Mapa' },
    { id: 'rewards', icon: Gift, label: 'Recompensas' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-emerald-200/50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-gray-500 hover:text-emerald-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-emerald-600' : ''} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}