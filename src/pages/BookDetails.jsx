import React from "react";
import { useLoaderData } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { book_title, cover_photo, book_author, total_page, book_category, reading_status, book_overview, user_name, user_email } =
    book;

  return (
    <div className="bg-blue-200 dark:bg-gray-600 py-10 md:py-15 px-2">
        <h1 className="text-blue-500 dark:text-white font-bold text-4xl mb-5 md:mb-10 text-center">Book Details</h1>
      <div className="max-w-4xl mx-auto p-6 bg-blue-50 shadow-lg rounded-xl dark:bg-gray-900 transition-all">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={cover_photo}
            alt={book_title}
            className="w-48 h-64 object-cover rounded-lg shadow-md"
          />
          <div className=" text-center md:text-left w-fit flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {book_title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-semibold">Author:</span> {book_author}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-semibold">Pages:</span> {total_page}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-semibold">Category:</span> {book_category}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <span className="font-semibold">Status:</span> {reading_status}
            </p>
            <div>
                <p className="font-bold">User Info ⤵️</p>
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1"><span className="font-semibold">Name:</span> {user_name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1"><span className="font-semibold">Email:</span> {user_email}
                    </p>
                </div>
            </div>
          </div>
          <div className="rounded-xl p-2 border-2 border-blue-400 flex-1">
            <h5 className="text-center font-bold mb-2">Book Overview</h5>
            <p>{book_overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
