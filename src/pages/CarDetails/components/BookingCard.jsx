import { useState, useEffect } from 'react'
import { FaShieldAlt, FaClock } from 'react-icons/fa'

const BookingCard = ({
    car,
    onBookingSubmit,
    isBooking
}) => {
    const [selectedDates, setSelectedDates] = useState({
        startDate: '',
        endDate: ''
    })
    const [totalPrice, setTotalPrice] = useState(0)

    // Calculate total price when dates change
    useEffect(() => {
        if (selectedDates.startDate && selectedDates.endDate && car) {
            const start = new Date(selectedDates.startDate)
            const end = new Date(selectedDates.endDate)
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            if (days > 0) {
                setTotalPrice(days * car.dailyRentalPrice)
            }
        }
    }, [selectedDates, car])

    const handleBooking = () => {
        onBookingSubmit(selectedDates, totalPrice)
    }

    const getDays = () => {
        if (selectedDates.startDate && selectedDates.endDate) {
            return Math.ceil((new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) / (1000 * 60 * 60 * 24))
        }
        return 0
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-18">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Book This Car
            </h3>

            {/* Date Selection */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={selectedDates.startDate}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={selectedDates.endDate}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                        min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            {/* Price Calculation */}
            {totalPrice > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>${car.dailyRentalPrice}/day × {getDays()} days</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
            )}

            {/* Book Now Button */}
            <button
                onClick={handleBooking}
                disabled={!selectedDates.startDate || !selectedDates.endDate || car.availability !== 'Available' || isBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {car.availability === 'Available' ? 'Book Now' : 'Currently Unavailable'}
            </button>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center mb-2">
                    <FaShieldAlt className="mr-2" />
                    <span>Free cancellation up to 24h before pickup</span>
                </div>
                <div className="flex items-center justify-center">
                    <FaClock className="mr-2" />
                    <span>Instant booking confirmation</span>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
