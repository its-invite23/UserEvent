import React, { useEffect, useState } from "react";
import productimage from "../../../assets/product.png";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import {  Pagination, Autoplay  } from "swiper/modules";
export default function ServicesProvider() {
  const [activeTab, setActiveTab] = useState("Venue");
  const tabs = ["Venue", "Catering", "Activity", "Other"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 2000); // Change tab every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [tabs]);
  const venues = [
    {
      name: "Skybar Paris",
      rating: "4.8",
      price: "$100/person",
      imageUrl: productimage,
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
    {
      name: "Elysian Spaces",
      rating: "4.8",
      price: "$200/person",
      imageUrl: productimage,
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
    {
      name: "Vista Venues",
      rating: "4.8",
      price: "$100/person",
      imageUrl: productimage,
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
    {
      name: "Eventique Studios",
      rating: "4.8",
      price: "$180/person",
      imageUrl: productimage,
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
    {
      name: "Aura Arena",
      rating: "4.8",
      price: "$150/person",
      imageUrl: productimage,
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
    {
      name: "The Venue Vault",
      rating: "4.8",
      imageUrl: productimage,
      price: "$200/person",
      description:
        "Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.",
    },
  ];
  return (
    <>
      <div className="w-[96%] max-w-[1230px] m-auto mt-[60px] md:mt-[60px] lg:mt-[120px]">
        <h2 className="mb-[40px] px-[15px] font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[30px] md:text-[38px] md:leading-[40px]  lg:text-[48px] lg:leading-[60px] text-white text-center">
          Select your service providers
        </h2>

        <div className="w-[96%] max-w-[520px] m-auto mb-[40px] grid  grid-cols-4 gap-[2px] lg:gap-4 bg-[#29282D] rounded-[60px] p-[5px]">
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
          {venues.map((venue, index) => (
            <div className="bg-[#1B1B1B] shadow-md rounded-lg m-2 flex flex-col">
              <div className="relative">
                <div className="absolute left-[15px] top-[15px] z-50">
                  <div className="form-checkbx ">
                    <input type="checkbox" id="estimate" />
                    <label for="estimate"></label>
                  </div>
                </div>
                <div className="mk">
                  <Swiper
                    cssMode={true}
                    navigation={true} // Disable default navigation
                    pagination={false}
                    mousewheel={true}
                    keyboard={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Pagination , Autoplay]} // Remove Navigation module
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        src={venue.imageUrl}
                        alt={venue.name}
                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={venue.imageUrl}
                        alt={venue.name}
                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={venue.imageUrl}
                        alt={venue.name}
                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={venue.imageUrl}
                        alt={venue.name}
                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="p-[15px]">
                <div className="flex itmes-center justify-between">
                  <div className="flex items-center gap-[10px] h-[38px] text-white bg-[#000] rounded-[60px] px-[15px] py-[2px] text-[14px] leading-[15px]">
                    <IoStar size={17} className="text-[#FCD53F]" />
                    {venue.rating}
                  </div>
                  <div className="flex flex-col  items-end justify-between">
                    <p className="text-white block ">{venue.price}</p>
                    <span className="text-[#EB3465] text-[12px]">
                      Estimated Budget:
                    </span>
                  </div>
                </div>

                <h2 className="mt-[15px] mb-[15px] text-[18px] font-semibold text-white">
                  {venue.name}
                </h2>
                <p className="text-[#ffffffc2] text-[14px] mt-2">
                  {venue.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[30px]">
          <Link
            to="/payment-book"
            className="mt-4 px-[50px] py-[17px] font-[500] text-white text-[18px] rounded  bg-[#EB3465] hover:bg-[#fb3a6e] transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
