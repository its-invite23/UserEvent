import React from "react";
import Header from "../../compontents/Header";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div className="bg-black h-screen ">
      <Header />
      <div className="pt-[50px] md:pt-[80px] lg:pt-[80px] xl:pt-[190px]">
        <h1 className="px-[15px] mb-[20px] font-manrope font-[700] text-[30px]  md:text-[60px]  lg:text-[60px] xl:text-[92px] leading-[40px] md:leading-[60px] lg:leading-[70px] xl:leading-[95px] text-white text-center p-[15px]  ">
          Sign up and start <br /> celebrating
        </h1>
        <div className="flex items-center justify-center gap-[10px] px-[15px]">
          <Link
            to="/sign-up"
            className="px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#EB3465] hover:bg-[#fb3a6e] rounded-[3px]"
          >Sign Up</Link>
          <Link
            to="/login"
            className="px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#1E1E1E] hover:bg-[#323232] rounded-[3px]"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
