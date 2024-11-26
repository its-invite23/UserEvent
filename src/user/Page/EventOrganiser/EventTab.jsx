import React, { useState } from "react";
import trackgrowimg from '../../../assets/event/event3.jpg'
import celebrateimg from '../../../assets/event/event1.jpg'
import relaximg from "../../../assets/home/celebrateimg.png";

const EventTab = () => {
  const [activeTab, setActiveTab] = useState(0); // Default active tab

  // Tabs data with titles and subtitles
  const tabs = [
    {
      title: "  Perfect Matches Instantly",
      subtitle: "Discover service providers tailored to your needs in just a few clicks—fast, easy, and accurate.",
    },
    {
      title: "Instant Pricing, Instant Payment",
      subtitle: "Get transparent pricing and pay effortlessly with a simple, secure link—no delays, no hassle.",
    },
    {
      title: "Real-Time Messaging",
      subtitle: "Easily connect with service providers, customize your services, and ensure deadlines are met, stress-free.",
    },
  ];

  // Content data including heading, description, and image
  const content = [
    {
      image: celebrateimg,
      heading: " Perfect Matches Instantly",
      description: "Discover service providers tailored to your needs in just a few clicks—fast, easy, and accurate.",
    },
    {
      image: relaximg,
      heading: "Instant Pricing, Instant Payment",
      description: "Get transparent pricing and pay effortlessly with a simple, secure link—no delays, no hassle.",
    },
    {
      image: trackgrowimg,
      heading: "Real-Time Messaging",
      description: "Easily connect with service providers, customize your services, and ensure deadlines are met, stress-free.",
    },
  ];

  return (
    <div className="w-full flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
      {/* Tab Headers */}
      <div className="w-[100%] lg:w-[30%] flex flex-col items-start justifify-start">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-full flex flex-col items-start px-[20px] py-[20px]  bg-[#222] rounded-[5px] mb-[20px] ${activeTab === index
              ? "bg-[#6411ff]"
              : "text-gray-500 hover:text-blue-500"
              }`}
          >
            <strong className="text-white text-[15px] font-[500]">{tab.title}</strong>
            <p className="text-[#ffffff80] text-[15px] font-[400] text-left">{tab.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-[100%] lg:w-[70%]">
        <div>
          {/* Image */}
          <div className="mb-[50px]">
            <img
              src={content[activeTab].image}
              alt={`Tab ${activeTab + 1} image`}
              className=" max-w-[100%]  11h-auto rounded-lg 111shadow-lg"
            />
          </div>
          <div className="w-full">
            <strong className="flex justify-center md:justify-start text-white text-[1.3em] leading-[1.4em] md:text-[1.8em] leading:text-[1.8em] font-[700] text-center md:text-left mb-[10px]">{content[activeTab].heading}</strong>
            <p className="text-[#ffffff80] text-[1.1em] md:text-[1.4em] font-[400] text-center md:text-left">{content[activeTab].description}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventTab;
