import React from 'react'
import { Mission } from '../types/missions'
import { Clock, Star, Zap } from 'lucide-react'

interface MissionCardProps {
  mission: Mission
  onComplete?: (missionId: string) => void
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onComplete }) => {
  const progressPercentage = (mission.progress / mission.maxProgress) * 100
  const isCompleted = mission.completed || mission.progress >= mission.maxProgress

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'border-green-200 bg-green-50'
      case 'intermediate': return 'border-blue-200 bg-blue-50'
      case 'advanced': return 'border-purple-200 bg-purple-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'basic': return 'Básica'
      case 'intermediate': return 'Intermedia'
      case 'advanced': return 'Avanzada'
      default: return 'Misión'
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return <Clock size={12} />
      case 'monthly': return <Star size={12} />
      case 'special': return <Zap size={12} />
      default: return <Clock size={12} />
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 ${getCategoryColor(mission.category)} ${isCompleted ? 'opacity-75' : ''}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${mission.color} opacity-10`}></div>
      
      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{mission.icon}</span>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {getCategoryLabel(mission.category)}
                </span>
                <div className="flex items-center text-gray-400">
                  {getFrequencyIcon(mission.frequency)}
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight">
                {mission.title}
              </h3>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-emerald-600">
              <Zap size={14} />
              <span className="font-bold text-sm">+{mission.points}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3">{mission.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">
              Progreso: {mission.progress.toFixed(1)} / {mission.maxProgress}
            </span>
            <span className="font-bold text-gray-800">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${mission.color} transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            >
              {isCompleted && (
                <div className="h-full bg-white/30 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-emerald-600">
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="font-bold text-sm">¡Misión Completada!</span>
          </div>
        )}
      </div>

      {/* Completion Overlay */}
      {isCompleted && (
        <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            COMPLETADA
          </div>
        </div>
      )}
    </div>
  )
}