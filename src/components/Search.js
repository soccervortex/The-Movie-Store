// src/components/Search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Search.css'; // Import any CSS you want to add

const API_KEY = '5fJxXFD2CHCcmpT0'; // Replace with your actual API key

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    // Function to fetch all movies
    const fetchAllMovies = async () => {
        try {
            const response = await axios.get('https://movieapi-v2ft.onrender.com/api/movies', {
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
            const sortedMovies = response.data.sort((a, b) => b.year - a.year); // Sort by year (or any other criteria)
            setMovies(sortedMovies);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
            setMovies([]);
        }
    };

    // Fetch all movies when the component mounts
    useEffect(() => {
        fetchAllMovies();
    }, []);

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(`https://movieapi-v2ft.onrender.com/api/search/${query}`, {
                    headers: {
                        'x-api-key': `${API_KEY}`
                    }
                });
                const sortedMovies = response.data.sort((a, b) => b.year - a.year); // Sort by year
                setMovies(sortedMovies);
                setError('');
            } catch (err) {
                setError('No movies found. Please try a different search.');
                setMovies([]);
            }
        }
    };

    return (
        <div className="search-container">
            <h1>Search Movies</h1>
            <input
                type="text"
                placeholder="Enter movie name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="search-input"
            />
            {error && <p className="error">{error}</p>}
            <ul className="movies-list">
                {movies.map(movie => (
                    <li key={movie.tmdbID} className="movie-card">
                        <img src={movie.poster} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>Rating: {movie.userScore}</p>
                        <p>Year: {movie.year}</p>
                    </li>
                ))}
            </ul>
            <div className="navigation">
                <Link to="/">Go to Home</Link> {/* Link to Home page */}
            </div>
        </div>
    );
};

export default Search;
