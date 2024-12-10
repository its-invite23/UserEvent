import React, { useContext, useEffect, useRef, useState } from "react";
import productimage from "../../../assets/product.png";
import { IoStar } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, removeVenue } from "../Redux/selectedVenuesSlice";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
import { CurrencyContext } from "../../../CurrencyContext";
import LoadingSpinner from "../../compontents/LoadingSpinner";

export default function ServicesProviderPackage({ id, data, loading }) {
  console.log("data",data)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Venue");
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [tabUnderlineStyle, setTabUnderlineStyle] = useState({});
  const tabsRef = useRef([]);
  const tabs = ["Venue", "Catering", "Activity", "Other"];

  const currencySymbol = {
    USD: <FaDollarSign size={18} />,
    EUR: <FaEuroSign size={18} />,
    AED: <TbCurrencyDirham size={18} />,
    GBP: <FaPoundSign size={18} />,
  };
  const { currency } = useContext(CurrencyContext);

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


  const filteredServices = data?.package_services?.filter(
    (service) =>
      service.services_provider_categries?.toLowerCase() ===
      activeTab.toLowerCase()
  );
  const selectedVenues = useSelector(
    (state) => state.selectedVenues.selectedVenues
  );

  console.log("selectedVenues",selectedVenues)
  const dispatch = useDispatch();

  const handleCheckboxChange = (venue) => {
    console.log("venuehandleCheckboxChange",venue)
    const isVenueSelected = selectedVenues.some(
      (selected) => selected.place_id === venue.place_id
    );
    if (isVenueSelected) {
      dispatch(removeVenue(venue.place_id));
    } else {
      dispatch(addVenue(venue));
    }
  };


  return loading ? (
    <div className="flex items-center justify-center  min-h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className="w-[96%] max-w-[1300px] mx-auto mt-[30px] px-[10px]">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-lg p-4 bg-[#1B1B1B] gap-x-2 text-white hover:text-pink-500  focus:outline-none"
        >
          <FaLongArrowAltLeft size={32} />
        </button>
      </div>
      <div className="bg-[#000] p-[10px] h-full min-h-full">
        <div className="w-[96%] max-w-[1300px] m-auto mt-[30px] bg-[#1B1B1B] rounded-lg container mx-auto ">
          <h1 className="flex items-center justify-between text-[30px] md:text-[40px] font-[700] px-[10px] md:px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
            <span className="text-[#EB3465] text-center flex-1">
              {data?.package_name}
            </span>
          </h1>

          <div className="px-[10px] md:px-[20px] lg:px-[30px] pt-[10px] pb-[20px]">
            <div className="mb-[2px] lg:mb-[20px]">
              <h2 className="text-[18px] md:text-[22px] lg:text-[25px] mt-3 lg:mt-[0px] font-[700] text-center lg:text-left text-white">
                What you will experience?
              </h2>
              <p className=" text-[15px] md:text-[20px] lg:text-[22px] mt-3 capitalize text-[#9ca3af]">
                {data?.package_description || "Description response"}
              </p>
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
                className={`flex-1 px-[5px] py-[5px] sm:px-[12px] sm:py-[16px] md:px-[15px] md:py-[12px] text-[14px] md:text-[15px] lg:text-lg font-semibold border-b-2 transition-all rounded-[60px] duration-500 ease-in-out ${
                  activeTab === tab
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices &&
            filteredServices?.map((venue, index) => (
              <div
                className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${
                  selectedVenues.some(
                    (selected) => selected.place_id === venue.place_id
                  )
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
                    {/* <Swiper
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
                  </Swiper> */}
                    <img
                      src={venue?.services_provider_image || productimage}
                      // alt={`Slide ${imgIndex + 1}`}
                      alt="venue"
                      className="h-48 w-full object-cover rounded-t-lg mb-4"
                    />
                  </div>
                </div>
                <div
                  className="p-[15px]"
                  onClick={(e) => {
                    handleCheckboxChange(venue);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                      <IoStar size={17} className="text-[#FCD53F]" />
                      {venue.services_provider_rating}
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-white text-[15px] md:text-[16px] xl:text-[18px] flex items-center">
                        {currencySymbol[currency]}
                        {venue.services_provider_price}/person
                      </p>
                      <span className="text-[#EB3465] text-[12px]">
                        Estimated Budget
                      </span>
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

        <div className="flex flex-col justify-center items-center mt-[30px]">
          <Link
            to={selectedVenues.length > 0 ? `/payment-book/${id}` : "#"}
            className={`mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] ${
              selectedVenues.length > 0
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (selectedVenues.length <= 0) e.preventDefault();
            }}
          >
            Book Now
          </Link>

          <p className="mt-2 text-white text-center">
            You will then be able to add your event details
          </p>
        </div>
      </div>
    </>
  );
}
