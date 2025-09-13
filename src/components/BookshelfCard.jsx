import React, { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const BookshelfCard = ({data}) => {
  const {user} = use(AuthContext);
  const navigate = useNavigate();
    const {_id,book_title,cover_photo,book_author,book_category,upvote, user_email} = data;

  return (
    <div className="card bg-base-100 max-w-96 shadow-md dark:shadow-blue-900">
      <figure onClick={() => navigate(`/book-details/${_id}`)}>
        <img className="w-full cursor-pointer" src={cover_photo} alt="book" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {book_title}
        </h2>
        <div className="badge badge-secondary bg-blue-500 border-blue-500 text-white">Upvote: {upvote}</div>
  
        <div className="card-actions justify-start">
          <div className="badge bg-blue-50 dark:bg-gray-700"><span className="font-bold">Author:</span> {book_author}</div>
          <div className="badge bg-blue-50 dark:bg-gray-700"><span className="font-bold">Category:</span> {book_category}</div>
        </div>
      <div className="flex items-center justify-between gap-2">
        <button className="btn flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2" onClick={() => navigate(`/book-details/${_id}`)}>See more</button>
        {user?.email === user_email && <button className="btn flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2" onClick={() => navigate(`/update-book/${_id}`,{ state: {data} })}>Update</button>}
      </div>
      </div>
    </div>
  );
};

export default BookshelfCard;
