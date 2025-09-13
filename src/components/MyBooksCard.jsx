import React from "react";
import { useNavigate } from "react-router";

const MyBooksCard = ({ data }) => {
  const { _id, book_title, cover_photo, book_author, book_category, upvote } =
    data;
    const navigate = useNavigate();
  return (
    <div className="card bg-base-100 max-w-96 shadow-md dark:shadow-blue-900">
      <figure onClick={() => navigate(`/update-book/${_id}`, {
        state: {data}
      })}>
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
        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2"
          onClick={() => navigate(`/update-book/${_id}`, {
            state: {data}
          })}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MyBooksCard;
