import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const { user } = use(AuthContext);

  const handleAddBook = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());
    const newBook = {
      ...raw,
      total_page: Number(raw.total_page),
      upvote: Number(raw.upvote ?? 0),
    };

    axios
      .post("https://virtual-bookshelf-server-cyan.vercel.app/books", newBook)
      .then((res) => {
        setLoading(false);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book has been added!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  if(loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      <title>Add Book</title>
      <div className="bg-white">
        <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto text-black">
          Add Book
        </h1>
        <div className="bg-blue-50 flex justify-center items-center max-w-7xl w-11/12 p-4 mx-auto rounded-[10px] mb-12">
          <form
            onSubmit={handleAddBook}
            className="bg-base-200 border-base-300 rounded-[10px] md:w-11/12 border p-2.5 md:my-12 md:p-[50px] shadow-2xl"
          >
            <fieldset className="fieldset md:grid-cols-2 md:gap-10">
              <div>
                <label className="label ml-3">Book Title</label>
                <input
                  required
                  type="text"
                  name="book_title"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  placeholder="write the book title here"
                />

                <label className="label ml-3">Cover Photo</label>
                <input
                  required
                  type="text"
                  name="cover_photo"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  placeholder="paste your book cover image URL here"
                />

                <label className="label ml-3">Total Page</label>
                <input
                  required
                  type="number"
                  name="total_page"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  placeholder="how many pages in this book?"
                />

                <label className="label ml-3">Book Author</label>
                <input
                  required
                  type="text"
                  name="book_author"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  placeholder="write here the author name"
                />

                <label className="label ml-3">User Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  defaultValue={user.email}
                  readOnly
                />
              </div>

              <div>
                <label className="label ml-3">User Name</label>
                <input
                  type="text"
                  name="user_name"
                  className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                  defaultValue={user.displayName}
                  readOnly
                />

                <label className="label ml-3">Book Category</label>
                <select
                  required
                  defaultValue=""
                  name="book_category"
                  className="shadow-md select w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                >
                  <option value="" disabled={true}>Select a category</option>
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Fantasy</option>
                </select>

                <label className="label ml-3">Reading Status</label>
                <select
                required
                  defaultValue=""
                  name="reading_status"
                  className="shadow-md select w-full mb-3 focus:border-blue-500 focus:outline-blue-500 "
                >
                  <option value="" disabled={true}>Select a status</option>
                  <option>Read</option>
                  <option>Reading</option>
                  <option>Want to Read</option>
                </select>

                <label className="label ml-3">Book Overview</label>
                <textarea
                  required
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
                  defaultValue={0}
                  readOnly
                />
              </div>
            </fieldset>

            <div className="flex justify-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-500 hover:bg-blue-600 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
