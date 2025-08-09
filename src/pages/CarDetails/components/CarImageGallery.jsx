import { useState } from 'react'
import { FaCheckCircle, FaHeart, FaShare } from 'react-icons/fa'

const CarImageGallery = ({
    car,
    isFavorite,
    onToggleFavorite,
    onShare
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Main Image */}
            <div className="relative">
                <img
                    src={car.images?.[currentImageIndex] || car.imageUrl}
                    alt={car.carModel}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                        e.target.src = '/car.png'
                    }}
                />

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${car.availability === 'Available'
                            ? 'bg-green-100/90 text-green-800 border border-green-200'
                            : 'bg-red-100/90 text-red-800 border border-red-200'
                        }`}>
                        <FaCheckCircle className="mr-2" />
                        {car.availability}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={onToggleFavorite}
                        className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-200 ${isFavorite
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white/80 text-gray-600 border-white/30 hover:bg-white hover:text-red-500'
                            }`}
                    >
                        <FaHeart />
                    </button>
                    <button
                        onClick={onShare}
                        className="p-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full border border-white/30 hover:bg-white hover:text-blue-500 transition-all duration-200"
                    >
                        <FaShare />
                    </button>
                </div>
            </div>

            {/* Thumbnail Gallery */}
            {car.images && car.images.length > 1 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                    <div className="flex space-x-2 overflow-x-auto">
                        {car.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index
                                        ? 'border-blue-500'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${car.carModel} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarImageGallery
