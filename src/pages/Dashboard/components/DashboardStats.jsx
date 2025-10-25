import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import {
    FaCar,
    FaCalendarCheck,
    FaPlus,
    FaDollarSign,
    FaUsers,
    FaBars,
} from 'react-icons/fa'
import axiosInstance from '../../../api/axios'
import Loading from '../../../components/Loading'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import StatCard from './StatCard'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'


const DashboardStats = () => {
    const { user } = useContext(AuthContext)
    const [recentCars, setRecentCars] = useState([])
    const [recentBookings, setRecentBookings] = useState([])
    const [stats, setStats] = useState({
        totalCars: 0,
        totalBookings: 0,
        totalRevenue: 0,
        activeListings: 0
    })
    const [loading, setLoading] = useState(true)

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)

                // Fetch user's cars
                const carsResponse = await axiosInstance.get(`/api/cars/user/${user.email}`)
                const userCars = carsResponse.data

                // Fetch user's bookings
                const bookingsResponse = await axiosInstance.get(`/api/bookings/user/${user.email}`)
                const userBookings = bookingsResponse.data

                // Calculate stats
                const totalRevenue = userBookings.reduce((sum, booking) => {
                    return sum + (booking.totalCost || 0)
                }, 0)

                const activeListings = userCars.filter(car => car.availability === 'Available').length

                setStats({
                    totalCars: userCars.length,
                    totalBookings: userBookings.length,
                    totalRevenue: totalRevenue,
                    activeListings: activeListings
                })

                // Set recent data (last 5 items)
                setRecentCars(userCars.slice(0, 5))
                setRecentBookings(userBookings.slice(0, 5))

            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        if (user?.email) {
            fetchDashboardData()
        }
    }, [user])

    useDocumentTitle('Dashboard - Car Rental')

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {user?.displayName || 'User'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here's what's happening with your car rental business today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={FaCar}
                    title="Total Cars"
                    value={stats.totalCars}
                    color="blue"
                />
                <StatCard
                    icon={FaCalendarCheck}
                    title="Total Bookings"
                    value={stats.totalBookings}
                    color="green"
                />
                <StatCard
                    icon={FaDollarSign}
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    color="yellow"
                />
                <StatCard
                    icon={FaUsers}
                    title="Active Listings"
                    value={stats.activeListings}
                    color="purple"
                />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <RecentActivity recentCars={recentCars} recentBookings={recentBookings} />
        </div>
    )
}

export default DashboardStats
