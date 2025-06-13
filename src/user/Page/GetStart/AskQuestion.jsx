import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateData } from "../Redux/formSlice.js";
import eventOptions from '../../../eventOptions';
import ImageAsk from "./ImageAsk";
import NextPreBtn from "./NextPreBtn";
import ProgressBar from "./ProgressBar";
import LocationSearch from "../Google/LocationSearch";
import UserLayout from "../../Layout/UserLayout";
import step1banner from "../../../assets/step1banner.jpg";
import step2banner from "../../../assets/step2banner.jpg";
import step3banner from "../../../assets/step3banner.jpg";
import step4banner from "../../../assets/step4banner.jpg";
import step5banner from "../../../assets/step5banner.jpg";
import step6banner from "../../../assets/step6banner.jpg";
import step7banner from "../../../assets/step7banner.png";
import step8banner from "../../../assets/step8banner.png";
import step9banner from "../../../assets/step9banner.png";
import step10banner from "../../../assets/step10banner.jpg";

export default function AskQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("Private Event");
  const [formData, setFormData] = useState({
    event_type: "",
    people: "1",
    day: "",
    month: "",
    year: "",
    time: "",
    area: "",
    food_eat: [],
    activity: [],
    place: "",
    budget: "",
    details: "",
    Privatize_place: "",
    Privatize_activity: "",
  });

  const privateEvents = [
    { name: "Birthday", emoji: "🎉" },
    { name: "Graduation Party", emoji: "🎓" },
    { name: "Private Dinner", emoji: "🍽️" },
    { name: "Bachelorette/Bachelor Party", emoji: "💃🕺" },
    { name: "Kids Event", emoji: "🧸" },
    { name: "Baby Shower", emoji: "👶" },
    { name: "Holiday Party (Halloween, Christmas, New Year)", emoji: "🎄🎃🎆" },
    { name: "Anniversary Celebration", emoji: "💍" },
    { name: "Wedding", emoji: "👰" },
    { name: "Other", emoji: "❓" }
  ];

  const professionalEvents = [
    { name: "Corporate Dinner", emoji: "🍴" },
    { name: "Afterwork", emoji: "🍻" },
    { name: "Team-Building Event", emoji: "🤝" },
    { name: "Exhibition", emoji: "🖼️" },
    { name: "Corporate Retreat", emoji: "🏞️" },
    { name: "Conference", emoji: "📚" },
    { name: "Corporate Sports Event", emoji: "🏅" },
    { name: "Product Launch", emoji: "🚀" },
    { name: "Networking Event", emoji: "🤝" },
    { name: "Other", emoji: "❓" }
  ];

  const timeOptions = [
    { label: "🌅 Morning", value: "Morning" },
    { label: "🕛 Noon", value: "Noon" },
    { label: "🌇 Afternoon", value: "Afternoon" },
    { label: "🌃 Evening", value: "Evening" },
    { label: "📅 Full day", value: "Full day" }
  ];

  // Get event options based on selected event type
  const getEventOptions = (eventType) => {
    if (!eventType) return {
      foodOptions: [],
      venueOptions: [],
      activityOptions: []
    };
    
    // Clean the event type name to match the eventOptions structure
    const cleanEventType = eventType.replace(/\s+/g, '_').replace(/[()]/g, '').replace(/,/g, '').replace(/__+/g, '_');
    
    // Try different variations of the event type name
    const variations = [
      eventType,
      cleanEventType,
      eventType.replace(/\s+/g, '_'),
      eventType.replace(/\s+/g, ' ')
    ];
    
    for (const variation of variations) {
      if (eventOptions.eventOptions[variation]) {
        return eventOptions.eventOptions[variation];
      }
    }
    
    // If no specific options found, return a comprehensive default set
    return {
      foodOptions: [
        "🍽️ Buffet",
        "🍔 Fast Food", 
        "🥞 Brunch",
        "🍜 Asian",
        "🥙 Middle Eastern",
        "🍝 Italian",
        "🍷 Gourmet Cuisine",
        "Ξ Greek",
        "🥖 French/Bistrot",
        "🌮 Mexican",
        "👨‍🍳 Private Chef Experience",
        "🥩 Steakhouse & Barbecue",
        "🍹 Drinks Only",
        "🍰 Dessert Only",
        "🚚 Food Truck",
        "❓ Other"
      ],
      venueOptions: [
        "🌃 Rooftop",
        "🍽️ Restaurant", 
        "🏞️ Outdoor Places",
        "🏟️ Sports Center",
        "🎶 Night Club",
        "🏠 Mansion",
        "⛴️ Boat",
        "🎥 Cinema",
        "🍺 Bar / Pub",
        "♣🎧 Country Club",
        "💆 Spa / Wellness Center",
        "🏢 Reception Hall",
        "🏨 Hotel Ballroom",
        "🏞️ Amusement Park",
        "🏢 Conference Center",
        "🏠 The event will take place at home",
        "❓ Other"
      ],
      activityOptions: [
        "🎧 DJ",
        "🎶 Live Music",
        "📸 Photo Booth",
        "🕹️ Arcade Game",
        "🎤 Karaoke",
        "❓ Quiz Room",
        "🍳 Cooking Class",
        "🏺 Pottery Workshop",
        "🎲 Party Game",
        "🔐 Escape Game",
        "🎨 Painting Workshop",
        "🎳 Bowling",
        "🏎️ Karting",
        "⛳ Mini Golf",
        "📸 Photoshoot",
        "🚀 Laser Game",
        "❓ Other"
      ]
    };
  };

  const currentEventOptions = getEventOptions(formData.event_type);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePeopleChange = (increment) => {
    setFormData((prev) => {
      const currentValue = parseInt(prev.people) || 0;
      const newValue = Math.max(1, currentValue + increment);
      return {
        ...prev,
        people: newValue.toString()
      };
    });
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const currentValues = prev[name] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [name]: newValues,
      };
    });
  };

  const handleNext = () => {
    if (step === 1 && !formData.event_type) {
      alert("Please select an event type");
      return;
    }
    if (step === 2 && !formData.people) {
      alert("Please enter the number of people");
      return;
    }
    if (step === 3 && (!formData.day || !formData.month || !formData.year || !formData.time)) {
      alert("Please select both date and time");
      return;
    }
    if (step === 4 && !formData.area) {
      alert("Please enter an area");
      return;
    }
    if (step === 5 && formData.food_eat.length === 0) {
      alert("Please select at least one food option");
      return;
    }
    if (step === 6 && formData.activity.length === 0) {
      alert("Please select at least one activity");
      return;
    }
    if (step === 7 && !formData.place) {
      alert("Please select a place");
      return;
    }
    if (step === 8 && !formData.budget) {
      alert("Please select a budget");
      return;
    }

    if (step === 9) {
      dispatch(updateData(formData));
      navigate("/event-show");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step === 1) {
      navigate("/");
      return;
    }
    setStep((prev) => prev - 1);
  };

  const progressWidth = (step / 9) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                What event do you want to celebrate?
              </h2>
              <div className="mb-4">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setActiveTab("Private Event")}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === "Private Event"
                        ? "text-[#ff0062] border-b-2 border-[#ff0062]"
                        : "text-white"
                    }`}
                  >
                    🎉 Private Event
                  </button>
                  <button
                    onClick={() => setActiveTab("Professional Event")}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === "Professional Event"
                        ? "text-[#ff0062] border-b-2 border-[#ff0062]"
                        : "text-white"
                    }`}
                  >
                    💼 Professional Event
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto">
                  {(activeTab === "Private Event" ? privateEvents : professionalEvents).map((event) => (
                    <button
                      key={event.name}
                      onClick={() => setFormData({ ...formData, event_type: event.name })}
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border border-[#FFFFFF] whitespace-nowrap ${
                        formData.event_type === event.name
                          ? "bg-white text-black"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {event.name} {event.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step1banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                How many people do you want to invite?
              </h2>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handlePeopleChange(-1)}
                  className="w-10 h-10 bg-[#1B1B1B] text-white text-xl rounded-lg border border-[#ffffff14]"
                >
                  -
                </button>
                <span className="text-white text-xl min-w-[80px] text-center">
                  {formData.people}
                </span>
                <button
                  onClick={() => handlePeopleChange(1)}
                  className="w-10 h-10 bg-[#1B1B1B] text-white text-xl rounded-lg border border-[#ffffff14]"
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step2banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                When will it take place?
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col">
                    <label className="text-[#ffffff80] mb-1 text-sm">Month</label>
                    <input
                      type="text"
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      placeholder="MM"
                      className="w-14 px-2 py-2 bg-[#1B1B1B] text-white border border-[#ffffff14] rounded-lg text-center text-lg"
                      maxLength="2"
                    />
                  </div>
                  <span className="text-white text-lg mt-6">/</span>
                  <div className="flex flex-col">
                    <label className="text-[#ffffff80] mb-1 text-sm">Day</label>
                    <input
                      type="text"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      placeholder="DD"
                      className="w-14 px-2 py-2 bg-[#1B1B1B] text-white border border-[#ffffff14] rounded-lg text-center text-lg"
                      maxLength="2"
                    />
                  </div>
                  <span className="text-white text-lg mt-6">/</span>
                  <div className="flex flex-col">
                    <label className="text-[#ffffff80] mb-1 text-sm">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="YYYY"
                      className="w-16 px-2 py-2 bg-[#1B1B1B] text-white border border-[#ffffff14] rounded-lg text-center text-lg"
                      maxLength="4"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, time: option.value })}
                      className={`px-3 py-2 rounded-full text-sm border border-[#FFFFFF] whitespace-nowrap ${
                        formData.time === option.value
                          ? "bg-white text-black"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step3banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                Where would you like to organize your event?
              </h2>
              <LocationSearch 
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step4banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                What type of food will you eat?
              </h2>
              <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto">
                {currentEventOptions.foodOptions && currentEventOptions.foodOptions.length > 0 ? (
                  currentEventOptions.foodOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect("food_eat", option)}
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border border-[#FFFFFF] whitespace-nowrap ${
                        formData.food_eat?.includes(option)
                          ? "bg-white text-black"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p className="text-white text-center">Loading food options...</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step5banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                What fun experience would you like to add?
              </h2>
              <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto">
                {currentEventOptions.activityOptions && currentEventOptions.activityOptions.length > 0 ? (
                  currentEventOptions.activityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect("activity", option)}
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border border-[#FFFFFF] whitespace-nowrap ${
                        formData.activity?.includes(option)
                          ? "bg-white text-black"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p className="text-white text-center">Loading activity options...</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step6banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                What place do you want to get?
              </h2>
              <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto">
                {currentEventOptions.venueOptions && currentEventOptions.venueOptions.length > 0 ? (
                  currentEventOptions.venueOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({ ...formData, place: option })}
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border border-[#FFFFFF] whitespace-nowrap ${
                        formData.place === option
                          ? "bg-white text-black"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p className="text-white text-center">Loading venue options...</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step7banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                What's your budget range?
              </h2>
              <div className="flex flex-wrap gap-2">
                {["1", "2", "3", "4"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, budget: option })}
                    className={`inline-flex items-center px-3 py-2 rounded-full text-sm transition-colors border border-[#FFFFFF] whitespace-nowrap ${
                      formData.budget === option
                        ? "bg-white text-black"
                        : "bg-[#000000] text-white hover:bg-[#2a2a2a]"
                    }`}
                  >
                    {option === "1" && "💰 Budget-friendly places"}
                    {option === "2" && "💸 Mid-range places with good value"}
                    {option === "3" && "💸💸 Higher-end places"}
                    {option === "4" && "🤑🤑 Luxury and premium options"}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step8banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[30px]">
            <div className="w-full lg:w-[50%] order-2 lg:order-1">
              <h2 className="text-[18px] md:text-[22px] lg:text-[24px] font-[600] text-white mb-[12px]">
                Any additional details you'd like to share?
              </h2>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Enter additional details"
                className="w-full h-[100px] px-[12px] py-[10px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
              />
            </div>
            <div className="w-full lg:w-[50%] order-1 lg:order-2">
              <img
                src={step9banner}
                alt="banner"
                className="rounded-[12px] w-full h-[200px] md:h-[250px] lg:h-[350px] object-cover"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#000] min-h-screen">
      <UserLayout>
        <div className="w-full max-w-[1100px] m-auto pt-[20px] md:pt-[30px] px-[15px]">
          <ProgressBar progressWidth={progressWidth} />
          <div className="mt-[20px] min-h-[300px] flex items-center justify-center">
            <div className="w-full">
              {renderStep()}
            </div>
          </div>
          <div className="mt-[20px] pb-[20px]">
            <NextPreBtn onPrev={handlePrev} onNext={handleNext} currentStep={step} />
          </div>
        </div>
      </UserLayout>
    </div>
  );
}