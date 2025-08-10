import React from 'react'
import { Link } from 'react-router'
import { FaPlus, FaCar, FaCalendarCheck } from 'react-icons/fa'

const QuickActions = () => {
    const actions = [
        {
            title: 'Add New Car',
            description: 'List a new car for rental',
            icon: FaPlus,
            path: '/dashboard/add-car',
            gradient: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
            textColor: 'text-blue-100'
        },
        {
            title: 'Manage Cars',
            description: 'View and edit your listings',
            icon: FaCar,
            path: '/dashboard/my-cars',
            gradient: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
            textColor: 'text-green-100'
        },
        {
            title: 'View Bookings',
            description: 'Manage your reservations',
            icon: FaCalendarCheck,
            path: '/dashboard/my-bookings',
            gradient: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
            textColor: 'text-purple-100'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {actions.map((action) => {
                const Icon = action.icon
                return (
                    <Link
                        key={action.title}
                        to={action.path}
                        className={`bg-gradient-to-r ${action.gradient} text-white rounded-lg p-6 shadow-sm transition-all duration-200 transform hover:scale-105`}
                    >
                        <div className="flex items-center">
                            <Icon className="h-8 w-8 mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">{action.title}</h3>
                                <p className={action.textColor}>{action.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default QuickActions
