import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Outlet />
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>© 2025 CarRental. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default RootLayout
