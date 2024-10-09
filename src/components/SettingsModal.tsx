import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  availableTimeSlots: string[]
  setAvailableTimeSlots: React.Dispatch<React.SetStateAction<string[]>>
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  availableTimeSlots,
  setAvailableTimeSlots,
}) => {
  const handleTimeSlotToggle = (timeSlot: string) => {
    setAvailableTimeSlots((prev) =>
      prev.includes(timeSlot)
        ? prev.filter((slot) => slot !== timeSlot)
        : [...prev, timeSlot].sort()
    )
  }

  const allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div>
              <h3 className="font-medium mb-2">Available Time Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {allTimeSlots.map((timeSlot) => (
                  <button
                    key={timeSlot}
                    onClick={() => handleTimeSlotToggle(timeSlot)}
                    className={`p-2 rounded ${
                      availableTimeSlots.includes(timeSlot)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SettingsModal