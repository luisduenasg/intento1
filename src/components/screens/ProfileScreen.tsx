import React, { useState } from 'react'
import { User, Settings, Award, TrendingUp, LogOut, CreditCard as Edit3, Camera, Bell, Shield, HelpCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export const ProfileScreen: React.FC = () => {
  const { profile, signOut } = useAuth()
  const [showSettings, setShowSettings] = useState(false)

  const achievements = [
    { id: 1, title: 'Primer Reciclaje', description: 'Completaste tu primera actividad', earned: true },
    { id: 2, title: 'Eco Warrior', description: 'Reciclaste 10kg de material', earned: true },
    { id: 3, title: 'Influencer Verde', description: 'Invitaste 5 amigos', earned: false },
    { id: 4, title: 'Maestro del Reciclaje', description: 'Alcanzaste nivel 10', earned: false },
  ]

  const stats = [
    { label: 'Días Activo', value: '45', icon: TrendingUp },
    { label: 'Centros Visitados', value: '8', icon: Award },
    { label: 'Amigos Invitados', value: '3', icon: User },
  ]

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (showSettings) {
    return (
      <div className="flex flex-col h-full">
        {/* Settings Header */}
        <div className="flex items-center px-6 pb-4 backdrop-blur-md bg-white/10 border-b border-white/20">
          <button 
            onClick={() => setShowSettings(false)}
            className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-emerald-800">Configuración</h1>
        </div>

        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto pb-20">
          {/* Settings Options */}
          <div className="space-y-3">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden">
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <Bell className="text-blue-600" size={20} />
                  <span className="font-medium text-gray-800">Notificaciones</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <Shield className="text-green-600" size={20} />
                  <span className="font-medium text-gray-800">Privacidad</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="text-purple-600" size={20} />
                  <span className="font-medium text-gray-800">Ayuda y Soporte</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pb-4 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-800">Mi Perfil</h1>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            <Settings className="text-emerald-600" size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto pb-20">
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="text-emerald-600" size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-xl font-bold">{profile?.full_name || 'Usuario'}</h2>
                <button className="p-1 hover:bg-white/20 rounded-full transition-colors duration-300">
                  <Edit3 size={16} />
                </button>
              </div>
              <p className="text-emerald-100 mb-2">Nivel {profile?.level || 1} • Eco Warrior</p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile?.points || 0}</p>
                  <p className="text-xs text-emerald-100">Puntos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile?.total_recycled || 0}kg</p>
                  <p className="text-xs text-emerald-100">Reciclado</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progreso al siguiente nivel</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                <Icon className="text-emerald-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-4 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3">Tu Impacto Ambiental</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-700">{((profile?.total_recycled || 0) * 0.8).toFixed(1)}kg</p>
              <p className="text-sm text-blue-600">CO₂ Ahorrado</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-700">{Math.round((profile?.total_recycled || 0) * 1.2)}</p>
              <p className="text-sm text-blue-600">Árboles Salvados</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/70 rounded-xl">
            <p className="text-sm text-blue-800 font-medium">
              🌱 ¡Increíble! Has reciclado {profile?.total_recycled || 0}kg y salvado el planeta.
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-800">Logros</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-2xl shadow-lg border transition-all duration-300 ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200' 
                    : 'bg-white/70 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <Award 
                    className={`mx-auto mb-2 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} 
                    size={24} 
                  />
                  <h4 className={`font-bold text-sm mb-1 ${
                    achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${
                    achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-800">Actividad Reciente</h3>
          
          <div className="space-y-2">
            {[
              { action: 'Reciclaste 2kg de plástico', points: '+100', time: 'Hace 2 horas' },
              { action: 'Visitaste EcoCenter Miraflores', points: '+50', time: 'Ayer' },
              { action: 'Canjeaste descuento Starbucks', points: '-500', time: 'Hace 3 días' },
            ].map((activity, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`font-bold text-sm ${
                    activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}