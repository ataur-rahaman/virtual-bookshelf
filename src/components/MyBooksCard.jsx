import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion, spring } from "framer-motion";

const MyBooksCard = ({ data, setBooks }) => {
  const { _id, book_title, cover_photo, book_author, book_category, upvote } =
    data;
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/books/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            axios.get("http://localhost:3000/books").then((res) => {
              setBooks(res.data);
            });
            Swal.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    < motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: spring }}
      className="card bg-base-100 max-w-96 shadow-md dark:shadow-blue-900"
    >
      <figure
        onClick={() =>
          navigate(`/book-details/${_id}`, {
            state: { data },
          })
        }
      >
        <img className="w-full cursor-pointer" src={cover_photo} alt="book" />
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
        <div className="flex justify-between items-center gap-3">
          <button
            className="btn flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2"
            onClick={() =>
              navigate(`/update-book/${_id}`, {
                state: { data },
              })
            }
          >
            Update
          </button>
          <button
            className="btn flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md mt-2"
            onClick={handleDeleteBook}
          >
            Delete
          </button>
        </div>
      </div>
    </ motion.div>
  );
};

export default MyBooksCard;
