

import React, { useState, useEffect } from 'react'
import { FaCar, FaDollarSign, FaMapMarkerAlt, FaImage, FaFileAlt, FaCogs, FaIdCard, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

const UpdateCarModal = ({
    isOpen,
    onClose,
    car,
    onUpdate,
    isSubmitting = false
}) => {
    const [formData, setFormData] = useState({
        carModel: '',
        dailyRentalPrice: '',
        availability: 'Available',
        vehicleRegistrationNumber: '',
        features: '',
        description: '',
        imageUrl: '',
        location: ''
    })
    const [errors, setErrors] = useState({})

    // Initialize form data when car prop changes
    useEffect(() => {
        if (car) {
            setFormData({
                carModel: car.carModel || '',
                dailyRentalPrice: car.dailyRentalPrice?.toString() || '',
                availability: car.availability || 'Available',
                vehicleRegistrationNumber: car.vehicleRegistrationNumber || '',
                features: car.features.join(', ') || '',
                description: car.description || '',
                imageUrl: car.imageUrl || '',
                location: car.location || ''
            })
            setErrors({})
        }
    }, [car])

    // Handle form input changes
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

        try {
            const updatedData = {
                ...formData,
                dailyRentalPrice: parseFloat(formData.dailyRentalPrice)
            }

            await onUpdate(car._id, updatedData)
            toast.success('Car updated successfully!')
            onClose()
        } catch (error) {
            console.error('Error updating car:', error)
            toast.error('Failed to update car. Please try again.')
        }
    }

    // Handle modal close
    const handleClose = () => {
        setErrors({})
        onClose()
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div className="fixed -z-5 inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                {/* Modal Content */}
                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Update Car Details
                            </h3>
                            <button
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Car Model */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Car Model *
                                </label>
                                <div className="relative">
                                    <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="carModel"
                                        type="text"
                                        value={formData.carModel}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.carModel ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        placeholder="e.g., Toyota Camry 2023"
                                    />
                                </div>
                                {errors.carModel && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.carModel}</p>
                                )}
                            </div>

                            {/* Price and Availability */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Daily Rental Price (USD) *
                                    </label>
                                    <div className="relative">
                                        <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            name="dailyRentalPrice"
                                            type="number"
                                            min="1"
                                            max="10000"
                                            step="0.01"
                                            value={formData.dailyRentalPrice}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.dailyRentalPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                            placeholder="50.00"
                                        />
                                    </div>
                                    {errors.dailyRentalPrice && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dailyRentalPrice}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Availability Status *
                                    </label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                            </div>

                            {/* Vehicle Registration Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Vehicle Registration Number *
                                </label>
                                <div className="relative">
                                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="vehicleRegistrationNumber"
                                        type="text"
                                        value={formData.vehicleRegistrationNumber}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.vehicleRegistrationNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Features *
                                </label>
                                <div className="relative">
                                    <FaCogs className="absolute left-3 top-3 text-gray-400" />
                                    <textarea
                                        name="features"
                                        rows="2"
                                        value={formData.features}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.features ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        placeholder="e.g., GPS Navigation, Air Conditioning, Bluetooth, Backup Camera"
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description *
                                </label>
                                <div className="relative">
                                    <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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

                            {/* Image URL and Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Car Image URL *
                                    </label>
                                    <div className="relative">
                                        <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            name="imageUrl"
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.imageUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                            placeholder="https://example.com/car-image.jpg"
                                        />
                                    </div>
                                    {errors.imageUrl && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.imageUrl}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            name="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                            placeholder="e.g., New York, NY"
                                        />
                                    </div>
                                    {errors.location && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
                                    )}
                                </div>
                            </div>

                            {/* Image Preview */}
                            {formData.imageUrl && !errors.imageUrl && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Image Preview
                                    </label>
                                    <div className="relative">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Car preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="inline-flex justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="inline-flex justify-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </div>
                            ) : (
                                'Update Car'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCarModal
