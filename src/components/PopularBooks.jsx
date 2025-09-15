import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PopularBooksCard from './PopularBooksCard';
import {motion} from "framer-motion";

const PopularBooks = () => {
    const [topBooks, setTopBooks] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/top-books").then(res => {
            setTopBooks(res.data);
        })
    },[]);
    return (
        <div className='max-w-7xl w-11/12 mx-auto p-4 mt-[50px] md:mt-[100px] rounded-[10px] bg-blue-50'>
            <motion.p 
            initial={{scale: 1,}}
            whileHover={{scale: 1.1, translateY:-14}}
            className='text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto'>Popular Books</motion.p>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {
                    topBooks.map(topBook => <PopularBooksCard key={topBook._id} topBook={topBook}></PopularBooksCard>)
                }
            </div>
        </div>
    );
};

export default PopularBooks;