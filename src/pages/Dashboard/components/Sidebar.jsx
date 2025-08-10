import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'
import {
    FaChartLine,
    FaPlus,
    FaCar,
    FaCalendarCheck,
    FaHome,
    FaUserCircle,
    FaSignOutAlt,
    FaTimes
} from 'react-icons/fa'

const Sidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/auth/login')
    }

    const sidebarItems = [
        { name: 'Dashboard', icon: FaChartLine, path: '/dashboard', current: true },
        { name: 'Add Car', icon: FaPlus, path: '/dashboard/add-car' },
        { name: 'My Cars', icon: FaCar, path: '/dashboard/my-cars' },
        { name: 'My Bookings', icon: FaCalendarCheck, path: '/dashboard/my-bookings' },
        { name: 'Home', icon: FaHome, path: '/' },
    ]

    return (
        <div className={`!fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${item.current
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                onClick={onClose}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                            {user?.photoURL ? (
                                <img className="h-10 w-10 rounded-full" src={user.photoURL} alt={user.displayName} />
                            ) : (
                                <FaUserCircle className="h-10 w-10 text-gray-400" />
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                        <FaSignOutAlt className="mr-3 h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
