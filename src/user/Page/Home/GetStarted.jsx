import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllVenues } from "../Redux/selectedVenuesSlice.js";
import { clearData } from "../Redux/formSlice.js";
import { clearGoogleData } from "../Redux/GoogleData.jsx";

export default function GetStarted() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="pt-[120px] lg:pt-[150px] mt-[-100px]">
      <div className="px-[15px]">
        <h2 className="max-w-[1000px] lg:max-w-[800px] xl:max-w-[1000px] m-auto font-[manrope] font-[600] text-[28px] leading-[32px] md:text-[32px] md:leading-[36px] lg:text-[3.5em] lg:leading-[1.1em] xl:text-[4.5em] xl:leading-[1.1em] text-white text-center mb-[10px] mb-[15px]">
          Celebrate like never before
        </h2>
        <h3 className="font-[manrope] font-[500] text-[16px] leading-[18px] md:text-[17px] md:leading-[19px] lg:text-[20px] lg:leading-[22px] text-[#ffffff8a] text-center mb-[40px]">
          Everything you need for the perfect event, booked and paid for in one
          place.
        </h3>
      </div>
      <div className="relative z-[1] flex justify-center flex-wrap md:flex-nowrap items-center gap-[15px] px-[15px]">
        <button
          className="flex items-center justify-center min-w-[200px] md:min-w-[160px] gap-[5px] bg-[#ff0062] hover:bg-[#4400c3] rounded-[3px] px-[25px] py-[15px] lg:px-[28px] lg:py-[15px] font-[manrope] font-[600] 
        text-[16px] text-white text-center"
          onClick={() => {
            dispatch(clearData());
            dispatch(clearGoogleData());
            dispatch(clearAllVenues());
            navigate("/askquestion");
          }}
        >
          Get Started <IoArrowForward size={22} />
        </button>
        <button
          onClick={() => {
            dispatch(clearData());
            dispatch(clearGoogleData());
            dispatch(clearAllVenues());
            navigate("/package");
          }}
          className="flex justify-center min-w-[200px] md:min-w-[160px] items-center gap-[5px] bg-[#242424] hover:bg-[#404040] rounded-[3px] px-[25px] py-[15px] lg:px-[28px] lg:py-[15px] font-[manrope] font-[600] text-[16px] text-white text-center"
        >
          <FaCaretRight size={22} /> Explore Packages
        </button>
      </div>
    </div>
  );
}