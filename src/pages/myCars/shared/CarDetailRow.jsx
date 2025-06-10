import React from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const CarDetailRow = ({
    car,
    onEdit,
    onDelete,
    onView,
    isMobile = false
}) => {
    if (isMobile) {
        // Mobile Card Layout
        return (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex items-start space-x-4">
                    <img
                        className="h-20 w-28 rounded-lg object-cover flex-shrink-0"
                        src={car.imageUrl}
                        alt={car.carModel}
                        onError={(e) => {
                            e.target.src = '/car.png'
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                            {car.carModel}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {car.location}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                ${car.dailyRentalPrice}/day
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.availability === 'Available'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                }`}>
                                {car.availability}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span>Bookings: {car.bookingCount || 0}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(car.dateAdded).toLocaleDateString()}</span>
                            </div>
                            <div className="flex space-x-2">
                                {onView && (
                                    <button
                                        onClick={() => onView(car)}
                                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                                        title="View Car Details"
                                    >
                                        <FaEye />
                                    </button>
                                )}
                                <button
                                    onClick={() => onEdit(car)}
                                    className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                                    title="Edit Car"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(car._id)}
                                    className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                                    title="Delete Car"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Desktop Table Row Layout
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-24">
                        <img
                            className="h-16 w-24 rounded-lg object-cover"
                            src={car.imageUrl}
                            alt={car.carModel}
                            onError={(e) => {
                                e.target.src = '/car.png'
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {car.carModel}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {car.vehicleRegistrationNumber}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {car.location}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${car.dailyRentalPrice}/day
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {car.bookingCount || 0}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.availability === 'Available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                    {car.availability}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(car.dateAdded).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    {onView && (
                        <button
                            onClick={() => onView(car)}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-lg transition-colors duration-200"
                            title="View Car Details"
                        >
                            <FaEye />
                        </button>
                    )}
                    <button
                        onClick={() => onEdit(car)}
                        className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                        title="Edit Car"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(car)}
                        className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                        title="Delete Car"
                    >                        <FaTrash />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CarDetailRow
