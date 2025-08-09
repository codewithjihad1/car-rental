import SearchBar from './SearchBar'

const PageHeader = ({ onSearch }) => {
    return (
        <div className='flex justify-between items-center gap-6 flex-col lg:flex-row mb-8'>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Available Cars
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Find the perfect car for your next journey
                </p>
            </div>

            <SearchBar onSearch={onSearch} />
        </div>
    )
}

export default PageHeader
