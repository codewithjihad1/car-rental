import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { FaCar, FaDollarSign, FaMapMarkerAlt, FaImage, FaFileAlt, FaCogs, FaIdCard, FaCalendarAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { AuthContext } from '../../context/AuthContext'
import useAxiosInstance from '../../hooks/useAxiosInstance'

const AddCar = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const axiosInstance = useAxiosInstance()

    const [formData, setFormData] = useState({
        carModel: '',
        dailyRentalPrice: '',
        availability: 'Available',
        vehicleRegistrationNumber: '',
        features: '',
        description: '',
        imageUrl: '',
        location: '',
        bookingCount: 0
    })

    //  useDocumentTitle
    useDocumentTitle('Add New Car - Car Rental App')


    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        // Car Model validation
        if (!formData.carModel.trim()) {
            newErrors.carModel = 'Car model is required'
        } else if (formData.carModel.trim().length < 2) {
            newErrors.carModel = 'Car model must be at least 2 characters'
        }

        // Daily Rental Price validation
        if (!formData.dailyRentalPrice) {
            newErrors.dailyRentalPrice = 'Daily rental price is required'
        } else if (isNaN(formData.dailyRentalPrice) || parseFloat(formData.dailyRentalPrice) <= 0) {
            newErrors.dailyRentalPrice = 'Please enter a valid price greater than 0'
        } else if (parseFloat(formData.dailyRentalPrice) > 10000) {
            newErrors.dailyRentalPrice = 'Price seems too high. Please enter a reasonable amount'
        }

        // Vehicle Registration Number validation
        if (!formData.vehicleRegistrationNumber.trim()) {
            newErrors.vehicleRegistrationNumber = 'Vehicle registration number is required'
        } else if (formData.vehicleRegistrationNumber.trim().length < 3) {
            newErrors.vehicleRegistrationNumber = 'Registration number must be at least 3 characters'
        }

        // Features validation
        if (!formData.features.trim()) {
            newErrors.features = 'Please list at least one feature'
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters'
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters'
        }

        // Image URL validation
        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Image URL is required'
        } else {
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
            if (!urlPattern.test(formData.imageUrl.trim())) {
                newErrors.imageUrl = 'Please enter a valid URL'
            }
        }

        // Location validation
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required'
        } else if (formData.location.trim().length < 2) {
            newErrors.location = 'Location must be at least 2 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error('Please fix the errors before submitting')
            return
        }

        setIsSubmitting(true)

        try {
            // Prepare data for submission
            const carData = {
                ...formData,
                dailyRentalPrice: parseFloat(formData.dailyRentalPrice),
                bookingCount: 0,
                dateAdded: new Date().toISOString(),
                features: formData.features.split(',').map(feature => feature.trim()),
                userEmail: user.email,
                userName: user.displayName || 'Anonymous User',
                userPhoto: user.photoURL || ''
            }

            await axiosInstance.post('/cars', carData)

            toast.success('Car added successfully!')
            navigate('/my-cars')

        } catch (error) {
            console.error('Error adding car:', error)
            toast.error('Failed to add car. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                            <FaCar className="text-white text-3xl" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Add New Car
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Fill in the details below to add your car for rental
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Car Model */}
                        <div>
                            <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Car Model *
                            </label>
                            <div className="relative">
                                <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    id="carModel"
                                    name="carModel"
                                    type="text"
                                    value={formData.carModel}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.carModel ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="e.g., Toyota Camry 2023"
                                />
                            </div>
                            {errors.carModel && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.carModel}</p>
                            )}
                        </div>

                        {/* Price and Availability Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Daily Rental Price */}
                            <div>
                                <label htmlFor="dailyRentalPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Daily Rental Price (USD) *
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="dailyRentalPrice"
                                        name="dailyRentalPrice"
                                        type="number"
                                        min="1"
                                        max="10000"
                                        step="0.01"
                                        value={formData.dailyRentalPrice}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.dailyRentalPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        placeholder="50.00"
                                    />
                                </div>
                                {errors.dailyRentalPrice && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dailyRentalPrice}</p>
                                )}
                            </div>

                            {/* Availability */}
                            <div>
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Availability Status *
                                </label>
                                <select
                                    id="availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>

                        {/* Vehicle Registration Number */}
                        <div>
                            <label htmlFor="vehicleRegistrationNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Vehicle Registration Number *
                            </label>
                            <div className="relative">
                                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    id="vehicleRegistrationNumber"
                                    name="vehicleRegistrationNumber"
                                    type="text"
                                    value={formData.vehicleRegistrationNumber}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.vehicleRegistrationNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="e.g., ABC-1234"
                                />
                            </div>
                            {errors.vehicleRegistrationNumber && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.vehicleRegistrationNumber}</p>
                            )}
                        </div>

                        {/* Features */}
                        <div>
                            <label htmlFor="features" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Features *
                            </label>
                            <div className="relative">
                                <FaCogs className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    id="features"
                                    name="features"
                                    rows="3"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 resize-none ${errors.features ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="e.g., GPS Navigation, Air Conditioning, Bluetooth, Backup Camera, Leather Seats"
                                />
                            </div>
                            {errors.features && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.features}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                List the key features separated by commas
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <div className="relative">
                                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Provide a detailed description of the car, its condition, and any special notes..."
                                />
                            </div>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {formData.description.length}/500 characters
                            </p>
                        </div>

                        {/* Image URL and Location Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image URL */}
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Car Image URL *
                                </label>
                                <div className="relative">
                                    <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        placeholder="https://example.com/car-image.jpg"
                                    />
                                </div>
                                {errors.imageUrl && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.imageUrl}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Location *
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        placeholder="e.g., New York, NY"
                                    />
                                </div>
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
                                )}
                            </div>
                        </div>

                        {/* User Info Display */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                <FaCalendarAlt className="mr-2" />
                                Car Owner Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                                    <span className="ml-2 text-gray-900 dark:text-white">{user?.displayName || 'Anonymous User'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                                    <span className="ml-2 text-gray-900 dark:text-white">{user?.email}</span>
                                </div>

                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Adding Car...
                                    </div>
                                ) : (
                                    'Add Car'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCar
