import React from 'react'
import { Achievement } from '../types/missions'
import { Award, Calendar, Zap } from 'lucide-react'

interface AchievementCardProps {
  achievement: Achievement
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50'
      case 'rare': return 'border-blue-300 bg-blue-50'
      case 'epic': return 'border-purple-300 bg-purple-50'
      case 'legendary': return 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Común'
      case 'rare': return 'Raro'
      case 'epic': return 'Épico'
      case 'legendary': return 'Legendario'
      default: return 'Logro'
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-yellow-200/50 shadow-2xl'
      case 'epic': return 'shadow-purple-200/50 shadow-xl'
      case 'rare': return 'shadow-blue-200/50 shadow-lg'
      default: return 'shadow-lg'
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)} ${!achievement.earned ? 'opacity-60 grayscale' : ''}`}>
      {/* Animated Background for Legendary */}
      {achievement.animated && achievement.earned && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 animate-pulse"></div>
      )}
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-15`}></div>
      
      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`text-3xl ${achievement.animated && achievement.earned ? 'animate-bounce' : ''}`}>
              {achievement.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wide ${
                  achievement.rarity === 'legendary' ? 'text-yellow-600' :
                  achievement.rarity === 'epic' ? 'text-purple-600' :
                  achievement.rarity === 'rare' ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {getRarityLabel(achievement.rarity)}
                </span>
                {achievement.earned && (
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight">
                {achievement.name}
              </h3>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-600">
              <Zap size={14} />
              <span className="font-bold text-sm">+{achievement.bonus}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
        <p className="text-xs text-gray-500 italic mb-3">{achievement.criteria}</p>

        {/* Earned Status */}
        {achievement.earned ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Award size={16} />
              <span className="font-bold text-sm">¡Desbloqueado!</span>
            </div>
            {achievement.earnedDate && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Calendar size={12} />
                <span className="text-xs">
                  {new Date(achievement.earnedDate).toLocaleDateString('es-ES')}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-xs">?</span>
            </div>
            <span className="font-medium text-sm">Por desbloquear</span>
          </div>
        )}
      </div>

      {/* Legendary Sparkle Effect */}
      {achievement.rarity === 'legendary' && achievement.earned && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>
      )}
    </div>
  )
}