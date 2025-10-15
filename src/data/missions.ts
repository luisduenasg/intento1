import { Mission } from '../types/missions'

export const missions: Mission[] = [
  // Misiones Básicas (Semanales)
  {
    id: 'first-recycle',
    title: 'Registrar tu primer reciclaje',
    description: 'Completa tu primera actividad de reciclaje',
    points: 50,
    category: 'basic',
    frequency: 'weekly',
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: '♻️',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'weekly-5kg',
    title: 'Recicla 5 kg en una semana',
    description: 'Alcanza 5 kilogramos de material reciclado',
    points: 100,
    category: 'basic',
    frequency: 'weekly',
    progress: 2.3,
    maxProgress: 5,
    completed: false,
    icon: '⚖️',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'visit-3-centers',
    title: 'Visita 3 puntos de reciclaje distintos',
    description: 'Explora diferentes centros de reciclaje',
    points: 150,
    category: 'basic',
    frequency: 'weekly',
    progress: 1,
    maxProgress: 3,
    completed: false,
    icon: '📍',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'first-qr-scan',
    title: 'Escanea tu primer QR de centro autorizado',
    description: 'Verifica tu visita con código QR',
    points: 80,
    category: 'basic',
    frequency: 'weekly',
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: '📱',
    color: 'from-orange-400 to-red-500'
  },

  // Misiones Intermedias (Mensuales)
  {
    id: 'monthly-20kg',
    title: 'Recicla 20 kg en un mes',
    description: 'Meta mensual de reciclaje avanzado',
    points: 250,
    category: 'intermediate',
    frequency: 'monthly',
    progress: 8.5,
    maxProgress: 20,
    completed: false,
    icon: '🎯',
    color: 'from-teal-400 to-green-500'
  },
  {
    id: 'invite-3-users',
    title: 'Invita a 3 nuevos usuarios',
    description: 'Comparte BinWise con tus amigos',
    points: 200,
    category: 'intermediate',
    frequency: 'monthly',
    progress: 1,
    maxProgress: 3,
    completed: false,
    icon: '👥',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'verified-10-qr',
    title: 'Completa 10 registros verificados por QR',
    description: 'Demuestra tu compromiso con verificaciones',
    points: 300,
    category: 'intermediate',
    frequency: 'monthly',
    progress: 4,
    maxProgress: 10,
    completed: false,
    icon: '✅',
    color: 'from-emerald-400 to-teal-500'
  },

  // Misiones Avanzadas (Impacto Ambiental)
  {
    id: 'save-50kg-co2',
    title: 'Evita 50 kg de CO₂',
    description: 'Contribuye significativamente al medio ambiente',
    points: 400,
    category: 'advanced',
    frequency: 'special',
    progress: 23.7,
    maxProgress: 50,
    completed: false,
    icon: '🌱',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'eco-campaign',
    title: 'Participa en una campaña ecológica oficial',
    description: 'Únete a iniciativas de nuestros aliados',
    points: 500,
    category: 'advanced',
    frequency: 'special',
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: '🏆',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'consistent-3-months',
    title: 'Mantén actividad constante por 3 meses',
    description: 'Demuestra tu compromiso a largo plazo',
    points: 1000,
    category: 'advanced',
    frequency: 'special',
    progress: 1.5,
    maxProgress: 3,
    completed: false,
    icon: '🔥',
    color: 'from-red-500 to-pink-600'
  }
]