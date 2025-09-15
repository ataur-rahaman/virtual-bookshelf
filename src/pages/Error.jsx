import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

// Consolidating all animations into a single variants object for clarity.
const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
  float: {
    y: [-6, 0, 6, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Error = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-900"
      role="alert"
      aria-live="assertive"
    >
      <AnimatePresence>
        <motion.div
          className="text-center px-6 py-12 rounded-xl"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            variants={pageVariants}
            animate="float"
            className="inline-block"
          >
            <motion.h1
              className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-400"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.14, 0.96, 1.02, 1] }}
              transition={{
                duration: 0.9,
                times: [0, 0.45, 0.7, 0.9, 1],
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>
            <motion.p
              className="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto"
              variants={itemVariants}
            >
              Whoops — we can't find the page you were looking for.
            </motion.p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.div
              className="mt-6 inline-block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px rgba(14,165,233,0.14)",
                }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg"
              >
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium text-slate-900 transition-shadow"
                >
                  Go Home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Error;