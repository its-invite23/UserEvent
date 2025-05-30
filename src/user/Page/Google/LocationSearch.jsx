import React, { useEffect, useRef } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

function LocationSearch({ formData, handleInputChange, setFormData }) {
  const googlemap = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
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

    const initializeAutocomplete = () => {
      if (inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current
        );

        autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
      }
    };

    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      setFormData((prevData) => ({
        ...prevData,
        area: place.formatted_address,
      }));
    };

    loadScript();
  }, [googlemap, setFormData]);

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googlemap}`
          )
            .then((response) => response.json())
            .then((data) => {
              const address = data.results[0]?.formatted_address;
              if (address) {
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
          className="w-full border border-[#ffffff14] bg-transparent px-[20px] py-[20px] text-white 
                             focus:outline-none hover:outline-none"
        />
        <button
          type="button"
          onClick={detectCurrentLocation}
          className="ml-2 p-2  rounded-full hover:bg-gray-600"
          title="Detect Current Location"
        >
          <MdOutlineMyLocation size={24} color={"#ffff"} />
        </button>
      </div>
    </div>
  );
}

export default LocationSearch;