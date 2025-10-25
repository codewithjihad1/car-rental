import { FaTimes, FaCheckCircle, FaTag } from 'react-icons/fa';

const EnhancedBookingModal = ({ show, onClose, car, selectedDates, quote, onConfirm, isBooking }) => {
    if (!show || !quote) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity -z-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <FaCheckCircle className="mr-3" />
                                Confirm Your Booking
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 space-y-6">
                        {/* Car Info */}
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <img
                                src={car.imageUrl}
                                alt={car.carModel}
                                className="w-24 h-18 object-cover rounded-lg"
                                onError={(e) => {
                                    e.target.src = '/car.png';
                                }}
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                                    {car.carModel}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {car.location}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Registration: {car.vehicleRegistrationNumber}
                                </p>
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Check-in</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {formatDate(selectedDates.startDate)}
                                </p>
                            </div>
                            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Check-out</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {formatDate(selectedDates.endDate)}
                                </p>
                            </div>
                        </div>

                        {/* Pricing Breakdown */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                                Price Breakdown
                            </h4>

                            <div className="space-y-3">
                                {/* Base Price */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        ${quote.nightly} × {quote.nights} {quote.nights === 1 ? 'night' : 'nights'}
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        ${quote.subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {/* Applied Rules Info */}
                                {quote.appliedRules?.seasonal && quote.appliedRules.seasonal.length > 0 && (
                                    <div className="pl-4 space-y-1">
                                        {quote.appliedRules.seasonal.map((rule, index) => (
                                            <div key={index} className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                                                <span className="mr-2">↳</span>
                                                <span>{rule.name} applied</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Length Discount */}
                                {quote.lengthDiscount > 0 && (
                                    <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                        <span className="flex items-center">
                                            <FaTag className="mr-2" />
                                            {quote.appliedRules?.length?.name || 'Length Discount'}
                                        </span>
                                        <span className="font-medium">
                                            -${quote.lengthDiscount.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                {/* Coupon Discount */}
                                {quote.couponDiscount > 0 && (
                                    <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                        <span className="flex items-center">
                                            <FaTag className="mr-2" />
                                            Coupon ({quote.appliedRules?.coupon?.code || 'Discount'})
                                        </span>
                                        <span className="font-medium">
                                            -${quote.couponDiscount.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                {/* Taxes */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Taxes & Fees (10%)</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        ${quote.taxes.toFixed(2)}
                                    </span>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300 dark:border-gray-600">
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</span>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${quote.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Savings Badge */}
                        {(quote.lengthDiscount > 0 || quote.couponDiscount > 0) && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <p className="text-green-700 dark:text-green-400 font-semibold text-center">
                                    🎉 You're saving $
                                    {(quote.lengthDiscount + quote.couponDiscount).toFixed(2)} on this booking!
                                </p>
                            </div>
                        )}

                        {/* Terms */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                <strong className="text-gray-900 dark:text-white">Booking Terms:</strong><br />
                                • Free cancellation up to 24 hours before pickup<br />
                                • Valid driver's license required at pickup<br />
                                • Security deposit may be required<br />
                                • By confirming, you agree to our{' '}
                                <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isBooking}
                            className="inline-flex justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isBooking}
                            className="inline-flex justify-center px-8 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isBooking ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </div>
                            ) : (
                                `Confirm Booking - $${quote.total.toFixed(2)}`
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBookingModal;
