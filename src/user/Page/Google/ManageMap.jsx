import React, { useEffect, useState, useRef } from "react";

const MapComponent = ({ placeId }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placeData, setPlaceData] = useState(null); // Combined state for place data and map

  // Load Google Maps API
  const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById("google-maps-script");

      if (existingScript) {
        resolve(); // Script already loaded
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.onload = () => resolve(); // Resolve when script loads
      script.onerror = (e) => reject(e); // Reject if error
      document.body.appendChild(script);
    });
  };

  // Initialize Map
  useEffect(() => {
    const initMap = async () => {
      await loadGoogleMapsApi();
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not available.");
        return;
      }

      // Set up map instance and load place details
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 40.748817, lng: -73.985428 }, // Example default location
      });

      mapInstance.current = map;

      // Fetch place details using Place ID
      fetchPlaceDetails(placeId);
    };

    initMap(); // Initialize map when component is mounted
  }, [placeId]); // Re-run when placeId changes

  // Fetch place details from Google Places API using Place ID
  const fetchPlaceDetails = (placeId) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance.current);

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log("Place Details:", place);

        // Set the retrieved details in state
        setPlaceData({
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          website: place.website,
          rating: place.rating,
          reviews: place.reviews,
          photos: place.photos ? place.photos.map((photo) => photo.getUrl()) : [],
          geometry: place.geometry ? place.geometry.location : null,
        });

        // Add markers for the place
        const bounds = new window.google.maps.LatLngBounds();
        if (place.geometry && place.geometry.location) {
          new window.google.maps.Marker({
            position: place.geometry.location,
            map: mapInstance.current,
            title: place.name,
          });

          bounds.extend(place.geometry.location);
        }
        mapInstance.current.fitBounds(bounds);
      } else {
        console.error("Error retrieving place details: ", status);
      }
    });
  };

  return (
    <div>
      {/* Google Maps container */}
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>

      {/* Display place details */}
      {placeData && (
        <div className="place-details mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">{placeData.name}</h3>
          <p><strong>Address:</strong> {placeData.address}</p>
          <p><strong>Phone:</strong> {placeData.phoneNumber || "Not available"}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={placeData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {placeData.website || "Not available"}
            </a>
          </p>
          <p><strong>Rating:</strong> {placeData.rating || "No rating"} ⭐</p>

          {/* Display Photos */}
          {placeData.photos && placeData.photos.length > 0 && (
            <div>
              <strong>Photos:</strong>
              <div className="flex flex-wrap mt-2">
                {placeData.photos.map((photoUrl, index) => (
                  <img
                    key={index}
                    src={photoUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-32 h-32 object-cover m-2 rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
