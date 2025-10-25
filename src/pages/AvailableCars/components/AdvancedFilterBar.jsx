import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';

const AdvancedFilterBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [debounceTimer, setDebounceTimer] = useState(null);

    // Filter state
    const [filters, setFilters] = useState({
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        transmission: searchParams.get('transmission') || '',
        fuel: searchParams.get('fuel') || '',
        seats: searchParams.get('seats') || '',
        rating: searchParams.get('rating') || '',
    });

    // Debounced search
    const handleSearchChange = (value) => {
        setSearchQuery(value);

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            updateSearchParams({ query: value });
        }, 500);

        setDebounceTimer(timer);
    };

    // Update URL search params
    const updateSearchParams = (newParams) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        // Reset to page 1 when filters change
        params.set('page', '1');
        setSearchParams(params);
    };

    // Apply filters
    const handleApplyFilters = () => {
        const validFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
        }, {});

        updateSearchParams(validFilters);
        setIsFilterOpen(false);
    };

    // Reset filters
    const handleResetFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            transmission: '',
            fuel: '',
            seats: '',
            rating: '',
        });
        setSearchQuery('');
        setSearchParams({});
    };

    // Check if any filter is active
    const hasActiveFilters = () => {
        return Object.values(filters).some(v => v) || searchQuery;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            {/* Search Bar */}
            <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search by car model, brand, or type..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isFilterOpen
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                >
                    <FiSliders />
                    <span className="hidden sm:inline">Filters</span>
                    {hasActiveFilters() && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                            {Object.values(filters).filter(v => v).length + (searchQuery ? 1 : 0)}
                        </span>
                    )}
                </button>
            </div>

            {/* Advanced Filters Panel */}
            {isFilterOpen && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Min Price ($/day)
                            </label>
                            <input
                                type="number"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                placeholder="0"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Max Price ($/day)
                            </label>
                            <input
                                type="number"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                placeholder="1000"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Transmission */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Transmission
                            </label>
                            <select
                                value={filters.transmission}
                                onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>

                        {/* Fuel Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Fuel Type
                            </label>
                            <select
                                value={filters.fuel}
                                onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>

                        {/* Seats */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Seats
                            </label>
                            <select
                                value={filters.seats}
                                onChange={(e) => setFilters({ ...filters, seats: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All</option>
                                <option value="2">2 Seats</option>
                                <option value="4">4 Seats</option>
                                <option value="5">5 Seats</option>
                                <option value="7">7+ Seats</option>
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Min Rating
                            </label>
                            <select
                                value={filters.rating}
                                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All</option>
                                <option value="4">4+ Stars</option>
                                <option value="3">3+ Stars</option>
                                <option value="2">2+ Stars</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleResetFilters}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <FiX />
                            Reset
                        </button>
                        <button
                            onClick={handleApplyFilters}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedFilterBar;
