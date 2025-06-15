import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import {
    FaCar,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaTimes,
} from 'react-icons/fa'
import Loading from '../../components/Loading'
import { toast } from 'react-toastify'
import ModifyBookingModal from './shared/ModifyBookingModal'
import CancelBookingModal from './shared/CancelBookingModal'
import MobileCard from './shared/MobileCard'
import DesktopLayoutCard from './shared/DesktopLayoutCard'
import useAxiosInstance from '../../hooks/useAxiosInstance'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const MyBookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [showModifyModal, setShowModifyModal] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modifiedDates, setModifiedDates] = useState({
        startDate: '',
        endDate: ''
    })

    const axiosInstance = useAxiosInstance()

    // useDocumentTitle
    useDocumentTitle('My Bookings - Car Rental');

    // Load bookings
    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/bookings?userEmail=${user.email}`)
                setBookings(response.data)
            } catch (error) {
                console.error('Error loading bookings:', error)
                toast.error('Failed to load your bookings')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            loadBookings()
        }
    }, [user])

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    // Format datetime for display
    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Calculate duration in days
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    }

    // Get status styling
    const getStatusStyling = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
            case 'canceled':
                return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
        }
    }

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <FaCheckCircle className="mr-1" />
            case 'pending':
                return <FaClock className="mr-1" />
            case 'canceled':
                return <FaTimes className="mr-1" />
            case 'completed':
                return <FaCheckCircle className="mr-1" />
            default:
                return <FaClock className="mr-1" />
        }
    }

    // Handle cancel booking
    const handleCancelBooking = (booking) => {
        setSelectedBooking(booking)
        setShowCancelModal(true)
    }

    // Handle modify booking
    const handleModifyBooking = (booking) => {
        setSelectedBooking(booking)
        setModifiedDates({
            startDate: booking.startDate.split('T')[0],
            endDate: booking.endDate.split('T')[0]
        })
        setShowModifyModal(true)
    }

    // Confirm cancel booking
    const confirmCancelBooking = async () => {
        setIsSubmitting(true)
        try {
            await axiosInstance.patch(`/bookings/${selectedBooking._id}`, { status: 'canceled' })

            // Update local state
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === selectedBooking._id
                        ? { ...booking, status: 'canceled' }
                        : booking
                )
            )

            toast.success('Booking canceled successfully!')
            setShowCancelModal(false)
            setSelectedBooking(null)
        } catch (error) {
            console.error('Error canceling booking:', error)
            toast.error('Failed to cancel booking. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Confirm modify booking
    const confirmModifyBooking = async () => {
        if (!modifiedDates.startDate || !modifiedDates.endDate) {
            toast.error('Please select both start and end dates')
            return
        }

        const startDate = new Date(modifiedDates.startDate)
        const endDate = new Date(modifiedDates.endDate)

        if (endDate <= startDate) {
            toast.error('End date must be after start date')
            return
        }

        setIsSubmitting(true)
        try {
            const duration = calculateDuration(modifiedDates.startDate, modifiedDates.endDate)
            const newTotalPrice = duration * selectedBooking.dailyRate

            // Update booking
            await axiosInstance.patch(`/bookings/${selectedBooking._id}`, {
                startDate: modifiedDates.startDate,
                endDate: modifiedDates.endDate,
                totalPrice: newTotalPrice
            })

            // Update local state
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === selectedBooking._id
                        ? {
                            ...booking,
                            startDate: modifiedDates.startDate + 'T10:00:00Z',
                            endDate: modifiedDates.endDate + 'T18:00:00Z',
                            totalPrice: newTotalPrice
                        }
                        : booking
                )
            )

            toast.success('Booking dates updated successfully!')
            setShowModifyModal(false)
            setSelectedBooking(null)
        } catch (error) {
            console.error('Error modifying booking:', error)
            toast.error('Failed to modify booking. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Close modals
    const closeModals = () => {
        setShowCancelModal(false)
        setShowModifyModal(false)
        setSelectedBooking(null)
        setModifiedDates({ startDate: '', endDate: '' })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            My Bookings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your car rental bookings
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Bookings: {bookings.length}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Active: {bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
                        </div>
                    </div>
                </div>

                {/* Bookings Table or Empty State */}
                {bookings.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                        <div className="mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full inline-block">
                                <FaCalendarAlt className="text-white text-4xl" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Bookings Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            You haven't made any bookings yet. Browse our available cars and make your first reservation!
                        </p>
                        <Link
                            to="/available-cars"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <FaCar className="mr-3" />
                            Browse Available Cars
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Desktop Table */}
                        <DesktopLayoutCard
                            bookings={bookings}
                            formatDateTime={formatDateTime}
                            handleModifyBooking={handleModifyBooking}
                            handleCancelBooking={handleCancelBooking}
                            calculateDuration={calculateDuration}
                            formatDate={formatDate}
                            getStatusStyling={getStatusStyling}
                            getStatusIcon={getStatusIcon}
                        />

                        {/* Mobile Cards */}
                        <MobileCard
                            bookings={bookings}
                            formatDateTime={formatDateTime}
                            getStatusStyling={getStatusStyling}
                            getStatusIcon={getStatusIcon}
                            handleModifyBooking={handleModifyBooking}
                            handleCancelBooking={handleCancelBooking}
                            calculateDuration={calculateDuration}
                            formatDate={formatDate}
                        />
                    </div>
                )}
            </div>

            {/* Cancel Booking Modal */}
            {showCancelModal && (
                <CancelBookingModal
                    onClose={closeModals}
                    bookingData={selectedBooking}
                    confirmCancelBooking={confirmCancelBooking}
                    isSubmitting={isSubmitting}
                />
            )}

            {/* Modify Booking Modal */}
            {showModifyModal && (
                <ModifyBookingModal
                    onClose={closeModals}
                    bookingData={selectedBooking}
                    modifiedDates={modifiedDates}
                    setModifiedDates={setModifiedDates}
                    confirmModifyBooking={confirmModifyBooking}
                    isSubmitting={isSubmitting}
                    calculateDuration={calculateDuration}
                />
            )}
        </div>
    )
}

export default MyBookings
