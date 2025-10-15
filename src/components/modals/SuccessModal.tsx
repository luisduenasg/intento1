import React from 'react'
import { CheckCircle, Zap, TrendingUp, Gift } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'recycle' | 'mission' | 'reward'
  data: any
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, type, data }) => {
  if (!isOpen) return null

  const getSuccessContent = () => {
    switch (type) {
      case 'recycle':
        return {
          title: '¡Reciclaje Registrado!',
          icon: '♻️',
          color: 'from-emerald-400 to-green-500',
          bgColor: 'from-emerald-50 to-green-50',
          stats: [
            { label: 'Puntos ganados', value: `+${data.points}`, icon: Zap, color: 'text-yellow-600' },
            { label: 'CO₂ ahorrado', value: `${data.co2Saved}kg`, icon: TrendingUp, color: 'text-green-600' },
            { label: 'Material', value: data.materialType, icon: Gift, color: 'text-blue-600' }
          ],
          message: '¡Excelente trabajo! Tu contribución ayuda a crear un Lima más verde y sostenible.'
        }
      case 'mission':
        return {
          title: '¡Misión Completada!',
          icon: '🎯',
          color: 'from-purple-400 to-pink-500',
          bgColor: 'from-purple-50 to-pink-50',
          stats: [
            { label: 'Puntos ganados', value: `+${data.points}`, icon: Zap, color: 'text-yellow-600' },
            { label: 'Progreso', value: '100%', icon: TrendingUp, color: 'text-green-600' },
            { label: 'Categoría', value: data.category, icon: Gift, color: 'text-purple-600' }
          ],
          message: '¡Increíble! Has completado una misión y estás más cerca de ser un EcoLíder.'
        }
      case 'reward':
        return {
          title: '¡Canje Exitoso!',
          icon: '🎁',
          color: 'from-yellow-400 to-orange-500',
          bgColor: 'from-yellow-50 to-orange-50',
          stats: [
            { label: 'Recompensa', value: data.title, icon: Gift, color: 'text-orange-600' },
            { label: 'Puntos usados', value: `-${data.points}`, icon: Zap, color: 'text-red-600' },
            { label: 'Válido por', value: data.expires, icon: TrendingUp, color: 'text-blue-600' }
          ],
          message: 'Tu código de canje ha sido enviado por SMS. ¡Disfruta tu recompensa!'
        }
      default:
        return {
          title: '¡Éxito!',
          icon: '✅',
          color: 'from-green-400 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50',
          stats: [],
          message: 'Operación completada exitosamente.'
        }
    }
  }

  const content = getSuccessContent()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden animate-scale-up shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${content.color} p-6 text-center text-white`}>
          <div className="text-6xl mb-4">{content.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className={`bg-gradient-to-r ${content.bgColor} rounded-2xl p-4 space-y-3`}>
            {content.stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={stat.color} size={16} />
                    <span className="text-gray-700 text-sm">{stat.label}:</span>
                  </div>
                  <span className="font-bold text-gray-800">{stat.value}</span>
                </div>
              )
            })}
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-600 text-sm leading-relaxed">{content.message}</p>
          </div>

          {/* Special Messages */}
          {type === 'recycle' && (
            <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-200">
              <div className="text-blue-600 text-sm font-medium mb-2">
                🌱 Impacto Ambiental
              </div>
              <p className="text-blue-800 text-xs">
                Con tu reciclaje de hoy, has contribuido a reducir la contaminación 
                y conservar recursos naturales para las futuras generaciones.
              </p>
            </div>
          )}

          {type === 'reward' && (
            <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-200">
              <div className="text-orange-600 text-sm font-medium mb-2">
                📱 Código de Canje
              </div>
              <div className="bg-white rounded-xl p-3 border-2 border-dashed border-orange-300">
                <p className="font-mono text-lg font-bold text-orange-800">
                  BW{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </p>
              </div>
              <p className="text-orange-700 text-xs mt-2">
                Presenta este código en {data.partner}
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${content.color} hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]`}
          >
            ¡Continuar!
          </button>
        </div>
      </div>
    </div>
  )
}