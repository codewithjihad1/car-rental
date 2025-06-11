import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FaCar, FaCalendarAlt, FaEye, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import Loading from './Loading'
import axiosInstance from '../api/axios'

const RecentCars = () => {
    const [recentCars, setRecentCars] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadRecentCars = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/cars/recently-added')
                setRecentCars(response.data)
            } catch (error) {
                console.error('Error loading recent cars:', error)
            } finally {
                setLoading(false)
            }
        }

        loadRecentCars()
    }, []) // Empty dependency array is fine since mockRecentCars is outside the component

    // Calculate time ago
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)

        if (diffInSeconds < 60) return 'Just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
        return `${Math.floor(diffInSeconds / 2592000)} months ago`
    }

    if (loading) {
        return (
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Listings
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover the latest cars added to our platform
                        </p>
                    </div>
                    <Loading />
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Recent Listings
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Added</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover the latest cars added to our platform. Fresh arrivals with competitive pricing and excellent features.
                    </p>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {recentCars.map((car) => (
                        <div
                            key={car._id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                        >
                            {/* Car Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={car.imageUrl}
                                    alt={car.carModel}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = '/car.png'
                                    }}
                                />

                                {/* Availability Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${car.availability === 'Available'
                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                            : 'bg-red-100 text-red-800 border border-red-200'
                                        }`}>
                                        {car.availability}
                                    </span>
                                </div>

                                {/* Booking Count Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="inline-flex items-center px-2 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs">
                                        <FaEye className="mr-1" />
                                        {car.bookingCount}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Link
                                            to={`/car-details/${car._id}`}
                                            className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-center block hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="p-5">
                                {/* Car Model */}
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {car.carModel}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                                    <FaMapMarkerAlt className="mr-2 text-sm" />
                                    <span className="text-sm">{car.location}</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ${car.dailyRentalPrice}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 ml-1">/day</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                        <FaCar className="mr-1" />
                                        <span>{car.bookingCount} bookings</span>
                                    </div>
                                </div>

                                {/* Date Posted */}
                                <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm">
                                    <FaClock className="mr-2" />
                                    <span>Added {getTimeAgo(car.dateAdded)}</span>
                                </div>

                                {/* Owner Info */}
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Listed by {car.userName}
                                        </span>
                                        <Link
                                            to={`/car-details/${car._id}`}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        to="/available-cars"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                        <FaCar className="mr-3" />
                        <span className="text-lg">View All Cars</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RecentCars
