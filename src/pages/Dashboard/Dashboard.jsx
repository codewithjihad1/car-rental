import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router'
import {
    FaCar,
    FaCalendarCheck,
    FaPlus,
    FaDollarSign,
    FaUsers,
    FaBars,
} from 'react-icons/fa'
import Sidebar from './components/Sidebar'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FaBars className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <div className="w-6" /> {/* Spacer */}
                </div>


                {/* Navbar */}
                <header className="sticky top-0 z-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-end">                           

                            <div className="flex items-center space-x-4">
                                {/* Search button for mobile */}
                                <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                {/* Admin Profile */}
                                <div className="flex items-center space-x-3">
                                    <div className="hidden sm:block text-right">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.displayName}</div>
                                        {/* <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div> */}
                                    </div>
                                    <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <img
                                            src={user?.photoURL}
                                            alt="Admin"
                                            className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Dashboard
