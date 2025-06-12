import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import {
    FaCar,
    FaMapMarkerAlt,
    FaDollarSign,
    FaCalendarAlt,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaCogs,
    FaGasPump,
    FaIdCard,
    FaCheckCircle,
    FaTimes,
    FaArrowLeft,
    FaHeart,
    FaShare,
    FaShieldAlt,
    FaClock
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import axiosInstance from '../api/axios'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [isBooking, setIsBooking] = useState(false)
    const [selectedDates, setSelectedDates] = useState({
        startDate: '',
        endDate: ''
    })
    const [totalPrice, setTotalPrice] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    // Load car details
    useEffect(() => {
        const loadCarDetails = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/cars/${id}`)
                setCar(response.data)
            } catch (error) {
                console.error('Error loading car details:', error)
                toast.error('Failed to load car details')
                navigate('/available-cars')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadCarDetails()
        }
    }, [id, navigate])

    // Calculate total price when dates change
    useEffect(() => {
        if (selectedDates.startDate && selectedDates.endDate && car) {
            const start = new Date(selectedDates.startDate)
            const end = new Date(selectedDates.endDate)
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            if (days > 0) {
                setTotalPrice(days * car.dailyRentalPrice)
            }
        }
    }, [selectedDates, car])

    // Render star rating
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />)
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />)
        }

        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />)
        }

        return stars
    }

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

    // Handle booking
    const handleBooking = async () => {
        if (!user) {
            toast.error('Please login to book a car')
            navigate('/auth/login')
            return
        }

        if (!selectedDates.startDate || !selectedDates.endDate) {
            toast.error('Please select booking dates')
            return
        }

        setIsBooking(true)
        try {
            const bookingData = {
                carId: car._id,
                carModel: car.carModel,
                carImage: car.imageUrl,
                location: car.location,
                startDate: selectedDates.startDate,
                endDate: selectedDates.endDate,
                bookingDate: new Date().toISOString(),
                totalPrice: totalPrice,
                dailyRate: car.dailyRentalPrice,
                status: 'confirmed',
                userEmail: user?.email,
                userName: user?.displayName
            }
            await axiosInstance.post('/bookings', bookingData)

            toast.success('Car booked successfully!')
            setShowBookingModal(false)
            navigate('/my-bookings')
        } catch (error) {
            console.error('Error booking car:', error)
            toast.error('Failed to book car. Please try again.')
        } finally {
            setIsBooking(false)
        }
    }

    // Handle favorite toggle
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
    }

    // Handle share
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: car.carModel,
                text: `Check out this ${car.carModel} for rent!`,
                url: window.location.href
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link copied to clipboard!')
        }
    }

    if (loading) {
        return <Loading />
    }

    if (!car) {
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200"
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
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
                                        onClick={toggleFavorite}
                                        className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-200 ${isFavorite
                                            ? 'bg-red-500 text-white border-red-500'
                                            : 'bg-white/80 text-gray-600 border-white/30 hover:bg-white hover:text-red-500'
                                            }`}
                                    >
                                        <FaHeart />
                                    </button>
                                    <button
                                        onClick={handleShare}
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

                        {/* Car Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {car.carModel}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>{car.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2" />
                                            <span>Added {getTimeAgo(car.dateAdded)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <div className="flex items-center space-x-1 mb-2">
                                        {renderStars(car.rating)}
                                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                                            ({car.rating}) • {car.bookingCount} bookings
                                        </span>
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        ${car.dailyRentalPrice}
                                        <span className="text-lg text-gray-500 dark:text-gray-400">/day</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {car.description}
                                </p>
                            </div>

                            {/* Vehicle Specifications */}
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

                            {/* Features */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Features & Amenities
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {typeof (car.features) === 'string' ? car.features.split(',').map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                                            <span>{feature.trim()}</span>
                                        </div>
                                    )) : car.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                                            <span>{feature.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-18">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Book This Car
                            </h3>

                            {/* Date Selection */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDates.startDate}
                                        onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDates.endDate}
                                        onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                                        min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Price Calculation */}
                            {totalPrice > 0 && (
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        <span>${car.dailyRentalPrice}/day × {Math.ceil((new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) / (1000 * 60 * 60 * 24))} days</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-semibold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            )}

                            {/* Book Now Button */}
                            <button
                                onClick={() => setShowBookingModal(true)}
                                disabled={!selectedDates.startDate || !selectedDates.endDate || car.availability !== 'Available'}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {car.availability === 'Available' ? 'Book Now' : 'Currently Unavailable'}
                            </button>

                            {/* Additional Info */}
                            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center justify-center mb-2">
                                    <FaShieldAlt className="mr-2" />
                                    <span>Free cancellation up to 24h before pickup</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaClock className="mr-2" />
                                    <span>Instant booking confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity -z-10" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Header */}
                            <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Confirm Booking
                                    </h3>
                                    <button
                                        onClick={() => setShowBookingModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>

                                {/* Booking Summary */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            className="w-16 h-12 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = '/car.png'
                                            }}
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {car.carModel}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {car.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {new Date(selectedDates.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {new Date(selectedDates.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {Math.ceil((new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) / (1000 * 60 * 60 * 24))} days
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                                            <span className="text-gray-600 dark:text-gray-400">Daily Rate:</span>
                                            <span className="text-gray-900 dark:text-white">${car.dailyRentalPrice}/day</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                                            <span className="text-gray-900 dark:text-white">Total Price:</span>
                                            <span className="text-blue-600 dark:text-blue-400">${totalPrice}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <p>By confirming this booking, you agree to our terms and conditions.
                                            You can cancel free of charge up to 24 hours before pickup.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowBookingModal(false)}
                                    disabled={isBooking}
                                    className="inline-flex justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    disabled={isBooking}
                                    className="inline-flex justify-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                                >
                                    {isBooking ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Booking...
                                        </div>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarDetails
