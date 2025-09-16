import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import MyBooksCard from "../components/MyBooksCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const MyBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
      setLoading(true);
      axiosSecure.get(`/my-books?email=${user?.email}`)
      .then( res => {
        setBooks(res.data);
        setLoading(false)
      });
    },[user?.email, axiosSecure]);

  return (
    <>
    <title>My Books</title>
      <div className="bg-white">
        <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto text-black">
              My Books
            </h1>
        <div className="max-w-7xl w-11/12 p-4 mb-12 mx-auto rounded-[10px] bg-blue-50">
        {
          loading ? <LoadingSpinner></LoadingSpinner> : <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          { books.map((data) => (
            <MyBooksCard key={data._id} data={data} setBooks={setBooks}></MyBooksCard>
          ))}
        </div>
        }
      </div>
      </div>
    </>
  );
};

export default MyBooks;
