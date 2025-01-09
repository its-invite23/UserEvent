import React from "react";
import Header from "../../compontents/Header";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Header />
      <div className="flex h-full flex-col justify-center items-center">
        <h1 className="px-[15px] mb-[20px] font-manrope font-[700] text-[30px] md:text-[60px] lg:text-[60px] xl:text-[92px] leading-[40px] md:leading-[60px] lg:leading-[70px] xl:leading-[95px] text-white text-center">
          Sign up and start <br /> celebrating
        </h1>
        <div className="flex items-center justify-center gap-[10px] px-[15px]">
          <Link
            to="/sign-up"
            className="px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#ff0062] hover:bg-[#4400c3] rounded-[3px]"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#242424] hover:bg-[#404040]  rounded-[3px]"
          >
            Log In
          </Link>

        </div>
      </div>
    </div>
  );
}
