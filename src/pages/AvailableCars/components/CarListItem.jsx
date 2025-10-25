import { Link } from 'react-router';

const CarListItem = ({ car, isHovered }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${isHovered ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
        >
            <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-1/3 h-48 sm:h-auto">
                    <img
                        src={car.image}
                        alt={car.model}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {car.model}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{car.brand}</p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${car.availability === 'Available'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}
                        >
                            {car.availability}
                        </span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <span className="font-medium">Type:</span> {car.type || 'Sedan'}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">Seats:</span> {car.seats || 5}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">Transmission:</span>{' '}
                            {car.transmission || 'Automatic'}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">Fuel:</span> {car.fuel || 'Petrol'}
                        </div>
                    </div>

                    {/* Rating */}
                    {car.rating && (
                        <div className="flex items-center gap-1 mb-3">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>{i < Math.floor(car.rating) ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                ({car.rating})
                            </span>
                        </div>
                    )}

                    {/* Price and Action */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${car.price}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                /day
                            </span>
                        </div>
                        <Link
                            to={`/car/${car._id}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListItem;
