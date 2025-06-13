import React from 'react'
import { InView } from 'react-intersection-observer'

const FeaturedCard = ({ feature }) => {
    const IconComponent = feature.icon
    return (
        <InView>
            {({ inView, ref }) => (
                <div
                    ref={ref}
                    className={`group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 ${inView
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                        }`}
                    style={{
                        transitionDelay: `${feature.delay}ms`
                    }}
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
            )}
        </InView>
    )
}

export default FeaturedCard
