import React from 'react'
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentCars from '../components/RecentCars';
import FeaturedServices from '../components/FeaturedServices';
import SpecialOffers from '../components/SpecialOffers';

const Home = () => {
    return (
        <div className="py-4">
            <Banner />
            <WhyChooseUs />
            <RecentCars />
            <FeaturedServices />
            <SpecialOffers />
        </div>
    )
}

export default Home;
