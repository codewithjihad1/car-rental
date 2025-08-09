import { useParams, useNavigate } from 'react-router'
import Loading from '../../components/Loading'

// Components
import BackButton from './components/BackButton'
import CarImageGallery from './components/CarImageGallery'
import CarDetailsCard from './components/CarDetailsCard'
import BookingCard from './components/BookingCard'
import BookingModal from './components/BookingModal'
import CarNotFound from './components/CarNotFound'

// Hooks
import useCarDetails from './hooks/useCarDetails'
import useBooking from './hooks/useBooking'
import useCarActions from './hooks/useCarActions'

// Utils
import { getTimeAgo } from '../../utils/utils'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // Custom hooks
    const { car, loading } = useCarDetails(id)
    const {
        showBookingModal,
        isBooking,
        selectedDates,
        handleBooking,
        openBookingModal,
        closeBookingModal
    } = useBooking()
    const { isFavorite, toggleFavorite, handleShare } = useCarActions()

    // useDocumentTitle
    useDocumentTitle(`Car Details - ${car ? car.carModel : 'Loading...'}`);

    const handleBookingSubmit = (dates, totalPrice) => {
        openBookingModal(dates)
        // Store the data for the modal
        window.carBookingData = { dates, totalPrice }
    }

    const handleBookingConfirm = () => {
        const { totalPrice } = window.carBookingData || {}
        handleBooking(car, totalPrice)
    }

    if (loading) {
        return <Loading />
    }

    if (!car) {
        return <CarNotFound />
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <BackButton onClick={() => navigate(-1)} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <CarImageGallery
                            car={car}
                            isFavorite={isFavorite}
                            onToggleFavorite={toggleFavorite}
                            onShare={handleShare}
                        />

                        {/* Car Details */}
                        <CarDetailsCard
                            car={car}
                            getTimeAgo={getTimeAgo}
                        />
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <BookingCard
                            car={car}
                            onBookingSubmit={handleBookingSubmit}
                            isBooking={isBooking}
                        />
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            <BookingModal
                show={showBookingModal}
                onClose={closeBookingModal}
                car={car}
                selectedDates={selectedDates}
                totalPrice={window.carBookingData?.totalPrice || 0}
                onConfirm={handleBookingConfirm}
                isBooking={isBooking}
            />
        </div>
    )
}

export default CarDetails
