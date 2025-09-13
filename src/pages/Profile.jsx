import React, { use, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import FicCard from "../components/FicCard";
import NonFicCard from "../components/NonFicCard";
import FantasyCard from "../components/FantasyCard";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState([]);
  const { user } = use(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/my-books?email=${user.email}`)
      .then((res) => {
        setAllBooks(res.data);
      });
    setLoading(false);
  }, [user.email]);

  const fiction = allBooks.filter((book) => book?.book_category === "Fiction");
  const nonFiction = allBooks.filter(
    (book) => book?.book_category === "Non-Fiction"
  );
  const fantasy = allBooks.filter((book) => book?.book_category === "Fantasy");

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <title>My Profile</title>
      <main className="bg-blue-50">
        <div className="max-w-screen mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <span className="text-3xl font-bold tracking-tight text-white px-5 py-1 rounded-t-[10px] bg-blue-500">
            Profile
          </span>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <img
              referrerPolicy="no-referrer"
              className="h-32 w-32 rounded-full mx-auto ring-4 ring-blue-500 p-1"
              src={user.photoURL}
              alt="User profile"
            />
            <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
              {user.displayName}
            </h2>
            <p className="mt-2 text-sm text-gray-500 flex items-center justify-center">
              <MdEmail className="mr-2" />
              {user.email}
            </p>
            <hr className="my-5 mx-auto border-1 border-gray-300" />
            <p className="my-4 text-gray-600">Bookshelf summary: ⤵️</p>
            <div className="flex justify-between items-center gap-10 w-full">
              {/* left */}
              <div className="shadow-lg p-3 rounded-[10px] bg-gray-50">
                <p className="font-bold mb-4">Total books: {allBooks.length}</p>
                <p className="mb-2">Click following buttons to see books ⤵️</p>
                <hr className="mb-2" />
                <div className="flex flex-col gap-3">
                  <button onClick={() => document.getElementById("my_modal_fic").showModal()} className="btn bg-gray-300 hover:bg-gray-400 text-black">Fiction ➡️ <span className="text-gray-900 text-lg">{fiction.length}</span></button>
                  <button onClick={() => document.getElementById("my_modal_nonFic").showModal()} className="btn bg-gray-300 hover:bg-gray-400 text-black">Non-Fiction ➡️ <span className="text-gray-900 text-lg">{nonFiction.length}</span></button>
                  <button onClick={() => document.getElementById("my_modal_fantasy").showModal()} className="btn bg-gray-300 hover:bg-gray-400 text-black">Fantasy ➡️ <span className="text-gray-900 text-lg">{fantasy.length}</span></button>
                </div>
              </div>
              {/* right */}
              <div className="flex-1">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Earum, omnis!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* modal-fic */}
        <dialog id="my_modal_fic" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Category: <span className="text-blue-400">Fiction</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {fiction.map((fic) => (
                <FicCard key={fic._id} fic={fic}></FicCard>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* modal-non-fic */}
        <dialog id="my_modal_nonFic" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Category: <span className="text-blue-400">Non-Fiction</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {nonFiction.map((nonFic) => (
                <NonFicCard key={nonFic._id} nonFic={nonFic}></NonFicCard>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* modal-fantasy */}
        <dialog id="my_modal_fantasy" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Category: <span className="text-blue-400">Fantasy</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {fantasy.map((fan) => (
                <FantasyCard key={fan._id} fan={fan}></FantasyCard>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
    </>
  );
};

export default Profile;
