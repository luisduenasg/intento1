import React from 'react'
import { X, Target, Zap, Clock, Star, TrendingUp } from 'lucide-react'
import { Mission } from '../../types/missions'

interface MissionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  mission: Mission | null
  onStartMission?: (missionId: string) => void
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  mission,
  onStartMission 
}) => {
  if (!isOpen || !mission) return null

  const progressPercentage = (mission.progress / mission.maxProgress) * 100
  const isCompleted = mission.completed || mission.progress >= mission.maxProgress

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'basic':
        return { 
          label: 'Misión Básica', 
          color: 'from-green-400 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50',
          textColor: 'text-green-800'
        }
      case 'intermediate':
        return { 
          label: 'Misión Intermedia', 
          color: 'from-blue-400 to-cyan-500',
          bgColor: 'from-blue-50 to-cyan-50',
          textColor: 'text-blue-800'
        }
      case 'advanced':
        return { 
          label: 'Misión Avanzada', 
          color: 'from-purple-400 to-pink-500',
          bgColor: 'from-purple-50 to-pink-50',
          textColor: 'text-purple-800'
        }
      default:
        return { 
          label: 'Misión', 
          color: 'from-gray-400 to-gray-500',
          bgColor: 'from-gray-50 to-gray-100',
          textColor: 'text-gray-800'
        }
    }
  }

  const getFrequencyInfo = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return { label: 'Semanal', icon: Clock, description: 'Se renueva cada semana' }
      case 'monthly':
        return { label: 'Mensual', icon: Star, description: 'Se renueva cada mes' }
      case 'special':
        return { label: 'Especial', icon: TrendingUp, description: 'Misión única de impacto' }
      default:
        return { label: 'Misión', icon: Target, description: 'Misión especial' }
    }
  }

  const categoryInfo = getCategoryInfo(mission.category)
  const frequencyInfo = getFrequencyInfo(mission.frequency)
  const FrequencyIcon = frequencyInfo.icon

  const getActionSteps = (missionId: string) => {
    switch (missionId) {
      case 'first-recycle':
        return [
          '📱 Ve a "Registrar Reciclaje" en la pantalla principal',
          '📍 Visita un centro de reciclaje autorizado',
          '📷 Escanea el código QR del centro',
          '♻️ Registra tu material reciclado',
          '🎉 ¡Gana tus primeros puntos!'
        ]
      case 'weekly-5kg':
        return [
          '⚖️ Acumula 5 kg de material reciclado',
          '📊 Registra cada actividad de reciclaje',
          '🗓️ Completa la meta antes del domingo',
          '🏆 Desbloquea la recompensa semanal'
        ]
      case 'visit-3-centers':
        return [
          '🗺️ Usa el mapa para encontrar centros cercanos',
          '📍 Visita 3 centros diferentes',
          '📱 Escanea el QR en cada ubicación',
          '✅ Verifica tu visita automáticamente'
        ]
      case 'first-qr-scan':
        return [
          '📍 Localiza un centro autorizado',
          '📷 Abre la función de escaneo QR',
          '🎯 Apunta al código oficial del centro',
          '✅ Confirma tu ubicación'
        ]
      default:
        return [
          '🎯 Sigue las instrucciones específicas',
          '📊 Monitorea tu progreso',
          '🏆 Completa la misión para ganar puntos'
        ]
    }
  }

  const handleStartMission = () => {
    if (onStartMission) {
      onStartMission(mission.id)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.color} opacity-10`}></div>
          <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{mission.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{mission.title}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs font-bold uppercase tracking-wide ${categoryInfo.textColor}`}>
                    {categoryInfo.label}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <FrequencyIcon size={12} className="mr-1" />
                    <span className="text-xs">{frequencyInfo.label}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Descripción</h3>
            <p className="text-gray-600">{mission.description}</p>
            <p className="text-sm text-gray-500 mt-2">{frequencyInfo.description}</p>
          </div>

          {/* Progress */}
          <div className={`bg-gradient-to-r ${categoryInfo.bgColor} rounded-2xl p-4 border border-gray-200`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800">Progreso Actual</h3>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-600" size={16} />
                <span className="font-bold text-yellow-700">+{mission.points} puntos</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {mission.progress.toFixed(1)} / {mission.maxProgress}
                </span>
                <span className="font-bold text-gray-800">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              
              <div className="w-full bg-white/70 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${mission.color} transition-all duration-500 ease-out relative`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  {isCompleted && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            {isCompleted && (
              <div className="mt-3 flex items-center justify-center space-x-2 text-emerald-600">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="font-bold">¡Misión Completada!</span>
              </div>
            )}
          </div>

          {/* Steps to Complete */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Cómo Completar</h3>
            <div className="space-y-3">
              {getActionSteps(mission.id).map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Info */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">Recompensas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-600 mb-1">
                  <Zap size={16} />
                  <span className="font-bold">{mission.points}</span>
                </div>
                <p className="text-xs text-yellow-700">Puntos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                  <TrendingUp size={16} />
                  <span className="font-bold">XP</span>
                </div>
                <p className="text-xs text-green-700">Experiencia</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {isCompleted ? (
              <div className="bg-emerald-100 text-emerald-800 font-bold py-4 rounded-2xl text-center">
                ✅ Misión Completada
              </div>
            ) : (
              <button
                onClick={handleStartMission}
                className={`w-full bg-gradient-to-r ${mission.color} hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]`}
              >
                🚀 ¡Empezar Misión!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}