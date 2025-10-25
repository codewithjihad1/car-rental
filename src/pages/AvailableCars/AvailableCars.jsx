
import useDocumentTitle from '../../hooks/useDocumentTitle'
import AdvancedCarSearch from './components/AdvancedCarSearch'

const AvailableCars = () => {
    // useDocumentTitle
    useDocumentTitle('Available Cars - Car Rental App');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <AdvancedCarSearch />
            </div>
        </div>
    )
}

export default AvailableCars
