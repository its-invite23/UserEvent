import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearAllVenues } from "../Redux/selectedVenuesSlice";
import { clearGoogleData } from "../Redux/GoogleData";
import { updateData } from "../Redux/formSlice";
import LoadingSpinner from "../../compontents/LoadingSpinner";

export default function ServicesRecap({ data, formData, id, description, setDescription }) {
  
  const[loading,SetLoading]=useState(false);
  const priceText = {
    1: "Budget-friendly place",
    2: "Mid-range place with good value",
    3: "Higher-end place",
    4: "Luxury and premium option",
  };

  const generatePrompt = () => {
    return `
      Using the following event information, create a single-paragraph description incorporating all the details:
  
      Input:
       Organizer Name: ${formData?.firstname || "Unknown"} ${formData?.lastname || "Unknown"}
       Contact Email: ${formData?.email || "Not provided"}
       Contact Number: ${formData?.phone_code || ""} ${formData?.number || "Not provided"}
       Event Type: ${formData?.event_type || "Not specified"}
       Number of People Attending: ${formData?.people || "Not specified"}
       Event Date: ${formData?.day || "DD"}-${formData?.month || "MM"}-${formData?.year || "YYYY"}
       Event Time: ${formData?.time || "Not specified"}
       Venue: A restaurant located at ${formData?.area || "Unknown location"}
       Food Options: ${formData?.food_eat || "Not specified"}
       Activities Planned: ${formData?.activity || "None specified"}
       Privatization of Place: ${formData?.Privatize_place || "Not specified"}
       Privatization of Activity: ${formData?.Privatize_activity || "Not specified"}
       Budget: ${priceText[formData?.firstname] || "Budget information not available"}
       Additional Details: ${formData?.details || "No additional details provided"}
  
      Instructions:
       The output should present a concise, professional summary tailored for event planning purposes.
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
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      // console.log("data",data);
      return data.choices[0]?.message?.content.trim();
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
      return null;
    }
  };
  
  const getChatgptData = async() =>{
    const prompt = generatePrompt();
     const response= await getChatGPTResponse(prompt);
     setDescription(response);
     SetLoading(false);
  }

  useEffect(()=>{
    if(formData){
      SetLoading(true);
      getChatgptData();
    }
  },[])

  const RecapDetail = ({ label, value }) => (
    <div className="rounded-lg">
      <p className="text-[#EB3465] text-[11px] md:text-[12px] lg:text-[13px]">
        {label}
      </p>
      <p className="text-white text-[11px] md:text-[14px] lg:text-[16px] break-words">
        {value}
      </p>
    </div>
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      
        <div className="w-[96%] max-w-[1300px] mx-auto mt-[30px] ">
        <button
          onClick={() => {
            dispatch(clearAllVenues());
            dispatch(clearGoogleData());
            dispatch(updateData({ step: 10 }));
            navigate(-1);
          }}
          className="inline-flex items-center rounded-lg p-4 bg-[#1B1B1B] gap-x-2 text-white hover:text-pink-500  focus:outline-none"
        >
          <FaLongArrowAltLeft size={32} />
        </button>
      </div>
      <div className="w-[96%] max-w-[1300px] m-auto mt-[30px] bg-[#1B1B1B] rounded-lg container mx-auto ">
        <h1 className="text-[30px] md:text-[40px] font-[700] px-[10px] md:px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
          <span className="text-[#EB3465]">Event </span> recap
        </h1>
        {loading?
        <LoadingSpinner/>
        :
        <div className="px-[10px] md:px-[20px] lg:px-[30px] pt-[10px] pb-[20px]">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[15px] lg:gap-[20px]">
            <RecapDetail
              label="📅 Date:"
              value={
                formData?.day && formData?.month && formData?.year
                  ? `${formData.day}-${formData.month}-${formData.year}`
                  : data?.created_at
                  ? moment(data.created_at).format("DD MMM YYYY")
                  : "N/A"
              }
            />
            <RecapDetail
              label="🗺️ Location:"
              value={formData?.area || data?.area || "N/A"}
            />
            <RecapDetail
              label="🥳 Event Type:"
              value={formData?.event_type || data?.package_name || "N/A"}
            />
            <RecapDetail
              label="👥 Number of Attendees:"
              value={formData?.people || data?.package_people || "N/A"}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[5px] lg:mt-[10px]">
            <RecapDetail
              label="🍔 Food:"
              value={
                formData?.food_eat?.join(", ") ||
                data?.package_categories?.join(", ") ||
                "N/A"
              }
            />
            <RecapDetail
              label="💵 Budget:"
              value={priceText[formData?.budget] || "N/A"}
            />
            <RecapDetail
              label="🎳 Activity:"
              value={formData?.activity?.join(", ") || "N/A"}
            />
            <RecapDetail
              label="✉️ Email:"
              value={formData?.email || data?.services_provider_email || "N/A"}
            />
          </div>

          <div className="gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[10px]">
            <RecapDetail
              label="⌛ Description:"
              value={description || "N/A"}
            />
          </div>

          <div className="flex justify-center mt-[15px]">
            <a
              href="#services_provider"
              aria-label="Unlock your custom-made event"
              className="flex items-center px-[8px] py-5 bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold rounded text-[11px] md:text-[14px] transition leading-[15px]"
            >
              🔓 Unlock your custom-made event
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                className="ml-[5px]"
              >
                <path
                  d="M0 8.88336H11.5861L7.08606 13.3834L8.50006 14.7974L15.4141 7.88336L8.50006 0.969364L7.08606 2.38336L11.5861 6.88336H0V8.88336Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
