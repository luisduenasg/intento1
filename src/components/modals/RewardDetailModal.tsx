import React from 'react'
import { X, Gift, Clock, ExternalLink, Zap, Star, MapPin } from 'lucide-react'

interface Reward {
  id: number
  title: string
  description: string
  points: number
  partner: string
  category: string
  image: string
  expires: string
  available: boolean
}

interface RewardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reward: Reward | null
  userPoints: number
  onRedeem?: (rewardId: number) => void
}

export const RewardDetailModal: React.FC<RewardDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  reward,
  userPoints,
  onRedeem 
}) => {
  if (!isOpen || !reward) return null

  const canAfford = userPoints >= reward.points
  const isAvailable = reward.available

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'food':
        return { 
          label: 'Comida y Bebidas', 
          icon: '🍽️',
          color: 'from-orange-400 to-red-500',
          bgColor: 'from-orange-50 to-red-50'
        }
      case 'shopping':
        return { 
          label: 'Compras', 
          icon: '🛍️',
          color: 'from-purple-400 to-pink-500',
          bgColor: 'from-purple-50 to-pink-50'
        }
      case 'transport':
        return { 
          label: 'Transporte', 
          icon: '🚗',
          color: 'from-blue-400 to-cyan-500',
          bgColor: 'from-blue-50 to-cyan-50'
        }
      case 'entertainment':
        return { 
          label: 'Entretenimiento', 
          icon: '🎬',
          color: 'from-indigo-400 to-purple-500',
          bgColor: 'from-indigo-50 to-purple-50'
        }
      default:
        return { 
          label: 'Recompensa', 
          icon: '🎁',
          color: 'from-gray-400 to-gray-500',
          bgColor: 'from-gray-50 to-gray-100'
        }
    }
  }

  const categoryInfo = getCategoryInfo(reward.category)

  const getUsageInstructions = (partner: string) => {
    switch (partner.toLowerCase()) {
      case 'starbucks':
        return [
          '📱 Presenta el código en cualquier tienda Starbucks',
          '☕ Válido para cualquier bebida del menú',
          '🕒 Disponible todos los días',
          '📍 Aplica en todas las sucursales de Lima'
        ]
      case 'uber':
        return [
          '📱 Abre la app de Uber',
          '💳 Ingresa el código en "Promociones"',
          '🚗 Solicita tu viaje',
          '💰 El descuento se aplica automáticamente'
        ]
      case 'saga falabella':
        return [
          '🏪 Visita cualquier tienda Saga Falabella',
          '🛍️ Selecciona productos participantes',
          '💳 Presenta el código en caja',
          '📱 También válido para compras online'
        ]
      case 'cineplanet':
        return [
          '🎬 Válido de lunes a miércoles',
          '🎫 Compra 1 entrada y lleva 2',
          '📱 Presenta el código en taquilla',
          '🍿 Aplica para todas las funciones'
        ]
      default:
        return [
          '📱 Presenta el código al momento de pagar',
          '🏪 Válido en tiendas físicas y online',
          '⏰ Respeta la fecha de vencimiento',
          '📞 Contacta al partner para dudas'
        ]
    }
  }

  const handleRedeem = () => {
    if (canAfford && isAvailable && onRedeem) {
      onRedeem(reward.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header with Image */}
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <img 
              src={reward.image} 
              alt={reward.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-colors duration-300"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{categoryInfo.icon}</span>
              <span className="text-white/80 text-sm font-medium">{categoryInfo.label}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{reward.title}</h2>
            <p className="text-white/90 text-sm">{reward.partner}</p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-192px)] space-y-6">
          {/* Points and Availability */}
          <div className={`bg-gradient-to-r ${categoryInfo.bgColor} rounded-2xl p-4 border border-gray-200`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-600" size={20} />
                <span className="font-bold text-gray-800 text-lg">{reward.points} puntos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={16} />
                <span className="text-gray-600 text-sm">Vence en {reward.expires}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Tus puntos actuales:</p>
                <p className="font-bold text-gray-800">{userPoints} puntos</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isAvailable ? '✅ Disponible' : '❌ Agotado'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Descripción</h3>
            <p className="text-gray-600">{reward.description}</p>
          </div>

          {/* Usage Instructions */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Cómo usar</h3>
            <div className="space-y-3">
              {getUsageInstructions(reward.partner).map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h4 className="font-bold text-blue-800">{reward.partner}</h4>
                <p className="text-blue-600 text-sm">Partner oficial de BinWise</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-blue-700">
                <MapPin size={14} />
                <span>Múltiples ubicaciones</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-700">
                <ExternalLink size={14} />
                <span>App y tiendas físicas</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h4 className="font-bold text-gray-800 mb-2">Términos y Condiciones</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Válido por {reward.expires} desde la fecha de canje</li>
              <li>• No acumulable con otras promociones</li>
              <li>• Código de un solo uso</li>
              <li>• No reembolsable por dinero en efectivo</li>
              <li>• Sujeto a disponibilidad del partner</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {!canAfford ? (
              <div className="bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl text-center">
                💰 Necesitas {reward.points - userPoints} puntos más
              </div>
            ) : !isAvailable ? (
              <div className="bg-red-100 text-red-600 font-bold py-4 rounded-2xl text-center">
                😔 Recompensa agotada
              </div>
            ) : (
              <button
                onClick={handleRedeem}
                className={`w-full bg-gradient-to-r ${categoryInfo.color} hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2`}
              >
                <Gift size={20} />
                <span>Canjear por {reward.points} puntos</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-2xl transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}