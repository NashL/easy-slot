import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface BookingFormProps {
  selectedDate: Date
  selectedTime: string
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, selectedTime }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isBooked, setIsBooked] = useState(false)
  const [errors, setErrors] = useState({ name: '', email: '' })

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: '', email: '' }

    if (name.trim() === '') {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Booking submitted:', { name, email, selectedDate, selectedTime })
      setIsBooked(true)
      toast.success('Appointment booked successfully!', { position: 'top-center' })
    }
  }

  if (isBooked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-green-100 rounded-lg text-green-700 flex items-center"
      >
        <Check className="mr-2" />
        <p>Your appointment has been booked successfully!</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4">Book Your Appointment</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Selected Date: {selectedDate.toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Selected Time: {selectedTime}
        </p>
      </div>
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Appointment
      </motion.button>
    </motion.form>
  )
}

export default BookingForm