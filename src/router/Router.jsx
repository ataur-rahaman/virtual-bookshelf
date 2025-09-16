import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Bookshelf from "../pages/Bookshelf";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "../components/LoadingSpinner";
import BookDetails from "../pages/BookDetails";
import UpdateBook from "../pages/UpdateBook";


const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },

            {
                path: "/bookshelf",
                Component: Bookshelf
            },

            {
                path: "/add-book",
                element: <PrivateRoute><AddBook></AddBook></PrivateRoute>
            },

            {
                path: "/my-books",
                element: <PrivateRoute><MyBooks></MyBooks></PrivateRoute>
            },

            {
                path: "/book-details/:id",
                Component: BookDetails
            },

            {
                path: "/update-book/:id",
                element: <PrivateRoute><UpdateBook></UpdateBook></PrivateRoute>
            },

            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },

            {
                path: "/login",
                Component: Login
            },

            {
                path: "/register",
                Component: Register
            },
        ]
    },

    {
        path: "/*",
        Component: Error
    }
])

export default router