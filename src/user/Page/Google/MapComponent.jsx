import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addGoogleData } from "../Redux/formSlice";

// Function to load Google Maps API
const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-script");

    if (existingScript) {
      resolve(); // Script already loaded
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`; // Replace with your key
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
};

// ChatGPT Integration
const generatePrompt = (data) => {
  return `
    Generate a JSON object in the following format for a Google Maps API request:

    const request = {
      location: center, // Use the latitude and longitude of the city derived from the provided location area
      radius: "25000", // Keep the radius constant
      type: "restaurant", // Set this to the place type based on the event details
      keyword: // Generate the best keywords based on the provided event details
    };

    **Inputs:**
    - Event Type: ${data.event_type || "N/A"} // Example: birthday, graduation, marriage, etc.
    - Number of Attendees: ${data.people || "N/A"} // Number of people attending
    - Event Vibe (Activity): ${data.activity?.join(", ") || "N/A"} // Example: bowling, karting, etc.
    - Location: ${data.area || "N/A"} // Area whose city latitude and longitude you should derive
    - Preferred Food: ${data.food_eat?.join(", ") || "N/A"} // Example: Chinese, Mexican, etc.
    - Time: ${data.time || "N/A"} // Example: Morning, Noon, Evening
    - Budget: ${data.budget || "N/A"} // A value between 1 (cheapest) to 4 (most expensive)

    **Guidelines:**
    1. Use the area input to determine the city and its corresponding latitude and longitude. If the exact area is not found, use a general location based on the city name.
    2. The keyword field should include relevant terms derived from the following:
      - Event type (e.g., birthday, marriage).
      - Activities (e.g., bowling, karting).
      - Preferred food (e.g., Chinese, Mexican).
      - Time (e.g., Morning, Evening, if it aligns with specific dining times or activities).
    3. Keep the type field as "restaurant" unless the event type or activity strongly suggests another type, like "amusement_park" or "bowling_alley."
    4. Ensure the convert into JSON Parse is properly formatted for direct use with Google Maps API.

    **Output format:** Only provide the JSON structure without any explanations, extra text, or comments.

    Example Output:
   json
    {
      "location": {"lat": 37.7749, "lng": -122.4194}, // Derived from "San Francisco"
      "radius": "25000",
      "type": "restaurant",//it is the value I give you in place
      "keyword": "birthday, bowling, Chinese, evening"// try adding relevant keywords based on data
    }
   
    **Input Data:**
    - Event Type: "${data.event_type || "N/A"}"
    - Number of Attendees: "${data.people || "N/A"}"
    - Event Vibe (Activity): "${data.activity?.join(", ") || "N/A"}"
    - Location: "${data.area || "N/A"}"
    Place: "${data.place || "N/A"}"
    - Preferred Food: "${data.food_eat?.join(", ") || "N/A"}"
    - Time: "${data.time || "N/A"}"
    - Budget: "${data.budget || "N/A"}"
  `;
};

const getChatGPTResponse = async (prompt) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "gpt-4", // Adjust model as needed
        messages: [
          {
            "role": "user",
            "content": prompt
          }
        ],
        max_tokens: 150,
      }),
    });
    const data = await response.json();
    console.log("data", data)
    return data.choices[0]?.message?.content.trim();
  } catch (error) {
    console.error("Error with ChatGPT request:", error);
    return null;
  }
};

const MapComponent = ({ handleGetStartedClick, formData }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placesData, setPlacesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(formData?.area || "");

  useEffect(() => {
    const initMap = async () => {
      await loadGoogleMapsApi(); // Load Google Maps API

      if (!window.google || !window.google.maps) {
        console.error("Google Maps API is not available.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const center = new window.google.maps.LatLng(latitude, longitude);
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 11,
          });

          // Process ChatGPT prompt and refine search
          const prompt = generatePrompt(formData);
          let refinedSearchTerm = await getChatGPTResponse(prompt);
          // refinedSearchTerm=JSON.parse(refinedSearchTerm);
          console.log("refinedSearchTerm" ,refinedSearchTerm)
          if (refinedSearchTerm) {
            setSearchTerm(refinedSearchTerm);
            geocodeAndSearch(refinedSearchTerm);
          } else {
            geocodeAndSearch(searchTerm);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          geocodeAndSearch(searchTerm);
        }
      );
    };

    initMap(); // Initialize map
  }, []); // Run once on mount

  const geocodeAndSearch = async (location) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const center = results[0].geometry.location;
        nearbySearch(center, location);
      } else {
        console.error("Geocode failed: ", status);
      }
    });
  };

  const nearbySearch = async (center, keyword) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance.current);

    const request = {
      location: center,
      radius: "25000", // Adjust radius as needed
      type: "restaurant", // Example type
      keyword: keyword || `${formData.event_type || ""} ${formData.people || ""} ${formData.activity?.join(", ") || ""} ${formData.food_eat?.join(", ") || ""} ${formData.time || ""} ${formData.budget || ""}`, // Use ChatGPT response or fallback
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

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
      <div
        onClick={handleGetStartedClick}
        className="cursor-pointer flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465]  hover:border-[#4400c3]  rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
      >
        🙌 Get started
      </div>
    </>
  );
};

export default MapComponent;
