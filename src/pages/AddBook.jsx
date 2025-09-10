import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user } = use(AuthContext);

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newBook = Object.fromEntries(formData.entries());

    axios.post("http://localhost:3000/books", newBook).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Book has been added!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <title>Add Book</title>
      <div className="min-h-screen flex justify-center items-center bg-sky-50 py-[50px] md:py-[100px]">
        <form
          onSubmit={handleAddBook}
          className="bg-base-200 border-base-300 rounded-[20px] w-xl border p-4 shadow-2xl"
        >
          <legend className="md:text-3xl text-blue-600 dark:text-white font-bold text-center mb-3">
            Add Book
          </legend>

          <fieldset className="fieldset">
            <label className="label ml-3">Book Title</label>
            <input
              type="text"
              name="book_title"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="write the book title here"
            />

            <label className="label ml-3">Cover Photo</label>
            <input
              type="text"
              name="cover_photo"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="paste your book cover image URL here"
            />

            <label className="label ml-3">Total Page</label>
            <input
              type="number"
              name="total_page"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="how many pages in this book?"
            />

            <label className="label ml-3">Book Author</label>
            <input
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
              defaultValue="Select a category"
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
              defaultValue="Select a status"
              name="reading_status"
              className="shadow-md select w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
            >
              <option disabled={true}>Select a status</option>
              <option>Read</option>
              <option>Reading</option>
              <option>Want to Read</option>
            </select>

            <label className="label ml-3">Book Overview</label>
            <input
              type="text"
              name="book_overview"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              placeholder="write the book overview"
            />

            <label className="label ml-3">Book Upvote</label>
            <input
              type="number"
              name="upvote"
              className="shadow-md input w-full mb-3 focus:border-blue-500 focus:outline-blue-500 rounded-[50px]"
              defaultValue={0}
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

export default AddBook;
