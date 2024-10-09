import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Plus, Save, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface TimeRange {
  startTime: string
  endTime: string
}

interface DayAvailability {
  date: string
  timeRanges: TimeRange[]
}

const CalendarManagement: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [availability, setAvailability] = useState<DayAvailability[]>([])
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const getDaysOfWeek = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay() + 1)
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      return day
    })
  }

  const daysOfWeek = getDaysOfWeek(currentWeek)

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
      return newDate
    })
  }

  const handleDayClick = (day: Date) => {
    setSelectedDay(day)
  }

  const getAvailabilityForDay = (day: Date) => {
    const dateString = day.toISOString().split('T')[0]
    return availability.find(d => d.date === dateString) || { date: dateString, timeRanges: [] }
  }

  const handleAddTimeRange = () => {
    if (!selectedDay) return
    const dateString = selectedDay.toISOString().split('T')[0]
    setAvailability(prev => {
      const existingDay = prev.find(d => d.date === dateString)
      if (existingDay) {
        return prev.map(d => d.date === dateString ? {
          ...d,
          timeRanges: [...d.timeRanges, { startTime: '09:00', endTime: '17:00' }]
        } : d)
      } else {
        return [...prev, { date: dateString, timeRanges: [{ startTime: '09:00', endTime: '17:00' }] }]
      }
    })
  }

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    if (!selectedDay) return
    const dateString = selectedDay.toISOString().split('T')[0]
    setAvailability(prev => prev.map(d => {
      if (d.date === dateString) {
        const newTimeRanges = [...d.timeRanges]
        newTimeRanges[index] = { ...newTimeRanges[index], [field]: value }
        return { ...d, timeRanges: newTimeRanges }
      }
      return d
    }))
  }

  const handleRemoveTimeRange = (index: number) => {
    if (!selectedDay) return
    const dateString = selectedDay.toISOString().split('T')[0]
    setAvailability(prev => prev.map(d => {
      if (d.date === dateString) {
        const newTimeRanges = d.timeRanges.filter((_, i) => i !== index)
        return { ...d, timeRanges: newTimeRanges }
      }
      return d
    }))
  }

  const handleSaveAvailability = () => {
    if (!selectedDay) return
    // Here you would typically save the availability to your backend
    console.log('Saving availability:', getAvailabilityForDay(selectedDay))
    toast.success('Availability saved successfully!', { position: 'top-center' })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 pr-0 md:pr-6 mb-6 md:mb-0">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Clock className="mr-2" />
          Manage Your Availability
        </h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <h2 className="text-xl font-semibold">
              {currentWeek.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map((day) => {
              const dayAvailability = getAvailabilityForDay(day)
              return (
                <motion.div
                  key={day.toISOString()}
                  className="text-center p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayClick(day)}
                >
                  <p className="font-semibold">{day.toLocaleString('default', { weekday: 'short' })}</p>
                  <p className="text-2xl font-bold mb-2">{day.getDate()}</p>
                  {dayAvailability.timeRanges.length > 0 ? (
                    dayAvailability.timeRanges.map((range, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {range.startTime} - {range.endTime}
                      </p>
                    ))
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-400">00:00 - 23:59</p>
                      <Plus size={18} className="text-gray-400 mt-1" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      {selectedDay && (
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            Edit {selectedDay.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          {getAvailabilityForDay(selectedDay).timeRanges.map((range, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Time Range {index + 1}</span>
                <button
                  onClick={() => handleRemoveTimeRange(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex space-x-2">
                <input
                  type="time"
                  value={range.startTime}
                  onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <input
                  type="time"
                  value={range.endTime}
                  onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          ))}
          <div className="space-y-4">
            <button
              onClick={handleAddTimeRange}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              Add Time Range
            </button>
            <button
              onClick={handleSaveAvailability}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center justify-center"
            >
              <Save size={18} className="mr-2" />
              Save Availability
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarManagement