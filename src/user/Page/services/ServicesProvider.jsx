import React, { useEffect, useRef, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, removeVenue } from "../Redux/selectedVenuesSlice";
import productimage from "../../../assets/product.png";
import { updateData } from "../Redux/formSlice";

export default function ServicesProvider({ data, description }) {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Venue");
  const tabs = ["Venue", "Catering", "Activity", "Other"];
  const [tabUnderlineStyle, setTabUnderlineStyle] = useState({});
  

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
  const selectedVenues = useSelector(
    (state) => state.selectedVenues.selectedVenues
  );
  const updatedFormData = useSelector((state) => state.GoogleData.updatedFormData);

  // Get the data at index 0
  const firstItem = updatedFormData[0];
  // console.log("addGoogleData", firstItem)
  const dispatch = useDispatch();
  const priceText = {
    1: "Budget-friendly place",
    2: "Mid-range place with good value",
    3: "Higher-end place",
    4: "Luxury and premium option",
  };

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

  const getPhotoUrls = (photos) => {
    if (photos && photos.length > 0) {
      return photos.map((photo) => photo.getUrl({ maxWidth: 400 })); // Return array of photo URLs
    }
    return []; // Return empty array if no photos are available
  };

  return (
    <>
      <div className="w-[96%] max-w-[1230px] m-auto mt-[60px] md:mt-[60px] lg:mt-[40px]">
        <h2
          id="services_provider"
          className="mb-[30px] px-[15px] font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[30px] md:text-[38px] md:leading-[40px] lg:text-[48px] lg:leading-[60px] text-white text-center"
        >
          Select your service providers
        </h2>
        <div className="relative mx-auto flex flex-col items-center">
          <div className="w-[96%] max-w-[520px] mb-[40px] grid grid-cols-4 gap-[2px] lg:gap-4 bg-[#29282D] rounded-[60px] p-[5px]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                className={`flex-1 px-[5px] py-[9px] sm:px-[12px] sm:py-[16px] md:px-[15px] md:py-[12px] text-[12px] sm:text-[14px] md:text-[15px] lg:text-lg font-semibold border-b-2 transition-all rounded-[60px] duration-500 ease-in-out ${activeTab === tab
                  ? "bg-[#4400c3] text-[#ffffff] border-[#4400c3]"
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
        {firstItem && firstItem && firstItem.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {firstItem?.map((venue, index) => (
                <div
                  className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${selectedVenues.some(
                    (selected) => selected.place_id === venue.place_id
                  )
                    ? "border-2 border-[#D7F23F]"
                    : ""
                    }`}
                  key={index}
                >
                  <div className="relative">
                    {/* Checkbox */}
                    <div className="absolute left-[15px] top-[15px] zindex">
                      <div className="form-checkbx">
                        {/* <input
                          type="checkbox"
                          id={`estimate-${index}`}
                          checked={selectedVenues.some(
                            (selected) => selected.place_id === venue.place_id
                          )}
                          onChange={() => handleCheckboxChange(venue)}
                        /> */}
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

                    {/* Swiper */}
                    <div className="mk relative">
                      <Swiper
                        cssMode={true}
                        navigation={false}
                        pagination={{
                          clickable: true, // Enable pagination dots
                        }}
                        mousewheel={true}
                        keyboard={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper relative"
                      >
                        {venue.photos ? (
                          getPhotoUrls(venue.photos)?.map((url, imgIndex) => (
                            <SwiperSlide key={imgIndex}>
                              <img
                                src={url ? url : productimage}
                                alt={venue.name}
                                className="h-[300px] w-full object-cover"
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <img
                            src={productimage}
                            alt="event"
                            className="h-[300px] w-full object-cover"
                          />
                        )}
                      </Swiper>

                      {/* Conditional Button */}
                      {selectedVenues.some(
                        (selected) => selected.place_id === venue.place_id
                      ) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold rounded-lg z-[99]">
                            <Link
                              to="/payment-book"
                              className="px-[50px] py-[17px] font-[500] text-white text-[18px] rounded bg-[#ff0062] hover:bg-[#4400c3] transition duration-300"
                              onClick={(e) => {
                                dispatch(updateData({ summary: description }));
                              }}
                            >
                              Book Now
                            </Link>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div
                    className="p-[15px]"
                    onClick={() => handleCheckboxChange(venue)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                        <IoStar size={17} className="text-[#FCD53F]" />
                        {venue.rating}
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-white block">
                          {priceText[venue?.price_level] || "N/A"}
                        </p>
                        <span className="text-[#EB3465] text-[12px]">
                          Estimated Budget
                        </span>
                      </div>
                    </div>
                    <h2 className="mt-[15px] mb-[15px] text-[18px] font-semibold text-white">
                      {venue.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center mt-[30px]">
              <Link
                to={selectedVenues.length > 0 ? `/payment-book` : "#"}
                className={`mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] ${selectedVenues.length > 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
                  }`}
                onClick={(e) => {
                  dispatch(updateData({ summary: description }));
                  if (selectedVenues.length <= 0) e.preventDefault();
                }}
              >
                Book Now
              </Link>

              <p className="mt-2 text-white text-center">
                You will then be able to add your event details
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-center font-bold">
                Oops, looks like we don't have any suggestion as per your needs. Please go back and change your selection.
              </p>
              <div className="mt-[30px]">
                <Link
                  to="/askquestion"
                  className="px-[50px] py-[17px] font-[500] text-white text-[18px] rounded bg-[#ff0062] hover:bg-[#4400c3] transition duration-300"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
