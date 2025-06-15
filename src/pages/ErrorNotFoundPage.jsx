import { Link } from 'react-router';
import { FaCar, FaHome, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ErrorNotFoundPage = () => {

    // useDocumentTitle 
    useDocumentTitle('404 - Page Not Found');


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 Visual */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        {/* Large 404 Text */}
                        <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
                            404
                        </h1>

                        {/* Floating Car Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full animate-bounce">
                                <FaCar className="text-white text-4xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FaExclamationTriangle className="text-yellow-500 text-3xl mr-3" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Oops! Page Not Found
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
                        Looks like you've taken a wrong turn! The page you're looking for has driven off the road.
                    </p>

                    <p className="text-base text-gray-500 dark:text-gray-400">
                        Don't worry, even the best drivers sometimes take a detour. Let's get you back on track!
                    </p>
                </div>

                {/* Animated Car GIF Alternative using CSS */}
                <div className="mb-8">
                    <div className="relative mx-auto w-64 h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden">
                        {/* Road */}
                        <div className="absolute bottom-0 w-full h-4 bg-gray-400 dark:bg-gray-500">
                            <div className="h-1 bg-yellow-400 mx-auto animate-pulse"></div>
                        </div>

                        {/* Moving Car */}
                        <div className="absolute bottom-4 animate-bounce">
                            <div className="flex items-center animate-pulse">
                                <div className="w-8 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-sm mr-1"></div>
                                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                                <div className="w-4 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-sm ml-1"></div>
                            </div>
                            {/* Wheels */}
                            <div className="flex justify-between mt-1 px-1">
                                <div className="w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
                                <div className="w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
                                <div className="w-3 h-3 bg-gray-800 rounded-full animate-spin"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <FaHome className="mr-3 text-lg" />
                        Back to Home
                    </Link>

                    {/* Browse Cars Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        <FaArrowLeft className="mr-3 text-lg" />
                        Previous page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorNotFoundPage
