import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        className="text-center px-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, type: "tween", stiffness: 200 }}
      >
        <motion.h1
          className="text-7xl sm:text-9xl font-bold text-sky-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-300">Page not found!</p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
