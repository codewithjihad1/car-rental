import {
    FaIdCard,
    FaGasPump,
    FaCar,
    FaCalendarAlt,
    FaCogs,
    FaShieldAlt
} from 'react-icons/fa'

const CarSpecifications = ({ car }) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Vehicle Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaIdCard className="mr-2" />
                        <span className="text-sm">Registration</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.vehicleRegistrationNumber}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaGasPump className="mr-2" />
                        <span className="text-sm">Fuel Type</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.fuelType}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaCar className="mr-2" />
                        <span className="text-sm">Seats</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.seats} Passengers
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaCalendarAlt className="mr-2" />
                        <span className="text-sm">Year</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.year}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaCogs className="mr-2" />
                        <span className="text-sm">Transmission</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.transmission}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                        <FaShieldAlt className="mr-2" />
                        <span className="text-sm">Insurance</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                        {car.insurance}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarSpecifications
