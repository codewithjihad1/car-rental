import React from 'react'
import { InView } from "react-intersection-observer";
import { FaPercent, FaArrowRight, FaClock, FaCalendarAlt, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router';

const OfferCard = ({ offer, index }) => {
    const IconComponent = offer.icon;

    return (
        <InView>
            {({ inView, ref }) => (
                <div
                    key={offer.id}
                    ref={ref}
                    data-offer-id={offer.id}
                    className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${inView
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
            )}
        </InView>
    )
}

export default OfferCard
