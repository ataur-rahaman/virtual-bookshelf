import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <nav>nav-bar</nav>
            <Outlet></Outlet>
            <footer>footer</footer>
        </div>
    );
};

export default MainLayout;