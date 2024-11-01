// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Lookup from './components/lookup';
import Navbar from './components/Navbar'; // Import Navbar
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail'; // Import the new component

const App = () => {
    return (
        <Router>
            <div>
                <Navbar /> {/* Include Navbar here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/lookup" element={<Lookup />} />
                    <Route path="/movie/:tmdbID" element={<MovieDetail />} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
