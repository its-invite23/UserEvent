  import React, { useState, useEffect } from "react";
  import { IoStar } from "react-icons/io5";
  import { Link } from "react-router-dom";
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { Pagination, Autoplay } from "swiper/modules";
  import { useDispatch, useSelector } from "react-redux";
  import { addVenue, removeVenue } from "../Redux/selectedVenuesSlice";

  const fetchPhotoURL = (photoReference) => {
    const apiKey = "AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58"; // Replace with your API Key
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  export default function ServicesProvider({data}) {
    const [activeTab, setActiveTab] = useState("Venue");
    const tabs = ["Venue", "Catering", "Activity", "Other"];
    const selectedVenues = useSelector((state) => state.selectedVenues.selectedVenues);
    const addGoogleData = useSelector((state) => state.form.form);
    console.log("addGoogleData", addGoogleData);
    const dispatch = useDispatch();

    const handleCheckboxChange = (venue) => {  
      const isVenueSelected = selectedVenues.some(selected => selected.place_id === venue.place_id);
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
          <div className="w-[96%] max-w-[520px] m-auto mb-[40px] grid grid-cols-4 gap-[2px] lg:gap-4 bg-[#29282D] rounded-[60px] p-[5px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-1 px-[5px] py-[5px] sm:px-[12px] sm:py-[16px] md:px-[15px] md:py-[12px] text-[12px] md:text-[15px] lg:text-lg font-semibold border-b-2 transition-all rounded-[60px] duration-300 ${
                  activeTab === tab
                    ? "bg-[#EB3465] text-[#ffffff] border-[#EB3465]"
                    : "border-transparent text-[#ffffff8f]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addGoogleData && addGoogleData[0]?.map((venue, index) => (
              <div
                className={`bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col ${
                  selectedVenues.some((selected) => selected.place_id === venue.place_id)
                    ? "border-2 border-[#D7F23F]"
                    : ""
                }`}
                onClick={() => handleCheckboxChange(venue)}
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
                      />
                      <label htmlFor={`estimate-${index}`}></label>
                    </div>
                  </div>
                  <div className="mk">
                    <Swiper
                      cssMode={true}
                      navigation={true}
                      pagination={false}
                      mousewheel={true}
                      keyboard={true}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      modules={[Pagination, Autoplay]}
                      className="mySwiper"
                    >
                      {venue.photos?.map((photo, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                        {getPhotoUrls(venue.photos)?.map((url, imgIndex) => (
                  <img key={imgIndex} src={url} alt={venue.name} className="h-[400px] w-full object-cover" />
                ))}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="p-[15px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                      <IoStar size={17} className="text-[#FCD53F]" />
                      {venue.rating}
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-white block">{venue?.price_level}</p>
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
          <div className="flex justify-center mt-[30px]">
            <Link
              to="/payment-book"
              className="mt-4 px-[50px] py-[17px] font-[500] text-white text-[18px] rounded bg-[#EB3465] hover:bg-[#fb3a6e] transition duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </>
    );
  }
