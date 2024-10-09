import React from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface TimeSlotsProps {
  selectedDate: Date
  selectedTime: string | null
  onSelectTime: (time: string) => void
  availableTimeSlots: string[]
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ selectedDate, selectedTime, onSelectTime, availableTimeSlots }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="mr-2" />
        Available Time Slots
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {availableTimeSlots.map((time, index) => (
          <motion.button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`p-2 rounded ${
              selectedTime === time
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {time}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TimeSlots