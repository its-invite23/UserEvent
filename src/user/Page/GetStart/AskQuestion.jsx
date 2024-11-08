import React, { useState } from "react";
import UserLayout from "../../Layout/AuthLayout";
import NextPreBtn from "../GetStart/NextPreBtn";
import eventsData from "../../../JSon/Event.json";
import PlaceData from "../../../JSon/Place.json";
import Activty from "../../../JSon/activity.json";
import FoodData from "../../../JSon/Food.json";
import locationData from "../../../JSon/location.json";
import Price from "../../../JSon/Price.json";
import { FaArrowRight } from "react-icons/fa6";
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
import { Link } from "react-router-dom";
import Servicesrecap from "../services/Servicesrecap";
function AskQuestion() {
  const [Loading, setloading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11;
  const events = eventsData.events;
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleGetStarted = () => {
    setCurrentStep(2);
  };

  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const [activeTab, setActiveTab] = useState("private");
  console.log(activeTab);

  const [privatize, setPrivatize] = useState(null);

  const handleOptionChange = (option) => {
    setPrivatize(option);
  };
  const [selectedActivity, setSelectedActivity] = useState("");
  const [fileInputVisible, setFileInputVisible] = useState(false);

  const handleActivityClick = (item) => {
    setSelectedActivity(item);
    if (item === "Other") {
      setFileInputVisible(true);
    } else {
      setFileInputVisible(false);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    number: "",
    event_type: "",
    event_name: "",
    people: "",
    date: "",
    time: "",
    area: "",
    food_eat: "",
    activity: "",
    Privatize_place: "",
    Privatize_activity: "",
    place: "",
    budget: "",
    details: "",
    month: "",
    day: "",
    year: "",
    fromHour: "",
    fromMinute: "",
    fromAMPM: "AM",
    toHour: "",
    toMinute: "",
    toAMPM: "AM",
  });
  console.log("formData", formData);

  const handleButtonChange = (name, value) => {
    if (value === "Other") {
      setFileInputVisible(true);
      value = "";
    } else {
      setFileInputVisible(false);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <div className="relative bg-[#000000]">
        <UserLayout>
          <div className="absolute top-[0] left-[0] right-[0] top-[-230px] sm:top-[-200px] md:top-[-150px] lg:top-[0px] z-[0] m-auto flex items-center justify-center">
            <svg
              width="1440"
              height="840"
              viewBox="0 0 1440 840"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_34_53)">
                <ellipse
                  cx="678.515"
                  cy="487.095"
                  rx="253.309"
                  ry="485.239"
                  transform="rotate(-73.8676 678.515 487.095)"
                  fill="#EB3465"
                />
              </g>
              <g filter="url(#filter1_f_34_53)">
                <ellipse
                  cx="925.069"
                  cy="400.495"
                  rx="215.705"
                  ry="312.45"
                  transform="rotate(65.6053 925.069 400.495)"
                  fill="#731BCD"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_34_53"
                  x="-26.965"
                  y="-25.146"
                  width="1410.96"
                  height="1024.48"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="117"
                    result="effect1_foregroundBlur_34_53"
                  />
                </filter>
                <filter
                  id="filter1_f_34_53"
                  x="392.813"
                  y="-68.5735"
                  width="1064.51"
                  height="938.138"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="117"
                    result="effect1_foregroundBlur_34_53"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          {/* Main Div */}
          <div className="relative w-[96%] max-w-[1170px] h-[100%] lg:h-[660px] m-auto mt-[30px] md:mt-[50px] lg:mt-[105px] bg-[#141414]">
            {/* Progress Bar */}
            <div className="relative w-full h-[10px] rounded-[30px] bg-[#222]">
              <div
                className="absolute top-[0] left-[0] h-[10px] bg-[#EB3465] rounded-[30px]"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
            {/* Start */}
            <div className="h-full pb-[20px] pl-[15px] lg:pl-[50px] pr-[15px] ">
              {/* Step-1 */}
              {currentStep === 1 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2
                      className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px]
                                        leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left"
                    >
                      Please enter your <br /> contact details
                    </h2>
                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                      <input
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        id="email"
                        placeholder="name@example.com"
                        className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] hover:outline-none focus:outline-none"
                      />
                    </div>
                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                      <input
                        type="tel"
                        name="number"
                        value={formData?.number}
                        onChange={handleInputChange}
                        id="number"
                        placeholder="+1 - 456 654 XXXX"
                        className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] hover:outline-none focus:outline-none"
                      />
                    </div>

                    <div className="mt-[30px]">
                      <button
                        onClick={handleGetStarted}
                        className="flex items-center justify-center gap-[8px] w-[100%] min-w-[195px] px-[10px] py-[14px] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[16px] text-white text-center"
                      >
                        Get Started <FaArrowRight />
                      </button>
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step1banner}
                      alt="banner"
                      className="rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      What event do you <br /> want to celebrate?
                    </h2>

                    <div className="w-full flex flex-wrap md:flex-nowrap gap-[10px] mb-6 border-b border-b-[#ffffff3d]">
                      <button
                        className={`w-full md:w-[initial] flex items-center p-2 mb-[-1px] text-lg font-semibold border-b-2 ${activeTab === "private"
                          ? "border-[#EB3465] text-[#EB3465]"
                          : "border-transparent text-[#ffffff]"
                          }`}
                        onClick={() => setActiveTab("private")}
                      >
                        🍾 Private Event
                      </button>
                      <button
                        className={`w-full md:w-[initial] flex p-2 text-lg font-semibold border-b-2 ${activeTab === "professional"
                          ? "border-[#EB3465] text-[#EB3465]"
                          : "border-transparent text-[#ffffff]"
                          }`}
                        onClick={() => setActiveTab("professional")}
                      >
                        🥂 Professional Event
                      </button>
                    </div>

                    {activeTab === "private" && (
                      <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-[5px] md:gap-[10px] lg-[15px]">
                        {events.privateEvents.map((event, index) => (
                          <button
                            key={index}
                            name="event_type"
                            value={event}
                            className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${formData.event_type === event
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                              }`}
                            onClick={() =>
                              handleButtonChange("event_type", event)
                            }
                          >
                            {event}
                          </button>
                        ))}
                      </div>
                    )}

                    {activeTab === "professional" && (
                      <div className="w-full flex flex-wrap items-center justify-center lg:justify-start  gap-[5px] md:gap-[10px] lg-[15px]">
                        {events.professionalEvents.map((event, index) => (
                          <button
                            key={index}
                            name="event_type"
                            value={event}
                            className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${formData.event_type === event
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                              }`}
                            onClick={() =>
                              handleButtonChange("event_type", event)
                            }
                          >
                            {event}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px] sm:min-w-[300px] md:min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step2banner}
                      alt="banner"
                      className="rounded-[20px] w-full max-w-full"
                    />
                  </div>
                </div>
              )}

              {/* Step-3 */}
              {currentStep === 3 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      How many people do <br /> you want to invite?
                    </h2>
                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                      <input
                        type="number"
                        name="people"
                        value={formData?.people}
                        onChange={handleInputChange}
                        id="people"
                        placeholder="Type your answer..."
                        className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
                      />
                    </div>
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step3banner}
                      alt="banner"
                      className="rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      When will it take <br /> place?
                    </h2>

                    <div className="">
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-[10px] text-white">
                        <div className="w-full sm:w-[32%] md-w-[initial]">
                          <label className="block mb-[3px]">Month</label>
                          <div className="flex items-center justify-center gap-[15px]">
                            <input
                              type="text"
                              name="month"
                              placeholder="MM"
                              maxLength="2"
                              value={formData.month}
                              onChange={handleInputChange}
                              className="w-[70px] p-[0] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <span className="hidden sm:inline-flex">/</span>
                          </div>
                        </div>

                        <div className="w-full sm:w-[32%] md-w-[initial]">
                          <label className="block">Day</label>
                          <div className="flex items-center justify-center gap-[15px]">
                            <input
                              type="text"
                              name="day"
                              placeholder="DD"
                              maxLength="2"
                              value={formData.day}
                              onChange={handleInputChange}
                              className="w-[70px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <span className="hidden sm:inline-flex">/</span>
                          </div>
                        </div>

                        <div className="w-full sm:w-[32%] md-w-[initial]">
                          <label className="block">Year</label>
                          <div className="flex items-center justify-center gap-[15px]">
                            <input
                              type="text"
                              name="year"
                              placeholder="YYYY"
                              maxLength="4"
                              value={formData.year}
                              onChange={handleInputChange}
                              className="w-[120px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap md:flex-nowrap gap-[10px] mt-[30px]">
                        <div className="w-[100%] sm:w-[48%] md:w-full">
                          <label className="text-white">From</label>
                          <div className="flex items-center gap-[15px] ">
                            <input
                              type="text"
                              name="fromHour"
                              placeholder="00"
                              value={formData.fromHour}
                              onChange={handleInputChange}
                              className="w-[45px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <span className="text-white">:</span>
                            <input
                              type="text"
                              name="fromMinute"
                              placeholder="00"
                              value={formData.fromMinute}
                              onChange={handleInputChange}
                              className="w-[45px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <select
                              name="fromAMPM"
                              value={formData.fromAMPM}
                              onChange={handleInputChange}
                              className="w-[70px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0]  font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </div>

                        <div className="w-[100%] sm:w-[48%] md:w-full">
                          <label className="text-white">To</label>
                          <div className="flex items-center gap-[15px]">
                            <input
                              type="text"
                              name="toHour"
                              placeholder="00"
                              value={formData.toHour}
                              onChange={handleInputChange}
                              className="w-[45px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <span className="text-white">:</span>
                            <input
                              type="text"
                              name="toMinute"
                              placeholder="00"
                              value={formData.toMinute}
                              onChange={handleInputChange}
                              className="w-[45px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0] w-full font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            />
                            <select
                              name="toAMPM"
                              value={formData.toAMPM}
                              onChange={handleInputChange}
                              className="w-[70px] border-b border-b-[#ffffff63] hover:outline-none focus:outline-none bg-[transparent] p-[0]  font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step4banner}
                      alt="banner"
                      className="rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className=" h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      In which area will it <br /> take place?
                    </h2>

                    {/* <div className="w-full flex flex-wrap items-center justify-center lg:justify-start  gap-[5px] md:gap-[10px] lg-[15px]">
                                                {locationData?.locations.map((event, index) => (
                                                    <button className="px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">{event}</button>
                                                ))}
                                            </div> */}

                    <div className="w-full flex flex-wrap justify-center lg:justify-start items-center gap-[10px] mb-[15px]">
                      {locationData?.locations.map((location, index) => (
                        <button
                          key={index}
                          name="event_type"
                          value={location.value}
                          onClick={() =>
                            handleButtonChange("area", location?.value)
                          }
                          // onClick={() => handleActivityClick(location.value)}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414]
                            ${formData.area === location.value
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                            }
                            `}
                        >
                          {location.label}
                        </button>
                      ))}

                      {fileInputVisible ? (
                        <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                          <input
                            type="text"
                            name="area"
                            value={formData?.area}
                            onChange={handleInputChange}
                            id="area"
                            placeholder="Type your answer..."
                            className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none hover:outline-none"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step5banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="lg:pr-[150px] font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[30px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[35px] xl:leading-[52px] mb-[20px]  lg:mb-[20px] xl:mb-[30px] text-white  text-center lg:text-left">
                      What type of food will you eat?{" "}
                    </h2>

                    <div className="w-full flex justify-center lg:justify-start flex-wrap items-center gap-[10px] mb-[15px]">
                      {FoodData?.foodOptions?.map((item, index) => (
                        <button
                          key={index}
                          name="food_eat"
                          value={item}
                          onClick={() => handleButtonChange("food_eat", item)}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] lg:px-[10px] lg:py-[6px] xl:px-[20px] xl:py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[13px] lg:text-[14px] xl:text-[14px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414]
                            ${formData.food_eat === item
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                            }
                            `}
                        >
                          {item}
                        </button>
                      ))}

                      {fileInputVisible && (
                        <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                          <input
                            name="food_eat"
                            value={formData?.food_eat}
                            onChange={handleInputChange}
                            id="food_eat"
                            placeholder="Type your answer..."
                            className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step6banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[30px] xl:text-[45px] leading-[30px] md:leading-[40px] lg:leading-[36px] xl:leading-[48px] mb-[22px] lg:mb-[24px] xl:mb-[26px] text-white  text-center lg:text-left">
                      What activity do you want
                    </h2>

                    <div className="w-full flex justify-center lg:justify-start flex-wrap items-center gap-[6px] mb-[15px]">
                      {Activty?.activities?.map((item, index) => (
                        <button
                          key={index}
                          name="activity"
                          value={item}
                          onClick={() => handleButtonChange("activity", item)}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414]
                            ${formData.activity === item
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                            }
                            `}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    {fileInputVisible && (
                      <div className="mb-[5px] w-full max-w-[390px] mb-[10px]">
                        <input
                          name="activity"
                          value={formData?.activity}
                          onChange={handleInputChange}
                          id="activity"
                          type="text"
                          placeholder="please make a suggestion."
                          className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="font-[manrope] font-[600] text-[15px] md:text-[20px] lg:text-[28px] mb-[22px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">
                        Do you want to privatize the place?
                      </h3>
                      <div className="flex justify-center lg:justify-start gap-4">
                        <button
                          name="Privatize_activity"
                          value="Privatize_activity"
                          onClick={() =>
                            handleButtonChange("Privatize_activity", "Yes")
                          }
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${formData?.Privatize_activity === "Yes"
                            ? "bg-[#fff] text-black font-[600] text-[15px]"
                            : "bg-[transparent] text-white border border-[#fff] rounded-[60px]"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          name="Privatize_activity"
                          value="Privatize_activity"
                          onClick={() =>
                            handleButtonChange("Privatize_activity", "No")
                          }
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${formData?.Privatize_activity === "No"
                            ? "bg-[#fff] text-black font-[600] text-[15px]"
                            : "bg-[transparent] text-white border border-[#fff] rounded-[60px]"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step7banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[15px] lg:pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto ">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[28px] xl:text-[42px] leading-[30px] md:leading-[40px] lg:leading-[28px] xl:leading-[48px] mb-[15px] lg:mb-[15px] text-white  text-center lg:text-left">
                      What place do you want to get?
                    </h2>

                    <div className="w-full flex   justify-center lg:justify-start flex-wrap items-center gap-[8px] mb-[10px]">
                      {PlaceData &&
                        PlaceData?.venues?.map((item, index) => (
                          <button
                            key={index}
                            name="place"
                            value={item.name}
                            onClick={() =>
                              handleButtonChange("place", item.name)
                            }
                            className={`px-[15px] py-[7px] md:px-[15px] md:py-[8px] lg:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414]
                               ${formData.place === item?.name
                                ? "bg-[#ffffff] text-[#141414]"
                                : ""
                              }
                              `}
                          >
                            {item?.icon}
                            {item.name}
                          </button>
                        ))}
                    </div>
                    {fileInputVisible && (
                      <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                        <input
                          type="text"
                          name="place"
                          value={formData?.place}
                          onChange={handleInputChange}
                          id="place"
                          placeholder="Type your answer..."
                          className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="font-[manrope] font-[600] text-[15px] md:text-[20px] lg:text-[28px] mb-[22px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">
                        Do you want to privatize the place?
                      </h3>
                      <div className="flex justify-center lg:justify-start gap-4">
                        <button
                          name="Privatize_place"
                          value="Privatize_place"
                          onClick={() =>
                            handleButtonChange("Privatize_place", "Yes")
                          }
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${formData?.Privatize_place === "Yes"
                            ? "bg-[#fff] text-black font-[600] text-[15px]"
                            : "bg-[transparent] text-white border border-[#fff] rounded-[60px]"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          name="Privatize_place"
                          value="Privatize_place"
                          onClick={() =>
                            handleButtonChange("Privatize_place", "No")
                          }
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${formData?.Privatize_place === "No"
                            ? "bg-[#fff] text-black font-[600] text-[15px]"
                            : "bg-[transparent] text-white border border-[#fff] rounded-[60px]"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="mt-[20px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step8banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 9 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      What is your budget range?
                    </h2>

                    <div className="w-full justify-center lg:justify-start flex flex-wrap items-center gap-[10px] mb-[15px]">
                      {Price?.priceRanges &&
                        Price?.priceRanges?.map((item, index) => (
                          <button
                            key={index}
                            className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] bg-black text-white hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${formData.budget === item?.range
                              ? "bg-[#ffffff] text-[#141414]"
                              : ""
                              }`}
                            onClick={() =>
                              handleButtonChange("budget", item?.range)
                            }
                          >
                            {item?.icon} {item?.range}
                          </button>
                        ))}
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step9banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 10 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[20px] md:mb-[30px] text-white  text-center lg:text-left">
                      Any detail you want to add?
                    </h2>
                    <div className="mb-[5px] w-full max-w-[390px] mb-[30px]">
                      <input
                        name="details"
                        id="details"
                        type="text"
                        value={formData?.details}
                        onChange={handleInputChange}
                        placeholder="Type your answer..."
                        className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] hover:outline-none focus:outline-none"
                      />
                    </div>

                    <div className="mt-[30px] flex items-center gap-4">
                      <NextPreBtn
                        currentStep={10}
                        onPrev={handleBack}
                        onNext={handleNext}
                      />
                      <Link
                        to="/event-show"
                        className="flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
                      >
                        🙌 Get started <FaArrowRight />
                      </Link>
                    </div>
                  </div>

                  <div className="min-w-[280px]  sm:min-w-[300px] md:min-w-[400px] lg:min-w-[440px]  pt-[10px] mt-[15px] lg:mt-[0]">
                    <img
                      src={step10banner}
                      alt="banner"
                      className="h-auto rounded-[20px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {currentStep === 11 && (
<Servicesrecap formData={formData}/>
          )}
        </UserLayout>
      </div>
    </>
  );
}

export default AskQuestion;
