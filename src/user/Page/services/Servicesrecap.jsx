import React from "react";
import Lockicon from "../../../assets/lockicon.png";
import moment from "moment/moment";
import { Link } from "react-router-dom";

export default function ServicesRecap({ data, formData }) {

  const RecapDetail = ({ label, value }) => (
    <div className="rounded-lg">
      <p className="text-[#EB3465]">{label}</p>
      <p className="text-white text-[15px] md:text-[18px] xl:text-[25px]">{value}</p>
    </div>
  );

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <div className="w-[96%] max-w-[1200px] m-auto mt-[60px] bg-[#1B1B1B] rounded-lg container mx-auto ">
        <h1 className="text-[30px] md:text-[40px] font-[700] px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
          <span className="text-[#EB3465]">Event </span> recap
        </h1>
        <div className="p-5 lg:p-10">
          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
            <RecapDetail label="🗺️ Location:" value={formData?.area || data?.area || "N/A"} />
            <RecapDetail label="🥳 Event Type:" value={formData?.event_type || data?.package_name || "N/A"} />
            <RecapDetail label="👥 Number of Attendees:" value={formData?.people || data?.package_people
              || "N/A"} />
          </div>

          {/* Food and Budget Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            <RecapDetail label="🍔 Food:" value={formData?.food_eat?.join(", ") || data?.package_categories?.join(", ") || "N/A"} />
            <RecapDetail label="💵 Budget:" value={formData?.budget || (`$${data?.package_price_min}-${data?.package_price_max}`) || "N/A"} />
            <RecapDetail label="🎳 Activity:" value={formData?.activity?.join(", ") || "N/A"} />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <RecapDetail
              label="🎉 Vibe and Atmosphere:"
              value="Casual and fun with a rooftop/terrace vibe"
            />
            <RecapDetail label="✉️ Email:" value={formData?.email || data?.services_provider_email || "N/A"} />
          </div>

          <div className="mt-5">
            <RecapDetail
              label="⌛ Description:"
              value={formData?.details || "N/A"}
            />
          </div>

          {/* Unlock Button */}
          <div className="flex justify-center mt-10">
          <Link
        href="#services_provider"
        aria-label="Unlock your custom-made event"
        className="flex items-center px-8 py-5 bg-[#EB3465] hover:bg-[#fb3a6e] text-white font-bold rounded transition"
      >
              <img src={Lockicon} alt="Lock icon" className="mr-2" />
              Unlock your custom-made event
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path
                  d="M0 8.88336H11.5861L7.08606 13.3834L8.50006 14.7974L15.4141 7.88336L8.50006 0.969364L7.08606 2.38336L11.5861 6.88336H0V8.88336Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
