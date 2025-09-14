import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import MyBooksCard from "../components/MyBooksCard";

const MyBooks = () => {
    const [books, setBooks] = useState([]);
    const {user} = use(AuthContext);
    useEffect(() => {
        axios.get(`http://localhost:3000/my-books?email=${user.email}`).then(res => {
            setBooks(res.data);
        })
    },[user.email])
  return (
    <>
    <title>My Books</title>
      <div className="bg-white">
        <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto">
              My Books
            </h1>
        <div className="max-w-7xl w-11/12 p-4 mb-12 mx-auto rounded-[10px] bg-blue-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {books.map((data) => (
            <MyBooksCard key={data._id} data={data} setBooks={setBooks}></MyBooksCard>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default MyBooks;
