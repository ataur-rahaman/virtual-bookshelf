import React from 'react';
import Banner from '../components/Banner';
import PopularBooks from '../components/PopularBooks';
import FeaturedCategory from '../components/FeaturedCategory';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularBooks></PopularBooks>
            <FeaturedCategory></FeaturedCategory>
            <About></About>
            <Contact></Contact>
        </div>
    );
};

export default Home;