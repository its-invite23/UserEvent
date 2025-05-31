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
import Submit from "./Submit";
import LoadingSpinner from "../../compontents/LoadingSpinner";
import RecommendationService from "../../../services/RecommendationService";

export default function ServicesProvider({ data, description, googleloading }) {
  const tabs = ["Venue", "Catering", "Activity", "Other"];
  const tabsRef = useRef([]);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Venue");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const formData = useSelector((state) => state.form.updatedFormData);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const results = await RecommendationService.getEventProviders(formData);
        console.log("Fetched recommendations:", results);
        setRecommendations(results);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
      setLoading(false);
    };

    if (formData && Object.keys(formData).length > 0) {
      fetchRecommendations();
    }
  }, [formData]);

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

  const selectedVenues = useSelector(
    (state) => state.selectedVenues.selectedVenues
  );

  const handleCheckboxChange = (venue) => {
    const updatedVenue = { ...venue, category: activeTab.toLowerCase() };
    const isVenueSelected = selectedVenues.some(
      (selected) => selected.place_id === updatedVenue.place_id
    );
    if (isVenueSelected) {
      dispatch(removeVenue(updatedVenue.place_id));
    } else {
      dispatch(addVenue(updatedVenue));
    }
  };

  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const getPhotoUrls = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
      return photos
        .map((photo) => {
          if (photo?.photo_reference) {
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apikey}`;
          }
          return null;
        })
        .filter(Boolean);
    }
    return [];
  };

  return (
    <>
      <div className="w-[96%] max-w-[1230px] m-auto mt-[60px] md:mt-[60px] lg:mt-[40px]">
        <h2 id="services_provider" className="mb-[30px] px-[15px] font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[30px] md:text-[38px] md:leading-[40px] lg:text-[48px] lg:leading-[60px] text-white text-center">
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
            {tabs.map((tab, index) => {
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

        {loading || googleloading ? (
          <LoadingSpinner />
        ) : (
          <>
            {recommendations && recommendations[activeTab.toLowerCase()] && recommendations[activeTab.toLowerCase()].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations[activeTab.toLowerCase()].map((venue, index) => (
                  <div
                    key={index}
                    className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${
                      selectedVenues.some(
                        (selected) => selected.place_id === venue.place_id
                      )
                        ? "border-2 border-[#D7F23F]"
                        : "border-2 border-transparent"
                    }`}
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

                      {venue.rating && (
                        <div className="absolute right-[8px] top-[8px] flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                          <IoStar size={17} className="text-[#FCD53F]" />
                          {venue.rating}
                        </div>
                      )}

                      <Swiper
                        cssMode={true}
                        navigation={false}
                        pagination={{
                          clickable: true,
                        }}
                        mousewheel={true}
                        keyboard={true}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper relative"
                      >
                        {venue.photos ? (
                          venue.photos.map((photo, photoIndex) => (
                            <SwiperSlide key={photoIndex}>
                              <img
                                src={photo}
                                alt={venue.name}
                                className="h-[300px] w-full object-cover rounded-t-lg"
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <img
                            src={productimage}
                            alt="default"
                            className="h-[300px] w-full object-cover"
                          />
                        )}
                      </Swiper>
                    </div>

                    <div className="p-[15px]">
                      <h2 className="capitalize mb-[15px] text-[18px] font-semibold text-white">
                        {venue.name}
                      </h2>
                      <p className="text-[#ffffffc2] text-[14px] mt-2">
                        {venue.address}
                      </p>
                      {venue.opening_hours && (
                        <p className="text-[#ffffffc2] text-[14px] mt-2">
                          Hours: {venue.opening_hours}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Submit steps={2} />
            )}

            {recommendations && (
              <div className="flex flex-col justify-center items-center mt-[30px]">
                <Link
                  to={selectedVenues.length > 0 ? `/payment-book` : "#"}
                  className={`mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] ${
                    selectedVenues.length > 0
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
                <Submit steps={1} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}