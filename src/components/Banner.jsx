import React from 'react'
import { Link } from 'react-router'
import { Typewriter } from 'react-simple-typewriter'

const Banner = () => {
    return (
        <div className='container mx-auto rounded-xl' style={{ backgroundImage: 'url(https://i.imgur.com/5ya8vuL.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', }}>
            <div className="flex items-center justify-center flex-col py-10 px-4 sm:px-6 lg:px-8 rounded-xl" style={{ background: "#00000070", minHeight: "calc(90vh - 100px)" }}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-200 dark:text-white sm:text-5xl md:text-6xl">
                        <Typewriter
                            words={['Drive Your Dreams Today!', "Your Next Car Awaits You."]}
                            loop={true}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-300 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Find the perfect car for your journey. Rent with confidence and explore the world.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Link
                                to="/available-cars"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-xl"
                            >
                                View Available Cars
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
