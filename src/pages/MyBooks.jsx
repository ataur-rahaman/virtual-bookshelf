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
      <div className="max-w-7xl px-2 md:px-3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-[50px] md:py-[100px]">
          {books.map((data) => (
            <MyBooksCard key={data._id} data={data}></MyBooksCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBooks;
