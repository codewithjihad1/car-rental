import { Link } from 'react-router'
import { FaCar } from 'react-icons/fa'

const EmptyState = () => {
    return (
        <div className="text-center py-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full inline-block mb-6">
                <FaCar className="text-white text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Cars Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                We couldn't find any cars matching your criteria. Please try adjusting your filters.
            </p>
            <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                Back to Home
            </Link>
        </div>
    )
}

export default EmptyState
