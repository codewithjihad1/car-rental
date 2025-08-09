import { FaCar, FaTh, FaList } from 'react-icons/fa'

const CarsControls = ({
    carsCount,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 lg:p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Results Count */}
                <div className="hidden lg:flex items-center text-gray-600 dark:text-gray-400">
                    <FaCar className="mr-2" />
                    <span>{carsCount} cars available</span>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center gap-2 lg:gap-4">
                    {/* Sort Options */}
                    <div className="flex items-center space-x-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`lg:flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <FaTh />
                            <span className='hidden lg:inline-block'>Grid</span>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${viewMode === 'list'
                                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <FaList />
                            <span className='hidden lg:inline-block'>List</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarsControls
