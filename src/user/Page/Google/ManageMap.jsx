import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addGoogleData } from "../Redux/formSlice";

// Function to load the Google Maps JavaScript API
const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-script");

    if (existingScript) {
      resolve(); // Script is already loaded
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,marker,geocoding`;
    script.onload = () => resolve(); // Resolve when script loads
    script.onerror = (e) => reject(e); // Reject if there's an error loading the script
    document.body.appendChild(script);
  });
};

const MapComponent = ({ handleGetStartedClick, formData }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placesData, setPlacesData] = useState([]);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null); // Single variable for merged place details
  console.log("selectedPlaceDetails", selectedPlaceDetails);
  const [searchTerm, setSearchTerm] = useState(
    formData?.area || "Giridhar Marg, Opposite Bhaya Ji Juice Center, Sanganer 302017 · "
  );

  useEffect(() => {
    const initMap = async () => {
      await loadGoogleMapsApi();

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

          geocodeAndSearch(searchTerm);
        },
        (error) => {
          console.error("Error getting user location:", error);
          geocodeAndSearch(searchTerm);
        }
      );
    };

    initMap();
  }, []);

  const geocodeAndSearch = (location) => {
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

  const nearbySearch = (center) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      mapInstance.current
    );

    const request = {
      location: center,
      radius: "25000",
      type: "restaurant",
      keyword: "Giridhar Marg, Opposite Bhaya Ji Juice Center, Sanganer 302017 · ",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
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

  const getPlaceDetails = (placeId) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      mapInstance.current
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placeDetails = {
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number || "N/A",
          owner: place.owner || "N/A",
          website: place.website || "N/A",
          rating: place.rating || "N/A",
          reviews: place.reviews || [],
          photos: getPhotoUrls(place.photos),
        };

        // Merge details into a single key for the place
        const mergedPlaceDetails = {
          place_id: placeId,
          details: placeDetails,
        };

        setSelectedPlaceDetails(mergedPlaceDetails); // Update the state
      } else {
        console.error("Place Details request failed:", status);
      }
    });
  };

  const getPhotoUrls = (photos) => {
    if (photos && photos.length > 0) {
      return photos.map((photo) => photo.getUrl());
    }
    return [];
  };

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px" }}
      ></div>

      <div>
        {placesData.map((place, index) => (
          <div key={index} onClick={() => getPlaceDetails(place.place_id)}>
            <h3>{place.name}</h3>
            <p>{place.vicinity}</p>
          </div>
        ))}
      </div>

      {selectedPlaceDetails && (
        <div>
          <h2>Details of Selected Place</h2>
          <p><strong>Place ID:</strong> {selectedPlaceDetails.place_id}</p>
          <p><strong>Name:</strong> {selectedPlaceDetails.details.name}</p>
          <p><strong>Address:</strong> {selectedPlaceDetails.details.address}</p>
          <p><strong>Phone:</strong> {selectedPlaceDetails.details.phoneNumber}</p>
          <p><strong>Owner:</strong> {selectedPlaceDetails.details.owner}</p>
          <p><strong>Website:</strong> {selectedPlaceDetails.details.website}</p>
          <p><strong>Rating:</strong> {selectedPlaceDetails.details.rating}</p>
          <div>
            <strong>Photos:</strong>
            {selectedPlaceDetails.details.photos.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Place"
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        onClick={handleGetStartedClick}
        className="flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
      >
        🙌 Get started
      </div>
    </>
  );
};

export default MapComponent;
