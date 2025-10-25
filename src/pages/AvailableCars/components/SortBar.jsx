import { useSearchParams } from 'react-router';
import { FiList, FiMap, FiGrid } from 'react-icons/fi';

const SortBar = ({ totalCars, viewMode, setViewMode }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSort = searchParams.get('sort') || 'dateAdded_desc';

    const handleSortChange = (sortValue) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', sortValue);
        params.set('page', '1'); // Reset to first page
        setSearchParams(params);
    };

    const sortOptions = [
        { value: 'dateAdded_desc', label: 'Newest First' },
        { value: 'dateAdded_asc', label: 'Oldest First' },
        { value: 'price_asc', label: 'Price: Low to High' },
        { value: 'price_desc', label: 'Price: High to Low' },
        { value: 'rating_desc', label: 'Highest Rated' },
        { value: 'model_asc', label: 'Name: A to Z' },
        { value: 'model_desc', label: 'Name: Z to A' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Results Count */}
                <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{totalCars}</span> cars found
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            Sort by:
                        </label>
                        <select
                            value={currentSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                    ? 'bg-white dark:bg-gray-600 text-blue-500'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                                }`}
                            title="List View"
                        >
                            <FiList size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                    ? 'bg-white dark:bg-gray-600 text-blue-500'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                                }`}
                            title="Grid View"
                        >
                            <FiGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'map'
                                    ? 'bg-white dark:bg-gray-600 text-blue-500'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                                }`}
                            title="Map View"
                        >
                            <FiMap size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortBar;
