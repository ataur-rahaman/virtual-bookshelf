import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <footer>footer</footer>
        </div>
    );
};

export default MainLayout;