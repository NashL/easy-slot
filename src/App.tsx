import React, { useState } from 'react'
import { Calendar, User, Settings, LogOut } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import CalendarView from './components/CalendarView'
import TimeSlots from './components/TimeSlots'
import BookingForm from './components/BookingForm'
import SettingsModal from './components/SettingsModal'
import Login from './components/Login'
import CalendarManagement from './components/CalendarManagement'

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState<'booking' | 'management'>('management')

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true)
      toast.success('Logged in successfully!', { position: 'top-center' })
    } else {
      toast.error('Invalid credentials. Please try again.', { position: 'top-center' })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView('management')
    toast.success('Logged out successfully!', { position: 'top-center' })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Login onLogin={handleLogin} />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">ModernSchedule</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentView('management')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'management'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="inline-block mr-1 h-5 w-5" />
                Manage Calendar
              </button>
              <button
                onClick={() => setCurrentView('booking')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'booking'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="inline-block mr-1 h-5 w-5" />
                Booking View
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Settings className="h-6 w-6" />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentView === 'booking' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalendarView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              <div>
                {selectedDate && (
                  <TimeSlots
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    availableTimeSlots={availableTimeSlots}
                  />
                )}
                {selectedDate && selectedTime && (
                  <BookingForm selectedDate={selectedDate} selectedTime={selectedTime} />
                )}
              </div>
            </div>
          ) : (
            <CalendarManagement />
          )}
        </div>
      </main>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        availableTimeSlots={availableTimeSlots}
        setAvailableTimeSlots={setAvailableTimeSlots}
      />
      <Toaster />
    </div>
  )
}

export default App