import React from "react";
import { motion, spring } from "framer-motion";

const SearchModalCard = ({ book }) => {
  const { book_title, cover_photo, book_author, book_category, upvote } = book;
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: spring }}
      className="card bg-base-100 max-w-96 shadow-md dark:shadow-blue-900"
    >
      <figure>
        <img className="w-full" src={cover_photo} alt="book" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book_title}</h2>
        <div className="badge badge-secondary bg-blue-500 border-blue-500 text-white">
          Upvote: {upvote}
        </div>

        <div className="card-actions justify-start">
          <div className="badge bg-blue-50 dark:bg-gray-700">
            <span className="font-bold">Author:</span> {book_author}
          </div>
          <div className="badge bg-blue-50 dark:bg-gray-700">
            <span className="font-bold">Category:</span> {book_category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchModalCard;
