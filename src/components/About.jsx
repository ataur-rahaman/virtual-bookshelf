import React, { use, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const About = () => {
  const { user } = use(AuthContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="bg-white">
      <motion.div
        ref={ref}
        className="p-4 rounded-[10px] mt-[50px] md:mt-[100px] bg-blue-50 dark:bg-gray-900 max-w-7xl w-11/12 mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, translateY: -14 }}
          className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto"
        >
          About
        </motion.h1>
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4 tracking-tight"
            variants={itemVariants}
          >
            Your Reading Journey, Digitally Cataloged
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Welcome to **Virtual Bookshelf**, where we believe that every book
            tells a story—and so does your collection. We've created a beautiful
            and intuitive platform for book lovers to catalog, track, and share
            their reading adventures.
          </motion.p>
          <motion.p
            className="text-md text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            From the books you want to read to the ones that changed your life,
            our tools are designed to keep you organized and inspired.
          </motion.p>
          <motion.div
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            variants={itemVariants}
          >
            <Link
              to={!user ? "/login" : "/bookshelf"}
              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-blue-500 hover:text-black group-hover:text-white dark:text-blue-500 dark:group-hover:text-white"
            >
              Start Your Bookshelf
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
