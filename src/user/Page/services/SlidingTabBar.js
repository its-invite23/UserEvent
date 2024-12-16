import React, { useRef, useState, useEffect } from "react";

const tabs = ["Venue", "Catering", "Activity", "Other"];

export const SlidingTabBar = () => {
  const tabsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("Venue");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft || 0);
      setTabUnderlineWidth(currentTab?.clientWidth || 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div className="flex-row w-[96%] mb-[40px] max-w-[520px] relative mx-auto flex h-[44px] md:h-[62px] lg:h-[63px] border border-black/40 bg-neutral-800 px-1 backdrop-blur-sm rounded-[60px]">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-[60px] py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-[#4400c3] border-[#4400c3]" />
      </span>
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${isActive ? "text-[#ffff]" : "text-[#ffffff8f] hover:text-white"
              } flex-1 capitalize px-[5px] sm:px-[12px] md:px-[15px] text-[14px] md:text-[15px] lg:text-lg font-semibold rounded-[60px]`}
            onClick={() => {
              setActiveTabIndex(index);
              setActiveTab(tab);
            }
            }
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
