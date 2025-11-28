import React from 'react'
import { Bell, Zap, Target, Award, TrendingUp, Recycle, Trophy } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationsContext'
import { missions } from '../../data/missions'
import { achievements } from '../../data/achievements'
import { RecycleModal } from '../modals/RecycleModal'
import { MissionDetailModal } from '../modals/MissionDetailModal'
import { SuccessModal } from '../modals/SuccessModal'
import { Mission } from '../../types/missions'

interface HomeScreenProps {
  onNavigate?: (tab: string) => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { profile, updateProfile, saveRecyclingRecord } = useAuth()
  const { addNotification, unreadCount } = useNotifications()
  const [showRecycleModal, setShowRecycleModal] = React.useState(false)
  const [showMissionModal, setShowMissionModal] = React.useState(false)
  const [selectedMission, setSelectedMission] = React.useState<Mission | null>(null)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [successData, setSuccessData] = React.useState<any>(null)
  const [successType, setSuccessType] = React.useState<'recycle' | 'mission' | 'reward'>('recycle')

  // Get active missions (not completed)
  const activeMissions = missions.filter(m => !m.completed && m.progress < m.maxProgress).slice(0, 3)
  const completedMissions = missions.filter(m => m.completed || m.progress >= m.maxProgress).length
  const earnedAchievements = achievements.filter(a => a.earned).length

  const stats = [
    { label: 'Puntos', value: profile?.points || 0, icon: Zap, color: 'text-yellow-600' },
    { label: 'Nivel', value: profile?.level || 1, icon: Award, color: 'text-purple-600' },
    { label: 'Reciclado', value: `${profile?.total_recycled || 0}kg`, icon: TrendingUp, color: 'text-green-600' },
  ]

  const handleRecycleRegister = () => {
    setShowRecycleModal(true)
  }

  const handleRecycleComplete = async (data: any) => {
    if (profile) {
      await updateProfile({
        points: profile.points + data.points,
        total_recycled: profile.total_recycled + parseFloat(data.weight || '1')
      })
      await saveRecyclingRecord(data)

      const getMaterialName = (type: string) => {
        const names: { [key: string]: string } = {
          'plastic': 'plástico',
          'paper': 'papel',
          'glass': 'vidrio',
          'electronic': 'electrónico'
        }
        return names[type] || type
      }

      addNotification({
        type: 'recycle',
        title: 'Nuevo Reciclaje',
        message: `${profile.full_name} registró ${data.weight}kg de ${getMaterialName(data.materialType)}`,
        userEmail: profile.email
      })
    }

    setSuccessData(data)
    setSuccessType('recycle')
    setShowSuccessModal(true)
  }

  const handleMissionDetail = (mission: Mission) => {
    setSelectedMission(mission)
    setShowMissionModal(true)
  }

  const handleStartMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId)
    if (mission) {
      if (missionId === 'first-recycle') {
        setShowRecycleModal(true)
      } else if (missionId === 'visit-3-centers') {
        if (onNavigate) onNavigate('map')
      } else if (missionId === 'first-qr-scan') {
        // Simular escaneo QR
        setSuccessData({
          points: 80,
          category: 'QR Scan',
          co2Saved: 0
        })
        setSuccessType('mission')
        setShowSuccessModal(true)
      }
    }
  }

  const handleViewMissions = () => {
    if (onNavigate) {
      onNavigate('missions')
    }
  }

  const handleViewRewards = () => {
    if (onNavigate) {
      onNavigate('rewards')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pb-6 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">¡Hola!</h1>
          <p className="text-emerald-600">{profile?.full_name || 'Usuario'}</p>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('notifications')}
          className="relative p-3 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors duration-300"
        >
          <Bell className="text-emerald-600" size={20} />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
            </div>
          )}
        </button>
      </div>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30">
                <Icon className={`${stat.color} mb-2`} size={20} />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl p-4 border border-emerald-200">
          <h3 className="text-lg font-bold text-emerald-800 mb-3">Resumen de Progreso</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Target className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-700">{completedMissions}</p>
                <p className="text-sm text-emerald-600">Misiones Completadas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Trophy className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-purple-700">{earnedAchievements}</p>
                <p className="text-sm text-purple-600">Logros Desbloqueados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-800">Acciones Rápidas</h3>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            <button onClick={handleRecycleRegister} className="relative w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-center space-x-3">
                <Recycle size={24} />
                <span className="text-lg">Registrar Reciclaje</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleViewMissions} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 hover:scale-[1.02] transition-transform duration-300">
              <Target className="text-blue-600 mb-2" size={24} />
              <p className="font-bold text-gray-800">Misiones</p>
            </button>
            <button onClick={handleViewRewards} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 hover:scale-[1.02] transition-transform duration-300">
              <Award className="text-yellow-600 mb-2" size={24} />
              <p className="font-bold text-gray-800">Recompensas</p>
            </button>
          </div>
        </div>

        {/* Active Missions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-emerald-800">Misiones Activas</h3>
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors duration-300">
              Ver todas →
            </button>
          </div>
          
          {activeMissions.map((mission) => (
            <div key={mission.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{mission.icon}</span>
                    <h4 className="font-bold text-gray-800 text-sm">{mission.title}</h4>
                  </div>
                  <p className="text-emerald-600 font-medium">+{mission.points} puntos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{Math.round((mission.progress / mission.maxProgress) * 100)}%</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${mission.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min((mission.progress / mission.maxProgress) * 100, 100)}%` }}
                ></div>
                
                {/* Quick Action Button */}
                <button 
                  onClick={() => {
                    if (mission.id === 'first-recycle') {
                      handleRecycleRegister()
                    } else if (mission.id === 'visit-3-centers') {
                      if (onNavigate) onNavigate('map')
                    } else if (mission.id === 'first-qr-scan') {
                      handleStartMission(mission.id)
                    } else {
                      handleMissionDetail(mission)
                    }
                  }}
                  className="mt-3 w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-medium py-2 rounded-xl transition-colors duration-300 text-sm"
                >
                  {mission.progress >= mission.maxProgress ? '✅ Completada' : 
                   mission.id === 'first-recycle' ? '📱 Registrar Ahora' :
                   mission.id === 'visit-3-centers' ? '🗺️ Ver Centros' :
                   mission.id === 'first-qr-scan' ? '📷 Escanear QR' :
                   '👀 Ver Detalles'}
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {mission.progress.toFixed(1)} / {mission.maxProgress} {mission.category === 'basic' ? '(Básica)' : mission.category === 'intermediate' ? '(Intermedia)' : '(Avanzada)'}
              </div>
            </div>
          ))}
          
          {activeMissions.length === 0 && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 text-center">
              <Trophy className="text-emerald-600 mx-auto mb-3" size={32} />
              <h4 className="font-bold text-gray-800 mb-2">¡Todas las misiones completadas!</h4>
              <p className="text-gray-600 text-sm">Nuevas misiones estarán disponibles pronto.</p>
            </div>
          )}
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-2">Tu Impacto Ambiental</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">2.5kg</p>
              <p className="text-sm text-green-600">CO₂ Ahorrado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">15</p>
              <p className="text-sm text-green-600">Árboles Salvados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RecycleModal
        isOpen={showRecycleModal}
        onClose={() => setShowRecycleModal(false)}
        onComplete={handleRecycleComplete}
      />

      <MissionDetailModal
        isOpen={showMissionModal}
        onClose={() => setShowMissionModal(false)}
        mission={selectedMission}
        onStartMission={handleStartMission}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={successType}
        data={successData}
      />
    </div>
  )
}