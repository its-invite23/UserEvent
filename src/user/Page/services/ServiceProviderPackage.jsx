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
import { CurrencyContext } from "../../../CurrencyContext";
import LoadingSpinner from "../../compontents/LoadingSpinner";
import { formatMultiPrice } from "../../hooks/ValueData";

export default function ServicesProviderPackage({ id, data, loading }) {
  const navigate = useNavigate();
  const tabs = ["Venue", "Catering", "Activity", "Other"];
  const tabsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("Venue");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const { currency, currencyRate } = useContext(CurrencyContext);

  const filteredServices = data?.package_services?.filter(
    (service) =>
      service.services_provider_categries?.toLowerCase() ===
      activeTab.toLowerCase()
  );
  const selectedVenues = useSelector(
    (state) => state.selectedVenues.selectedVenues
  );

  const dispatch = useDispatch();

  const handleCheckboxChange = (venue) => {
    const updatedVenue = { ...venue, category: activeTab };
    const isVenueSelected = selectedVenues.some(
      (selected) => selected.place_id === updatedVenue.place_id
    );
    if (isVenueSelected) {
      dispatch(removeVenue(updatedVenue.place_id));
    } else {
      dispatch(addVenue(updatedVenue));
    }
  };

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

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className="w-[96%] max-w-[1300px] mx-auto pt-[20px] px-[15px]">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-lg p-3 bg-[#1B1B1B] gap-x-2 text-white hover:text-pink-500 focus:outline-none"
        >
          <FaLongArrowAltLeft size={24} />
        </button>
      </div>
      <div className="bg-[#000] min-h-screen">
        <div className="w-[96%] max-w-[1300px] m-auto mt-[20px] bg-[#1B1B1B] rounded-lg container mx-auto">
          <h1 className="flex items-center justify-between text-[24px] md:text-[32px] font-[700] px-[15px] md:px-[25px] py-[15px] border-b border-b-[#ffffff21] mb-[15px] text-white">
            <span className="text-[#EB3465] text-center flex-1 capitalize">
              {data?.package_name}
            </span>
          </h1>

          <div className="px-[15px] md:px-[25px] pt-[10px] pb-[20px]">
            <div className="mb-[15px]">
              <h2 className="text-[16px] md:text-[18px] lg:text-[20px] mt-3 lg:mt-[0px] font-[700] text-center lg:text-left text-white">
                What you will experience?
              </h2>
              <p className="text-[14px] md:text-[16px] lg:text-[18px] mt-3 capitalize text-[#9ca3af]">
                {data?.package_description || "Description response"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[96%] max-w-[1230px] m-auto mt-[40px] md:mt-[60px]">
        <h2
          id="services_provider"
          className="mb-[20px] px-[15px] font-manrope font-[700] text-[20px] leading-[24px] sm:text-[24px] sm:leading-[28px] md:text-[28px] md:leading-[32px] lg:text-[32px] lg:leading-[36px] text-white text-center"
        >
          Select your service providers
        </h2>
        <div className="relative mx-auto flex flex-col items-center">
          <div className="flex-row w-[96%] mb-[30px] max-w-[520px] relative mx-auto flex h-[40px] md:h-[50px] lg:h-[55px] border border-black/40 bg-neutral-800 px-1 backdrop-blur-sm rounded-[60px]">
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
                  className={`${isActive
                    ? "text-[#ffff]"
                    : "text-[#ffffff8f] hover:text-white"
                    } flex-1 capitalize px-[5px] sm:px-[10px] md:px-[12px] text-[13px] md:text-[14px] lg:text-[16px] font-semibold rounded-[60px]`}
                  onClick={() => {
                    setActiveTabIndex(index);
                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices &&
            filteredServices?.map((venue, index) => (
              <div
                className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${selectedVenues.some(
                  (selected) => selected?.place_id === venue?.place_id
                )
                  ? "border-2 border-[#D7F23F]"
                  : "border-2 border-transparent"
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
                          (selected) => selected?.place_id === venue?.place_id
                        )}
                        onChange={() => handleCheckboxChange(venue)}

                      />

                      <label htmlFor={`estimate-${index}`}></label>
                    </div>
                  </div>
                  <div className="absolute right-[8px] top-[8px] flex items-center gap-[10px] h-[32px] text-white bg-[#000] rounded-[60px] px-[12px] py-[2px] text-[12px] leading-[14px]">
                    <IoStar size={14} className="text-[#FCD53F]" />
                    {venue.services_provider_rating}
                  </div>
                  <div className="estimated-div-color items-end flex justify-between absolute bottom-0 w-full text-white z-10 px-[15px] py-2 text-[13px] md:text-[14px] xl:text-[16px]">
                    <span className="text-[#EB3465] text-[11px]">
                      Estimated Budget
                    </span>
                    {formatMultiPrice(venue.services_provider_price * currencyRate, currency)}/person
                  </div>
                  <div className="mk111">
                    <img
                      src={venue?.services_provider_image || productimage}
                      alt="venue"
                      className="h-[220px] w-full object-cover rounded-t-lg"
                    />
                  </div>
                </div>
                <div
                  className="p-[15px]"
                  onClick={(e) => {
                    handleCheckboxChange(venue);
                  }}
                >
                  <h2 className="capitalize mb-[10px] text-[16px] font-semibold text-white">
                    {venue.services_provider_name}
                  </h2>
                  <p className="text-[#ffffffc2] text-[13px] mt-2">
                    {venue.package_descrption}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col justify-center items-center mt-[30px] pb-[30px]">
          <Link
            to={selectedVenues.length > 0 ? `/payment-book/${id}` : "#"}
            className={`mt-4 px-[40px] py-[14px] font-[500] text-[16px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] ${selectedVenues.length > 0
              ? "cursor-pointer"
              : "cursor-not-allowed"
              }`}
            onClick={(e) => {
              if (selectedVenues.length <= 0) e.preventDefault();
            }}
          >
            Book Now
          </Link>

          <p className="mt-2 text-white text-center text-[14px]">
            You will then be able to add your event details
          </p>
        </div>
      </div>
    </>
  );
}