import React, { useEffect, useRef, useState } from "react";
import BookshelfCard from "../components/BookshelfCard";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import SearchModalCard from "../components/SearchModalCard";
import { easeInOut, motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const Bookshelf = () => {
// const books = useLoaderData();
  const [modalBooks, setModalBooks] = useState([]);
  const [allBooks, setAllBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const SearchRef = useRef();
  const filterRef = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get("https://virtual-bookshelf-server-cyan.vercel.app/books").then(res => {
      setAllBook(res.data);
      setLoading(false);
    })
  },[])

  const handleSearch = () => {
    const searchValue = SearchRef.current.value;
    axios.get(`https://virtual-bookshelf-server-cyan.vercel.app/search?q=${searchValue}`).then((res) => {
      setModalBooks(res.data);
    });
    document.getElementById("my_modal_4").showModal();
  };

  const handleFilter = () => {
    const filterValue = filterRef.current.value;
    axios.get(`https://virtual-bookshelf-server-cyan.vercel.app/search?q=${filterValue}`).then((res) => {
      setModalBooks(res.data);
      document.getElementById("my_modal_4").showModal();
    });
  };
  return (
    <>
      <title>Bookshelf</title>
      <div className="bg-white">
        {
          loading ? <LoadingSpinner></LoadingSpinner> :
          <div>
          <div className="pt-[30px] md:pt-0">
            <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto text-black">
              Book-shelf
            </h1>
            <p className="text-center text-gray-500">
              Search your book {"(e.g. book_title or book_author)"} <br /> or
              filter by reading_status {"(e.g. Read, Reading, Want-to-Read)"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-10 flex-wrap mt-5">
            <div className="flex items-center gap-2 px-5 w-full md:w-1/2">
              <input
                type="search"
                name="search"
                ref={SearchRef}
                placeholder={`Search  (e.g. book_title or book_author)`}
                className="input focus:outline-0 w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <IoSearch
                onClick={handleSearch}
                className="text-3xl cursor-pointer btn"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-1/2 px-5">
              <p className="w-fit text-black">filter:➡️</p>
              <select
                onChange={handleFilter}
                defaultValue="Select a status"
                name="reading_status"
                ref={filterRef}
                className="shadow-md select focus:outline-0 w-full  focus:border-blue-500 focus:outline-blue-500"
              >
                <option disabled={true}>Select a status</option>
                <option>Read</option>
                <option>Reading</option>
                <option>Want to Read</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl w-11/12 mx-auto my-[50px] md:my-[100px] rounded-[10px] p-4 bg-blue-50">
            {allBooks.map((data) => (
              <BookshelfCard key={data._id} data={data}></BookshelfCard>
            ))}
          </div>
        </div>
        }

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-6xl h-11/12 relative">
            <p className="text-gray-600">Your search result:</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-[50px]">
              {modalBooks.map((book) => (
                <SearchModalCard key={book._id} book={book}></SearchModalCard>
              ))}
            </div>
            <div className="modal-action sticky bottom-0 right-0">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <motion.button
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: easeInOut,
                  }}
                  className="btn bg-red-500 hover:bg-red-600 text-white"
                >
                  Close
                </motion.button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Bookshelf;
