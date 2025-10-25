import { useState } from 'react';
import { useAdvancedCarsSearch } from '../../../hooks/useAdvancedCarsSearch';
import AdvancedFilterBar from './AdvancedFilterBar';
import SortBar from './SortBar';
import Pagination from './Pagination';
import MapView from './MapView';
import CarListItem from './CarListItem';
import CarGridCard from './CarGridCard';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import '../AdvancedCarSearch.css';

// Skeleton Loaders
const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
);

const SkeletonList = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="flex gap-4">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-700 h-40 rounded-lg"></div>
            <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    </div>
);

const AdvancedCarSearch = () => {
    useDocumentTitle('Advanced Car Search - Car Rental');

    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map', 'split'
    const [hoveredCarId, setHoveredCarId] = useState(null);
    const [mobileView, setMobileView] = useState('list'); // 'list' or 'map' for mobile

    const {
        cars,
        totalCars,
        totalPages,
        currentPage,
        isLoading,
        isFetching,
        error,
    } = useAdvancedCarsSearch();

    // Detect if desktop for split view
    const isDesktop = window.innerWidth >= 1024;

    const renderCarList = () => {
        if (isLoading) {
            return (
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) =>
                        viewMode === 'list' ? (
                            <SkeletonList key={i} />
                        ) : (
                            <SkeletonCard key={i} />
                        )
                    )}
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
                    <p className="text-red-600 dark:text-red-400 mb-2">
                        Error loading cars
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {error.message}
                    </p>
                </div>
            );
        }

        if (cars.length === 0) {
            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No cars found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters or search criteria
                    </p>
                </div>
            );
        }

        if (viewMode === 'list') {
            return (
                <div className="space-y-4">
                    {cars.map((car) => (
                        <div
                            key={car._id}
                            onMouseEnter={() => setHoveredCarId(car._id)}
                            onMouseLeave={() => setHoveredCarId(null)}
                        >
                            <CarListItem car={car} isHovered={hoveredCarId === car._id} />
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        onMouseEnter={() => setHoveredCarId(car._id)}
                        onMouseLeave={() => setHoveredCarId(null)}
                    >
                        <CarGridCard car={car} isHovered={hoveredCarId === car._id} />
                    </div>
                ))}
            </div>
        );
    };

    // Desktop Split View
    if (isDesktop && viewMode === 'map') {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Advanced Car Search
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Find your perfect rental car with advanced filters and map view
                        </p>
                    </div>

                    <AdvancedFilterBar />
                    <SortBar
                        totalCars={totalCars}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {/* Split Pane Layout */}
                    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-400px)] min-h-[600px]">
                        {/* Left: Car List */}
                        <div className="overflow-y-auto pr-2 custom-scrollbar">
                            {isFetching && (
                                <div className="mb-4 text-center text-sm text-blue-600 dark:text-blue-400">
                                    Updating results...
                                </div>
                            )}
                            {renderCarList()}
                        </div>

                        {/* Right: Map */}
                        <div className="sticky top-0">
                            <MapView
                                cars={cars}
                                onCarHover={setHoveredCarId}
                                hoveredCarId={hoveredCarId}
                            />
                        </div>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalCars={totalCars}
                    />
                </div>
            </div>
        );
    }

    // Mobile Tabbed View or Regular View
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Advanced Car Search
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Find your perfect rental car with advanced filters
                    </p>
                </div>

                <AdvancedFilterBar />
                <SortBar
                    totalCars={totalCars}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                {/* Mobile Tabbed View */}
                {!isDesktop && viewMode === 'map' && (
                    <div className="mb-4">
                        <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => setMobileView('list')}
                                className={`flex-1 py-3 text-center font-medium transition-colors ${mobileView === 'list'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setMobileView('map')}
                                className={`flex-1 py-3 text-center font-medium transition-colors ${mobileView === 'map'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Map View
                            </button>
                        </div>
                    </div>
                )}

                {/* Content */}
                {isFetching && (
                    <div className="mb-4 text-center text-sm text-blue-600 dark:text-blue-400">
                        Updating results...
                    </div>
                )}

                {!isDesktop && viewMode === 'map' ? (
                    mobileView === 'map' ? (
                        <div className="h-[70vh] min-h-[500px]">
                            <MapView
                                cars={cars}
                                onCarHover={setHoveredCarId}
                                hoveredCarId={hoveredCarId}
                            />
                        </div>
                    ) : (
                        renderCarList()
                    )
                ) : (
                    renderCarList()
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCars={totalCars}
                />
            </div>
        </div>
    );
};

export default AdvancedCarSearch;
