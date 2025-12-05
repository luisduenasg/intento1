export interface RecyclingTip {
  id: string
  title: string
  description: string
  icon: string
  color: string
  details: string[]
}

export const recyclingTips: RecyclingTip[] = [
  {
    id: 'plastic',
    title: 'Reciclar Plástico',
    description: 'El plástico tarda 400-1000 años en descomponerse',
    icon: '🥤',
    color: 'from-blue-100 to-blue-200',
    details: [
      '✓ Limpia botellas y envases antes de reciclar',
      '✓ Retira las etiquetas y tapas',
      '✓ No mezcles plásticos diferentes',
      '✓ Los plásticos duros duran más que los blandos'
    ]
  },
  {
    id: 'paper',
    title: 'Reciclar Papel',
    description: 'Se puede reciclar hasta 5-7 veces',
    icon: '📄',
    color: 'from-amber-100 to-orange-200',
    details: [
      '✓ Mantén el papel seco',
      '✓ Separa cartón de papel fino',
      '✓ No recicles papel mojado o sucio',
      '✓ Una resma nueva ahorrada es un árbol salvado'
    ]
  },
  {
    id: 'glass',
    title: 'Reciclar Vidrio',
    description: 'El vidrio es 100% reciclable infinitas veces',
    icon: '🍶',
    color: 'from-green-100 to-emerald-200',
    details: [
      '✓ Lava las botellas antes de reciclar',
      '✓ Retira corcho y tapas de metal',
      '✓ Evita mezclar vidrio de color',
      '✓ No contamines vidrio con cerámica'
    ]
  },
  {
    id: 'electronic',
    title: 'Reciclar Electrónico',
    description: 'Contiene materiales valiosos y tóxicos',
    icon: '📱',
    color: 'from-purple-100 to-pink-200',
    details: [
      '✓ Apaga y desconecta los dispositivos',
      '✓ Protege datos personales antes de reciclar',
      '✓ Lleva a centros especializados',
      '✓ Recuperan 95% de los materiales usados'
    ]
  },
  {
    id: 'organic',
    title: 'Reciclar Orgánico',
    description: 'Los residuos se convierten en nutrientes del suelo',
    icon: '🌱',
    color: 'from-green-100 to-lime-200',
    details: [
      '✓ Separa restos de comida y plantas',
      '✓ Evita aceites y productos lácteos',
      '✓ Mezcla con papel marrón',
      '✓ En 3-6 meses se convierte en compost'
    ]
  },
  {
    id: 'metals',
    title: 'Reciclar Metales',
    description: 'El reciclaje de metales ahorra 95% de energía',
    icon: '🥫',
    color: 'from-gray-100 to-slate-200',
    details: [
      '✓ Limpiar latas y recipientes metálicos',
      '✓ Separa hierro de aluminio si es posible',
      '✓ Aplasta latas para ahorrar espacio',
      '✓ Los metales se reciclan infinitamente'
    ]
  }
]
