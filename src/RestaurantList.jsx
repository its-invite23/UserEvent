import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://tripadvisor1.p.rapidapi.com/restaurants/list', {
        params: {
          location_id: '297631', // Location ID for Jaipur, replace with your desired location ID if different
          limit: '10', // Number of restaurants to fetch
          currency: 'USD', // Set the currency
          category: 'restaurant,cafe,nightclub' // Fetching restaurants, cafes, and nightclubs
        },
        headers: {
          'X-RapidAPI-Key': '0678dd81a5msh30f428fa5a9e74dp16d16djsn9a0bef6b2261', // Replace with your RapidAPI key
          'X-RapidAPI-Host': 'tripadvisor1.p.rapidapi.com'
        }
      });

      // Ensure response.data.data is an array before setting state
      setRestaurants(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Restaurants, Cafes, and Nightclubs in Jaipur:</h3>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.location_id}>
            <h4>{restaurant.name}</h4>
            <p>Price Level: {restaurant.price_level || 'N/A'}</p>
            <p>Rating: {restaurant.rating || 'N/A'}</p>
            <p>Address: {restaurant.address || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;