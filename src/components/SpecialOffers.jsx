import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FaPercent, FaCar, FaCalendarAlt, FaStar, FaGift, FaCrown, FaArrowRight, FaClock } from 'react-icons/fa'

const SpecialOffers = () => {
    const [visibleOffers, setVisibleOffers] = useState(new Set())

    // Special offers data
    const offers = [
        {
            id: 1,
            title: "Weekend Special",
            subtitle: "Perfect for short getaways",
            discount: "15% OFF",
            description: "Get 15% off for weekend rentals! Book Friday to Sunday and save big.",
            originalPrice: "$120",
            discountedPrice: "$102",
            validity: "Valid until Dec 31, 2025",
            icon: FaCalendarAlt,
            gradient: "from-blue-500 to-cyan-500",
            bgImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
            features: ["Free GPS", "24/7 Support", "Free Cancellation"],
            tag: "POPULAR",
            animationDelay: "0ms"
        },
        {
            id: 2,
            title: "Luxury Holiday Deal",
            subtitle: "Experience premium comfort",
            discount: "30% OFF",
            description: "Luxury cars at $99/day this holiday season! Drive in style and comfort.",
            originalPrice: "$140",
            discountedPrice: "$99",
            validity: "Holiday Season Special",
            icon: FaCrown,
            gradient: "from-purple-500 to-pink-500",
            bgImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=400&fit=crop",
            features: ["Premium Insurance", "VIP Service", "Leather Interiors"],
            tag: "LIMITED",
            animationDelay: "150ms"
        },
        {
            id: 3,
            title: "First Time Bonus",
            subtitle: "Welcome new customers",
            discount: "25% OFF",
            description: "New to our platform? Get 25% off your first rental plus free roadside assistance!",
            originalPrice: "$100",
            discountedPrice: "$75",
            validity: "First booking only",
            icon: FaGift,
            gradient: "from-green-500 to-emerald-500",
            bgImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop",
            features: ["Roadside Assistance", "Fuel Included", "Easy Booking"],
            tag: "NEW USER",
            animationDelay: "300ms"
        },
        {
            id: 4,
            title: "Long Term Discount",
            subtitle: "Extended rental savings",
            discount: "40% OFF",
            description: "Book for 7+ days and save 40%! Perfect for business trips or extended vacations.",
            originalPrice: "$85",
            discountedPrice: "$51",
            validity: "Minimum 7 days",
            icon: FaStar,
            gradient: "from-orange-500 to-red-500",
            bgImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
            features: ["Weekly Rates", "Mile Unlimited", "Flexible Return"],
            tag: "BEST VALUE",
            animationDelay: "450ms"
        }
    ]

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleOffers(prev => new Set([...prev, entry.target.dataset.offerId]))
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        )

        const offerElements = document.querySelectorAll('[data-offer-id]')
        offerElements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="m 60 0 l 0 60 l -60 0 l 0 -60 z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                        <FaPercent className="text-white text-2xl" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Special
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Offers</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Don't miss out on these amazing deals! Save big on your next car rental with our exclusive promotions and limited-time offers.
                    </p>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {offers.map((offer, index) => {
                        const IconComponent = offer.icon
                        const isVisible = visibleOffers.has(offer.id.toString())

                        return (
                            <div
                                key={offer.id}
                                data-offer-id={offer.id}
                                className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${isVisible
                                        ? index % 2 === 0
                                            ? 'translate-x-0 opacity-100'
                                            : 'translate-x-0 opacity-100'
                                        : index % 2 === 0
                                            ? '-translate-x-full opacity-0'
                                            : 'translate-x-full opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: offer.animationDelay
                                }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={offer.bgImage}
                                        alt={offer.title}
                                        className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${offer.gradient} opacity-90`}></div>
                                </div>

                                {/* Content */}
                                <div className="relative p-8 text-white">
                                    {/* Tag */}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                                            {offer.tag}
                                        </span>
                                    </div>

                                    {/* Icon and Discount */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                <IconComponent className="text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">{offer.title}</h3>
                                                <p className="text-white/80">{offer.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold">{offer.discount}</div>
                                            <div className="text-sm text-white/80">Limited Time</div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/90 mb-6 leading-relaxed">
                                        {offer.description}
                                    </p>

                                    {/* Pricing */}
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-sm text-white/60 line-through">{offer.originalPrice}</span>
                                            <span className="text-3xl font-bold">{offer.discountedPrice}</span>
                                            <span className="text-white/80">/day</span>
                                        </div>
                                        <div className="flex items-center text-sm text-white/70">
                                            <FaClock className="mr-1" />
                                            {offer.validity}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-3">What's Included:</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {offer.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-white/90">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-3"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            to="/available-cars"
                                            className="flex-1 bg-white text-gray-900 py-3 px-6 rounded-xl font-semibold text-center hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center group/btn"
                                        >
                                            <span>Book Now</span>
                                            <FaArrowRight className="ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                        <button className="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-200 transform hover:scale-105">
                                            Learn More
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA Section */}
                <div className="text-center bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Start Your Journey?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                            Browse our complete collection of vehicles and find the perfect car for your next adventure.
                            All offers include our premium service guarantee.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/available-cars"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <FaCar className="mr-3" />
                                View All Cars
                            </Link>
                            <Link
                                to="/auth/signup"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <FaGift className="mr-3" />
                                Sign Up for More Deals
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpecialOffers
