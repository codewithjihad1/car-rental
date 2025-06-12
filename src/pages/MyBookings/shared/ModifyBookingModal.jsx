import React from 'react'
import { FaTimes } from 'react-icons/fa'

const ModifyBookingModal = ({ onClose, bookingData, modifiedDates, setModifiedDates, confirmModifyBooking, isSubmitting, calculateDuration }) => {




    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity -z-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Modify Booking Dates
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Booking Info */}
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3 mb-2">
                                <img
                                    src={bookingData?.carImage}
                                    alt={bookingData?.carModel}
                                    className="w-12 h-8 object-cover rounded"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {bookingData?.carModel}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ${bookingData?.dailyRate}/day
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={modifiedDates.startDate}
                                    onChange={(e) => setModifiedDates(prev => ({ ...prev, startDate: e.target.value }))}
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
                                    value={modifiedDates.endDate}
                                    onChange={(e) => setModifiedDates(prev => ({ ...prev, endDate: e.target.value }))}
                                    min={modifiedDates.startDate || new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Price Calculation */}
                        {modifiedDates.startDate && modifiedDates.endDate && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                                <div className="flex justify-between items-center text-sm text-blue-800 dark:text-blue-300 mb-2">
                                    <span>
                                        ${bookingData?.dailyRate}/day × {calculateDuration(modifiedDates.startDate, modifiedDates.endDate)} days
                                    </span>
                                    <span>
                                        ${calculateDuration(modifiedDates.startDate, modifiedDates.endDate) * bookingData?.dailyRate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center font-semibold text-lg text-blue-900 dark:text-blue-100 pt-2 border-t border-blue-200 dark:border-blue-700">
                                    <span>New Total</span>
                                    <span>${calculateDuration(modifiedDates.startDate, modifiedDates.endDate) * bookingData?.dailyRate}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="inline-flex justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={confirmModifyBooking}
                            disabled={isSubmitting || !modifiedDates.startDate || !modifiedDates.endDate}
                            className="inline-flex justify-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </div>
                            ) : (
                                'Confirm Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModifyBookingModal
