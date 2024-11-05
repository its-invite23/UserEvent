import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
const LOCATION = '28.6139,77.2090'; // Replace with desired latitude, longitude
const RADIUS = 5000; // Search radius in meters

function PlacesList() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: LOCATION,
              radius: RADIUS,
              type: 'restaurant', // You can also change this to 'cafe'
              key: API_KEY,
            },
          }
        );
        const placesWithDetails = await Promise.all(
          response.data.results.map(async (place) => {
            if (place.place_id) {
              const detailsResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json`,
                {
                  params: {
                    place_id: place.place_id,
                    key: API_KEY,
                  },
                }
              );
              return { ...place, details: detailsResponse.data.result };
            }
            return place;
          })
        );
        setPlaces(placesWithDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Nearby Restaurants & Cafes</h1>
      {places.map((place, index) => (
        <div key={index} className="place-card">
          <h2>{place.name}</h2>
          <p>Address: {place.vicinity}</p>
          <p>Rating: {place.rating || 'N/A'}</p>
          <p>Price Level: {place.price_level || 'N/A'}</p>
          <p>Description: {place.details?.editorial_summary?.overview || 'No description available'}</p>
          {place.photos && (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`}
              alt={place.name}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PlacesList;