import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaShieldAlt, FaClock, FaCalendarAlt, FaTag, FaSpinner } from 'react-icons/fa';
import useBookingQuote from '../../../hooks/useBookingQuote';
import useBookedDates from '../../../hooks/useBookedDates';
import { addDays, isBefore, startOfDay } from 'date-fns';

const AvailabilityCalendar = ({ car, onBookingSubmit, isBooking }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [showCouponInput, setShowCouponInput] = useState(false);

    const { quote, loading: quoteLoading, error: quoteError, getQuote, clearQuote } = useBookingQuote();
    const { getDisabledDates, loading: datesLoading } = useBookedDates(car._id);

    // Use ref to track if we should fetch
    const fetchTimeoutRef = useRef(null);

    // Get quote when dates change or coupon is applied (with debounce)
    useEffect(() => {
        // Clear any existing timeout
        if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
        }

        if (startDate && endDate) {
            // Debounce the API call by 300ms
            fetchTimeoutRef.current = setTimeout(() => {
                getQuote(car._id, startDate, endDate, appliedCoupon);
            }, 300);
        } else {
            clearQuote();
        }

        // Cleanup function
        return () => {
            if (fetchTimeoutRef.current) {
                clearTimeout(fetchTimeoutRef.current);
            }
        };
    }, [startDate, endDate, appliedCoupon, car._id, getQuote, clearQuote]);

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            setAppliedCoupon(couponCode.trim().toUpperCase());
            setShowCouponInput(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const handleBooking = () => {
        if (quote && !quote.unavailable) {
            onBookingSubmit({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }, quote);
        }
    };

    const disabledDates = getDisabledDates();

    // Filter dates that should be disabled
    const isDateDisabled = (date) => {
        // Disable past dates
        if (isBefore(date, startOfDay(new Date()))) {
            return true;
        }

        // Disable booked dates
        return disabledDates.some(disabledDate => {
            const disabled = startOfDay(disabledDate);
            const check = startOfDay(date);
            return disabled.getTime() === check.getTime();
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Book This Car
                </h3>
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${car.dailyRentalPrice}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">per night</div>
                </div>
            </div>

            {/* Date Selection with Calendar */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        Check-in Date
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            if (endDate && date >= endDate) {
                                setEndDate(null);
                            }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        excludeDates={disabledDates}
                        filterDate={(date) => !isDateDisabled(date)}
                        placeholderText="Select check-in date"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        dateFormat="MMM dd, yyyy"
                        disabled={datesLoading}
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        Check-out Date
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate ? addDays(startDate, 1) : addDays(new Date(), 1)}
                        excludeDates={disabledDates}
                        filterDate={(date) => !isDateDisabled(date)}
                        placeholderText="Select check-out date"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        dateFormat="MMM dd, yyyy"
                        disabled={!startDate || datesLoading}
                    />
                </div>
            </div>

            {/* Coupon Section */}
            <div className="mb-6">
                {!appliedCoupon ? (
                    showCouponInput ? (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    placeholder="Enter coupon code"
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                                    onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode.trim() || quoteLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    Apply
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setShowCouponInput(false);
                                    setCouponCode('');
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowCouponInput(true)}
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            <FaTag className="mr-2" />
                            Have a coupon code?
                        </button>
                    )
                ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center text-green-700 dark:text-green-400">
                            <FaTag className="mr-2" />
                            <span className="font-medium">{appliedCoupon}</span>
                        </div>
                        <button
                            onClick={handleRemoveCoupon}
                            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {quoteLoading && (
                <div className="flex items-center justify-center py-8">
                    <FaSpinner className="animate-spin text-3xl text-blue-600" />
                </div>
            )}

            {/* Quote Display */}
            {!quoteLoading && quote && (
                <div className="space-y-4 mb-6">
                    {/* Unavailable Warning */}
                    {quote.unavailable && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                                ⚠️ Selected dates are not available
                            </p>
                        </div>
                    )}

                    {/* Coupon Error */}
                    {quote.couponError && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                                {quote.couponError}
                            </p>
                        </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                ${quote.nightly} × {quote.nights} {quote.nights === 1 ? 'night' : 'nights'}
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                                ${quote.subtotal.toFixed(2)}
                            </span>
                        </div>

                        {/* Length Discount */}
                        {quote.lengthDiscount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-green-600 dark:text-green-400">
                                    {quote.appliedRules?.length?.name || 'Length Discount'}
                                </span>
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                    -${quote.lengthDiscount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        {/* Coupon Discount */}
                        {quote.couponDiscount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-green-600 dark:text-green-400">
                                    Coupon Discount ({appliedCoupon})
                                </span>
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                    -${quote.couponDiscount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        {/* Taxes */}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Taxes & Fees</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                                ${quote.taxes.toFixed(2)}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    ${quote.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Applied Rules Info */}
                    {quote.appliedRules?.seasonal && quote.appliedRules.seasonal.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <p className="font-medium">Applied pricing rules:</p>
                            <ul className="list-disc list-inside space-y-1">
                                {quote.appliedRules.seasonal.map((rule, index) => (
                                    <li key={index}>{rule.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Error Display */}
            {quoteError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400 text-sm">{quoteError}</p>
                </div>
            )}

            {/* Book Now Button */}
            <button
                onClick={handleBooking}
                disabled={
                    !startDate ||
                    !endDate ||
                    !quote ||
                    quote.unavailable ||
                    car.availability !== 'Available' ||
                    isBooking ||
                    quoteLoading
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isBooking ? (
                    <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Booking...
                    </div>
                ) : quote?.unavailable ? (
                    'Dates Not Available'
                ) : car.availability !== 'Available' ? (
                    'Currently Unavailable'
                ) : (
                    'Reserve Now'
                )}
            </button>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <div className="flex items-center justify-center">
                    <FaShieldAlt className="mr-2" />
                    <span>Free cancellation up to 24h before pickup</span>
                </div>
                <div className="flex items-center justify-center">
                    <FaClock className="mr-2" />
                    <span>Instant booking confirmation</span>
                </div>
            </div>

            {/* Available Coupons Hint */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                    💡 <strong>Try these coupons:</strong> WELCOME10, SUMMER20, SAVE50, LONGTERM
                </p>
            </div>
        </div>
    );
};

export default AvailabilityCalendar;
