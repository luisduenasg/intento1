import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
//import { PhoneFrame } from './components/PhoneFrame'
import { BottomNavigation } from './components/BottomNavigation'
import { AuthScreen } from './components/screens/AuthScreen'
import { HomeScreen } from './components/screens/HomeScreen'
import { MissionsScreen } from './components/screens/MissionsScreen'
import { MapScreen } from './components/screens/MapScreen'
import { RewardsScreen } from './components/screens/RewardsScreen'
import { ProfileScreen } from './components/screens/ProfileScreen'
import { HistoryScreen } from './components/screens/HistoryScreen'
import { NotificationsScreen } from './components/screens/NotificationsScreen'

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('home')

  if (loading) {
    return (
      //<PhoneFrame>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      //</PhoneFrame>
    )
  }

  if (!user) {
    return (
      //<PhoneFrame>
        <AuthScreen />
      //</PhoneFrame>
    )
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />
      case 'missions':
        return <MissionsScreen />
      case 'map':
        return <MapScreen />
      case 'rewards':
        return <RewardsScreen />
      case 'profile':
        return <ProfileScreen />
      case 'history':
        return <HistoryScreen />
      case 'notifications':
        return <NotificationsScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    //<PhoneFrame>
      <div className="relative h-full">
        {renderScreen()}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    //</PhoneFrame>
  )
}

function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <AppContent />
      </NotificationsProvider>
    </AuthProvider>
  )
}

export default App