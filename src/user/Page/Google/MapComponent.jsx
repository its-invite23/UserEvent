
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addGoogleData } from "../Redux/formSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-script");

    if (existingScript) {
      resolve(); // Script is already loaded
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58&libraries=places,geocoding`;
    script.onload = () => resolve(); // Resolve when script loads
    script.onerror = (e) => reject(e); // Reject if there's an error loading the script
    document.body.appendChild(script);
  });
};

const MapComponent = ({ handleGetStartedClick, formData }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placesData, setPlacesData] = useState([]); // State for places data
  const [searchTerm, setSearchTerm] = useState(formData?.area); // State for the search term with default value

  console.log("placesDataplacesData", placesData);
  useEffect(() => {
    const initMap = async () => {
      await loadGoogleMapsApi(); // Load the Google Maps API

      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not available.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const center = new window.google.maps.LatLng(latitude, longitude);
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 11,
          });

          // Perform initial search with the default location
          geocodeAndSearch(searchTerm);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Perform initial search with the default location if geolocation fails
          geocodeAndSearch(searchTerm);
        }
      );
    };

    initMap(); // Initialize the map
  }, []); // Empty dependency array to run only on mount

  const geocodeAndSearch = async (location) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const center = results[0].geometry.location;
        nearbySearch(center);
      } else {
        console.error("Geocode was not successful: ", status);
      }
    });
  };

  const nearbySearch = async (center) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance.current);

    const request = {
      location: center,
      radius: "25000", // Adjust radius based on your needs
      type: `${formData?.food_eat} ${formData?.activity}`, // Adjust types based on `formData.place`
      keyword: `${formData.place} ${formData.budget}`, // Use place and budget for search
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log("results", results);
        setPlacesData(results);
        dispatch(addGoogleData(results));
        const bounds = new window.google.maps.LatLngBounds();
        results.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            new window.google.maps.Marker({
              position: place.geometry.location,
              map: mapInstance.current,
              title: place.name,
            });

            bounds.extend(place.geometry.location);
          }
        });
        mapInstance.current.fitBounds(bounds);
      } else {
        console.error("No results found: ", status);
      }
    });
  };

  // Get all photo URLs for a place
  const getPhotoUrls = (photos) => {
    if (photos && photos.length > 0) {
      return photos.map((photo) => photo.getUrl({ maxWidth: 400 })); // Return array of photo URLs
    }
    return []; // Return empty array if no photos are available
  };

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
      <div
        onClick={handleGetStartedClick}
        className="flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py/[11px] lg:py/[14px] border border-[#EB3465] rounded/[60px] bg-[#EB3465] hover/bg-[#fb3a6e] font-[manrope] font/[600] text/[14px] lg:text/[16px] text-white text-center"
      >
        🙌 Get started
      </div>
      {/* <div className="places-list">
        {placesData.map((place, index) => (
          <div key={index} className="place">
            <h3>{place.name}</h3>
            <p>Rating: {place.rating}</p>
            <p>Phone: {place.formatted_phone_number || "N/A"}</p>
            <div className="images">
              {getPhotoUrls(place.photos)?.map((url, imgIndex) => (
                <img key={imgIndex} src={url} alt={place.name} style={{ maxWidth: '200px', margin: '10px' }} />
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default MapComponent;
