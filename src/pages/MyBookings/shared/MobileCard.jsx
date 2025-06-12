import React from 'react'
import { FaEdit, FaEye, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router'

const MobileCard = ({ bookings, formatDateTime, getStatusStyling, getStatusIcon, handleModifyBooking, handleCancelBooking, formatDate,calculateDuration }) => {
    return (
        <div className="lg:hidden">
            {bookings.map((booking, index) => (
                <div
                    key={booking._id}
                    className={`p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                        }`}
                >
                    <div className="flex items-start space-x-4">
                        <img
                            className="h-20 w-28 rounded-lg object-cover flex-shrink-0 shadow-sm"
                            src={booking.carImage}
                            alt={booking.carModel}
                            onError={(e) => {
                                e.target.src = '/car.png'
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {booking.carModel}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <FaMapMarkerAlt className="mr-1" />
                                {booking.location}
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Period:</span>
                                    <span className="text-gray-900 dark:text-white font-medium">
                                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {calculateDuration(booking.startDate, booking.endDate)} days
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                                    <span className="text-gray-900 dark:text-white font-semibold">
                                        ${booking.totalPrice}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Booked:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {formatDateTime(booking.bookingDate)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyling(booking.status)}`}>
                                    {getStatusIcon(booking.status)}
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>

                                <div className="flex space-x-2">
                                    <Link
                                        to={`/car-details/${booking.carId}`}
                                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                                        title="View Car"
                                    >
                                        <FaEye />
                                    </Link>
                                    {(booking.status === 'confirmed' || booking.status === 'pending') && (
                                        <>
                                            <button
                                                onClick={() => handleModifyBooking(booking)}
                                                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                                                title="Modify"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleCancelBooking(booking)}
                                                className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                                                title="Cancel"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileCard
