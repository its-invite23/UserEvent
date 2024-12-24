import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addGoogleData } from "../Redux/GoogleData";
import toast from "react-hot-toast";
// Function to generate ChatGPT prompt
const generatePrompt = (data) => {
  return `
    Generate a JSON object in the following format for a Google Maps API request:

    {
      location: center, // Use the latitude and longitude of the city derived from the provided location area
      radius: "25000", // Keep the radius constant
      type: "restaurant", // Set this to the place type based on the event details
      keyword: // Generate the best keywords based on the provided event details
    }

    **Inputs:**
    - Event Type: ${data?.event_type || "N/A"} // Example: birthday, graduation, marriage, etc.
    - Number of Attendees: ${data?.people || "N/A"} // Number of people attending
    - Event Vibe (Activity): ${data?.activity?.join(", ") || "N/A"} // Example: bowling, karting, etc.
    - Location: ${data?.area || "N/A"} // Area whose city latitude and longitude you should derive
    - Preferred Food: ${data?.food_eat?.join(", ") || "N/A"} // Example: Chinese, Mexican, etc.
    - Time: ${data?.time || "N/A"} // Example: Morning, Noon, Evening
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
    {
      location: {lat: latitude, lng: longitude}, // Latitude and longitude of the given location
      radius: "25000", // Fixed radius
      type: "restaurant", // Default to restaurant unless strongly implied otherwise
      keyword: "combined keywords" // Combine event type, activities, food preferences, and time into relevant keywords
    }
   
    **Input Data:**
    - Event Type: "${data?.event_type || "N/A"}"
    - Number of Attendees: "${data?.people || "N/A"}"
    - Event Vibe (Activity): "${data?.activity?.join(", ") || "N/A"}"
    - Location: "${data?.area || "N/A"}"
    Place: "${data?.place || "N/A"}"
    - Preferred Food: "${data?.food_eat?.join(", ") || "N/A"}"
    - Time: "${data?.time || "N/A"}"
  `;
};


// Function to fetch ChatGPT response
const getChatGPTResponse = async (prompt) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.error?.message)

      throw new Error(errorData.error?.message || "API request failed");
    }
    const data = await response.json();
    return data.choices[0]?.message?.content.trim();
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    return null;
  }
};

// Main MapComponent
const MapComponent = ({ handleGetStartedClick, formData }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placesData, setPlacesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const initMap = async () => {
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

          // Generate ChatGPT prompt
          const prompt = generatePrompt(formData);
          let refinedSearchTerm = await getChatGPTResponse(prompt);
          console.log("refinedSearchTerm", refinedSearchTerm)
          refinedSearchTerm = JSON.parse(refinedSearchTerm);
          // console.log("refinedSearchTerm", refinedSearchTerm)
          try {
            nearbySearch(refinedSearchTerm)
            // console.log("Refined Search Term:", refinedSearchTerm);
          } catch (error) {
            console.error("Failed to parse refinedSearchTerm:", error);
            refinedSearchTerm = {
              location: { lat: latitude, lng: longitude }, // Fallback to current location
              radius: "25000",
              type: "restaurant",
              keyword: "default keyword",
            };
          }

          setSearchTerm(refinedSearchTerm);
          nearbySearch(refinedSearchTerm);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };

    initMap(); // Initialize the map
  }, [formData]);
  console.log("formData",formData)

  const nearbySearch = async (searchTerm) => {
    if (
      !searchTerm ||
      !searchTerm.location ||
      !searchTerm.location.lat ||
      !searchTerm.location.lng
    ) {
      console.error("Invalid searchTerm structure:", searchTerm);
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance.current);
    const keywords = `${formData?.event_type}, ${searchTerm.keyword}`;

    const requestTypes = ["Venue", "Catering", "Activity", `${formData?.event_type || searchTerm.type}`];
    const arrayIndex = [];
    {
      requestTypes && requestTypes.map((item, index) => {
        const request = {
          location: new window.google.maps.LatLng(
            searchTerm.location.lat,
            searchTerm.location.lng
          ),
          radius: searchTerm.radius || "80000",
          // type: formData?.event_type || searchTerm.type,
          type: item,
          keyword: keywords,
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const serializableResults = results.map((result) => ({
              ...result,
              services_provider_categries: item,
              geometry: {
                location: {
                  lat: result.geometry.location.lat(),
                  lng: result.geometry.location.lng(),
                },
              },
            }));
            console.log(`serializableResults ${index}`, serializableResults)

            if (arrayIndex.includes(index)) {
              console.log("Hello");
            }
            else {
              arrayIndex.push(index);
              setPlacesData(serializableResults);
              dispatch(addGoogleData(serializableResults));
            }

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
            console.error("No results found:", status);
          }
        });

        return (
          <React.Fragment key={Math.random()}>
            {/* Add any JSX you wish to render for each iteration */}
          </React.Fragment>
        );
      })
    }
  };


  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
      <div
        onClick={handleGetStartedClick}
        className="cursor-pointer flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465] hover:border-[#4400c3] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
      >
        🙌 Get started
      </div>
    </>
  );
};

export default MapComponent;
