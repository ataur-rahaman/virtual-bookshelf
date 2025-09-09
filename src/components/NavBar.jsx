import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { motion, spring } from "framer-motion";
import { FaBookBookmark } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const NavBar = () => {
  const {user, logOutUser} = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink className="hover:text-blue-500 bg-[#0000]" to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-blue-500 bg-[#0000]" to={"bookshelf"}>
          Bookshelf
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-blue-500 bg-[#0000]" to={"add-book"}>
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-blue-500 bg-[#0000]" to={"my-books"}>
          My Books
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-blue-500 bg-[#0000]" to={"profile"}>
          Profile
        </NavLink>
      </li>
    </>
  );


  const handleLogOut = () => {
        logOutUser()
    }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, type: spring, stiffness: 200 }}
      className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/40"
    >
      <div className="navbar text-black dark:text-white w-11/12 mx-auto flex justify-between items-center bg-[#0000]">
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black dark:text-white"
            >
              {links}
            </ul>
          </div>
          <div className="flex gap-1 items-center w-fit">
            <div>
              <FaBookBookmark className="text-4xl text-blue-500 hidden md:block" />
            </div>
            <Link className="text-lg font-extrabold" to={"/"}>
              <span className="text-xl md:text-3xl">Virtual</span>
              <span className="text-blue-500 text-xl md:text-3xl">
                Bookshelf
              </span>
            </Link>
          </div>
        </div>
        <div>
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal px-5 text-[16px] font-medium">
              {links}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center gap-5">
          <div>
            {user ? (
              <>
                <button onClick={handleLogOut} className="py-2 px-3 md:py-2 md:px-4 bg-blue-500 hover:bg-blue-600 rounded-[5px] md:rounded-4xl text-white border-0 md:text-xl text-sm cursor-pointer">
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"login"}
                  className="py-2 px-3 md:py-2 md:px-4 bg-blue-500 hover:bg-blue-600 rounded-[5px] md:rounded-4xl text-white border-0 md:text-xl text-sm cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;
