import React from 'react'

const StatCard = ({ icon: Icon, title, value, color = "blue" }) => {
    const colorClasses = {
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        purple: "text-purple-600"
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Icon className={`h-8 w-8 ${colorClasses[color]}`} />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </div>
        </div>
    )
}

export default StatCard
