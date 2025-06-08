import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FaCar, FaSun, FaMoon, FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const { theme, toggleTheme } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    // Navigation items for non-logged-in users
    const guestNavItems = [
        { name: 'Home', path: '/' },
        { name: 'Available Cars', path: '/available-cars' },
        { name: 'Login', path: '/auth/login' }
    ]

    // Navigation items for logged-in users
    const userNavItems = [
        { name: 'Home', path: '/' },
        { name: 'Available Cars', path: '/available-cars' },
        { name: 'Add Car', path: '/add-car' },
        { name: 'My Cars', path: '/my-cars' },
        { name: 'My Bookings', path: '/my-bookings' }
    ]

    const navItems = user ? userNavItems : guestNavItems

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                            <FaCar className="text-white text-xl" />
                        </div>
                        <Link
                            to="/"
                            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        >
                            CarRental
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2.5">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={closeMobileMenu}
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        {/* User Profile and Logout for logged-in users */}
                        {user && (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    {user.photoURL ? (
                                        <>
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full border-2 border-blue-500"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={user.displayName || 'User'}
                                            />
                                            <Tooltip id="my-tooltip" />
                                        </>
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <FaUser className="text-white text-sm"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={user.displayName || 'User'}
                                            />
                                            <Tooltip id="my-tooltip" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Theme Toggle for Mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>

                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                    onClick={closeMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* User Profile and Logout for mobile */}
                            {user && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                    <div className="flex items-center space-x-3 px-3 py-2">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full border-2 border-blue-500"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <FaUser className="text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {user.displayName || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
