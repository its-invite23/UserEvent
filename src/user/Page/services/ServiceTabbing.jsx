import React, { useState } from "react";

import unlimitedimg from '../../../assets/service/unlimitedimg.png'
import noticebanner from '../../../assets/service/noticebanner.png'
import trackgrowimg from '../../../assets/service/trackgrowimg.png'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0); // Default active tab

  // Tabs data with titles and subtitles
  const tabs = [
    {
      title: "Unlimited Listings, Zero Hassle",
      subtitle: "Create as many customizable listings as you need, with automated invoicing that takes care of the paperwork for you.",
    },
    {
      title: "Get Noticed, Get Booked, Get Paid",
      subtitle: "Boost your visibility, easily manage bookings, and handle payments seamlessly, all on one platform.",
    },
    {
      title: "Stay on Track, Grow Your Business",
      subtitle: "Track orders, measure success, and collaborate effortlessly with your team for smooth operations and growth.",
    },
  ];

  // Content data including heading, description, and image
  const content = [
    {
      image: unlimitedimg,
      heading: "Unlimited Listings, Zero Hassle",
      description: "Build unlimited, fully customizable service offerings, so you can cater to any event. INVITE’s automated invoicing saves you time by instantly generating invoices for each booking—simply review and approve. Focus more on providing your service and less on the admin.",
    },
    {
      image: noticebanner,
      heading: "Get Noticed, Get Booked, Get Paid",
      description: "Reach more clients with personalized recommendations and real-time messaging. Discuss details, manage all your bookings, and get paid on time with no hassle. INVITE gives you everything you need to build strong relationships and manage your cash flow—so you can focus on providing the best services.",
    },
    {
      image: trackgrowimg,
      heading: "Stay on Track, Grow Your Business",
      description: "Keep track of every order and performance metrics. From managing orders to collaborating with your team, INVITE helps you stay organized and improve with every event. Measure it, track it, grow it!",
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
              className="w-full h-auto rounded-lg shadow-lg"
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

export default Tabs;
