import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import StarRating from '../../../components/StarRating'

const CarInfoHeader = ({ car, getTimeAgo }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {car.carModel}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{car.location}</span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>Added {getTimeAgo(car.dateAdded)}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
                <div className="flex items-center space-x-1 mb-2">
                    <StarRating rating={car.rating} />
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                        ({car.rating}) • {car.bookingCount} bookings
                    </span>
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ${car.dailyRentalPrice}
                    <span className="text-lg text-gray-500 dark:text-gray-400">/day</span>
                </div>
            </div>
        </div>
    )
}

export default CarInfoHeader
