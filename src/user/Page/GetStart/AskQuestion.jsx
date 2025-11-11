import React, { useEffect, useState } from "react";
import UserLayout from "../../Layout/AuthLayout";
import AllJson from "../../../JSon/All.json";
import NextPreBtn from "../GetStart/NextPreBtn";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
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
import { RiArrowDropDownLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import LocationSearch from "../Google/LocationSearch";
import { clearAllVenues } from "../Redux/selectedVenuesSlice.js";
import Listing from "../../../Api/Listing.jsx";
import ImageAsk from "./ImageAsk.jsx";
import ProgressBar from "./ProgressBar.jsx";
function AskQuestion() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.form.updatedFormData);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentStep, setCurrentStep] = useState(() => { return Number(queryParams?.get('step')) || reduxData?.step || 1; });
  const [countries, setCountries] = useState([]);
  const totalSteps = 10;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: queryParams?.get('email') || reduxData?.email || "",
    number: queryParams?.get('number') || reduxData?.number || "",
    event_type: queryParams?.get('event_type') || reduxData?.event_type || "",
    people: queryParams?.get('people') || reduxData?.people || 1,
    time: queryParams?.get('time') || reduxData?.time || "",
    area: queryParams?.get('area') || reduxData?.area || "",
    food_eat: queryParams?.get('food_eat') ? queryParams.get('food_eat').split(',') : reduxData?.food_eat || [],
    firstname: queryParams?.get('firstname') || reduxData?.firstname || "",
    lastname: queryParams?.get('lastname') || reduxData?.lastname || "",
    activity: queryParams?.get('activity') ? queryParams.get('activity').split(',') : reduxData?.activity || [],
    Privatize_place: queryParams?.get('Privatize_place') || reduxData?.Privatize_place || "",
    Privatize_activity: queryParams?.get('Privatize_activity') || reduxData?.Privatize_activity || "",
    place: queryParams?.get('place') || reduxData?.place || "",
    budget: queryParams?.get('budget') || reduxData?.budget || "",
    // details: queryParams?.get('details') || reduxData?.details || "",
    month: queryParams?.get('date')?.split("-")[0] || reduxData?.month || "",
    day: queryParams?.get('date')?.split("-")[1] || reduxData?.day || "",
    year: queryParams?.get('date')?.split("-")[2] || reduxData?.year || "",
    phone_code: Number(queryParams?.get('phone_code')) || reduxData?.phone_code || "",
  });
  const [searchTerm, setSearchTerm] = useState(queryParams?.get('phone_code') || "");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  useEffect(() => {
    const main = new Listing();
    main
      .profile()
      .then((r) => {
        setFormData({
          ...formData,
          email: r?.data?.data?.email || "",
          number: r?.data?.data?.phone_number || "",
          phone_code: r?.data?.data?.phone_code || "",
        });
        setSearchTerm(r.data?.data?.phone_code || "")
      })
      .catch((err) => {
        console.log("User not logged in", err);
      });
  }, [])

  useEffect(() => {
    // Fetch data from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryPhoneCodes = data.map((country) => {
          const countryName = country.name.common;
          const rootCode = country.idd?.root || "";
          const suffixes = country.idd?.suffixes || [""];
          const phoneCodes = suffixes.map((suffix) => `${rootCode}${suffix}`);
          return { name: countryName, phoneCodes };
        });
        setCountries(countryPhoneCodes);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setIsDropdownOpen(true);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };
  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      setFilteredCountries(countries); // Show all countries when opening
    }
  };
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const [activeTab, setActiveTab] = useState("private");
  const [eventInputVisible, setEventInputVisible] = useState(false);
  const [foodInputVisible, setFoodInputVisible] = useState(false);
  const [foodTextInput, setFoodTextInput] = useState("");
  const [activityInputVisible, setActivityInputVisible] = useState(false);
  const [activityTextInput, setActivityTextInput] = useState("");
  const [placeInputVisible, setplaceInputVisible] = useState(false);
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
    // if (currentStep === 10 && (!formData?.details || formData?.details.trim() === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }

    let updatedFormData = { ...formData };

    if (foodTextInput.trim() !== "") {
      updatedFormData = {
        ...updatedFormData,
        food_eat: [...(updatedFormData.food_eat || []), foodTextInput],
      };
    }

    if (activityTextInput.trim() !== "") {
      updatedFormData = {
        ...updatedFormData,
        activity: [...(updatedFormData.activity || []), activityTextInput],
      };
    }
    setFormData(updatedFormData);
    dispatch(updateData(updatedFormData)); // Dispatch updated data to Redux store
    navigate("/event-show"); // Navigate to the event show page
  };


  const handleNext = async () => {
    if (currentStep === 2) {
      if (formData?.people === "" || formData?.people === "0") {
        toast.error(`Invalid or empty value!`);
        return false;
      }
      else {
        queryParams.set('people', `${formData?.people}`);
      }
    }
    if (currentStep === 3) {
      if (formData?.month === "" ||
        formData?.day === "" ||
        formData?.year === "" ||
        formData?.time === "") {
        toast.error(`All fields are required.`);
        return false;
      }
      else {
        queryParams.set('date', `${formData?.month}-${formData?.day}-${formData?.year}`);
        queryParams.set('time', `${formData?.time}`);
      }
    }
    if (currentStep === 4) {
      if (!formData?.area || formData?.area === "") {
        toast.error(`All fields are required.`);
        return false;
      } else {
        queryParams.set('area', `${formData?.area}`);
      }
    }
    if (
      currentStep === 5
    ) {

      if (formData?.food_eat.length === 0 && foodTextInput === "") {
        toast.error(`All fields are required.`);
        return false;
      } else {
        queryParams.set('food_eat', formData?.food_eat.join(','));
      }
    }

    if (
      currentStep === 6
    ) {
      if (formData?.activity.length === 0 && activityTextInput === "") {
        toast.error(`All fields are required.`);
        return false;
      } else {
        queryParams.set('activity', `${formData?.activity}`);
      }
    }

    if (currentStep === 6) {
      if (formData?.Privatize_activity === "") {
        toast.error(`All fields are required.`);
        return false;
      } else {
        queryParams.set('Privatize_activity', `${formData?.Privatize_activity}`);
      }
    }

    if (currentStep === 7) {
      if (formData?.place === "" || !formData?.Privatize_place === "") {
        toast.error(`All fields are required.`);
        return false;
      }
      else {
        queryParams.set('place', `${formData?.place}`);
        queryParams.set('Privatize_place', `${formData?.Privatize_place}`);
      }
    }

    if (currentStep === 8) {
      if (formData?.budget === "") {
        toast.error(`All fields are required.`);
        return false;
      }
      else {
        queryParams.set('budget', `${formData?.budget}`);
      }
    }

    if (currentStep === 9) {
      if (formData?.email === "" || formData?.number === "" || searchTerm === "") {
        toast.error(`All fields are required.`);
        return false;
      }
      else {
        queryParams.set('email', `${formData?.email}`);
        queryParams.set('firstname', `${formData?.firstname}`);
        queryParams.set('lastname', `${formData?.lastname}`);
        queryParams.set('phone_code', `${formData?.phone_code}`);
        queryParams.set('number', `${formData?.number}`);
      }
    }

    if (currentStep === 10 && !formData?.details === "") {
      toast.error(`All fields are required.`);
      return false;
    }
    queryParams.set('step', `${currentStep + 1}`);
    navigate(`?${queryParams.toString()}`);
    setCurrentStep((prev) => prev + 1);
  };

  const handleGetStarted = () => {
    if (
      currentStep === 1 &&
      (formData?.event_type === "")
    ) {
      toast.error(`All fields are required.`);
      return false;
    }
    queryParams.set('event_type', `${formData?.event_type}`);
    queryParams.set('step', '2');
    navigate(`?${queryParams.toString()}`);
    // window.location.href = `?${queryParams.toString()}`
    setCurrentStep(2);
    // dispatch(clearData());
    dispatch(clearAllVenues());
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
    if (name === "event_type") {
      if (value === "Other") {
        setEventInputVisible(true);
        value = "";
      } else {
        setEventInputVisible(false);
      }
    }
    else if (name === "place") {
      if (value === "Other") {
        setplaceInputVisible(true);
        value = "";
      } else {
        setplaceInputVisible(false);
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

  const incrementPeople = () => {
    setFormData((prev) => ({
      ...prev,
      people: String(Number(prev.people || 0) + 1), // Increment people
    }));
  };

  const decrementPeople = () => {
    setFormData((prev) => ({
      ...prev,
      people: String(Math.max(Number(prev.people || 0) - 1, 0)), // Decrement but don't go below 0
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "foodTextInput") {
      setFoodTextInput(value);
    } else if (name === "activityTextInput") {
      setActivityTextInput(value);
    } else if (name === "people") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    }

    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const today = new Date();

    return (
      <div className="grid grid-cols-7 gap-1 p-2 bg-white rounded shadow-lg">
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);
          const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <button
              key={i}
              onClick={() => !isPastDate && handleDateClick(day)}
              disabled={isPastDate}
              className={`rounded text-center ${isPastDate
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-blue-100 text-gray-700"
                }`}
            >
              {day}
            </button>
          );
        })}
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
            <ProgressBar progressWidth={progressWidth} />
            {/* Start */}
            <div className="h-full pb-[20px] pl-[15px] lg:pl-[50px] pr-[15px] ">
              {/* Step-1 */}
              {currentStep === 1 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      What event do you  want to celebrate?
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
                        {AllJson?.events?.privateEvents.map((event, index) => (
                          <button
                            key={index}
                            name="event_type"
                            value={event}
                            className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#141414] bg-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out ${formData.event_type === event?.name
                              ? "bg-[#ffffff] !text-[#141414]" // Reverse styles only when selected
                              : ""
                              }`}
                            onClick={() =>
                              handleButtonChange("event_type", event?.name)
                            }
                          >
                            {event?.name.replaceAll("_", " ")}{" "}{event?.icon}
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
                              className={`px-[15px] py-[7px] md:px-[20px] capitalize md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#141414] bg-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out ${formData.event_type === event?.name
                                ? "bg-[#ffffff] !text-[#141414]"
                                : ""
                                }`}
                              onClick={() =>
                                handleButtonChange("event_type", event?.name)
                              }
                            >
                              {event?.name.replaceAll("_", " ")}{" "}{event?.icon}
                            </button>
                          )
                        )}
                      </div>
                    )}
                    {eventInputVisible && (
                      <div className="mb-[5px] w-full mt-[15px] mb-[15px]">
                        <input
                          type="text"
                          autocomplete="off"
                          name="event_type"
                          value={formData?.event_type}
                          onChange={handleInputChange}
                          id="event_type"
                          placeholder="Type your answer..."
                          className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
                            focus:border-b focus:border-b-[#222] focus:outline-none"
                        />
                      </div>
                    )}
                    <div className="mt-[30px]">
                      <button
                        onClick={handleGetStarted}
                        className="flex items-center justify-center gap-[8px] w-[100%] min-w-[195px] px-[10px] py-[14px] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[17px] text-white text-center"
                      >
                        Get Started <FaArrowRight />
                      </button>
                    </div>
                  </div>
                  <ImageAsk step={step2banner} />
                </div>
              )}
              {/* Step-2 */}
              {currentStep === 2 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      How many people do  you want to invite?
                    </h2>
                    <div className="mb-[15px] w-full max-w-[390px]">
                      <div className="flex items-center">
                        {/* Decrement Button */}
                        <button
                          type="button"
                          onClick={decrementPeople}
                          className="bg-[#333] text-white px-[10px] py-[5px] rounded-l-md border border-[#222]"
                        >
                          -
                        </button>

                        {/* Input Field */}
                        <input
                          type="text"
                          name="people"
                          value={formData.people}
                          onChange={handleInputChange}
                          placeholder="Enter number of people"
                          className="placeholder:text-[#998e8e] w-full border-y border-y-[#222] bg-transparent px-[10px] py-[10px] text-white text-center focus:outline-none appearance-none [-moz-appearance:textfield] [-webkit-appearance:none]"
                        />

                        {/* Increment Button */}
                        <button
                          type="button"
                          onClick={incrementPeople}
                          className="bg-[#333] text-white px-[10px] py-[5px] rounded-r-md border border-[#222]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <ImageAsk step={step3banner} />

                </div>
              )}
              {currentStep === 3 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      When will it take  place?
                    </h2>

                    <div className="w-full">
                      <div className="relative">
                        {/* Date Inputs */}
                        <div className="flex flex-wrap sm:flex-nowrap items-start gap-[3px] md:gap-[10px] text-white">
                          <div className="w-[31%] sm:w-[31%] md-w-[initial]">
                            <label className="block mb-[0] text-[14px] md:text-[14px]">Month</label>
                            <div className="w-full flex items-center 1justify-center gap-[15px]">
                              <input
                                type="text"
                                autocomplete="off"
                                name="month"
                                placeholder="MM"
                                value={formData.month}
                                readOnly
                                onClick={() => setIsDatePickerOpen(true)}
                                className="placeholder:text-[#998e8e] w-[100%] lg:w-[70px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[31px] text-[#A9A4A8] text-left cursor-pointer hover:outline-none focus:outline-none"
                              />
                              <span className="inline-flex">/</span>
                            </div>
                          </div>

                          <div className="w-[31%] sm:w-[31%] md-w-[initial]">
                            <label className="block mb-[0] text-[14px] md:text-[14px]">Day</label>
                            <div className="w-full flex items-center 1justify-center gap-[15px]">
                              <input
                                type="text"
                                autocomplete="off"
                                name="day"
                                placeholder="DD"
                                value={formData.day}
                                readOnly
                                onClick={() => setIsDatePickerOpen(true)}
                                className="placeholder:text-[#998e8e] w-[100%] lg:w-[70px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[31px] text-[#A9A4A8] text-left cursor-pointer  hover:outline-none focus:outline-none"
                              />

                              <span className="inline-flex">/</span>
                            </div>
                          </div>

                          <div className="w-[31%] sm:w-[31%] md-w-[initial]">
                            <label className="block mb-[0] text-[14px] md:text-[14px]">Year</label>
                            <input
                              type="text"
                              autocomplete="off"
                              name="year"
                              placeholder="YYYY"
                              value={formData.year}
                              readOnly
                              onClick={() => setIsDatePickerOpen(true)}
                              className="placeholder:text-[#998e8e] w-[100%] lg:w-[120px] p-[0] border-b border-b-[#ffffff63] bg-[transparent] font-manrope font-[600] text-[13px] md:text-[25px] xl:text-[32px] text-[#A9A4A8] text-left cursor-pointer  hover:outline-none focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Custom Date Picker */}
                        {isDatePickerOpen && (
                          <div className="absolute max-w-[540px] mt-2 left-0 right-0 bg-white shadow-lg rounded-lg z-50">
                            <div className="p-4 border-b flex justify-between items-center">
                              <button
                                onClick={() => handleMonthChange(-1)}
                                className="bg-gray-200 text-gray-700 px-[12px] md:px-4 py-[7px] md:py-2 rounded hover:bg-gray-300 text-[13px] md:text-[14px]"
                              >
                                Prev
                              </button>
                              <h3 className="text-[15px] md:text-lg font-bold">
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
                                className="bg-gray-200 text-gray-700 px-[12px] md:px-4 py-[7px] md:py-2 rounded hover:bg-gray-300  text-[13px] md:text-[14px]"
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



                      <div className="w-full mt-10 flex flex-wrap items-center justify-center lg:justify-start  gap-[5px] md:gap-[10px] lg-[15px]">
                        {AllJson?.time.map(
                          (event, index) => (
                            <button
                              key={index}
                              name="time"
                              value={event}
                              className={`flex gap-[20px] px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[16px] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#141414] bg-[#141414] active:bg-[#000000] active:text-[#ffffff] transition-colors duration-300 ease-in-out ${formData.time === event?.name
                                ? "bg-[#ffffff] !text-[#141414]"
                                : ""
                                }`}
                              onClick={() =>
                                handleButtonChange("time", event?.name)
                              }
                            >
                              {event?.icon} {event?.name}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <ImageAsk step={step4banner} />
                </div>
              )}
              {currentStep === 4 && (
                <div className=" h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      In which area will it <br /> take place?
                    </h2>

                    <div className="w-full flex flex-wrap justify-center lg:justify-start items-center gap-[10px] mb-[15px]">
                      <div className="w-full mt-[15px] mb-[15px]">
                        <LocationSearch
                          formData={formData}
                          isActive={true}
                          setFormData={setFormData}
                          handleInputChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <ImageAsk step={step5banner} />

                </div>
              )}
              {currentStep === 5 && (
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
                          lg:text-[14px] xl:text-[14px] bg-[#141414] 
                          active:bg-[#000000] active:text-[#fff] 
                          transition-colors duration-300 ease-in-out 
                          ${formData?.food_eat?.includes(item?.name)
                              ? "bg-[#ffffff] text-[#141414]"
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
                            autocomplete="off"
                            value={foodTextInput}
                            onChange={handleInputChange}
                            id="foodTextInput"
                            placeholder="Type your answer..."
                            className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <ImageAsk step={step6banner} />
                </div>
              )}
              {currentStep === 6 && (
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
                            active:bg-[#000000] active:text-[#fff] 
                            transition-colors duration-300 ease-in-out 
                            ${formData?.activity?.includes(item?.name)
                              ? "bg-[#ffffff] text-[#141414]"
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
                            autocomplete="off"
                            value={activityTextInput}
                            onChange={handleInputChange}
                            id="activityTextInput"
                            placeholder="Type your answer..."
                            className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white hover:outline-none focus:outline-none"
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
                  <ImageAsk step={step7banner} />


                </div>
              )}
              {currentStep === 7 && (
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
                          className={`px-[15px] py-[7px] md:px-[15px] md:py-[8px] lg:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[12px] md:text-[12px] lg:text-[14px] xl:text-[15px] transition-colors duration-300 ease-in-out ${formData.place === item?.name
                            ? "text-[#141414] bg-[#ffffff] ring-2 ring-offset-2 ring-[#141414]"
                            : "text-white bg-[#141414] hover:bg-[#ffffff] hover:text-[#141414]"
                            }`}
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
                          autocomplete="off"
                          name="place"
                          value={formData?.place}
                          onChange={handleInputChange}
                          id="place"
                          placeholder="Type your answer..."
                          className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white 
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

                  <ImageAsk step={step8banner} />

                </div>
              )}
              {currentStep === 8 && (
                <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2 className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left">
                      What is your budget range?
                    </h2>

                    <div className="w-full justify-center lg:justify-start flex flex-wrap items-center gap-[10px] mb-[15px]">
                      {AllJson?.priceRanges?.map((item, index) => (
                        <button
                          key={index}
                          className={`px-[15px] py-[7px] md:px-[20px] md:py-[10px] border border-[#fff] rounded-[60px] font-manrope font-[600] text-[12px] md:text-[16px] transition-colors duration-300 ease-in-out ${formData.budget === item?.value
                            ? "bg-white text-black ring-2 ring-offset-2 ring-[#141414]"
                            : "bg-black text-white hover:bg-white hover:text-black"
                            }`}
                          onClick={() =>
                            handleButtonChange("budget", item?.value)
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
                  <ImageAsk step={step9banner} />
                </div>
              )}
              {currentStep === 9 && (
                <div className=" flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                  <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                    <h2
                      className="font-[manrope] font-[700] text-[25px] md:text-[30px] lg:text-[38px] xl:text-[48px]
                                        leading-[30px] md:leading-[40px] lg:leading-[40px] xl:leading-[52px] mb-[30px] text-white  text-center lg:text-left"
                    >
                      Please enter your  contact details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] w-full max-w-[700px] mb-[15px]">
                      <input
                        type="text"
                        name="firstname"
                        autocomplete="off"
                        value={formData?.firstname}
                        onChange={handleInputChange}
                        id="firstname"
                        placeholder="Name"
                        className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[10px] py-[10px] text-white focus:border-b-[#222] focus:outline-none"
                      />

                      <input
                        type="text"
                        autocomplete="off"
                        name="lastname"
                        value={formData?.lastname}
                        onChange={handleInputChange}
                        id="lastname"
                        placeholder="Last Name"
                        className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[10px] py-[10px] text-white focus:border-b-[#222] focus:outline-none"
                      />
                    </div>

                    <div className="mb-[5px] w-full max-w-[700px] mb-[15px]">
                      <input
                        type="email"
                        autocomplete="off"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        id="email"
                        placeholder="name@example.com"
                        className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[10px] py-[10px] text-white focus:border-b focus:border-b-[#222] hover:outline-none focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] w-full max-w-[700px] mb-[15px] mt-[5px]">

                      <div className="w-full relative  ">
                        {/* Input for search */}
                        <input
                          type="text"
                          placeholder="Search Country"
                          value={searchTerm}
                          onChange={handleSearch}
                          className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[10px] py-[10px] text-white focus:border-b-[#222] focus:outline-none"
                        />
                        {/* Dropdown Icon */}
                        <RiArrowDropDownLine
                          size={32}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                          onClick={handleDropdownClick}
                        />
                        {/* Dropdown List */}
                        {isDropdownOpen && (
                          <ul className="mt-2 rounded-lg max-h-[200px] overflow-y-auto bg-[#222] text-white z-10 absolute w-full">
                            {filteredCountries.length > 0 &&
                              filteredCountries
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((country, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      setFormData((prevState) => ({
                                        ...prevState,
                                        phone_code: country.phoneCodes[0],
                                      }));
                                      setSearchTerm(country.phoneCodes[0]); // Set input to selected country
                                      setFilteredCountries([]); // Close dropdown
                                      setIsDropdownOpen(false); // Close dropdown
                                    }}
                                    className="w-full border-b border-b-[#333] bg-transparent px-[10px] py-[10px] cursor-pointer hover:bg-[#444]"
                                  >
                                    {country.name} ({country.phoneCodes[0]})
                                  </li>
                                ))}
                          </ul>
                        )}
                      </div>
                      <div className="mb-[5px] ">
                        <input
                          type="tel"
                          autocomplete="off"
                          name="number"
                          value={formData?.number}
                          onChange={(e) => {
                            if (
                              e.target.value.length <= 10 &&
                              /^[0-9]*$/.test(e.target.value)
                            ) {
                              handleInputChange(e);
                            }
                          }}
                          id="number"
                          placeholder="Phone Number"
                          className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[10px] py-[10px] text-white focus:border-b-[#222] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <NextPreBtn onPrev={handleBack} onNext={handleNext} />
                    </div>
                  </div>
                  <ImageAsk step={step1banner} />
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
                        autocomplete="off"
                        id="details"
                        type="text"
                        value={formData?.details}
                        onChange={handleInputChange}
                        placeholder="Type your answer..."
                        className="placeholder:text-[#998e8e] w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] hover:outline-none focus:outline-none"
                      />
                    </div>

                    <div className="mt-[30px] flex items-center gap-4">
                      <NextPreBtn
                        currentStep={10}
                        onPrev={handleBack}
                        onNext={handleNext}
                      />
                      {/* <MapComponent
                        handleGetStartedClick={handleGetStartedClick}
                        formData={formData}
                        Mapcompontent ={Mapcompontent}
                         setMapcompontent ={setMapcompontent}
                      /> */}

                      <div
                        onClick={handleGetStartedClick}
                        className="cursor-pointer flex items-center justify-center gap-[8px] w-full min-w-[160px] md:min-w-[170px] px-[10px] md:px-[20px] py-[11px] lg:py-[14px] border border-[#EB3465] hover:border-[#4400c3] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] lg:text-[16px] text-white text-center"
                      >
                        🙌 Get started
                      </div>
                    </div>
                  </div>
                  <ImageAsk step={step10banner} />
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