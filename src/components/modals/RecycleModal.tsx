import React, { useState } from 'react'
import { X, Camera, QrCode, Package, Scale, MapPin, Zap } from 'lucide-react'

interface RecycleModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: any) => void
}

export const RecycleModal: React.FC<RecycleModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    materialType: '',
    weight: '',
    location: '',
    qrScanned: false
  })

  const materials = [
    { id: 'plastic', name: 'Plástico', icon: '🥤', points: 20 },
    { id: 'paper', name: 'Papel', icon: '📄', points: 25 },
    { id: 'glass', name: 'Vidrio', icon: '🍶', points: 35 },
    { id: 'electronic', name: 'Electrónico', icon: '📱', points: 80 },
  ]

  const centers = [
    'EcoCenter Miraflores',
    'Reciclaje San Isidro', 
    'Verde Barranco',
    'Otro centro'
  ]

  const handleComplete = () => {
    const material = materials.find(m => m.id === formData.materialType)
    const totalPoints = material ? material.points * parseFloat(formData.weight || '1') : 0
    
    onComplete({
      ...formData,
      points: Math.round(totalPoints),
      co2Saved: parseFloat(formData.weight || '1') * 0.5 // Estimación
    })
    
    setStep(1)
    setFormData({ materialType: '', weight: '', location: '', qrScanned: false })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Registrar Reciclaje</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Progress Bar */}
          <div className="flex items-center mb-6">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= num ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > num ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Escanear QR */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="text-emerald-600" size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Escanea el QR del Centro</h3>
                <p className="text-gray-600 text-sm">
                  Busca el código QR oficial en el centro de reciclaje para verificar tu ubicación
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Camera className="text-blue-600" size={20} />
                  <span className="font-medium text-blue-800">Simulación de Escaneo</span>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  En la versión real, aquí se abriría la cámara para escanear el QR del centro autorizado.
                </p>
                <button
                  onClick={() => {
                    setFormData({ ...formData, qrScanned: true })
                    setTimeout(() => setStep(2), 1000)
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors duration-300"
                >
                  {formData.qrScanned ? '✅ QR Escaneado' : '📷 Simular Escaneo'}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Continuar sin escanear (modo demo)
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Seleccionar Material */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-purple-600" size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tipo de Material</h3>
                <p className="text-gray-600 text-sm">
                  Selecciona el tipo de material que estás reciclando
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setFormData({ ...formData, materialType: material.id })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.materialType === material.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{material.icon}</div>
                    <h4 className="font-bold text-gray-800 mb-1">{material.name}</h4>
                    <div className="flex items-center justify-center space-x-1 text-emerald-600">
                      <Zap size={12} />
                      <span className="text-sm font-medium">+{material.points}/kg</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors duration-300"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.materialType}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors duration-300"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Peso y Ubicación */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="text-green-600" size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Detalles del Reciclaje</h3>
                <p className="text-gray-600 text-sm">
                  Ingresa el peso aproximado y confirma la ubicación
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso aproximado (kg)
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Ej: 2.5"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Centro de reciclaje
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar centro</option>
                      {centers.map((center) => (
                        <option key={center} value={center}>{center}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {formData.weight && formData.materialType && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 mb-2">Resumen</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Material:</span>
                      <span className="font-medium text-emerald-800">
                        {materials.find(m => m.id === formData.materialType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Peso:</span>
                      <span className="font-medium text-emerald-800">{formData.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Puntos a ganar:</span>
                      <span className="font-bold text-emerald-800">
                        +{Math.round((materials.find(m => m.id === formData.materialType)?.points || 0) * parseFloat(formData.weight || '1'))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">CO₂ ahorrado:</span>
                      <span className="font-medium text-emerald-800">
                        ~{(parseFloat(formData.weight || '1') * 0.5).toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors duration-300"
                >
                  Atrás
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!formData.weight || !formData.location}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-300"
                >
                  ¡Registrar!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}