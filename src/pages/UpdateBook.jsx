import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const UpdateBook = () => {
  const { user } = use(AuthContext);
  const location = useLocation();
  const { data } = location.state || {};
  const {
    _id,
    book_title,
    cover_photo,
    book_author,
    book_category,
    upvote,
    total_page,
    reading_status,
    book_overview,
  } = data;
  const navigate = useNavigate();

  const handleUpdateBook = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());
    const updatedBook = {
      ...raw,
      total_page: Number(raw.total_page),
      upvote: Number(raw.upvote ?? 0),
    };

    axios.put(`http://localhost:3000/books/${_id}`, updatedBook).then((res) => {
      if (res.data.modifiedCount) {
        navigate("/my-books");
      }
      form.reset();
    });
  };

  return (
    <>
      <title>Update Book</title>
      <div className="min-h-screen flex justify-center items-center bg-sky-50 py-[50px] md:py-[100px]">
        <form
          onSubmit={handleUpdateBook}
          className="bg-base-200 border-base-300 rounded-[20px] w-xl border p-4 shadow-2xl"
        >
          <legend className="md:text-3xl text-blue-600 dark:text-white font-bold text-center mb-3">
            Update Book
          </legend>

          <fieldset className="fieldset">
            <label className="label ml-3">Book Title</label>
            <input
              defaultValue={book_title}
              type="text"
              name="book_title"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="write the book title here"
            />

            <label className="label ml-3">Cover Photo</label>
            <input
              defaultValue={cover_photo}
              type="text"
              name="cover_photo"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="paste your book cover image URL here"
            />

            <label className="label ml-3">Total Page</label>
            <input
              defaultValue={total_page}
              type="number"
              name="total_page"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="how many pages in this book?"
            />

            <label className="label ml-3">Book Author</label>
            <input
              defaultValue={book_author}
              type="text"
              name="book_author"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="write here the author name"
            />

            <label className="label ml-3">User Email</label>
            <input
              type="email"
              name="user_email"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              defaultValue={user.email}
              readOnly
            />

            <label className="label ml-3">User Name</label>
            <input
              type="text"
              name="user_name"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              defaultValue={user.displayName}
              readOnly
            />

            <label className="label ml-3">Book Category</label>
            <select
              defaultValue={book_category}
              name="book_category"
              className="shadow-md select w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
            >
              <option disabled={true}>Select a category</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Fantasy</option>
            </select>

            <label className="label ml-3">Reading Status</label>
            <select
              defaultValue={reading_status}
              name="reading_status"
              className="shadow-md select w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
            >
              <option disabled={true}>Select a status</option>
              <option>Read</option>
              <option>Reading</option>
              <option>Want to Read</option>
            </select>

            <label className="label ml-3">Book Overview</label>
            <textarea
              defaultValue={book_overview}
              type="text"
              name="book_overview"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
              placeholder="write the book overview"
            />

            <label className="label ml-3">Book Upvote</label>
            <input
              type="number"
              name="upvote"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500"
              defaultValue={upvote}
              readOnly
            />
          </fieldset>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-[50px] bg-blue-500 hover:bg-blue-600 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
