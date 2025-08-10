import React from 'react'
import { Link } from 'react-router'
import { FaCar, FaCalendarCheck, FaPlus } from 'react-icons/fa'

const RecentActivity = ({ recentCars, recentBookings }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Cars */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Cars</h3>
                        <Link to="/dashboard/my-cars" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {recentCars.length > 0 ? (
                        <div className="space-y-4">
                            {recentCars.map((car) => (
                                <div key={car._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            className="h-12 w-12 rounded-lg object-cover"
                                            onError={(e) => { e.target.src = '/car.png' }}
                                        />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{car.carModel}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">${car.dailyRentalPrice}/day</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${car.availability === 'Available'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                        {car.availability}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FaCar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No cars yet</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your first car.</p>
                            <div className="mt-6">
                                <Link
                                    to="/dashboard/add-car"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <FaPlus className="mr-2 h-4 w-4" />
                                    Add Car
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
                        <Link to="/dashboard/my-bookings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {recentBookings.length > 0 ? (
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.carModel}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">${booking.totalCost}</p>
                                        <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Confirmed'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : booking.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FaCalendarCheck className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No bookings yet</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your booking history will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecentActivity
