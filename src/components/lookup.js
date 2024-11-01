import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lookup.css';

const API_KEY = 'Your API Key'; // Replace with your actual API key

const Lookup = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLookup = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(`https://movieapi-v2ft.onrender.com/api/search/${query}`, {
                    headers: {
                        'x-api-key': `${API_KEY}`
                    }
                });
                
                // Assuming response.data is an array, get the first matching movie
                const movie = response.data[0]; 

                if (movie && movie.numericID) {
                    navigate(`/movie/${movie.tmdbID}`); // Ensure movie.numericID exists before navigating
                } else {
                    setError('No movie found. Please try a different search.');
                }
            } catch (err) {
                setError('Failed to fetch movie. Please try again.');
            }
        }
    };

    return (
        <div className="lookup-container">
            <h1>Lookup Movies</h1>
            <input
                type="text"
                placeholder="Enter movie name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleLookup}
                className="lookup-input"
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Lookup;
