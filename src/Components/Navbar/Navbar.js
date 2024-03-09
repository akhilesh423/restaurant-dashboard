import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        Cookies.remove("token");
        navigate("/signin");
    };

    return (
        <nav>
            <div className="navbar">
                <h1 className="logo-name">Bling and Bliss</h1>
                <div class="search-container">
                    <input class="search-bar" type="search" />
                    <button class="search-separator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="search-icon">
                            <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <ul className="flex">
                    <Link to="/">
                        <li className="flex items-center p-3 h-18">
                            <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Dashboard</h1>
                        </li>
                    </Link>
                    <Link to="/items">
                        <li className="flex items-center p-3 h-18 ">


                            <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Food Items</h1>
                        </li>
                    </Link>
                    <li className="flex items-center p-3 h-18 ">
                        <h1 className="text-white font-serif text-md ml-2 mt-1 font-medium">Analytics</h1>
                    </li>
                    <li className="flex items-center p-3 h-18 " onClick={handleSignOut}>
                        <h1 className="text-white font-serif text-md ml-2 font-medium">Sign Out</h1>
                    </li>
                </ul>
            </div>

        </nav>
    );
}
