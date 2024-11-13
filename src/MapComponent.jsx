import React, { useEffect, useRef, useState } from "react";

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58&libraries=places,marker`;
    script.onload = () => resolve(); // Resolve when script loads
    script.onerror = (e) => reject(e); // Reject if there's an error loading the script
    document.body.appendChild(script);
  });
};

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placesData, setPlacesData] = useState([]); // State for places data
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [persons, setPersons] = useState({}); // State to keep track of the number of persons for each place

  const priceMapping = {
    1: 10, // Price for level 1
    2: 20, // Price for level 2
    3: 30, // Price for level 3
    4: 40, // Price for level 4
  };

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

          nearbySearch(center); // Initial search on load
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };

    initMap(); // Initialize the map
  }, []); // Empty dependency array to run only on mount

  const nearbySearch = async (center) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      mapInstance.current
    );
    const paris = { lat: 48.8566, lng: 2.3522 };
    const request = {
      location: center,
      radius: "20000", // Search within 20,000 meters (20 km)
      type: ["event_planner"], // Search for cafes, restaurants, and clubs
      keyword: "graduation party restaurant Asian catering floral decoration",
      // keyword: searchTerm, // Use the search term from the input
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlacesData(results);

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
      return photos.map((photo) => photo.getUrl()); // Return array of photo URLs
    }
    return []; // Return empty array if no photos are available
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (mapInstance.current) {
      const center = mapInstance.current.getCenter(); // Get current center
      nearbySearch(center); // Call nearbySearch with the current center
    }
  };

  const handlePersonsChange = (placeId, value) => {
    setPersons((prev) => ({
      ...prev,
      [placeId]: value,
    }));
  };

  // Calculate total price based on the mapping
  const calculateTotalPrice = (priceLevel, quantity) => {
    if (priceLevel === undefined) return 0; // No price level available
    const actualPrice = priceMapping[priceLevel] || 0; // Get the actual price based on the level
    return actualPrice * quantity; // Calculate total price
  };

  return (
    <div>
      <div
        ref={mapRef}
        id="map"
        style={{ height: "500px", width: "100%" }} // Set your desired height and width
      />
      <div>
        <h3>Nearby Restaurants:</h3>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {placesData.map((place, index) => (
            <li
              key={index}
              style={{
                flexBasis: "23%", // Each card will take up roughly 23% of the width (for 4 cards per row)
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {place.name}
              </h4>
              {/* Render multiple photos */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {getPhotoUrls(place.photos).map((url, photoIndex) => (
                  <img
                    key={photoIndex}
                    src={url}
                    alt={place.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      margin: "5px", // Add some spacing between images
                    }} // Adjust photo styles as needed
                  />
                ))}
              </div>
              <p style={{ marginTop: "10px" }}>
                Price Level:{" "}
                {place.price_level !== undefined
                  ? `$${place.price_level}`
                  : "N/A"}
              </p>
              <p>
                Quantity of Persons:
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) =>
                    handlePersonsChange(
                      place.place_id,
                      parseInt(e.target.value) || 1
                    )
                  }
                  style={{ marginLeft: "10px", width: "50px" }}
                />
              </p>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Total Price: $
                {calculateTotalPrice(
                  place.price_level,
                  persons[place.place_id] || 1
                ).toFixed(2)}
              </p>
              <p>Address: {place.vicinity || "N/A"}</p>
              <p>Rating: {place.rating ? `${place.rating} / 5` : "N/A"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
