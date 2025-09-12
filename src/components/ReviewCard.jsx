import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const ReviewCard = ({ data, handleDeleteReview }) => {
    const {user} = use(AuthContext);
    const { created_at, displayName, user_email, profile_pic, review_text, _id } =
    data;
  const dateTime = created_at.split(", ");
  const date = dateTime[0];
  const time = dateTime[1];
  console.log(new Date());
  return (
    <div>
      <div className="card bg-base-100 max-w-96 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="card-title">{displayName}</h2>
              <p className="text-gray-300 hover:text-gray-500">{user_email}</p>
            </div>
            <div className="avatar">
              <div className="w-10 md:w-12 rounded-full">
                <img referrerPolicy="no-referrer" src={profile_pic} />
              </div>
            </div>
          </div>
          <p className="rounded-md bg-blue-100 my-4 p-2">" {review_text} "</p>
          <div className="flex items-center justify-between">
            <p>
              Date: <span className="text-gray-400">{date}</span>
              <br />
              Time: <span className="text-gray-400">{time}</span>
            </p>
            {
              user_email === user?.email && 
              <div>
                <button className="py-1 px-1 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 text-white">
                  Update
                </button>
                <button onClick={() => handleDeleteReview(_id)} className="py-1 px-1 rounded-md ml-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white">
                  Delete
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
