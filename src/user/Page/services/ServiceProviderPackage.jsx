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

  // Safety check for package_services
  const packageServices = Array.isArray(data?.package_services) ? data.package_services : [];
  
  const filteredServices = packageServices.filter(
    (service) =>
      service?.services_provider_categries?.toLowerCase() ===
      activeTab.toLowerCase()
  );

  console.log('Package services:', packageServices);
  console.log('Filtered services for tab', activeTab, ':', filteredServices);

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
            <span className="text-[#EB3465] text-center flex-1 capitalize">
              {data?.package_name || 'Event Package'}
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
          <div className="flex-row w-[96%] mb-[40px] max-w-[520px] relative mx-auto flex h-[44px] md:h-[62px] lg:h-[63px] border border-black/40 bg-neutral-800 px-1 backdrop-blur-sm rounded-[60px]">
            <span
              className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-[60px] py-1 transition-all duration-300"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            >
              <span className="h-full w-full rounded-3xl bg-[#4400c3] border-[#4400c3]" />
            </span>
            {Array.isArray(tabs) && tabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <button
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`${isActive
                    ? "text-[#ffff]"
                    : "text-[#ffffff8f] hover:text-white"
                    } flex-1 capitalize px-[5px] sm:px-[12px] md:px-[15px] text-[14px] md:text-[15px] lg:text-lg font-semibold rounded-[60px]`}
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
          {Array.isArray(filteredServices) && filteredServices.length > 0 ? (
            filteredServices.map((venue, index) => {
              // Ensure venue has required properties with fallbacks
              const safeVenue = {
                place_id: venue?.place_id || venue?.id || `package_${index}_${Date.now()}`,
                services_provider_name: venue?.services_provider_name || 'Unnamed Provider',
                services_provider_image: venue?.services_provider_image || productimage,
                services_provider_rating: venue?.services_provider_rating || 0,
                services_provider_price: venue?.services_provider_price || 0,
                package_descrption: venue?.package_descrption || venue?.description || '',
                ...venue
              };

              return (
                <div
                  className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${selectedVenues.some(
                    (selected) => selected?.place_id === safeVenue?.place_id
                  )
                    ? "border-2 border-[#D7F23F]"
                    : "border-2 border-transparent"
                    }`}
                  key={safeVenue.place_id}
                >
                  <div className="relative">
                    <div className="absolute left-[15px] top-[15px] z-50">
                      <div className="form-checkbx">
                        <input
                          type="checkbox"
                          id={`estimate-${safeVenue.place_id}`}
                          checked={selectedVenues.some(
                            (selected) => selected?.place_id === safeVenue?.place_id
                          )}
                          onChange={() => handleCheckboxChange(safeVenue)}
                        />
                        <label htmlFor={`estimate-${safeVenue.place_id}`}></label>
                      </div>
                    </div>
                    {safeVenue.services_provider_rating > 0 && (
                      <div className="absolute right-[8px] top-[8px] flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                        <IoStar size={17} className="text-[#FCD53F]" />
                        {safeVenue.services_provider_rating}
                      </div>
                    )}
                    <div className="estimated-div-color items-end flex justify-between absolute bottom-0 w-full text-white z-10 px-[15px] py-2 text-[15px] md:text-[16px] xl:text-[18px]">
                      <span className="text-[#EB3465] text-[12px]">
                        Estimated Budget
                      </span>
                      {formatMultiPrice(safeVenue.services_provider_price * currencyRate, currency)}/person
                    </div>
                    <div className="mk111">
                      <img
                        src={safeVenue.services_provider_image}
                        alt="venue"
                        className="h-[300px] w-full object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.src = productimage;
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="p-[15px]"
                    onClick={(e) => {
                      handleCheckboxChange(safeVenue);
                    }}
                  >
                    <h2 className="capitalize mb-[15px] text-[18px] font-semibold text-white">
                      {safeVenue.services_provider_name}
                    </h2>
                    <p className="text-[#ffffffc2] text-[14px] mt-2">
                      {safeVenue.package_descrption}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-white py-8">
              <p>No services available for {activeTab} category.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center mt-[30px]">
          <Link
            to={selectedVenues.length > 0 ? `/payment-book/${id}` : "#"}
            className={`mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] ${selectedVenues.length > 0
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