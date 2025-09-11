import axios from "axios";
import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { user } = use(AuthContext);
  const book = useLoaderData();
  const {
    book_title,
    cover_photo,
    book_author,
    total_page,
    book_category,
    reading_status,
    book_overview,
    upvote,
    user_name,
    user_email,
    _id,
  } = book;

  const [initialUpvote, setInitialUpvote] = useState(upvote);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvote);

  const handleUpvote = () => {
    setInitialUpvote(upvote);
    if (user_email === user.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not able to upvote your won book",
      });
      return;
    }
    axios.put(`http://localhost:3000/books/${_id}/upvote`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        setUpvoteCount(upvoteCount + 1);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "👍 upvoted done!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="bg-blue-200 dark:bg-gray-600 py-10 md:py-15 px-2">
      <h1 className="text-blue-500 dark:text-white font-bold text-4xl mb-5 md:mb-10 text-center">
        Book Details
      </h1>
      <div className="max-w-6xl mx-auto p-6 bg-blue-50 shadow-lg rounded-xl dark:bg-gray-900 transition-all">
        {/* upper */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div>
            <img
              src={cover_photo}
              alt={book_title}
              className="w-48 h-64 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={handleUpvote}
              className="block w-full bg-gray-100 mt-5 border border-gray-400 rounded-md cursor-pointer py-1 px-3 text-blue-500"
            >
              ▲ Upvote{" "}
              <span className="text-gray-500">
                | <span className="text-blue-500">{upvoteCount}</span>
              </span>
            </button>
          </div>
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
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Name:</span> {user_name}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Email:</span> {user_email}
                </p>
              </div>
            </div>
            {/* <button className="block w-full bg-gray-100 mt-5 border border-gray-400 rounded-md cursor-pointer py-1 px-3 text-blue-500">
              Post a review
            </button> */}
          </div>
          <div className="rounded-xl p-2 border-2 border-blue-400 flex-1">
            <h5 className="text-center font-bold mb-2">Book Overview</h5>
            <p>{book_overview}</p>
          </div>
        </div>
        {/* lower */}
        <div></div>
      </div>
    </div>
  );
};

export default BookDetails;
