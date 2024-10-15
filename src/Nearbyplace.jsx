// src/Places.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            const location = 'jaipur'; // Aap yahan par apni location daalein
            const radius = 1500; // Radius in meters
            const type = 'restaurant|cafe'; // Types of places to search for

            // Payload for the POST request
            const payload = {
                location: location,
                radius: radius,
                type: type,
                key: 'AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58' // Yahan apna Google Maps API key daalein
            };

            try {
                const response = await axios.post(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json`, 
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                setPlaces(response.data.results);
            } catch (err) {
                console.error("Error details:", err.response ? err.response.data : err.message); // Log the error for debugging
                setError(err.response ? err.response.data.error_message : err.message); // Set specific error message
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Nearby Restaurants and Cafes</h1>
            <ul>
                {places.map((place) => (
                    <li key={place.id}>
                        <h2>{place.name}</h2>
                        <p>{place.vicinity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Places;
