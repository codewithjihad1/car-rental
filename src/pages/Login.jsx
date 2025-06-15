import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock, FaCar } from 'react-icons/fa'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import LoginWithGoogle from '../components/LoginWithGoogle'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Login = () => {
    const { loginWithEmailPassword, loginWithGoogle, user, loading, errorMessage } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    // useDocumentTitle
    useDocumentTitle('Login - Car Rental Service')

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, navigate, from])

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            await loginWithEmailPassword(formData.email, formData.password)
            toast.success('Login successful!')
            navigate(from, { replace: true })
        } catch (error) {
            toast.error(error.message || 'Login failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle Google login
    const handleGoogleLogin = async () => {
        setIsSubmitting(true)

        try {
            await loginWithGoogle()
            toast.success('Google login successful!')
            navigate(from, { replace: true })
        } catch (error) {
            toast.error(error.message || 'Google login failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Display error messages
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
        }
    }, [errorMessage])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                            <FaCar className="text-white text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to your CarRental account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    {/* Google Login Button */}
                    <LoginWithGoogle handleGoogleLogin={handleGoogleLogin} />

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/signup"
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
