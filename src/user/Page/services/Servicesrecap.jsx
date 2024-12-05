import React from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";


export default function ServicesRecap({ data, formData, id }) {

  const RecapDetail = ({ label, value }) => (
    <div className="rounded-lg">
      <p className="text-[#EB3465] text-[11px] md:text-[12px] lg:text-[13px]">{label}</p>
      <p className="text-white text-[11px] md:text-[14px] lg:text-[16px] break-words">
        {value}
      </p>
    </div>
  );

  const priceText = {
    1: "Budget-friendly place",
    2: "Mid-range place with good value",
    3: "Higher-end place",
    4: "Luxury and premium option",
  };
  const navigate = useNavigate();

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <div className="w-[96%] max-w-[1300px] m-auto mt-[30px] bg-[#1B1B1B] rounded-lg container mx-auto ">
        <h1 className="text-[30px] md:text-[40px] font-[700] px-[10px] md:px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4999 8.50006L3.91394 8.50006L8.41394 13.0001L6.99994 14.4141L0.0859372 7.50006L6.99994 0.586063L8.41394 2.00006L3.91394 6.50006L15.4999 6.50006L15.4999 8.50006Z"
                fill="white"
              />
            </svg>
          </button>{" "}
          <span className="text-[#EB3465]">Event </span> recap
        </h1>
        <div className="px-[10px] md:px-[20px] lg:px-[30px] pt-[10px] pb-[20px]">
          {/* Event Details */}
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

          {/* Food and Budget Details */}
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
              value={
                priceText[formData?.budget] || "N/A"
              }
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

          {/* Additional Info */}
          <div className="gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[10px]">
            {/* <RecapDetail
              label="🎉 Vibe and Atmosphere:"
              value="Casual and fun with a rooftop/terrace vibe"
            /> */}

            <RecapDetail
              label="⌛ Description:"
              value={formData?.details || "N/A"}
            />
          </div>



          {/* Unlock Button */}
          <div className="flex justify-center mt-[15px]">
            <a
              href="#services_provider"
              aria-label="Unlock your custom-made event"
              className="flex items-center px-[8px] py-5 bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold rounded text-[11px] md:text-[14px] transition leading-[15px]"
            >
              🔓 Unlock your custom-made event
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" className="ml-[5px]">
                <path
                  d="M0 8.88336H11.5861L7.08606 13.3834L8.50006 14.7974L15.4141 7.88336L8.50006 0.969364L7.08606 2.38336L11.5861 6.88336H0V8.88336Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
