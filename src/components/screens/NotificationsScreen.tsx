import React from 'react'
import { Bell, Trash2, CheckCircle2 } from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationsContext'

export const NotificationsScreen: React.FC = () => {
  const { notifications, markAsRead, clearAll } = useNotifications()

  const getNotificationIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'recycle': '♻️',
      'mission': '🎯',
      'achievement': '🏆',
      'reward': '🎁'
    }
    return icons[type] || '📢'
  }

  const getNotificationColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'recycle': 'from-emerald-50 to-green-50',
      'mission': 'from-blue-50 to-cyan-50',
      'achievement': 'from-yellow-50 to-amber-50',
      'reward': 'from-purple-50 to-pink-50'
    }
    return colors[type] || 'from-gray-50 to-gray-50'
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Hace unos segundos'
    if (diffMins < 60) return `Hace ${diffMins}m`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`

    return date.toLocaleDateString('es-ES')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Notificaciones</h1>
          <p className="text-gray-600 text-sm">{notifications.length} notificaciones totales</p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-300"
            title="Limpiar todas"
          >
            <Trash2 className="text-red-500" size={20} />
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <Bell className="text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-bold text-gray-600 mb-2">Sin notificaciones</h2>
            <p className="text-gray-500 text-center">Cuando haya actividad, verás las notificaciones aquí</p>
          </div>
        ) : (
          <div className="px-6 py-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`relative group rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                  notification.read
                    ? 'bg-white/50 border border-gray-100'
                    : `bg-gradient-to-r ${getNotificationColor(notification.type)} border border-white shadow-lg hover:shadow-xl`
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-bold ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      )}
                    </div>

                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-xs text-gray-500">{notification.userEmail}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{formatTime(notification.timestamp)}</p>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="flex-shrink-0 ml-2">
                      <CheckCircle2 className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
