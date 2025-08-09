import { useState } from 'react'
import Loading from '../components/Loading'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useCarsData from '../hooks/useCarsData'
import useCarsFilter from '../hooks/useCarsFilter'
import PageHeader from './AvailableCars/components/PageHeader'
import CarsControls from './AvailableCars/components/CarsControls'
import CarsGrid from './AvailableCars/components/CarsGrid'
import EmptyState from './AvailableCars/components/EmptyState'
import { getTimeAgo } from '../utils/utils'

const AvailableCars = () => {
    const [viewMode, setViewMode] = useState('grid')

    // Custom hooks
    const { cars, loading } = useCarsData()
    const { sortBy, setSortBy, filteredCars, handleSearch } = useCarsFilter(cars)

    // useDocumentTitle
    useDocumentTitle('Available Cars - Car Rental App');

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <PageHeader onSearch={handleSearch} />

                {/* Controls */}
                <CarsControls
                    carsCount={filteredCars.length}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                {/* Cars Display */}
                {filteredCars.length === 0 ? (
                    <EmptyState />
                ) : (
                    <CarsGrid
                        cars={filteredCars}
                        viewMode={viewMode}
                        getTimeAgo={getTimeAgo}
                    />
                )}
            </div>
        </div>
    )
}

export default AvailableCars
