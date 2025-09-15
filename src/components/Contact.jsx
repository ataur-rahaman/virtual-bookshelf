import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPaperPlane,
  FaTwitter,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white">
      <div className="p-4 rounded-[10px] max-w-7xl w-11/12 mx-auto my-[50px] md:my-[100px] bg-blue-50 dark:bg-gray-900">
          <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto">
            Contact
          </h1>
        <div className="flex items-center justify-center">
          <motion.div
            ref={ref}
            className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-2 text-blue-500 text-center"
              variants={itemVariants}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center"
              variants={itemVariants}
            >
              We'd love to hear from you. Send us a message or connect with us
              on social media.
            </motion.p>
            <div className="md:flex md:space-x-8">
              <motion.div
                className="flex-1 space-y-6 mb-8 md:mb-0"
                variants={inputVariants}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Send us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
                      placeholder="e.g., janedoe@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
                      placeholder="Tell us what's on your mind..."
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
              <div className="flex-1 mt-8 md:mt-0 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Find us on Social Media
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <motion.a
                    href="mailto:support@virtualbookshelf.com"
                    className="flex flex-col items-center group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-blue-500 text-5xl mb-2">
                      <FaEnvelope />
                    </div>
                    <span className="text-md font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                      Email Us
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-blue-500 text-5xl mb-2">
                      <FaTwitter />
                    </div>
                    <span className="text-md font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                      Follow us on X
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-blue-500 text-5xl mb-2">
                      <FaLinkedin />
                    </div>
                    <span className="text-md font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                      Connect on LinkedIn
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
