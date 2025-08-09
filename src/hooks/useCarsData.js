import { useState, useEffect } from "react";
import useAxiosInstance from "../useAxiosInstance";

const useCarsData = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredCars, setFilteredCars] = useState([]);
    const axiosInstance = useAxiosInstance();

    // Load cars data
    useEffect(() => {
        const loadCars = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/cars/available");
                setCars(response.data);
                setFilteredCars(response.data);
            } catch (error) {
                console.error("Error loading cars:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCars();
    }, [axiosInstance]);

    return {
        cars,
        setCars,
        loading,
        filteredCars,
        setFilteredCars,
    };
};

export default useCarsData;
