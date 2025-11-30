import React, { useState } from "react";

import unlimitedimg from '../../../assets/service/unlimitedimg.png'
import noticebanner from '../../../assets/service/noticebanner.png'
import trackgrowimg from '../../../assets/service/trackgrowimg.png'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0); // Default active tab

  // Tabs data with titles and subtitles
  const tabs = [
    {
      title: "Smarter quotes, less work",
      subtitle: "Move from manual quoting to an AI-assisted flow that helps you reply faster and stay consistent, without changing how you already work.",
    },
    {
      title: "AI that keeps your team in the loop",
      subtitle: "Give your team a shared view of client requests and decisions, so everyone knows what’s going on at each stage.",
    },
    {
      title: "Keep every event on track and expectations aligned",
      subtitle: "Turn your terms, policies and timelines into a clear framework that keeps clients and teams on the same page.",
    },
  ];

  // Content data including heading, description, and image
  const content = [
    {
      image: unlimitedimg,
      heading: "Smarter quotes, less work",
      description: "Invite AI is built to support the way you price and sell your services. It uses your own offers, pricing logic and conditions to help you respond more quickly, keep information clear, and turn enquiries into confirmed events with less effort from your team. The exact flows are defined together with you during the partnership, so the system reflects your reality—not a generic template.",
    },
    {
      image: noticebanner,
      heading: "AI that keeps your team in the loop",
      description: "From first contact to post-event follow-up, Invite AI is designed to help your team stay aligned on what clients asked for and what was agreed. It can support you in keeping information organised, highlighting what matters, and making it easier for anyone on the team to pick up a conversation without starting from scratch. During our collaboration, we’ll define the exact touchpoints where AI should step in to support your workflow.",
    },
    {
      image: trackgrowimg,
      heading: "Keep every event on track and expectations aligned",
      description: "Invite AI can learn your event terms, policies and usual timelines, then act as a living reference for each project. It’s there to support you in clarifying what’s included, surfacing important conditions and keeping key steps visible—so expectations stay aligned and you reduce last-minute surprises. Together with you, we’ll shape how this looks in practice for your specific business.",
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
              alt={`Tab ${activeTab + 1} event`}
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
