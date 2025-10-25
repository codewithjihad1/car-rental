import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const useCarDetails = (id) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();

    // Load car details
    useEffect(() => {
        const loadCarDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error("Error loading car details:", error);
                toast.error("Failed to load car details");
                navigate("/available-cars");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCarDetails();
        }
    }, [id, navigate, axiosInstance]);

    return { car, loading };
};

export default useCarDetails;
