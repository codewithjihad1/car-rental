import React from 'react'
import { InView } from 'react-intersection-observer'


const ServiceCard = ({ service }) => {
    const IconComponent = service.icon;
    return (
        <InView>
            {({ inView, ref }) => (
                <div
                    key={service.id}
                    ref={ref}
                    data-service-id={service.id}
                    className={`group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-700 hover:-translate-y-2 ${inView
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                        }`}
                    style={{
                        transitionDelay: `${service.delay}ms`
                    }}
                >
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-2xl text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                </div>
            )}
        </InView>
    )
}

export default ServiceCard
