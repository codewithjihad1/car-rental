import { Link } from 'react-router'
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUser,
    FaEye,
    FaHeart,
    FaStar,
    FaCogs,
    FaGasPump,
} from 'react-icons/fa'
import StarRating from '../../../components/StarRating'

const CarListCard = ({ car, getTimeAgo }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
                {/* Car Image */}
                <div className="lg:w-1/3 relative overflow-hidden">
                    <img
                        src={car.imageUrl}
                        alt={car.carModel}
                        className="w-full h-48 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                            e.target.src = '/car.png'
                        }}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            {car.availability}
                        </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs">
                            <FaGasPump className="mr-1" />
                            {car.fuelType}
                        </span>
                    </div>
                </div>

                {/* Car Details */}
                <div className="lg:w-2/3 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                    {car.carModel}
                                </h3>
                                <div className="flex items-center space-x-1 ml-4">
                                    <StarRating rating={car.rating} />
                                    <span className="text-sm text-gray-500 ml-1">({car.rating})</span>
                                </div>
                            </div>

                            {/* Location and Owner */}
                            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-1" />
                                    <span>{car.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaUser className="mr-1" />
                                    <span>Listed by {car.userName}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-1" />
                                    <span>{getTimeAgo(car.dateAdded)}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {car.description}
                            </p>

                            {/* Features */}
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <FaCogs className="mr-2 text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Features:</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {car.features}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <FaEye className="mr-1" />
                                    <span>{car.bookingCount} bookings</span>
                                </div>
                                <div className="flex items-center">
                                    <span>Reg: {car.vehicleRegistrationNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price and Action */}
                        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                            <div className="text-right mb-4">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        ${car.dailyRentalPrice}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-1">/day</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full lg:w-auto">
                                <Link
                                    to={`/car-details/${car._id}`}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                                >
                                    Book Now
                                </Link>
                                <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                                    <FaHeart className="inline mr-2" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarListCard
