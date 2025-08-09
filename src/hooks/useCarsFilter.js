import { useState, useEffect } from "react";

const useCarsFilter = (cars) => {
    const [sortBy, setSortBy] = useState("newest");
    const [filteredCars, setFilteredCars] = useState([]);

    // Sort cars based on selected option
    useEffect(() => {
        const sortedCars = [...cars].sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case "oldest":
                    return new Date(a.dateAdded) - new Date(b.dateAdded);
                case "price-low":
                    return a.dailyRentalPrice - b.dailyRentalPrice;
                case "price-high":
                    return b.dailyRentalPrice - a.dailyRentalPrice;
                default:
                    return 0;
            }
        });
        setFilteredCars(sortedCars);
    }, [cars, sortBy]);

    // Handle search input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = cars.filter(
            (car) =>
                car.carModel.toLowerCase().includes(query) ||
                car.location.toLowerCase().includes(query)
        );
        setFilteredCars(filtered);
    };

    return {
        sortBy,
        setSortBy,
        filteredCars,
        setFilteredCars,
        handleSearch,
    };
};

export default useCarsFilter;
