import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ onSearch }) => {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                placeholder="Search cars..."
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full"
                onChange={onSearch}
            />
            <FaSearch className="absolute right-4 top-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
        </div>
    )
}

export default SearchBar
