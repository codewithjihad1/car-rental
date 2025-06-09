import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { FaCar, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import axiosInstance from '../../api/axios'
import CarDetailRow from './shared/CarDetailRow'
import Swal from 'sweetalert2'

const MyCars = () => {
    const { user } = useContext(AuthContext)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)


    // Load cars on component mount
    useEffect(() => {
        const loadCars = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/cars?userEmail=${user.email}`)
                const data = response.data

                setCars(data)
            } catch (error) {
                console.error('Error loading cars:', error)
                toast.error('Failed to load your cars')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            loadCars()
        }
    }, [user])

    // Handle delete modal
    const handleDeleteClick = async (car) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to delete ${car.carModel}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDeleting(true)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

        if (isDeleting) {
            try {
                await axiosInstance.delete(`/cars/${car._id}`)

                // Remove car from state
                const updatedCars = cars.filter(c => c._id !== car._id)
                setCars(updatedCars)

                toast.success('Car deleted successfully!')
            } catch (error) {
                console.error('Error deleting car:', error)
                toast.error('Failed to delete car. Please try again.')
            }
        }
    }

    // loading state
    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            My Cars
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your car rental fleet
                        </p>
                    </div>
                    <Link
                        to="/add-car"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        <FaPlus className="mr-2" />
                        Add New Car
                    </Link>
                </div>

                {/* Cars Table or Empty State */}
                {cars.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                        <div className="mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full inline-block">
                                <FaCar className="text-white text-4xl" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Cars Added Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Start building your car rental fleet by adding your first car. It's quick and easy!
                        </p>
                        <Link
                            to="/add-car"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <FaPlus className="mr-3" />
                            Add Your First Car
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Car Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Bookings
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Date Added
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {cars.map((car) => (
                                        <CarDetailRow key={car.id} car={car} handleDeleteClick={handleDeleteClick} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden">
                            {cars.map((car) => (
                                <div key={car.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            className="h-20 w-28 rounded-lg object-cover flex-shrink-0"
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            onError={(e) => {
                                                e.target.src = '/car.png'
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                                {car.carModel}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                {car.location}
                                            </p>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                    ${car.dailyRentalPrice}/day
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.availability === 'Available'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                    }`}>
                                                    {car.availability}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    <span>Bookings: {car.bookingCount}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{new Date(car.dateAdded).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateClick(car)}
                                                        className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-300 p-2 rounded-lg transition-colors duration-200"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(car)}
                                                        className="bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-300 p-2 rounded-lg transition-colors duration-200"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyCars
