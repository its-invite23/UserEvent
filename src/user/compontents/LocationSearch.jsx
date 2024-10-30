import React, { useEffect, useRef, useState } from 'react';

function LocationSearch() {
  const googlemap = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  console.log("googlemap",googlemap)
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
const[location ,setLoaction] =useState("")
console.log("location",location)
  useEffect(() => {
    // Load the Google Maps script dynamically
    const loadScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googlemap}&libraries=places`;
        script.async = true;
        script.onload = initializeAutocomplete;
        document.body.appendChild(script);
      } else {
        initializeAutocomplete();
      }
    };

    // Initialize the autocomplete feature
    const initializeAutocomplete = () => {
      if (inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);

        // Add listener for place selection
        autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
      }
    };

    // Handle place selection
    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      console.log("Selected Location:", place.formatted_address);
      setLoaction(place.formatted_address)
      // Optional: use place.formatted_address or place.geometry.location
    };

    loadScript();
  }, []);

  return (
    <div>
      <div className='flex justify-center '>
        <h1>Search Location</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a location"
          className="mt-4 px-6 py-2 bg-black border-1  border-black text-white rounded  transition duration-300"
        />
      </div>
    </div>
  );
}

export default LocationSearch;
