import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

function LocationSearch({ formData, handleInputChange, setFormData ,isActive}) {
  const googlemap = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log("googlemap", googlemap);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [location, setLocation] = useState("");
  console.log("location", location);

  useEffect(() => {
    // Load the Google Maps script dynamically
    const loadScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
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
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current
        );

        // Add listener for place selection
        autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
      }
    };

    // Handle place selection
    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      console.log("Selected Location:", place.formatted_address);
      setLocation(place.formatted_address);
      setFormData((prevData) => ({
        ...prevData,
        area: place.formatted_address,
      }));
    };

    loadScript();
  }, []);

  // Detect current location
  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Coordinates:", latitude, longitude);

          // Reverse geocode to get the address
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googlemap}`
          )
            .then((response) => response.json())
            .then((data) => {
              const address = data.results[0]?.formatted_address;
              console.log("Detected Address:", address);
              if (address) {
                setLocation(address);
                setFormData((prevData) => ({
                  ...prevData,
                  area: address,
                }));
              }
            })
            .catch((error) => console.error("Error with geocoding:", error));
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
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
        {isActive &&
        <button
        type="button"
        onClick={detectCurrentLocation}
        className="ml-2 p-2  rounded-full hover:bg-gray-600"
        title="Detect Current Location"
        >
          <MdOutlineMyLocation size={24} color={"#ffff"}/>
        </button>
        }
      </div>
    </div>
  );
}

export default LocationSearch;
