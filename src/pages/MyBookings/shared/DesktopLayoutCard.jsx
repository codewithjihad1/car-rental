import React from 'react'
import { FaEdit, FaEye, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router'

const DesktopLayoutCard = ({bookings, formatDate, calculateDuration, getStatusStyling, getStatusIcon, formatDateTime, handleCancelBooking, handleModifyBooking}) => {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Car Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Booking Period
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Booking Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Total Price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking, index) => (
                        <tr
                            key={booking._id}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                                }`}
                        >
                            {/* Car Details */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-16 w-24">
                                        <img
                                            className="h-16 w-24 rounded-lg object-cover shadow-sm"
                                            src={booking.carImage}
                                            alt={booking.carModel}
                                            onError={(e) => {
                                                e.target.src = '/car.png'
                                            }}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {booking.carModel}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <FaMapMarkerAlt className="mr-1" />
                                            {booking.location}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Booking Period */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium">
                                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {calculateDuration(booking.startDate, booking.endDate)} days
                                    </div>
                                </div>
                            </td>

                            {/* Booking Date */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {formatDateTime(booking.bookingDate)}
                                </div>
                            </td>

                            {/* Total Price */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                    ${booking.totalPrice}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    ${booking.dailyRate}/day
                                </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyling(booking.status)}`}>
                                    {getStatusIcon(booking.status)}
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/car-details/${booking.carId}`}
                                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                                        title="View Car Details"
                                    >
                                        <FaEye />
                                    </Link>
                                    {(booking.status === 'confirmed' || booking.status === 'pending') && (
                                        <>
                                            <button
                                                onClick={() => handleModifyBooking(booking)}
                                                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                                                title="Modify Date"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleCancelBooking(booking)}
                                                className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                                                title="Cancel Booking"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DesktopLayoutCard
