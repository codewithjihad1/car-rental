import { Link } from 'react-router'
import { FaPercent, FaCar, FaGift, FaArrowRight, FaClock, FaCalendarAlt, FaCrown, FaGifts, FaStar } from 'react-icons/fa'
import OfferCard from './OfferCard';

// offers data
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
    description:
      "New to our platform? Get 25% off your first rental plus free roadside assistance!",
    originalPrice: "$100",
    discountedPrice: "$75",
    validity: "First booking only",
    icon: FaGifts,
    gradient: "from-green-500 to-emerald-500",
    bgImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop",
    features: ["Roadside Assistance", "Fuel Included", "Easy Booking"],
    tag: "NEW USER",
    animationDelay: "300ms",
  },
  {
    id: 4,
    title: "Long Term Discount",
    subtitle: "Extended rental savings",
    discount: "40% OFF",
    description:
      "Book for 7+ days and save 40%! Perfect for business trips or extended vacations.",
    originalPrice: "$85",
    discountedPrice: "$51",
    validity: "Minimum 7 days",
    icon: FaStar,
    gradient: "from-orange-500 to-red-500",
    bgImage:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
    features: ["Weekly Rates", "Mile Unlimited", "Flexible Return"],
    tag: "BEST VALUE",
    animationDelay: "450ms",
  },
];





const SpecialOffers = () => {

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
                    {offers.map((offer, index) => <OfferCard key={offer.id} offer={offer} index={index} />)}
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
