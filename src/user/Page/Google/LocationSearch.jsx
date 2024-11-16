import React, { useEffect, useRef, useState } from 'react';

function LocationSearch({ formData, handleInputChange, setFormData }) {
  const googlemap = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  console.log("googlemap", googlemap)
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [location, setLoaction] = useState("")
  console.log("location", location)
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
      setFormData((prevData) => ({
        ...prevData,
        area: place.formatted_address,
      }));
    };

    loadScript();
  }, []);

  return (
    <div>
      <div className='flex justify-center '>
        <input
          ref={inputRef}
          type="text"
          name="area"
          value={formData?.area}
          onChange={handleInputChange}
          placeholder="Enter a location"
         className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none hover:outline-none"
        />
      </div>
    </div>
  );
}

export default LocationSearch;
