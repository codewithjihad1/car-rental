import React from 'react'
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentCars from '../components/RecentCars';

const Home = () => {
    return (
        <div className="py-4">
            <Banner />
            <WhyChooseUs />
            <RecentCars />
        </div>
    )
}

export default Home;
