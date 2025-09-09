import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Bookshelf from "../pages/Bookshelf";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import Profile from "../pages/Profile";

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
                Component: AddBook
            },

            {
                path: "/my-books",
                Component: MyBooks
            },

            {
                path: "/profile",
                Component: Profile
            },
        ]
    },

    {
        path: "/*",
        Component: Error
    }
])

export default router