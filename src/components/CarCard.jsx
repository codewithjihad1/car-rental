import React from 'react'
import { FaCar, FaClock, FaEye, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { InView } from 'react-intersection-observer'
import { Link } from 'react-router'

const CarCard = ({ car, index, getTimeAgo }) => {
    return (
        <InView>
            {({ inView, ref }) => (
                <div
                    key={car._id}
                    ref={ref}
                    data-card-id={car._id}
                    className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${inView
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                        }`}
                    style={{
                        transitionDelay: `${index * 100}ms`
                    }}
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
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${car.availability === 'Available'
                                ? 'bg-green-100/90 text-green-800 border border-green-200'
                                : 'bg-red-100/90 text-red-800 border border-red-200'
                                }`}>
                                {car.availability}
                            </span>
                        </div>

                        {/* Booking Count Badge */}
                        <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs">
                                <FaEye className="mr-1" />
                                {car.bookingCount}
                            </span>
                        </div>

                        {/* Heart Icon for Favorites */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
                                <FaHeart />
                            </button>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                                <Link
                                    to={`/car-details/${car._id}`}
                                    className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-center block hover:bg-gray-100 transition-colors duration-200 transform translate-y-2 group-hover:translate-y-0"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Car Details */}
                    <div className="p-6">
                        {/* Car Model */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {car.carModel}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                            <FaMapMarkerAlt className="mr-2 text-sm flex-shrink-0" />
                            <span className="text-sm truncate">{car.location}</span>
                        </div>

                        {/* Price and Features */}
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline">
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

                            {/* Features Preview */}
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Features:</span>
                                <span className="ml-1 truncate block">{car.features}</span>
                            </div>
                        </div>

                        {/* Date Posted */}
                        <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm mb-3">
                            <FaClock className="mr-2 flex-shrink-0" />
                            <span>Added {getTimeAgo(car.dateAdded)}</span>
                        </div>

                        {/* Owner Info & Action */}
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    Listed by {car.userName}
                                </span>
                                <Link
                                    to={`/car-details/${car._id}`}
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                    <span>View</span>
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </InView>
    )
}

export default CarCard
