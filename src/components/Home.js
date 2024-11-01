// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure you import the CSS file

const API_KEY = 'Your API Key'; // Replace with your actual API key

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://movieapi-v2ft.onrender.com/api/movies', {
                    headers: {
                        'x-api-key': `${API_KEY}` // Add the API key here
                    }
                });
                // Assuming the response is an array of movie objects
                const sortedMovies = response.data.sort((a, b) => b.userScore - a.userScore); // Sort by user score
                setMovies(sortedMovies.slice(0, 20)); // Get the top 20 movies
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
                setLoading(false);
            }
        };
    
        fetchMovies();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="home-container">
            <h1>Welcome to the Movies Gallery</h1>
            <h2>Top Movies by Rating</h2>
            <ul className="movies-list">
                {movies.map(movie => (
                    <li key={movie.tmdbID} className="movie-card">
                        <img src={movie.poster} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>Rating: {movie.userScore}</p> {/* Displaying user score */}
                    </li>
                ))}
            </ul>
            <div className="navigation">
                <Link to="/search">Go to Search</Link> {/* Link to Search page */}
            </div>
        </div>
    );
};

export default Home;
