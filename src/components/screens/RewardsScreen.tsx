import React, { useState } from 'react'
import { Gift, Star, Clock, ExternalLink, Zap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { RewardDetailModal } from '../modals/RewardDetailModal'
import { SuccessModal } from '../modals/SuccessModal'

export const RewardsScreen: React.FC = () => {
  const { profile, updateProfile } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState<any>(null)

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'food', label: 'Comida' },
    { id: 'shopping', label: 'Compras' },
    { id: 'transport', label: 'Transporte' },
    { id: 'entertainment', label: 'Entretenimiento' },
  ]

  const rewards = [
    {
      id: 1,
      title: 'Descuento 20% en Starbucks',
      description: 'Válido en cualquier bebida',
      points: 800,
      partner: 'Starbucks',
      category: 'food',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '30 días',
      available: true
    },
    {
      id: 2,
      title: '15% OFF en Saga Falabella',
      description: 'En productos seleccionados',
      points: 1500,
      partner: 'Saga Falabella',
      category: 'shopping',
      image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '15 días',
      available: true
    },
    {
      id: 3,
      title: 'Viaje gratis en Uber',
      description: 'Hasta S/20 de descuento',
      points: 1200,
      partner: 'Uber',
      category: 'transport',
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '7 días',
      available: true
    },
    {
      id: 4,
      title: 'Entrada 2x1 al Cine',
      description: 'Válido de lunes a miércoles',
      points: 900,
      partner: 'Cineplanet',
      category: 'entertainment',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '20 días',
      available: true
    },
    {
      id: 5,
      title: 'Almuerzo gratis en KFC',
      description: 'Combo familiar completo',
      points: 2000,
      partner: 'KFC',
      category: 'food',
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '10 días',
      available: true
    },
    {
      id: 6,
      title: 'Descuento 30% en Ripley',
      description: 'En ropa y accesorios',
      points: 1800,
      partner: 'Ripley',
      category: 'shopping',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=400',
      expires: '25 días',
      available: true
    }
  ]

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory)

  const canAfford = (points: number) => (profile?.points || 0) >= points

  const handleRewardClick = (reward: any) => {
    setSelectedReward(reward)
    setShowRewardModal(true)
  }

  const handleRedeem = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId)
    if (reward && profile) {
      // Deduct points from user profile
      const updatedPoints = profile.points - reward.points
      updateProfile({ points: updatedPoints })
      
      setSuccessData({
        title: reward.title,
        points: reward.points,
        expires: reward.expires,
        partner: reward.partner
      })
      setShowSuccessModal(true)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pb-4 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-emerald-800">Recompensas</h1>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full">
            <Zap className="text-yellow-600" size={16} />
            <span className="font-bold text-yellow-700">{profile?.points || 0}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white/90'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto pb-20">
        {/* Featured Reward */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-3xl opacity-30 blur"></div>
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">¡Oferta Especial!</h3>
                <p className="text-purple-100">Solo por tiempo limitado</p>
              </div>
              <Star className="text-yellow-300 fill-current" size={32} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">50% Extra en puntos</p>
                <p className="text-purple-100 text-sm">En tu próximo reciclaje</p>
              </div>
              <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-colors duration-300">
                Activar
              </button>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="space-y-4">
          {filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={reward.image} 
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{reward.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="font-medium text-emerald-600">{reward.partner}</span>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>{reward.expires}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="text-yellow-600" size={16} />
                      <span className="font-bold text-gray-800">{reward.points}</span>
                    </div>
                    
                    <button
                      disabled={!canAfford(reward.points) || !reward.available}
                      onClick={() => {
                        handleRewardClick(reward)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        canAfford(reward.points) && reward.available
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!reward.available ? 'Agotado' : canAfford(reward.points) ? 'Canjear' : 'Insuficiente'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Section */}
        <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-4 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3">Nuestros Aliados</h3>
          <div className="grid grid-cols-4 gap-3">
            {['Starbucks', 'Uber', 'Saga', 'Cineplanet'].map((partner, index) => (
              <div key={index} className="bg-white/70 rounded-xl p-3 text-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <p className="text-xs font-medium text-gray-700">{partner}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2">
            <ExternalLink size={16} />
            <span>Ver Todos los Aliados</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <RewardDetailModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        reward={selectedReward}
        userPoints={profile?.points || 0}
        onRedeem={handleRedeem}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="reward"
        data={successData}
      />
    </div>
  )
}