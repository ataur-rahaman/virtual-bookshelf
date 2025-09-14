import axios from "axios";
import React, { useEffect, useState } from "react";
import FicCard from "./FicCard";
import NonFicCard from "./NonFicCard";
import FantasyCard from "./FantasyCard";

const FeaturedCategory = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => {
      setAllBooks(res.data);
    });
  }, []);

  const fictionBook = allBooks.filter(
    (ficBook) => ficBook.book_category === "Fiction"
  );
  const nonFictionBook = allBooks.filter(
    (nonFicBook) => nonFicBook.book_category === "Non-Fiction"
  );
  const fantasyBook = allBooks.filter(
    (fanBook) => fanBook.book_category === "Fantasy"
  );

  return (
    <div className="bg-white">
      <div className="p-4 bg-blue-50 mt-[50px] md:mt-[100px] rounded-[10px] max-w-7xl w-11/12 mx-auto">
        <h1 className="text-4xl text-center mb-12 border-t-4 font-semibold border-blue-500 w-fit mx-auto">
          Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* card-1 */}
          <div className="card bg-base-100 image-full max-w-96 shadow-sm">
            <figure>
              <img
                src="https://img.freepik.com/premium-photo/casual-woman-reading-book-while-drinking_107420-38040.jpg?ga=GA1.1.800522255.1754994281&semt=ais_incoming&w=740&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">Fiction</h2>
              <p className="text-xl">
                Expand and see all the books on fiction category
              </p>
              <div className="card-actions justify-end">
                <button onClick={()=>document.getElementById('my_modal_ficBooks').showModal()} className="btn bg-blue-500 hover:bg-blue-600 text-white">Expand All</button>
              </div>
            </div>
          </div>
          {/* card-2 */}
          <div className="card bg-base-100 image-full max-w-96 shadow-sm">
            <figure>
              <img
                src="https://img.freepik.com/premium-photo/casual-woman-reading-book-while-drinking_107420-38040.jpg?ga=GA1.1.800522255.1754994281&semt=ais_incoming&w=740&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">Non Fiction</h2>
              <p className="text-xl">
                Expand and see all the books on non-fiction category
              </p>
              <div className="card-actions justify-end">
                <button onClick={()=>document.getElementById('my_modal_nonFicBooks').showModal()} className="btn bg-blue-500 hover:bg-blue-600 text-white">Expand All</button>
              </div>
            </div>
          </div>
          {/* card-3 */}
          <div className="card bg-base-100 image-full mx-w-96 shadow-sm">
            <figure>
              <img
                src="https://img.freepik.com/premium-photo/casual-woman-reading-book-while-drinking_107420-38040.jpg?ga=GA1.1.800522255.1754994281&semt=ais_incoming&w=740&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">Fantasy</h2>
              <p className="text-xl">
                Expand and see all the books on fantasy category
              </p>
              <div className="card-actions justify-end">
                <button onClick={()=>document.getElementById('my_modal_fantasyBooks').showModal()} className="btn bg-blue-500 hover:bg-blue-600 text-white">Expand All</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* modal-fic */}
      <dialog id="my_modal_ficBooks" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Category: <span className="text-blue-400">Fiction</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fictionBook.map((fic) => (
              <FicCard key={fic._id} fic={fic}></FicCard>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* modal-non-fic */}
      <dialog id="my_modal_nonFicBooks" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Category: <span className="text-blue-400">Non-Fiction</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {nonFictionBook.map((nonFic) => (
              <NonFicCard key={nonFic._id} nonFic={nonFic}></NonFicCard>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* modal-fantasy */}
      <dialog id="my_modal_fantasyBooks" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Category: <span className="text-blue-400">Fantasy</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fantasyBook.map((fan) => (
              <FantasyCard key={fan._id} fan={fan}></FantasyCard>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FeaturedCategory;
