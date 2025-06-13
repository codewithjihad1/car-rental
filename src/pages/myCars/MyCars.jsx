import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { FaCar, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import CarDetailRow from './shared/CarDetailRow'
import UpdateCarModal from './shared/UpdateCarModal'
import Swal from 'sweetalert2'
import useAxiosInstance from '../../hooks/useAxiosInstance'

const MyCars = () => {
    const { user } = useContext(AuthContext)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [selectedCar, setSelectedCar] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const axiosInstance = useAxiosInstance()

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

    // Handle update modal
    const handleUpdateClick = (car) => {
        setSelectedCar(car)
        setShowUpdateModal(true)
    }

    // Handle update car
    const handleUpdateCar = async (carId, updatedData) => {
        setIsSubmitting(true)
        try {
            const response = await axiosInstance.put(`/cars/${carId}`, updatedData)

            // Update cars state
            setCars(prevCars =>
                prevCars.map(car =>
                    car._id === carId || car.id === carId
                        ? { ...car, ...updatedData }
                        : car
                )
            )

            return response.data
        } catch (error) {
            console.error('Error updating car:', error)
            throw error
        } finally {
            setIsSubmitting(false)
        }
    }

    // Close update modal
    const closeUpdateModal = () => {
        setShowUpdateModal(false)
        setSelectedCar(null)
    }

    // Handle delete modal
    const handleDeleteClick = async (carId) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to delete This Car!`,
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
                await axiosInstance.delete(`/cars/${carId}`)

                // Remove car from state
                const updatedCars = cars.filter(c => c._id !== carId)
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
                                <thead className="bg-gray-50 dark:bg-gray-700">                                    <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Car Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Location
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
                                </thead>                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {cars.map((car) => (
                                        <CarDetailRow
                                            key={car._id || car.id}
                                            car={car}
                                            onEdit={handleUpdateClick}
                                            onDelete={handleDeleteClick}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Mobile Cards */}
                        <div className="lg:hidden">
                            {cars.map((car) => (
                                <CarDetailRow
                                    key={car._id || car.id}
                                    car={car}
                                    onEdit={handleUpdateClick}
                                    onDelete={handleDeleteClick}
                                    isMobile={true}
                                />
                            ))}
                        </div>
                    </div>)}
            </div>

            {/* Update Car Modal */}
            <UpdateCarModal
                isOpen={showUpdateModal}
                onClose={closeUpdateModal}
                car={selectedCar}
                onUpdate={handleUpdateCar}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default MyCars
