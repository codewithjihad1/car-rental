import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const CarDetailRow = ({ car, handleDeleteClick }) => {
    const navigate = useNavigate()

    return (
        <tr key={car.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
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
                            {car.location}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${car.dailyRentalPrice}/day
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {car.bookingCount}
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
                    <button
                        onClick={() => navigate(`/edit-car/${car.id}`)}
                        className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                        title="Edit Car"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(car)}
                        className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                        title="Delete Car"
                    >
                        <FaTrash />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CarDetailRow
