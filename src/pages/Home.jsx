import React from 'react';
import Banner from '../components/Banner';
import PopularBooks from '../components/PopularBooks';
import FeaturedCategory from '../components/FeaturedCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularBooks></PopularBooks>
            <FeaturedCategory></FeaturedCategory>
        </div>
    );
};

export default Home;