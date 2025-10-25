import { useState, useEffect } from "react";
import axios from "../api/axios";

/**
 * Custom hook for fetching booked dates for a car
 */
const useBookedDates = (carId) => {
    const [bookedRanges, setBookedRanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!carId) return;

        const fetchBookedDates = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `/api/bookings/booked-dates/${carId}`
                );
                setBookedRanges(response.data.bookedRanges || []);
            } catch (err) {
                console.error("Error fetching booked dates:", err);
                setError(
                    err.response?.data?.error || "Failed to fetch booked dates"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookedDates();
    }, [carId]);

    /**
     * Check if a date is booked
     */
    const isDateBooked = (date) => {
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        return bookedRanges.some((range) => {
            const start = new Date(range.startDate);
            const end = new Date(range.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            return checkDate >= start && checkDate <= end;
        });
    };

    /**
     * Get disabled dates for calendar
     */
    const getDisabledDates = () => {
        const disabledDates = [];

        bookedRanges.forEach((range) => {
            const start = new Date(range.startDate);
            const end = new Date(range.endDate);

            const current = new Date(start);
            while (current <= end) {
                disabledDates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        });

        return disabledDates;
    };

    return {
        bookedRanges,
        loading,
        error,
        isDateBooked,
        getDisabledDates,
    };
};

export default useBookedDates;
