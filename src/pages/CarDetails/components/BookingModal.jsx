import { FaTimes } from 'react-icons/fa'

const BookingModal = ({
    show,
    onClose,
    car,
    selectedDates,
    totalPrice,
    onConfirm,
    isBooking
}) => {
    if (!show) return null

    const getDays = () => {
        if (selectedDates.startDate && selectedDates.endDate) {
            return Math.ceil((new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) / (1000 * 60 * 60 * 24))
        }
        return 0
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity -z-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Confirm Booking
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Booking Summary */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={car.imageUrl}
                                    alt={car.carModel}
                                    className="w-16 h-12 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src = '/car.png'
                                    }}
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {car.carModel}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {car.location}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {new Date(selectedDates.startDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {new Date(selectedDates.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {getDays()} days
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-600 dark:text-gray-400">Daily Rate:</span>
                                    <span className="text-gray-900 dark:text-white">${car.dailyRentalPrice}/day</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-900 dark:text-white">Total Price:</span>
                                    <span className="text-blue-600 dark:text-blue-400">${totalPrice}</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <p>By confirming this booking, you agree to our terms and conditions.
                                    You can cancel free of charge up to 24 hours before pickup.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isBooking}
                            className="inline-flex justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isBooking}
                            className="inline-flex justify-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                        >
                            {isBooking ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Booking...
                                </div>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal
