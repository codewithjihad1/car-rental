import React from 'react'
import { FaCar, FaDollarSign, FaMousePointer, FaHeadset } from 'react-icons/fa'

const WhyChooseUs = () => {
    const features = [
        {
            icon: FaCar,
            title: "Wide Variety of Cars",
            description: "From budget-friendly options to luxury vehicles. Choose from our extensive fleet of well-maintained cars that suit every budget and preference.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: FaDollarSign,
            title: "Affordable Prices",
            description: "Competitive daily rates you can count on. Transparent pricing with no hidden fees, ensuring you get the best value for your money.",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: FaMousePointer,
            title: "Easy Booking Process",
            description: "Seamlessly book your ride in just a few clicks. Our user-friendly platform makes car rental quick, simple, and hassle-free.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: FaHeadset,
            title: "24/7 Customer Support",
            description: "Round-the-clock assistance for all your queries. Our dedicated support team is always ready to help you with any questions or concerns.",
            gradient: "from-orange-500 to-red-500"
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> CarRental</span>?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        We're committed to providing you with the best car rental experience.
                        Here's what makes us stand out from the competition.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <div
                                key={index}
                                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="text-2xl text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                        <span className="text-lg">Ready to get started?</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
