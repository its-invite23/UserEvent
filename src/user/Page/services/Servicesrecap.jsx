import React, { useEffect, useState } from "react";
import ServicesProvider from "./ServicesProvider";
import Lockicon from "../../../assets/lockicon.png";
import { useParams } from "react-router-dom";
import Listing from "../../../Api/Listing";
import moment from "moment/moment";

export default function Servicesrecap({ formData }) {
  const { id } = useParams()
  console.log(id)
  const [data, setData] = useState("");
  const fetchApi = async () => {
    try {
      const main = new Listing();
      const response = await main.getServices({ Id: id });
      console.log("getServices", response);
      setData(response?.data?.data)
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchApi(id);
    }
  }, [id]);

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <div className="w-[96%] max-w-[1200px] m-auto mt-[60px] bg-[#1B1B1B] rounded-lg container mx-auto ">
        <h1 className="text-[30px] md:text-[40px] font-[700] px-[30px] py-[15px] border-b border-b-[#ffffff21] mb-[2px] lg:mb-[20px] text-white">
          <span className="text-[#EB3465]">Event </span> recap
        </h1>
        <div className="px-[20px] py-[20px] lg:px-[40px] lg:py-[40px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[20px] py-[2px] md:py-[20px] ">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">📅 Date:</p>
              <p className="text-white text-[15px] md:text-[18px] xl:text-[25px]">
                {moment(data?.created_at).format("DD MMM YYYY")} ||{formData?.date}
              </p>
            </div>
            <div className="rounded-lg">
              <p className="text-[#EB3465]">🗺️ Location:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">Paris, 75th district || {formData?.area}</p>
            </div>
            <div className="rounded-lg">
              <p className="text-[#EB3465]">🥳 Event Name:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">{data?.package_name} || {formData?.event_type}</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">👥 Number of Attendees:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">{data?.package_people} || {data?.people}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-[10px] md:py-[20px]">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">🍔 Food:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">{data?.package_categories?.join(",", "")
              } || {formData?.food_eat}</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">💵 Budget:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">${data?.package_price_min}-{data?.package_price_max} || {formData?.budget}</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">🎳 Activity:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">Bowling, DJ || {data?.activity}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 gap-[20px] py-[2px] md:py-[20px]">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">🎉 Vibe and Atmosphere:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">
                Casual and fun with a rooftop/terrace vibe
              </p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">✉️ Email:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">{formData?.email || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 py-[20px]">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]">⌛ Duration:</p>
              <p className="text-white  text-[15px] md:text-[18px] xl:text-[25px]">
                Typically, such events last 4-6 hours, but this can be
                adjusted based on your preferences.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="flex items-center mt-4 px-[10px] py-[14px] md:px-[20px] md:py-[18px] lg:px-[30px] lg:py-[20px] gap-[3px] md:gap-[8px] bg-[#EB3465] hover:bg-[#fb3a6e] fount-[700] text-[13px] sm:text-[14px] md:text-[18px] text-white rounded hover:bg-[#EB3465] transition duration-300">
              <img src={Lockicon} alt="" /> Unlock your custom-made event <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29425e-05 8.88336H11.5861L7.08606 13.3834L8.50006 14.7974L15.4141 7.88336L8.50006 0.969364L7.08606 2.38336L11.5861 6.88336L6.29425e-05 6.88336V8.88336Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ServicesProvider />
    </div>
  );
}
