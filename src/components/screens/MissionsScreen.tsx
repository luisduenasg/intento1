import React, { useState } from 'react'
import { Target, Filter, Trophy, Zap, TrendingUp } from 'lucide-react'
import { MissionCard } from '../MissionCard'
import { AchievementCard } from '../AchievementCard'
import { missions } from '../../data/missions'
import { achievements } from '../../data/achievements'
import { useAuth } from '../../contexts/AuthContext'

export const MissionsScreen: React.FC = () => {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'missions' | 'achievements'>('missions')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all')

  const categories = [
    { id: 'all', label: 'Todas', color: 'bg-gray-500' },
    { id: 'basic', label: 'Básicas', color: 'bg-green-500' },
    { id: 'intermediate', label: 'Intermedias', color: 'bg-blue-500' },
    { id: 'advanced', label: 'Avanzadas', color: 'bg-purple-500' },
  ]

  const filteredMissions = selectedCategory === 'all' 
    ? missions 
    : missions.filter(mission => mission.category === selectedCategory)

  const completedMissions = missions.filter(m => m.completed || m.progress >= m.maxProgress).length
  const totalPoints = missions.reduce((sum, m) => sum + (m.completed || m.progress >= m.maxProgress ? m.points : 0), 0)
  const earnedAchievements = achievements.filter(a => a.earned).length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pb-4 backdrop-blur-md bg-white/10 border-b border-white/20">
        <h1 className="text-2xl font-bold text-emerald-800 mb-4">Misiones y Logros</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30 text-center">
            <Target className="text-emerald-600 mx-auto mb-1" size={20} />
            <p className="text-lg font-bold text-gray-800">{completedMissions}</p>
            <p className="text-xs text-gray-600">Completadas</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30 text-center">
            <Zap className="text-yellow-600 mx-auto mb-1" size={20} />
            <p className="text-lg font-bold text-gray-800">{totalPoints}</p>
            <p className="text-xs text-gray-600">Puntos</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30 text-center">
            <Trophy className="text-purple-600 mx-auto mb-1" size={20} />
            <p className="text-lg font-bold text-gray-800">{earnedAchievements}</p>
            <p className="text-xs text-gray-600">Logros</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'missions'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-white/90'
            }`}
          >
            Misiones
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-white/90'
            }`}
          >
            Logros
          </button>
        </div>

        {/* Category Filters (only for missions) */}
        {activeTab === 'missions' && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto pb-20">
        {activeTab === 'missions' ? (
          <div className="space-y-4">
            {/* Progress Overview */}
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl p-4 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-emerald-800">Tu Progreso</h3>
                <TrendingUp className="text-emerald-600" size={24} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-700">{Math.round((completedMissions / missions.length) * 100)}%</p>
                  <p className="text-sm text-emerald-600">Misiones Completadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-700">{profile?.points || 0}</p>
                  <p className="text-sm text-emerald-600">Puntos Totales</p>
                </div>
              </div>
            </div>

            {/* Missions List */}
            <div className="space-y-3">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Achievement Categories */}
            <div className="grid grid-cols-2 gap-3">
              {['common', 'rare', 'epic', 'legendary'].map((rarity) => {
                const rarityAchievements = achievements.filter(a => a.rarity === rarity)
                const earnedCount = rarityAchievements.filter(a => a.earned).length
                
                return (
                  <div key={rarity} className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30 text-center">
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      rarity === 'legendary' ? 'bg-yellow-100' :
                      rarity === 'epic' ? 'bg-purple-100' :
                      rarity === 'rare' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Trophy className={`${
                        rarity === 'legendary' ? 'text-yellow-600' :
                        rarity === 'epic' ? 'text-purple-600' :
                        rarity === 'rare' ? 'text-blue-600' : 'text-gray-600'
                      }`} size={16} />
                    </div>
                    <p className="text-sm font-bold text-gray-800">{earnedCount}/{rarityAchievements.length}</p>
                    <p className="text-xs text-gray-600 capitalize">{rarity === 'legendary' ? 'Legendarios' : rarity === 'epic' ? 'Épicos' : rarity === 'rare' ? 'Raros' : 'Comunes'}</p>
                  </div>
                )
              })}
            </div>

            {/* Achievements List */}
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}