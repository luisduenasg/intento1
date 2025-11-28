import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Notification {
  id: string
  type: 'recycle' | 'mission' | 'achievement' | 'reward'
  title: string
  message: string
  userEmail: string
  timestamp: Date
  read: boolean
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  clearAll: () => void
  unreadCount: number
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'recycle',
      title: 'Nuevo Reciclaje',
      message: 'Juan registró 2.5kg de plástico',
      userEmail: 'juan@example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Logro Desbloqueado',
      message: 'María desbloqueó el logro "Eco Guerrero"',
      userEmail: 'maria@example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false
    },
    {
      id: '3',
      type: 'recycle',
      title: 'Nuevo Reciclaje',
      message: 'Carlos registró 4.0kg de papel',
      userEmail: 'carlos@example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: true
    }
  ])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const value = {
    notifications,
    addNotification,
    markAsRead,
    clearAll,
    unreadCount
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
