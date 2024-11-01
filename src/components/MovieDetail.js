// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const API_KEY = 'Your API Key'; // Replace with your actual API key

const MovieDetail = () => {
    const { tmdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`https://movieapi-v2ft.onrender.com/api/movies/${tmdbID}`, {
                    headers: {
                        'x-api-key': `${API_KEY}`,
                    },
                });
                setMovie(response.data);
            } catch (err) {
                setError('Failed to fetch movie details. Please try again later.');
            }
        };
        fetchMovieDetail();
    }, [tmdbID]);

    if (error) return <h2>{error}</h2>;
    if (!movie) return <h2>Loading...</h2>;

    return (
        <div className="movie-detail">
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} />
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Tagline:</strong> {movie.tagline}</p>
            <p><strong>Plot:</strong> {movie.plot}</p>
            <p><strong>Poster:</strong> {movie.poster}</p>
            <p><strong>Thumbnail:</strong> {movie.thumbnail}</p>
            <p><strong>Rating:</strong> {movie.userScore}</p>
            <p><strong>Status:</strong> {movie.status}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Minimal Age:</strong> {movie.minimalAge}</p>
            <p><strong>Budget:</strong> {movie.budget}</p>
            <p><strong>Revenue:</strong> {movie.revenue}</p>
            <p><strong>Genres:</strong> {movie.genre?.join(', ')}</p>
            <p><strong>Roles:</strong> 
                {movie.roles && movie.roles.length > 0 ? (
                    <ul>
                        {movie.roles.map((role, index) => (
                            <li key={index}>
                                {role.role}: {role.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span>No roles available</span>
                )}
            </p>
            <div>
                <strong>Watch On:</strong>
                <ul>
                    {movie.whereToWatch && Object.entries(movie.whereToWatch).map(([country, platforms]) => (
                        <li key={country}>
                            <strong>{country}:</strong> 
                            {platforms ? platforms.join(', ') : 'No platforms available'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieDetail;
