import React, { useEffect, useRef, useState } from "react";
import productimage from "../../../assets/product.png";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, removeVenue } from "../Redux/selectedVenuesSlice";
import Lockicon from "../../../assets/lockicon.png";
import moment from "moment/moment";
export default function ServicesProviderPackage({ id, data, formData }) {
  const [activeTab, setActiveTab] = useState("Venue");
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [tabUnderlineStyle, setTabUnderlineStyle] = useState({});
  const tabsRef = useRef([]);
  const tabs=["Venue", "Catering", "Activity", "Other"];

  useEffect(() => {
    if (activeTabIndex === null) return;
    const currentTab = tabsRef.current[activeTabIndex];
    if (currentTab) {
      setTabUnderlineStyle({
        width: `${currentTab.offsetWidth}px`,
        left: `${currentTab.offsetLeft}px`,
        transition: "all 0.5s ease-in-out",
      });
    }
  }, [activeTabIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActiveTabIndex(nextIndex);
        return tabs[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [tabs]);

 
  const filteredServices = data?.package_services?.filter(
    (service) =>
      service.services_provider_categries?.toLowerCase() ===
      activeTab.toLowerCase()
  );
  const selectedVenues = useSelector(
    (state) => state.selectedVenues.selectedVenues
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [tabs]);

  console.log("data", data);

  // const [checkedVenues, setCheckedVenues] = useState({});
  const dispatch = useDispatch();

  const handleCheckboxChange = (venue) => {
    const isVenueSelected = selectedVenues.some(
      (selected) => selected.place_id === venue.place_id
    );
    if (isVenueSelected) {
      dispatch(removeVenue(venue.place_id));
    } else {
      dispatch(addVenue(venue));
    }
  };

  const RecapDetail = ({ label, value }) => (
    <div className="rounded-lg">
      <p className="text-[#EB3465]">{label}</p>
      <p className="text-white text-[15px] md:text-[16px] xl:text-[18px]">
        {value}
      </p>
    </div>
  );

  const images = [
    productimage, // Replace with your actual image URLs
    productimage,
    productimage,
  ];

  return (
    <>
       <div className="bg-[#000] p-[10px] h-full min-h-full">
      <div className="w-[96%] max-w-[1300px] m-auto mt-[30px] bg-[#1B1B1B] rounded-lg container mx-auto ">
        <h1 className="text-[30px] md:text-[40px] font-[700] px-[10px] md:px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
          <span className="text-[#EB3465]">Event </span> recap
        </h1>
        <div className="px-[10px] md:px-[20px] lg:px-[30px] pt-[10px] pb-[20px]">
          {/* Event Details */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[15px] lg:gap-[20px">
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
            <RecapDetail
              label="🗺️ Location:"
              value={formData?.area || data?.area || "N/A"}
            />
            <RecapDetail
              label="🥳 Event Type:"
              value={formData?.event_type || data?.package_name || "N/A"}
            />
            <RecapDetail
              label="👥 Number of Attendees:"
              value={formData?.people || data?.package_people || "N/A"}
            />
          </div>

          {/* Food and Budget Details */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[5px] lg:mt-[10px]">
            <RecapDetail
              label="🍔 Food:"
              value={
                formData?.food_eat?.join(", ") ||
                data?.package_categories?.join(", ") ||
                "N/A"
              }
            />
            <RecapDetail
              label="💵 Budget:"
              value={
                formData?.budget ||
                `$${data?.package_price_min}-${data?.package_price_max}` ||
                "N/A"
              }
            />
            <RecapDetail
              label="🎳 Activity:"
              value={formData?.activity?.join(", ") || "N/A"}
            />
            <RecapDetail
              label="✉️ Email:"
              value={formData?.email || data?.services_provider_email || "N/A"}
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] md:gap-[15px] lg:gap-[20px] mt-[10px]">
            <RecapDetail
              label="🎉 Vibe and Atmosphere:"
              value="Casual and fun with a rooftop/terrace vibe"
            />
            
             <RecapDetail
              label="⌛ Description:"
              value={formData?.details || "N/A"}
            />
          </div>

         

          {/* Unlock Button */}
          <div className="flex justify-center mt-[15px]">
            <a
              href="#services_provider"
              aria-label="Unlock your custom-made event"
              className="flex items-center px-[8px] py-5 bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold rounded transition leading-[15px]"
            >
              <img src={Lockicon} alt="Lock icon" className="mr-[5px]" />
              Unlock your custom-made event
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" className="ml-[5px]">
                <path
                  d="M0 8.88336H11.5861L7.08606 13.3834L8.50006 14.7974L15.4141 7.88336L8.50006 0.969364L7.08606 2.38336L11.5861 6.88336H0V8.88336Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
      <div className="w-[96%] max-w-[1230px] m-auto mt-[60px] md:mt-[60px] lg:mt-[120px]">
        <h2
          id="services_provider"
          className="mb-[20px] px-[15px] font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[30px] md:text-[38px] md:leading-[40px] lg:text-[48px] lg:leading-[60px] text-white text-center"
        >
          Select your service providers
        </h2>
        <div className="relative mx-auto flex flex-col items-center">
          <div className="w-[96%] max-w-[520px] mb-[40px] grid grid-cols-4 gap-[2px] lg:gap-4 bg-[#29282D] rounded-[60px] p-[5px]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                className={`flex-1 px-[5px] py-[5px] sm:px-[12px] sm:py-[16px] md:px-[15px] md:py-[12px] text-[12px] md:text-[15px] lg:text-lg font-semibold border-b-2 transition-all rounded-[60px] duration-500 ease-in-out ${activeTab === tab
                    ? "bg-[#EB3465] text-[#ffffff] border-[#EB3465]"
                    : "border-transparent text-[#ffffff8f] hover:text-white"
                  }`}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveTabIndex(index);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <span
            className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-500 ease-in-out"
            style={tabUnderlineStyle}
          >
            <span className="h-full w-full rounded-3xl bg-gray-200/30" />
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices && filteredServices?.map((venue, index) => (
            <div
              className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${selectedVenues.some((selected) => selected.place_id === venue.place_id)
                ? "border-2 border-[#D7F23F]"
                : ""
                }`}
              key={index}
            >
              <div className="relative">
                <div className="absolute left-[15px] top-[15px] z-50">
                  <div className="form-checkbx">
                    <input
                      type="checkbox"
                      id={`estimate-${index}`}
                      checked={selectedVenues.some(
                        (selected) => selected.place_id === venue.place_id
                      )}
                      onChange={() => handleCheckboxChange(venue)}
                    />
                    <label htmlFor={`estimate-${index}`}></label>
                  </div>
                </div>
                <div className="mk111">
                  <Swiper
                    cssMode={true}

                    navigation={true} // Enable navigation buttons
                    pagination={{
                      clickable: true, // Enable pagination dots
                    }}
                    mousewheel={true}
                    keyboard={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay, Navigation]} // Include Navigation module
                    className="mySwiper relative"
                  >
                    {images?.map((img, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <img
                          src={img}
                          alt={`Slide ${imgIndex + 1}`}
                          className="h-48 w-full object-cover rounded-t-lg mb-4"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="p-[15px]"
                onClick={(e) => {
                  handleCheckboxChange(venue);
                }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                    <IoStar size={17} className="text-[#FCD53F]" />
                    {venue.services_provider_rating}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-white block">
                      ${venue.services_provider_price}/person
                    </p>
                    <span className="text-[#EB3465] text-[12px]">Estimated Budget</span>
                  </div>
                </div>
                <h2 className="mt-[15px] mb-[15px] text-[18px] font-semibold text-white">
                  {venue.services_provider_name}
                </h2>
                <p className="text-[#ffffffc2] text-[14px] mt-2">
                  {venue.package_descrption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex  justify-center mt-[30px]">
          <Link
            to={`/payment-book/${id}`}
            className="mt-4 px-[50px] py-[17px] font-[500] text-white text-[18px] rounded bg-[#ff0062] hover:bg-[#4400c3] transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
