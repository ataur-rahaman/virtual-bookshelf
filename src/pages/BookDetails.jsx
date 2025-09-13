import axios from "axios";
import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import ReviewCard from "../components/ReviewCard";

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
  const [allReviews, setAllReviews] = useState([]);
  const [updateReviewData, setUpdateReviewData] = useState([]);
  const reviewRef = useRef();
  const reviewUpdateRef = useRef();

  const handleUpvote = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first",
      });
      return;
    }

    setInitialUpvote(upvote);
    if (user_email === user?.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not able to upvote your won book",
      });
      return;
    }
    axios.put(`http://localhost:3000/books/${_id}/upvote`).then((res) => {
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

  const handleModal = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first",
      });
      return;
    }
    axios
      .get(
        `http://localhost:3000/reviews/check?book_id=${_id}&user_email=${user?.email}`
      )
      .then((res) => {
        if (res.data?.exist) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are not able to post review twice for this book",
          });
          return;
        }
        document.getElementById("my_modal_5").showModal();
      });
  };

  const handleReview = () => {
    const book_id = _id;
    const displayName = user.displayName;
    const user_email = user.email;
    const review_text = reviewRef.current.value;
    const profile_pic = user.photoURL;
    const now = new Date();
    const created_at = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const newReview = {
      book_id,
      displayName,
      user_email,
      review_text,
      profile_pic,
      created_at,
    };
    if(user_email === user.email){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not able to post a review on your won book",
      });
      return;
    }
    axios.post("http://localhost:3000/reviews", newReview).then((res) => {
      if (res.data.insertedId) {
        newReview._id = res.data.insertedId;
        setAllReviews([...allReviews, newReview]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "👍 Review has been added!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    reviewRef.current.value = "";
  };

  const handleDeleteReview = (rId) => {
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
        axios.delete(`http://localhost:3000/reviews/${rId}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            const finalReviews = allReviews.filter(
              (review) => review._id !== rId
            );
            setAllReviews(finalReviews);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const openUpdateModal = (data) => {
    setUpdateReviewData(data);
    document.getElementById("my_modal_6").showModal();
  }

  const handleUpdateReview = () => {
    const review_text = reviewUpdateRef.current.value;
    const now = new Date();
    const created_at = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const newReview = {
      review_text,
      created_at,
    };
    axios.put(`http://localhost:3000/reviews/${updateReviewData._id}`, newReview).then(res => {
      console.log(res.data);
      if(res.data.modifiedCount){
        axios.get(`http://localhost:3000/reviews?book_id=${_id}`).then(res => {
          setAllReviews(res.data);
        })
        Swal.fire({
                title: "Done!",
                text: "Your review has been updated.",
                icon: "success",
              });
        }
    })
  }


  useEffect(() => {
    axios.get(`http://localhost:3000/reviews?book_id=${_id}`).then((res) => {
      setAllReviews(res.data);
    });
  }, [_id]);
  return (
    <div className="bg-blue-50 dark:bg-gray-600 py-10 md:py-15 px-2">
      <h1 className="text-blue-500 dark:text-white font-bold text-4xl mb-5 md:mb-10 text-center">
        Book Details
      </h1>
      <div className="max-w-6xl mx-auto p-6 bg-blue-50 shadow-lg rounded-xl dark:bg-gray-900 transition-all">
        {/* upper */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
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
            <button
              onClick={handleModal}
              className="w-full bg-gray-100 mt-5 border border-gray-400 rounded-md cursor-pointer py-1 px-3 text-blue-500"
            >
              Post a review
            </button>
          </div>
          <div className=" text-center md:text-left w-fit h-full flex flex-col flex-1">
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
          </div>
          <div className="rounded-xl p-2 border-2 border-blue-400 flex-1">
            <h5 className="text-center md:text-start font-bold mb-2">Book Overview ⤵️</h5>
            <p>{book_overview}</p>
          </div>
        </div>
        {/* lower */}
        <hr className="my-10" />
        <h5 className="mb-3">All reviews:⤵️</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allReviews.map((data) => (
            <ReviewCard
              key={data._id}
              data={data}
              handleDeleteReview={handleDeleteReview}
              openUpdateModal={openUpdateModal}
            ></ReviewCard>
          ))}
        </div>
      </div>
      {/* modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Write your review!</h3>
          <div>
            <textarea
              className="input w-full min-h-30 md:min-h-50 focus:outline-0"
              name="review"
              ref={reviewRef}
            ></textarea>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handleReview}
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
              >
                Post
              </button>
              <button className="btn ml-3 bg-red-500 hover:bg-red-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update your review!</h3>
          <div>
            <textarea
            defaultValue={updateReviewData.review_text}
              className="input w-full min-h-30 md:min-h-50 focus:outline-0"
              name="review"
              ref={reviewUpdateRef}
            ></textarea>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handleUpdateReview}
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
              >
                Update
              </button>
              <button className="btn ml-3 bg-red-500 hover:bg-red-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
