import { useState, useEffect, } from 'react'
import { Link } from 'react-router'
import {
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUser,
    FaEye,
    FaTh,
    FaList,
    FaSort,
    FaHeart,
    FaStar,
    FaCogs,
    FaGasPump
} from 'react-icons/fa'
import Loading from '../components/Loading'
import useAxiosInstance from '../hooks/useAxiosInstance'

const AvailableCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState('grid')
    const [sortBy, setSortBy] = useState('newest')
    const [filteredCars, setFilteredCars] = useState([])

    const axiosInstance = useAxiosInstance()

    // Load cars data
    useEffect(() => {
        const loadCars = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/cars/available')
                setCars(response.data)
                setFilteredCars(response.data)
            } catch (error) {
                console.error('Error loading cars:', error)
            } finally {
                setLoading(false)
            }
        }

        loadCars()
    }, [])

    // Sort cars based on selected option
    useEffect(() => {
        const sortedCars = [...cars].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.dateAdded) - new Date(a.dateAdded)
                case 'oldest':
                    return new Date(a.dateAdded) - new Date(b.dateAdded)
                case 'price-low':
                    return a.dailyRentalPrice - b.dailyRentalPrice
                case 'price-high':
                    return b.dailyRentalPrice - a.dailyRentalPrice
                default:
                    return 0
            }
        })
        setFilteredCars(sortedCars)
    }, [cars, sortBy])

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

    // Render star rating
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />)
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />)
        }

        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)
        }

        return stars
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Available Cars
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Find the perfect car for your next journey
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Results Count */}
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <FaCar className="mr-2" />
                            <span>{filteredCars.length} cars available</span>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Sort Options */}
                            <div className="flex items-center space-x-2">
                                <FaSort className="text-gray-500 dark:text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                        ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <FaTh className="mr-2" />
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${viewMode === 'list'
                                        ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <FaList className="mr-2" />
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cars Display */}
                {filteredCars.length === 0 ? (
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
                ) : (
                    <div className={`${viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                        }`}>
                        {filteredCars.map((car) => (
                            viewMode === 'grid' ? (
                                // Grid View Card
                                <div
                                    key={car._id}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                                >
                                    {/* Car Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = '/car.png'
                                            }}
                                        />

                                        {/* Availability Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                {car.availability}
                                            </span>
                                        </div>

                                        {/* Bookmark */}
                                        <div className="absolute top-3 right-3">
                                            <button className="bg-white/80 backdrop-blur-sm text-gray-600 p-2 rounded-full hover:bg-white hover:text-red-500 transition-all duration-200">
                                                <FaHeart />
                                            </button>
                                        </div>

                                        {/* Fuel Type */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="inline-flex items-center px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs">
                                                <FaGasPump className="mr-1" />
                                                {car.fuelType}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Car Details */}
                                    <div className="p-6">
                                        {/* Car Model and Rating */}
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                                {car.carModel}
                                            </h3>
                                            <div className="flex items-center space-x-1">
                                                {renderStars(car.rating)}
                                                <span className="text-sm text-gray-500 ml-1">({car.rating})</span>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                                            <FaMapMarkerAlt className="mr-2 text-sm flex-shrink-0" />
                                            <span className="text-sm truncate">{car.location}</span>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-4">
                                            <div className="flex items-center mb-2">
                                                <FaCogs className="mr-2 text-gray-500 dark:text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Features:</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {car.features}
                                            </p>
                                        </div>

                                        {/* Price and Stats */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-baseline">
                                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    ${car.dailyRentalPrice}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400 ml-1">/day</span>
                                            </div>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                <FaEye className="mr-1" />
                                                <span>{car.bookingCount} bookings</span>
                                            </div>
                                        </div>

                                        {/* Owner and Date */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center">
                                                <FaUser className="mr-1" />
                                                <span>{car.userName}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="mr-1" />
                                                <span>{getTimeAgo(car.dateAdded)}</span>
                                            </div>
                                        </div>

                                        {/* Book Now Button */}
                                        <Link
                                            to={`/car-details/${car._id}`}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium text-center block hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                // List View Card
                                <div
                                    key={car._id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Car Image */}
                                        <div className="lg:w-1/3 relative overflow-hidden">
                                            <img
                                                src={car.imageUrl}
                                                alt={car.carModel}
                                                className="w-full h-48 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = '/car.png'
                                                }}
                                            />

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    {car.availability}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-3 left-3">
                                                <span className="inline-flex items-center px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs">
                                                    <FaGasPump className="mr-1" />
                                                    {car.fuelType}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Car Details */}
                                        <div className="lg:w-2/3 p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                                <div className="flex-1">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                                            {car.carModel}
                                                        </h3>
                                                        <div className="flex items-center space-x-1 ml-4">
                                                            {renderStars(car.rating)}
                                                            <span className="text-sm text-gray-500 ml-1">({car.rating})</span>
                                                        </div>
                                                    </div>

                                                    {/* Location and Owner */}
                                                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <FaMapMarkerAlt className="mr-1" />
                                                            <span>{car.location}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaUser className="mr-1" />
                                                            <span>Listed by {car.userName}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaCalendarAlt className="mr-1" />
                                                            <span>{getTimeAgo(car.dateAdded)}</span>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                        {car.description}
                                                    </p>

                                                    {/* Features */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center mb-2">
                                                            <FaCogs className="mr-2 text-gray-500 dark:text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Features:</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {car.features}
                                                        </p>
                                                    </div>

                                                    {/* Stats */}
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            <FaEye className="mr-1" />
                                                            <span>{car.bookingCount} bookings</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span>Reg: {car.vehicleRegistrationNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price and Action */}
                                                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                                                    <div className="text-right mb-4">
                                                        <div className="flex items-baseline">
                                                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                                ${car.dailyRentalPrice}
                                                            </span>
                                                            <span className="text-gray-500 dark:text-gray-400 ml-1">/day</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-2 w-full lg:w-auto">
                                                        <Link
                                                            to={`/car-details/${car._id}`}
                                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                                                        >
                                                            Book Now
                                                        </Link>
                                                        <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                                                            <FaHeart className="inline mr-2" />
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AvailableCars
