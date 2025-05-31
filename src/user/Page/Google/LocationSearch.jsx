import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

function LocationSearch({ formData, handleInputChange, setFormData }) {
  const googlemap = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(formData?.area || "");

  useEffect(() => {
    // Load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googlemap}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeAutocomplete();
    }
  }, [googlemap]);

  const initializeAutocomplete = () => {
    if (!inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: [] }, // No country restriction
      }
    );

    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.formatted_address) {
      setInputValue(place.formatted_address);
      setFormData(prev => ({
        ...prev,
        area: place.formatted_address
      }));
    }
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e);
  };

  // Detect current location
  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googlemap}`
            );
            const data = await response.json();
            if (data.results[0]) {
              const address = data.results[0].formatted_address;
              setInputValue(address);
              setFormData(prev => ({
                ...prev,
                area: address
              }));
            }
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          ref={inputRef}
          type="text"
          name="area"
          value={inputValue}
          onChange={handleInputValueChange}
          placeholder="Enter a location"
          className="w-full border border-[#ffffff14] bg-transparent px-[20px] py-[20px] text-white focus:outline-none hover:outline-none"
        />
        <button
          type="button"
          onClick={detectCurrentLocation}
          className="ml-2 p-2 rounded-full hover:bg-gray-600"
          title="Detect Current Location"
        >
          <MdOutlineMyLocation size={24} color={"#ffff"} />
        </button>
      </div>
    </div>
  );
}

export default LocationSearch;