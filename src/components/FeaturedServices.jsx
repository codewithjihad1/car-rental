import { Link } from 'react-router'
import { FaShieldAlt, FaClock, FaHeadset, FaMapMarkerAlt, FaCreditCard, FaStar, FaMobile, FaTools } from 'react-icons/fa'
import CountUp from 'react-countup'
import { InView } from 'react-intersection-observer'
import ServiceCard from './ServiceCard'

// services data
const services = [
    {
        id: 1,
        icon: FaShieldAlt,
        title: "Comprehensive Insurance",
        description: "Full coverage insurance included with every rental. Drive with confidence knowing you're protected.",
        gradient: "from-blue-500 to-cyan-500",
        delay: 0
    },
    {
        id: 2,
        icon: FaClock,
        title: "24/7 Pickup & Drop-off",
        description: "Flexible pickup and drop-off times to match your schedule. Available round the clock.",
        gradient: "from-green-500 to-emerald-500",
        delay: 100
    },
    {
        id: 3,
        icon: FaHeadset,
        title: "Customer Support",
        description: "Dedicated support team available 24/7 to assist you with any questions or emergencies.",
        gradient: "from-purple-500 to-pink-500",
        delay: 200
    },
    {
        id: 4,
        icon: FaMapMarkerAlt,
        title: "Multiple Locations",
        description: "Pick up your car from any of our convenient locations across major cities.",
        gradient: "from-orange-500 to-red-500",
        delay: 300
    },
    {
        id: 5,
        icon: FaCreditCard,
        title: "Easy Payment",
        description: "Secure payment options with flexible billing. Pay online or at pickup.",
        gradient: "from-indigo-500 to-blue-500",
        delay: 400
    },
    {
        id: 6,
        icon: FaStar,
        title: "Premium Vehicles",
        description: "High-quality, well-maintained vehicles from top brands. Regular maintenance guaranteed.",
        gradient: "from-yellow-500 to-orange-500",
        delay: 500
    },
    {
        id: 7,
        icon: FaMobile,
        title: "Mobile App",
        description: "Manage your bookings on the go with our user-friendly mobile application.",
        gradient: "from-teal-500 to-green-500",
        delay: 600
    },
    {
        id: 8,
        icon: FaTools,
        title: "Roadside Assistance",
        description: "24/7 roadside assistance and emergency support wherever your journey takes you.",
        gradient: "from-red-500 to-pink-500",
        delay: 700
    }
]

const FeaturedServices = () => {

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 animate-pulse">
                        <FaShieldAlt className="text-2xl text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Premium Car Rental
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Experience the difference with our comprehensive range of services designed to make your car rental journey seamless and enjoyable.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {services.map((service) => <ServiceCard key={service.id} service={service} />)}
                </div>

                {/* Statistics Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                    <InView>
                        {({ inView, ref }) => (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center group" ref={ref}>
                                    <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {inView && <CountUp end={100} duration={5} />} +
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                                        Premium Cars
                                    </div>
                                </div>
                                <div className="text-center group" ref={ref}>
                                    <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {inView && <CountUp end={10000} duration={5} />} +
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                                        Happy Customers
                                    </div>
                                </div>
                                <div className="text-center group" ref={ref}>
                                    <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {inView && <CountUp end={25} duration={5} />} +
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                                        Cities Covered
                                    </div>
                                </div>
                                <div className="text-center group" ref={ref}>
                                    <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {inView && <CountUp end={4.9} duration={5} />} ★
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                                        Average Rating
                                    </div>
                                </div>
                            </div>
                        )}
                    </InView>

                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Experience Premium Car Rental?
                        </h3>
                        <p className="text-xl mb-8 text-blue-100">
                            Join thousands of satisfied customers who trust us for their transportation needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/available-cars"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <FaStar className="mr-3" />
                                Browse Cars
                            </Link>
                            <Link
                                to="/auth/signup"
                                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                            >
                                <FaHeadset className="mr-3" />
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedServices