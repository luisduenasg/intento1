import { Achievement } from '../types/missions'

export const achievements: Achievement[] = [
  {
    id: 'nuevo-reciclador',
    name: '♻️ Nuevo Reciclador',
    description: 'Completaste tu primer registro de reciclaje',
    criteria: 'Primer registro completado',
    icon: '♻️',
    color: 'from-green-400 to-emerald-500',
    bonus: 50,
    earned: true,
    earnedDate: '2024-01-15',
    rarity: 'common'
  },
  {
    id: 'constante-verde',
    name: '💪 Constante Verde',
    description: 'Mantuviste actividad durante 4 semanas seguidas',
    criteria: '4 semanas seguidas reciclando',
    icon: '💪',
    color: 'from-amber-600 to-yellow-700',
    bonus: 150,
    earned: true,
    earnedDate: '2024-02-01',
    rarity: 'common'
  },
  {
    id: 'agente-ambiental',
    name: '🌱 Agente Ambiental',
    description: 'Alcanzaste 50 kg de material reciclado',
    criteria: '50 kg reciclados totales',
    icon: '🌱',
    color: 'from-gray-400 to-gray-600',
    bonus: 250,
    earned: false,
    rarity: 'rare'
  },
  {
    id: 'ecolider-local',
    name: '🔥 EcoLíder Local',
    description: 'Superaste los 100 kg reciclados o 30 QR escaneados',
    criteria: '100 kg reciclados o 30 QR escaneados',
    icon: '🔥',
    color: 'from-yellow-400 to-amber-500',
    bonus: 500,
    earned: false,
    rarity: 'epic'
  },
  {
    id: 'embajador-circular',
    name: '🕊 Embajador Circular',
    description: 'Invitaste y activaste a 10 usuarios',
    criteria: '10 usuarios invitados y activos',
    icon: '🕊',
    color: 'from-purple-500 to-indigo-600',
    bonus: 1000,
    earned: false,
    rarity: 'epic'
  },
  {
    id: 'heroe-ambiental',
    name: '🌍 Héroe Ambiental',
    description: 'Participaste en 5 campañas oficiales',
    criteria: 'Participación en 5 campañas oficiales',
    icon: '🌍',
    color: 'from-emerald-500 to-teal-600',
    bonus: 1500,
    earned: false,
    rarity: 'legendary',
    animated: true
  }
]