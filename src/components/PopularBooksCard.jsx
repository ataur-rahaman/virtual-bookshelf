import React from "react";
import { useNavigate } from "react-router";

const PopularBooksCard = ({ topBook }) => {
    const navigate = useNavigate();
    const {_id,book_title,cover_photo,book_author,book_category,upvote} = topBook;
  return (
    <div className="card bg-base-100 max-w-70 mx-auto shadow-md dark:shadow-blue-900">
      <figure onClick={() => navigate(`/book-details/${_id}`)}>
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
      </div>
    </div>
  );
};

export default PopularBooksCard;
