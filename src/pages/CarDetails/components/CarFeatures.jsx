import { FaCheckCircle } from 'react-icons/fa'

const CarFeatures = ({ features }) => {
    const featuresList = typeof features === 'string'
        ? features.split(',').map(f => f.trim())
        : features

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Features & Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {featuresList.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarFeatures
