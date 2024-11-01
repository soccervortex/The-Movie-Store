// src/components/Movies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Movies.css'; // Import any CSS you want to add

const API_KEY = 'Your API Key'; // Replace with your actual API key

const Movies = () => {
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
            const sortedMovies = response.data.sort((a, b) => b.year - a.year); // Sort by user score
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

    return (
        <div className="movies-container">
            <h1>All Movies</h1>
            {error && <p className="error">{error}</p>}
            <ul className="movies-list">
                {movies.length === 0 ? ( // Handle case when no movies are available
                    <li>No movies available at the moment. Please check back later.</li>
                ) : (
                    movies.map(movie => (
                        <li key={movie.tmdbID} className="movie-card">
                            <img src={movie.poster} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.userScore}</p>
                            <p>Year: {movie.year}</p>
                        </li>
                    ))
                )}
            </ul>
            <div className="navigation">
                <Link to="/">Go to Home</Link> {/* Link to Home page */}
            </div>
        </div>
    );
};

export default Movies;
