import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateData } from "../Redux/formSlice.js";
import eventOptions from '../../../eventOptions';
import ImageAsk from "./ImageAsk";
import NextPreBtn from "./NextPreBtn";
import ProgressBar from "./ProgressBar";
import LocationSearch from "../Google/LocationSearch";
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
    people: "",
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

  // Get available options based on selected event type
  const getEventOptions = (eventType) => {
    if (!eventType) return {
      foodOptions: [],
      venueOptions: [],
      activityOptions: []
    };

    return eventOptions.eventOptions[eventType] || {
      foodOptions: [],
      venueOptions: [],
      activityOptions: []
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
    if (step === 3 && (!formData.day || !formData.month || !formData.year)) {
      alert("Please select a date");
      return;
    }
    if (step === 4 && !formData.time) {
      alert("Please select a time");
      return;
    }
    if (step === 5 && !formData.area) {
      alert("Please enter an area");
      return;
    }
    if (step === 6 && formData.food_eat.length === 0) {
      alert("Please select at least one food option");
      return;
    }
    if (step === 7 && formData.activity.length === 0) {
      alert("Please select at least one activity");
      return;
    }
    if (step === 8 && !formData.place) {
      alert("Please select a place");
      return;
    }
    if (step === 9 && !formData.budget) {
      alert("Please select a budget");
      return;
    }

    if (step === 10) {
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

  const progressWidth = (step / 10) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[32px] font-[600] text-white mb-[20px]">
                What event do you want to celebrate?
              </h2>
              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab("Private Event")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "Private Event"
                        ? "text-[#ff0062] border-b-2 border-[#ff0062]"
                        : "text-white"
                    }`}
                  >
                    🎉 Private Event
                  </button>
                  <button
                    onClick={() => setActiveTab("Professional Event")}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "Professional Event"
                        ? "text-[#ff0062] border-b-2 border-[#ff0062]"
                        : "text-white"
                    }`}
                  >
                    💼 Professional Event
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(activeTab === "Private Event" ? privateEvents : professionalEvents).map((event) => (
                    <button
                      key={event.name}
                      onClick={() => setFormData({ ...formData, event_type: event.name })}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm transition-colors border whitespace-nowrap ${
                        formData.event_type === event.name
                          ? "bg-white text-black border-[#FFFFFF]"
                          : "bg-[#000000] text-white hover:bg-[#2a2a2a] border-[#FFFFFF]"
                      }`}
                    >
                      {event.name} {event.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ImageAsk step={step1banner} />
          </div>
        );

      case 2:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                How many people are you expecting?
              </h2>
              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                placeholder="Enter number of people"
                className="w-full px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
              />
            </div>
            <ImageAsk step={step2banner} />
          </div>
        );

      case 3:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                When is your event?
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  placeholder="Day"
                  min="1"
                  max="31"
                  className="w-full px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
                />
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  placeholder="Month"
                  min="1"
                  max="12"
                  className="w-full px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
                />
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Year"
                  min="2024"
                  className="w-full px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
                />
              </div>
            </div>
            <ImageAsk step={step3banner} />
          </div>
        );

      case 4:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                What time would you like your event to start?
              </h2>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
              >
                <option value="">Select time</option>
                <option value="Morning">Morning</option>
                <option value="Noon">Noon</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Full day">Full day</option>
              </select>
            </div>
            <ImageAsk step={step4banner} />
          </div>
        );

      case 5:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                Where would you like to organize your event?
              </h2>
              <LocationSearch 
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
              />
            </div>
            <ImageAsk step={step5banner} />
          </div>
        );

      case 6:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                What type of food will you eat?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] md:gap-[15px]">
                {currentEventOptions.foodOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect("food_eat", option)}
                    className={`w-full px-[15px] py-[12px] rounded-[5px] text-left text-[14px] md:text-[16px] ${
                      formData.food_eat?.includes(option)
                        ? "bg-white text-black"
                        : "bg-[#1B1B1B] text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <ImageAsk step={step6banner} />
          </div>
        );

      case 7:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                What fun experience would you like to add?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] md:gap-[15px]">
                {currentEventOptions.activityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect("activity", option)}
                    className={`w-full px-[15px] py-[12px] rounded-[5px] text-left text-[14px] md:text-[16px] ${
                      formData.activity?.includes(option)
                        ? "bg-white text-black"
                        : "bg-[#1B1B1B] text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <ImageAsk step={step7banner} />
          </div>
        );

      case 8:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                What place do you want to get?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] md:gap-[15px]">
                {currentEventOptions.venueOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, place: option })}
                    className={`w-full px-[15px] py-[12px] rounded-[5px] text-left text-[14px] md:text-[16px] ${
                      formData.place === option
                        ? "bg-white text-black"
                        : "bg-[#1B1B1B] text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <ImageAsk step={step8banner} />
          </div>
        );

      case 9:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                What's your budget range?
              </h2>
              <div className="grid grid-cols-1 gap-[10px] md:gap-[15px]">
                {["1", "2", "3", "4"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, budget: option })}
                    className={`w-full px-[15px] py-[12px] rounded-[5px] text-left text-[14px] md:text-[16px] ${
                      formData.budget === option
                        ? "bg-white text-black"
                        : "bg-[#1B1B1B] text-white"
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
            <ImageAsk step={step9banner} />
          </div>
        );

      case 10:
        return (
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[20px] leading-[22px] md:text-[25px] md:leading-[28px] lg:text-[32px] lg:leading-[35px] font-[600] text-white mb-[20px]">
                Any additional details you'd like to share?
              </h2>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Enter additional details"
                className="w-full h-[150px] px-[15px] py-[12px] rounded-[5px] bg-[#1B1B1B] text-white border border-[#ffffff14]"
              />
            </div>
            <ImageAsk step={step10banner} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#000] min-h-screen p-[15px]">
      <div className="w-full max-w-[1230px] m-auto pt-[50px] md:pt-[100px]">
        <ProgressBar progressWidth={progressWidth} />
        <div className="mt-[50px]">{renderStep()}</div>
        <div className="mt-[30px]">
          <NextPreBtn onPrev={handlePrev} onNext={handleNext} currentStep={step} />
        </div>
      </div>
    </div>
  );
}