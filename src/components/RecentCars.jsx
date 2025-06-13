import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FaCar, FaEye, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa'
import Loading from './Loading'
import useAxiosInstance from '../hooks/useAxiosInstance'
import CarCard from './CarCard'

const RecentCars = () => {
    const [recentCars, setRecentCars] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxiosInstance()

    useEffect(() => {
        const loadRecentCars = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/cars/recently-added')
                setRecentCars(response.data)
            } catch (error) {
                console.error('Error loading recent cars:', error)
            } finally {
                setLoading(false)
            }
        }

        loadRecentCars()
    }, [])


    // Calculate time ago
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)

        if (diffInSeconds < 60) return 'Just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
        return `${Math.floor(diffInSeconds / 2592000)} months ago`
    }

    if (loading) {
        return (
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Listings
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover the latest cars added to our platform
                        </p>
                    </div>
                    <Loading />
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Recent Listings
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Added</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover the latest cars added to our platform. Fresh arrivals with competitive pricing and excellent features.
                    </p>
                </div>                
                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {recentCars.map((car, index) => <CarCard key={index} car={car} getTimeAgo={getTimeAgo} />)}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        to="/available-cars"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                        <FaCar className="mr-3" />
                        <span className="text-lg">View All Cars</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RecentCars
