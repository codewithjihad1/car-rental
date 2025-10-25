import { Link } from 'react-router';
import { FaCalendarAlt, FaUser, FaHeart, FaGasPump, FaEye } from 'react-icons/fa';
import StarRating from '../../../components/StarRating';

const CarGridCard = ({ car, isHovered }) => {
    return (
        <div className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 ${isHovered ? 'scale-105 ring-2 ring-blue-500' : 'hover:scale-105'
            } hover:-translate-y-2`}>
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        {car.availability}
                    </span>
                </div>

                {/* Bookmark */}
                <div className="absolute top-3 right-3">
                    <button className="bg-white/80 backdrop-blur-sm text-gray-600 p-2 rounded-full hover:bg-white hover:text-red-500 transition-all duration-200">
                        <FaHeart />
                    </button>
                </div>

                {/* Fuel Type */}
                <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs">
                        <FaGasPump className="mr-1" />
                        {car.fuelType}
                    </span>
                </div>
            </div>

            {/* Car Details */}
            <div className="p-6">
                {/* Car Model and Rating */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {car.carModel}
                    </h3>
                    <div className="flex items-center space-x-1">
                        <StarRating rating={car.rating} />
                        <span className="text-sm text-gray-500 ml-1">({car.rating})</span>
                    </div>
                </div>

                {/* Price and Stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${car.dailyRentalPrice}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">/day</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <FaEye className="mr-1" />
                        <span>{car.bookingCount} bookings</span>
                    </div>
                </div>

                {/* Owner and Date */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span>{car.userName}</span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {/* <span>{getTimeAgo(car?.dateAdded)}</span> */}
                    </div>
                </div>

                {/* Book Now Button */}
                <Link
                    to={`/car-details/${car._id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium text-center block hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                    Book Now
                </Link>
            </div>
        </div>
    )
}

export default CarGridCard
