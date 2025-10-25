import { useState, useCallback } from "react";
import axios from "../api/axios";

/**
 * Custom hook for getting booking quotes with dynamic pricing
 */
const useBookingQuote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getQuote = useCallback(
        async (carId, startDate, endDate, couponCode = null) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post("/api/bookings/quote", {
                    carId,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    coupon: couponCode,
                });

                setQuote(response.data);
                return response.data;
            } catch (err) {
                const errorMessage =
                    err.response?.data?.error || "Failed to get quote";
                setError(errorMessage);
                console.error("Error getting quote:", err);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const clearQuote = useCallback(() => {
        setQuote(null);
        setError(null);
    }, []);

    return {
        quote,
        loading,
        error,
        getQuote,
        clearQuote,
    };
};

export default useBookingQuote;
