// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for the Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">The Movie Store</div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/search">Search Movies</Link>
                <Link to="/movies">All Movies</Link>
            </div>
        </nav>
    );
};

export default Navbar;
