import CarInfoHeader from './CarInfoHeader'
import CarDescription from './CarDescription'
import CarSpecifications from './CarSpecifications'
import CarFeatures from './CarFeatures'

const CarDetailsCard = ({ car, getTimeAgo }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <CarInfoHeader car={car} getTimeAgo={getTimeAgo} />
            <CarDescription description={car.description} />
            <CarSpecifications car={car} />
            <CarFeatures features={car.features} />
        </div>
    )
}

export default CarDetailsCard
