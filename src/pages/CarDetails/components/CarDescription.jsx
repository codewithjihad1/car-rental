const CarDescription = ({ description }) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default CarDescription
