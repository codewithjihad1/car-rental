import React from 'react'
import { Link } from 'react-router'
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                                <FaCar className="text-white text-xl" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                CarRental
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted partner for premium car rental services. We provide reliable,
                            affordable, and convenient transportation solutions for all your travel needs.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="text-lg" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-colors duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-lg" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/available-cars"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                                >
                                    Available Cars
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Our Services</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300 text-sm">Daily Car Rental</li>
                            <li className="text-gray-300 text-sm">Weekly Car Rental</li>
                            <li className="text-gray-300 text-sm">Monthly Car Rental</li>
                            <li className="text-gray-300 text-sm">Airport Transfer</li>
                            <li className="text-gray-300 text-sm">Corporate Rentals</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-blue-400 text-sm" />
                                <span className="text-gray-300 text-sm">
                                    123 Business Street, City, State 12345
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-blue-400 text-sm" />
                                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-400 text-sm" />
                                <span className="text-gray-300 text-sm">info@carrental.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © {currentYear} CarRental. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/cookies"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
