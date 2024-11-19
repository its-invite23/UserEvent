import React, { useState } from "react";
import UserLayout from "../../Layout/AuthLayout";
import AllJson from "../../../JSon/All.json";
import NextPreBtn from "../GetStart/NextPreBtn";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
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
import { updateData } from "../Redux/formSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LocationSearch from "../Google/LocationSearch";
import MapComponent from "../Google/MapComponent";
function AskQuestion() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    event_type: "",
    event_name: "",
    people: "",
    date: "",
    time: "",
    area: "",
    food_eat: [],
    activity: [],
    Privatize_place: "",
    Privatize_activity: "",
    place: "",
    budget: "",
    details: "",
    month: "",
    day: "",
    year: "",
    fromTime: "",
    toTime: "",
  });
  console.log("formData", formData);
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const [activeTab, setActiveTab] = useState("private");
  // const [fileInputVisible, setFileInputVisible] = useState(false);
  const [areaInputVisible, setAreaInputVisible] = useState(false);
  const [foodInputVisible, setFoodInputVisible] = useState(false);
  const [foodTextInput, setFoodTextInput] = useState("");
  const [activityInputVisible, setActivityInputVisible] = useState(false);
  const [activityTextInput, setActivityTextInput] = useState("");
  const [placeInputVisible, setplaceInputVisible] = useState(false);
  const [BudgetVisible, setBudgetVisible] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    if (currentStep === 10 && !formData?.details === "") {
      toast.error(`All fields are required.`);
      return false;
    }
    let updatedFormData = { ...formData };
    if (foodTextInput !== "") {
      updatedFormData = {
        ...updatedFormData,
        food_eat: [...updatedFormData.food_eat, foodTextInput],
      };
    }
    if (activityTextInput !== "") {
      updatedFormData = {
        ...updatedFormData,
        activity: [...updatedFormData.activity, activityTextInput],
      };
    }
    console.log("updatedFormData", updatedFormData);
    setFormData(updatedFormData);
    dispatch(updateData(updatedFormData));
    navigate("/event-show");
  };
  const handleNext = async () => {
    // if (currentStep === 2 && formData?.event_type === "") {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (currentStep === 3 && formData?.people === "") {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (currentStep === 4 && (formData?.month === "" || formData?.day === "" || formData?.year === "" || formData?.fromTime === "" || formData?.toTime === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (currentStep === 5 && (!formData?.area || formData?.area === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (currentStep === 6 && (formData?.food_eat.length === 0 && foodTextInput === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    // // Check for currentStep === 7 (activity)
    // if (currentStep === 7 && (formData?.activity.length === 0 && activityTextInput === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    // if (currentStep === 7 && (formData?.Privatize_activity === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    // // Check for currentStep === 8 (place)
    // if (currentStep === 8 && (formData?.place === "" || !formData?.Privatize_place === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    // // Check for currentStep === 9 (budget)
    // if (currentStep === 9 && (formData?.budget === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    // // Check for currentStep === 10 (details)
    // if (currentStep === 10 && (!formData?.details === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    setCurrentStep((prev) => prev + 1);
    // dispatch(updateFormData(formData));
  };

  const handleGetStarted = () => {
    setCurrentStep(2);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateClick = (day) => {
    setFormData({
      ...formData,
      month: String(currentMonth + 1).padStart(2, "0"),
      day: String(day).padStart(2, "0"),
      year: String(currentYear),
    });
    setIsDatePickerOpen(false);
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleButtonChange = (name, value) => {
    if (name === "area") {
      if (value === "Other") {
        setAreaInputVisible(true);
        value = "";
      } else {
        setAreaInputVisible(false);
      }
    } else if (name === "place") {
      if (value === "Other") {
        setplaceInputVisible(true);
        value = "";
      } else {
        setplaceInputVisible(false);
      }
    } else if (name === "budget") {
      if (value === "Other") {
        setBudgetVisible(true);
        value = "";
      } else {
        setBudgetVisible(false);
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleActivityButtonChange = (name, item) => {
    if (item === "Other") {
      setActivityInputVisible(true);
      return;
    }
    setFormData((prevData) => {
      const updatedActivit = Array.isArray(prevData?.activity)
        ? prevData.activity.includes(item)
          ? prevData.activity.filter((activity) => activity !== item)
          : [...prevData.activity, item]
        : [item];

      return { ...prevData, [name]: updatedActivit };
    });
  };
  const handleFoodButtonChange = (name, item) => {
    if (item === "Other") {
      setFoodInputVisible(true);
      return;
    }
    setFormData((prevData) => {
      const updatedFoodEat = Array.isArray(prevData?.food_eat)
        ? prevData.food_eat.includes(item)
          ? prevData.food_eat.filter((food) => food !== item)
          : [...prevData.food_eat, item]
        : [item];

      return { ...prevData, [name]: updatedFoodEat };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "foodTextInput") {
      setFoodTextInput(value);
    } else if (name === "activityTextInput") {
      setActivityTextInput(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);

    const dates = Array.from({ length: totalDays }, (_, i) => {
      return (
        <button key={i} onClick={() => handleDateClick(i + 1)} className="   ">
          {i + 1}
        </button>
      );
    });

    return (
      <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded shadow-lg">
        {dates}
      </div>
    );
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
                        className={`w-full md:w-[initial] flex items-center p-2 mb-[-1px] text-lg font-semibold border-b-2 ${
                          activeTab === "private"
                            ? "border-[#EB3465] text-[#EB3465]"
                            : "border-transparent text-[#ffffff]"
                        }`}
                        onClick={() => setActiveTab("private")}
                      >
                        🍾 Private Event
                      </button>
                      <button
                        className={`w-full md:w-[initial] flex p-2 text-lg font-semibold border-b-2 ${
                          activeTab === "professional"
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
                        {AllJson?.events.privateEvents.map((event, index) => (
                          <button
                            key={index}
                            name="event_type"
                            value={event}
                            className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px]  hover:bg-[#ffffff] text-[#ffffffab] hover:text-[#141414]  bg-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${
                              formData.event_type === event
                                ? "1bg-[#ffffff] text-![#141414]" // Reverse styles only when selected
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
                        {AllJson?.events.professionalEvents.map(
                          (event, index) => (
                            <button
                              key={index}
                              name="event_type"
                              value={event}
                              className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px]  
                                bg-[#141414] hover:bg-[#ffffff] text-[#ffffffab] hover:text-[#141414] focus:text-[#141414] focus:bg-[#ffffff] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${
                                  formData.event_type === event
                                    ? "1bg-[#ffffff] text-[#141414]"
                                    : ""
                                }`}
                              onClick={() =>
                                handleButtonChange("event_type", event)
                              }
                            >
                              {event}
                            </button>
                          )
                        )}
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

                    <div className="w-full">
                      <div className="relative">
                        {/* Date Inputs */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-[10px] text-white">
                          <div className="w-[48%] sm:w-[31%] md-w-[initial]">
                            <label className="block mb-[3px]">Month</label>
                            <div className="w-full flex items-center 1justify-center gap-[15px]">
                              <input
                                type="text"
                                name="month"
                                placeholder="MM"
                                value={formData.month}
                                readOnly
                                onClick={() => setIsDatePickerOpen(true)}
                                className=" w-[100%] lg:w-[70px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[31px] text-[#A9A4A8] text-left cursor-pointer hover:outline-none focus:outline-none"
                              />
                              <span className="hidden sm:inline-flex">/</span>
                            </div>
                          </div>

                          <div className="w-[48%] sm:w-[31%] md-w-[initial]">
                            <label className="block">Day</label>
                            <div className="w-full flex items-center 1justify-center gap-[15px]">
                              <input
                                type="text"
                                name="day"
                                placeholder="DD"
                                value={formData.day}
                                readOnly
                                onClick={() => setIsDatePickerOpen(true)}
                                className=" w-[100%] lg:w-[70px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[31px] text-[#A9A4A8] text-left cursor-pointer  hover:outline-none focus:outline-none"
                              />

                              <span className="hidden sm:inline-flex">/</span>
                            </div>
                          </div>

                          <div className="w-full sm:w-[31%] md-w-[initial]">
                            <label className="block">year</label>
                            <input
                              type="text"
                              name="year"
                              placeholder="YYYY"
                              value={formData.year}
                              readOnly
                              onClick={() => setIsDatePickerOpen(true)}
                              className=" w-[100%] lg:w-[120px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left cursor-pointer  hover:outline-none focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Custom Date Picker */}
                        {isDatePickerOpen && (
                          <div className="absolute mt-2 left-0 right-0 bg-white shadow-lg rounded-lg z-50">
                            <div className="p-4 border-b flex justify-between items-center">
                              <button
                                onClick={() => handleMonthChange(-1)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                              >
                                Prev
                              </button>
                              <h3 className="text-lg font-bold">
                                {new Date(
                                  currentYear,
                                  currentMonth
                                ).toLocaleString("default", {
                                  month: "long",
                                })}{" "}
                                {currentYear}
                              </h3>
                              <button
                                onClick={() => handleMonthChange(1)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                              >
                                Next
                              </button>
                            </div>
                            {renderCalendar()}
                            <div className="p-4 border-t flex justify-end">
                              <button
                                onClick={() => setIsDatePickerOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center flex-wrap md:flex-nowrap gap-[10px] mt-[30px]">
                        {/* From Section */}
                        <div className="w-[48%]  sm:w-[48%] md:w-full mr-5">
                          <label className="text-white mb-[5px] block">
                            From
                          </label>
                          <div className="w-full flex items-center gap-[15px]">
                            <input
                              type="time"
                              name="fromTime"
                              value={formData.fromTime}
                              onChange={handleInputChange}
                              className=" w-[100%] time-input lg:w-[195px] border-b border-b-[#ffffff63] bg-transparent p-0 1text-center font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] hover:outline-none focus:outline-none"
                            />
                          </div>
                        </div>
                        {/* To Section */}

                        <div className="w-[48%]  sm:w-[48%] md:w-full ">
                          <label className="text-white mb-[5px] block">
                            To
                          </label>
                          <div className="w-full flex items-center gap-[15px]">
                            <input
                              type="time"
                              name="toTime"
                              value={formData.toTime}
                              onChange={handleInputChange}
                              className=" w-[100%] lg:w-[195px] time-input border-b border-b-[#ffffff63] bg-transparent p-0 1text-center font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] hover:outline-none focus:outline-none"
                            />
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

                    <div className="w-full flex flex-wrap justify-center lg:justify-start items-center gap-[10px] mb-[15px]">
                      {AllJson?.locations.map((location, index) => (
                        <button
                          key={index}
                          name="area"
                          value={location.value}
                          onClick={() =>
                            handleButtonChange("area", location?.value)
                          }
                          // onClick={() => handleActivityClick(location.value)}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] 
                            bg-[#141414] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${
                              formData.area === location.value
                                ? "text-[#141414]"
                                : ""
                            }`}
                        >
                          {location.label}
                        </button>
                      ))}

                      {areaInputVisible ? (
                        <div className="w-full mt-[15px] mb-[15px]">
                          <LocationSearch
                            formData={formData}
                            setFormData={setFormData}
                            handleInputChange={handleInputChange}
                          />
                          {/* <input
                            type="text"
                            name="area"
                            value={formData?.area}
                            onChange={handleInputChange}
                            id="area"
                            placeholder="Type your answer..."
                            className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none hover:outline-none"
                          /> */}
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
                      {AllJson?.foodOptions?.map((item, index) => (
                        <button
                          key={index}
                          name="food_eat"
                          value={item?.name}
                          onClick={() =>
                            handleFoodButtonChange("food_eat", item?.name)
                          }
                          className={`px-[15px] py-[7px] 
                            md:px-[20px] md:py-[10px] 
                            lg:px-[10px] lg:py-[6px] 
                            xl:px-[20px] xl:py-[8px] 
                            border border-[#fff] rounded-[60px] 
                            font-[manrope] font-[600] 
                            text-[12px] md:text-[13px] 
                            lg:text-[14px] xl:text-[14px] 
                             bg-[#141414] 
                            hover:bg-[#ffffff] hover:text-[#141414] 
                            focus:bg-[#ffffff] focus:text-[#141414] 
                            active:bg-[#000000] active:text-[#fff] 
                            transition-colors duration-300 ease-in-out 
                            focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-[#141414] 
                            ${
                              formData?.food_eat?.includes(item?.name)
                                ? "bg-[#ffffff] text-[#141414]" // Highlight selected items
                                : "text-white "
                            }
                          `}
                        >
                          {item?.icon}
                          {item?.name}
                        </button>
                      ))}

                      {foodInputVisible && (
                        <div className="w-full mt-[15px] mb-[15px]">
                          <input
                            name="foodTextInput"
                            value={foodTextInput}
                            onChange={handleInputChange}
                            id="foodTextInput"
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
                    What fun experience would you like to add?
                    </h2>

                    <div className="w-full flex justify-center lg:justify-start flex-wrap items-center gap-[10px] mb-[15px]">
                      {AllJson?.activities?.map((item, index) => (
                        <button
                          key={index}
                          name="activity"
                          value={item?.name}
                          onClick={() =>
                            handleActivityButtonChange("activity", item?.name)
                          }
                          className={`px-[15px] py-[7px] 
                            md:px-[20px] md:py-[10px] 
                            lg:px-[10px] lg:py-[6px] 
                            xl:px-[20px] xl:py-[8px] 
                            border border-[#fff] rounded-[60px] 
                            font-[manrope] font-[600] 
                            text-[12px] md:text-[13px] 
                            lg:text-[14px] xl:text-[14px] 
                             bg-[#141414] 
                            hover:bg-[#ffffff] hover:text-[#141414] 
                            focus:bg-[#ffffff] focus:text-[#141414] 
                            active:bg-[#000000] active:text-[#fff] 
                            transition-colors duration-300 ease-in-out 
                            focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-[#141414] 
                            ${
                              formData?.activity?.includes(item?.name)
                                ? "bg-[#ffffff] text-[#141414]" // Highlight selected items
                                : "text-white "
                            }
                          `}
                        >
                          {item?.icon}
                          {item?.name}
                        </button>
                      ))}

                      {activityInputVisible && (
                        <div className="w-full mt-[15px] mb-[15px]">
                          <input
                            name="activityTextInput"
                            value={activityTextInput}
                            onChange={handleInputChange}
                            id="activityTextInput"
                            placeholder="Type your answer..."
                            className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

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
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${
                            formData?.Privatize_activity === "Yes"
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
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${
                            formData?.Privatize_activity === "No"
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
                      {AllJson?.venues?.map((item, index) => (
                        <button
                          key={index}
                          name="place"
                          value={item.name}
                          onClick={() => handleButtonChange("place", item.name)}
                          className={`px-[15px] py-[7px] md:px-[15px] md:py-[8px] lg:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414] focus:bg-[#ffffff] focus:text-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414]
                               ${
                                 formData.place === item?.name
                                   ? "text-[#141414]"
                                   : ""
                               }
                              `}
                        >
                          {item?.icon}
                          {item.name}
                        </button>
                      ))}
                    </div>
                    {placeInputVisible && (
                      <div className="mb-[5px] w-full mt-[15px] mb-[15px]">
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
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${
                            formData?.Privatize_place === "Yes"
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
                          className={`px-[30px] py-[10px] rounded-[60px] font-[600] text-[15px]  ${
                            formData?.Privatize_place === "No"
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
                      {AllJson?.priceRanges?.map((item, index) => (
                        <button
                          key={index}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-manrope font-[600] text-[12px] md:text-[16px] bg-black text-white hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-black active:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141414] ${
                            formData.budget === item?.range
                              ? "bg-white text-black"
                              : ""
                          }`}
                          onClick={() =>
                            handleButtonChange("budget", item?.value)
                          }
                        >
                          {item?.icon} {item?.range}
                        </button>
                      ))}

                      {BudgetVisible && (
                        <div className="mb-[5px] w-full mt-[15px] mb-[15px]">
                          <input
                            type="text"
                            name="budget"
                            value={formData?.budget}
                            onChange={handleInputChange}
                            id="place"
                            placeholder="Type your answer..."
                            className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none"
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
                      <MapComponent
                        handleGetStartedClick={handleGetStartedClick}
                        formData={formData}
                      />
                      {/* <div
                        onClick={handleGetStartedClick}
                        className="flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
                      >
                        🙌 Get started <FaArrowRight />
                      </div> */}
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
        </UserLayout>
      </div>
    </>
  );
}

export default AskQuestion;
