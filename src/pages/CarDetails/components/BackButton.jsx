import { FaArrowLeft } from 'react-icons/fa'

const BackButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200"
        >
            <FaArrowLeft className="mr-2" />
            Back
        </button>
    )
}

export default BackButton
