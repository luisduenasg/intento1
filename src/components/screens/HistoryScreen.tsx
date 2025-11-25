import React, { useEffect, useState } from 'react'
import { Download, BarChart3, Calendar, Package } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import * as XLSX from 'xlsx'

interface RecyclingRecord {
  id: string
  material_type: string
  weight: number
  location: string
  points_earned: number
  co2_saved: number
  created_at: string
}

export const HistoryScreen: React.FC = () => {
  const { user } = useAuth()
  const [records, setRecords] = useState<RecyclingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRecords: 0,
    totalWeight: 0,
    totalPoints: 0,
    totalCO2: 0
  })

  useEffect(() => {
    if (user) {
      fetchRecords()
    }
  }, [user])

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('recycling_records')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setRecords(data || [])

      if (data && data.length > 0) {
        const totals = data.reduce((acc, record) => ({
          totalRecords: acc.totalRecords + 1,
          totalWeight: acc.totalWeight + record.weight,
          totalPoints: acc.totalPoints + record.points_earned,
          totalCO2: acc.totalCO2 + record.co2_saved
        }), { totalRecords: 0, totalWeight: 0, totalPoints: 0, totalCO2: 0 })

        setStats(totals)
      }
    } catch (error) {
      console.error('Error fetching records:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    if (records.length === 0) {
      alert('No hay registros para exportar')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(
      records.map(record => ({
        Fecha: new Date(record.created_at).toLocaleDateString('es-ES'),
        Hora: new Date(record.created_at).toLocaleTimeString('es-ES'),
        Material: record.material_type,
        'Peso (kg)': record.weight,
        'Centro de Reciclaje': record.location,
        'Puntos Ganados': record.points_earned,
        'CO₂ Ahorrado (kg)': record.co2_saved
      }))
    )

    const summary = XLSX.utils.json_to_sheet([
      { Métrica: 'Total Registros', Valor: stats.totalRecords },
      { Métrica: 'Peso Total (kg)', Valor: stats.totalWeight.toFixed(2) },
      { Métrica: 'Puntos Totales', Valor: stats.totalPoints },
      { Métrica: 'CO₂ Total Ahorrado (kg)', Valor: stats.totalCO2.toFixed(2) }
    ])

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros')
    XLSX.utils.book_append_sheet(workbook, summary, 'Resumen')

    XLSX.writeFile(workbook, `Historial_Reciclaje_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const getMaterialIcon = (material: string) => {
    const icons: { [key: string]: string } = {
      'plastic': '🥤',
      'paper': '📄',
      'glass': '🍶',
      'electronic': '📱'
    }
    return icons[material] || '♻️'
  }

  const getMaterialName = (material: string) => {
    const names: { [key: string]: string } = {
      'plastic': 'Plástico',
      'paper': 'Papel',
      'glass': 'Vidrio',
      'electronic': 'Electrónico'
    }
    return names[material] || material
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Historial de Reciclaje</h1>
        <p className="text-gray-600">Gestiona y exporta tus registros de reciclaje</p>
      </div>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto pb-20">
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <Package className="text-blue-600" size={16} />
              <span className="text-xs text-blue-600 font-medium">Total Registros</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{stats.totalRecords}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="text-emerald-600" size={16} />
              <span className="text-xs text-emerald-600 font-medium">Peso Total</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{stats.totalWeight.toFixed(1)}kg</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 border border-yellow-200">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm">⚡</span>
              <span className="text-xs text-yellow-600 font-medium">Puntos</span>
            </div>
            <p className="text-2xl font-bold text-yellow-800">{stats.totalPoints}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm">🌍</span>
              <span className="text-xs text-green-600 font-medium">CO₂ Ahorrado</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{stats.totalCO2.toFixed(1)}kg</p>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={exportToExcel}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Download size={20} />
          <span>Descargar Excel</span>
        </button>

        {/* Records List */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
            <Calendar size={20} className="text-emerald-600" />
            <span>Tus Registros</span>
          </h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Cargando registros...
            </div>
          ) : records.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30 text-center">
              <Package className="text-gray-400 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Sin registros aún</h3>
              <p className="text-gray-600 text-sm">Comienza a registrar tu reciclaje para ver el historial</p>
            </div>
          ) : (
            records.map((record) => (
              <div key={record.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-3xl">{getMaterialIcon(record.material_type)}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{getMaterialName(record.material_type)}</h3>
                      <p className="text-sm text-gray-600">{record.location}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(record.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{record.weight}kg</p>
                    <p className="text-sm text-yellow-600 font-medium">+{record.points_earned}pts</p>
                    <p className="text-xs text-green-600">-{record.co2_saved.toFixed(1)}kg CO₂</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
