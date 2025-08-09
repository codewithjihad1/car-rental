import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const useBooking = () => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedDates, setSelectedDates] = useState({
        startDate: "",
        endDate: "",
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();

    // Handle booking
    const handleBooking = async (car, totalPrice) => {
        if (!user) {
            toast.error("Please login to book a car");
            navigate("/auth/login");
            return;
        }

        if (!selectedDates.startDate || !selectedDates.endDate) {
            toast.error("Please select booking dates");
            return;
        }

        setIsBooking(true);
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
                status: "confirmed",
                userEmail: user?.email,
                userName: user?.displayName,
            };
            await axiosInstance.post("/bookings", bookingData);

            toast.success("Car booked successfully!");
            setShowBookingModal(false);
            navigate("/my-bookings");
        } catch (error) {
            console.error("Error booking car:", error);
            toast.error("Failed to book car. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };

    const openBookingModal = (dates) => {
        setSelectedDates(dates);
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
    };

    return {
        showBookingModal,
        isBooking,
        selectedDates,
        handleBooking,
        openBookingModal,
        closeBookingModal,
    };
};

export default useBooking;
