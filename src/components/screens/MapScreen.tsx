import React, { useState } from 'react'
import { Search, MapPin, Phone, Clock, Filter, Navigation } from 'lucide-react'
import { GoogleMap } from '../GoogleMap'

export const MapScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todos', color: 'bg-gray-500' },
    { id: 'plastic', label: 'Plástico', color: 'bg-blue-500' },
    { id: 'paper', label: 'Papel', color: 'bg-yellow-500' },
    { id: 'glass', label: 'Vidrio', color: 'bg-green-500' },
    { id: 'electronic', label: 'Electrónico', color: 'bg-purple-500' },
  ]

  const centers = [
    { 
      id: 1, 
      name: 'EcoCenter Miraflores', 
      distance: '0.8 km', 
      materials: ['plastic', 'paper'], 
      phone: '+51 999 888 777',
      lat: -12.1196,
      lng: -77.0365,
      address: 'Av. Larco 345, Miraflores',
      hours: '8:00 AM - 6:00 PM'
    },
    { 
      id: 2, 
      name: 'Reciclaje San Isidro', 
      distance: '1.2 km', 
      materials: ['glass', 'electronic'], 
      phone: '+51 999 888 778',
      lat: -12.0931,
      lng: -77.0465,
      address: 'Av. Javier Prado 1250, San Isidro',
      hours: '9:00 AM - 7:00 PM'
    },
    { 
      id: 3, 
      name: 'Verde Barranco', 
      distance: '2.1 km', 
      materials: ['plastic', 'paper', 'glass'], 
      phone: '+51 999 888 779',
      lat: -12.1467,
      lng: -77.0208,
      address: 'Av. Grau 1180, Barranco',
      hours: '8:00 AM - 5:00 PM'
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pb-4 backdrop-blur-md bg-white/10 border-b border-white/20">
        <h1 className="text-2xl font-bold text-emerald-800 mb-4">Centros de Reciclaje</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-500 rounded-2xl opacity-30 blur"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl flex items-center px-4 py-3 shadow-xl border border-white/30">
            <Search className="text-teal-500 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Buscar centros cercanos..." 
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 bg-transparent font-medium"
            />
            <Navigation className="text-teal-500 ml-2" size={20} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? `${filter.color} text-white shadow-lg`
                  : 'bg-white/70 text-gray-600 hover:bg-white/90'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto pb-20">
        {/* Map Area */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-500 rounded-3xl opacity-30 blur"></div>
          <div className="relative rounded-3xl h-48 overflow-hidden shadow-2xl border border-white/30">
            {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
              <GoogleMap 
                centers={centers}
                selectedFilter={selectedFilter}
                onCenterSelect={(center) => {
                  console.log('Selected center:', center.name)
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center rounded-3xl">
                <div className="text-center p-6">
                  <MapPin className="text-emerald-600 mx-auto mb-3" size={48} />
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">Mapa de Centros</h3>
                  <p className="text-emerald-600 text-sm mb-4">
                    Configure Google Maps API para ver centros de reciclaje en tiempo real
                  </p>
                  <div className="bg-white/70 rounded-xl p-3">
                    <p className="text-xs text-emerald-700">
                      📍 {centers.length} centros disponibles en Lima
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centers List */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-800">Centros Cercanos</h3>
          
          {centers.map((center) => (
            <div key={center.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{center.name}</h4>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">{center.distance}</span>
                  </div>
                  
                  {/* Materials */}
                  <div className="flex space-x-1 mb-2">
                    {center.materials.map((material) => {
                      const filter = filters.find(f => f.id === material)
                      return (
                        <span
                          key={material}
                          className={`${filter?.color} text-white text-xs px-2 py-1 rounded-full`}
                        >
                          {filter?.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button className="p-2 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors duration-300">
                    <Phone className="text-emerald-600" size={16} />
                  </button>
                  <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-300">
                    <Navigation className="text-blue-600" size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={14} className="mr-1" />
                <span>Abierto: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <button 
            onClick={() => {
              alert('📍 Reportar Nuevo Centro\n\n' +
                    '• Comparte la ubicación exacta\n' +
                    '• Especifica materiales aceptados\n' +
                    '• Añade horarios de atención\n' +
                    '• Ayuda a la comunidad recicladora\n\n' +
                    '🎁 Recompensa: +200 puntos')
            }}
            className="relative w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-center space-x-3">
              <MapPin size={20} />
              <span className="text-lg">Reportar Nuevo Centro</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}