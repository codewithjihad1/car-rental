import CarGridCard from './CarGridCard'
import CarListCard from './CarListCard'

const CarsGrid = ({ cars, viewMode, getTimeAgo }) => {
    return (
        <div className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
            }`}>
            {cars.map((car) => (
                viewMode === 'grid' ? (
                    <CarGridCard
                        key={car._id}
                        car={car}
                        getTimeAgo={getTimeAgo}
                    />
                ) : (
                    <CarListCard
                        key={car._id}
                        car={car}
                        getTimeAgo={getTimeAgo}
                    />
                )
            ))}
        </div>
    )
}

export default CarsGrid
