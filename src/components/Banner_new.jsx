import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { Typewriter } from 'react-simple-typewriter'
import {
    FaChevronLeft,
    FaChevronRight,
    FaCar,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaPlay,
    FaPause,
    FaPhone,
    FaHeadset
} from 'react-icons/fa'
import { bannerSlides, bannerStats, bannerConfig } from './bannerConfig'
import BannerLoader from './BannerLoader'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    // Auto-slide functionality with useCallback for performance
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, [])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
    }, [])

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index)
    }, [])

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlaying(!isAutoPlaying)
    }, [isAutoPlaying])

    // Handle touch events for mobile swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextSlide()
        } else if (isRightSwipe) {
            prevSlide()
        }
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') prevSlide()
            if (e.key === 'ArrowRight') nextSlide()
            if (e.key === ' ') {
                e.preventDefault()
                toggleAutoPlay()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [nextSlide, prevSlide, toggleAutoPlay])

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(nextSlide, bannerConfig.autoPlayInterval)
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    // Loading simulation
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const currentSlideData = bannerSlides[currentSlide]

    if (isLoading) {
        return <BannerLoader />
    }

    return (
        <div
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main Slider Container */}
            <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh]">
                {/* Background Images with Parallax Effect */}
                <div className="absolute inset-0">
                    {bannerSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                                }`}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Dynamic Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                            {/* Bottom Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl">
                            {/* Slide Content with Animation */}
                            <div
                                key={currentSlide}
                                className="animate-fade-in-up"
                            >
                                {/* Subtitle */}
                                <div className="mb-4">
                                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        ✨ {currentSlideData.subtitle}
                                    </span>
                                </div>

                                {/* Main Title with Typewriter */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                    <Typewriter
                                        words={[currentSlideData.title]}
                                        loop={1}
                                        cursor
                                        cursorStyle='|'
                                        typeSpeed={50}
                                        deleteSpeed={30}
                                        delaySpeed={1000}
                                        key={currentSlide}
                                    />
                                </h1>

                                {/* Description */}
                                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                                    {currentSlideData.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                                    {currentSlideData.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                        >
                                            <FaShieldAlt className="text-green-400 text-xs sm:text-sm" />
                                            <span className="text-white text-xs sm:text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Link
                                        to={currentSlideData.ctaLink}
                                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
                                    >
                                        <span className="relative z-10 flex items-center text-sm sm:text-base">
                                            <FaCar className="mr-2" />
                                            {currentSlideData.cta}
                                        </span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </Link>

                                    <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 text-sm sm:text-base">
                                        <FaPhone className="mr-2" />
                                        <span className="hidden sm:inline">Contact Us</span>
                                        <span className="sm:hidden">Call</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 sm:p-3 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="text-lg sm:text-xl" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 sm:p-3 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="text-lg sm:text-xl" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex space-x-2 sm:space-x-3">
                        {bannerSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Auto-play Control */}
                <button
                    onClick={toggleAutoPlay}
                    className="absolute top-2 sm:top-4 md:top-8 right-2 sm:right-4 md:right-8 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 sm:p-3 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300"
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                    {isAutoPlaying ? <FaPause className="text-sm sm:text-base" /> : <FaPlay className="text-sm sm:text-base" />}
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
                        style={{
                            width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`
                        }}
                    />
                </div>
            </div>

            {/* Floating Stats Section */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 hidden lg:block z-20">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                        {bannerStats.map((stat, index) => (
                            <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support Badge */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:block z-20">
                <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-3 border border-green-400/30 animate-pulse-slow">
                    <FaHeadset className="text-green-400 text-xl" />
                </div>
            </div>
        </div>
    )
}

export default Banner
