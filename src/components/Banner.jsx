import React, { useState } from 'react'
import { Link } from 'react-router'
import { Typewriter } from 'react-simple-typewriter'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules'
import {
    FaCar,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaPhone,
    FaHeadset,
    FaStar,
    FaUsers,
    FaCheckCircle
} from 'react-icons/fa'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/parallax'

import { bannerSlides, bannerConfig } from './bannerConfig'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const handleSlideChange = (swiperInstance) => {
        setCurrentSlide(swiperInstance.activeIndex)
    }

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-black">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                parallax={true}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    el: '.swiper-pagination-custom',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} w-3 h-3 mx-1 rounded-full bg-white/50 hover:bg-white/75 cursor-pointer transition-all duration-300"></span>`
                    }
                }}
                autoplay={{
                    delay: bannerConfig.autoPlayInterval,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                speed={1000}
                onSlideChange={handleSlideChange}
                className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] banner-swiper"
            >
                {bannerSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Background with Parallax */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            data-swiper-parallax="-23%"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            {/* Dynamic Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                            {/* Bottom Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl">
                                    {/* Slide Content with Parallax Animation */}
                                    <div className="space-y-4 sm:space-y-6">
                                        {/* Subtitle */}
                                        <div
                                            className="mb-4"
                                            data-swiper-parallax="-300"
                                        >
                                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                                                ✨ {slide.subtitle}
                                            </span>
                                        </div>

                                        {/* Main Title with Typewriter */}
                                        <h1
                                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                            data-swiper-parallax="-400"
                                        >
                                            <Typewriter
                                                words={[slide.title]}
                                                loop={1}
                                                cursor
                                                cursorStyle='|'
                                                typeSpeed={50}
                                                deleteSpeed={30}
                                                delaySpeed={1000}
                                                key={`${slide.id}-${index}`}
                                            />
                                        </h1>

                                        {/* Description */}
                                        <p
                                            className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
                                            data-swiper-parallax="-500"
                                        >
                                            {slide.description}
                                        </p>

                                        {/* Features */}
                                        <div
                                            className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8"
                                            data-swiper-parallax="-600"
                                        >
                                            {slide.features.map((feature, featureIndex) => (
                                                <div
                                                    key={featureIndex}
                                                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                                                    style={{ animationDelay: `${featureIndex * 0.1}s` }}
                                                >
                                                    <FaCheckCircle className="text-green-400 text-xs sm:text-sm" />
                                                    <span className="text-white text-xs sm:text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Buttons */}
                                        <div
                                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                                            data-swiper-parallax="-700"
                                        >
                                            <Link
                                                to={slide.ctaLink}
                                                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
                                            >
                                                <span className="relative z-10 flex items-center text-sm sm:text-base">
                                                    <FaCar className="mr-2" />
                                                    {slide.cta}
                                                </span>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            </Link>

                                            <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 text-sm sm:text-base hover:scale-105 transform">
                                                <FaPhone className="mr-2" />
                                                <span className="hidden sm:inline">Contact Us</span>
                                                <span className="sm:hidden">Call</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-custom absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 sm:p-3 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 cursor-pointer group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>

                <div className="swiper-button-next-custom absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 sm:p-3 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 cursor-pointer group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Custom Pagination */}
                <div className="swiper-pagination-custom absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3"></div>
            </Swiper>

            {/* Floating Stats Section */}
            {/* <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 hidden lg:block z-30">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 transform">
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                        {bannerStats.map((stat, index) => (
                            <div
                                key={index}
                                className="animate-float"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="flex items-center justify-center mb-1">
                                    {index === 0 && <FaCar className="text-blue-400 text-lg mr-1" />}
                                    {index === 1 && <FaUsers className="text-green-400 text-lg mr-1" />}
                                    {index === 2 && <FaStar className="text-yellow-400 text-lg mr-1" />}
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Support Badge */}
            <div className="absolute bottom-4 right-4 transform -translate-y-1/2 hidden md:block z-30">
                <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-3 border border-green-400/30 animate-pulse-slow hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <FaHeadset className="text-green-400 text-xl" />
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
                <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
                    style={{
                        width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`
                    }}
                />
            </div>

            {/* Floating Action Button */}
            <div className="absolute bottom-20 right-4 sm:right-8 z-30 md:hidden">
                <Link
                    to="/available-cars"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 transform flex items-center justify-center"
                >
                    <FaCar className="text-xl" />
                </Link>
            </div>
        </div>
    )
}

export default Banner
