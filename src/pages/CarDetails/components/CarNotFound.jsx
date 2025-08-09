import { Link } from 'react-router'

const CarNotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h2>
                <Link to="/available-cars" className="text-blue-600 hover:text-blue-500">
                    Back to Available Cars
                </Link>
            </div>
        </div>
    )
}

export default CarNotFound
