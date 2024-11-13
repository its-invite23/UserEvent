import React from 'react'
import { IoArrowForward } from "react-icons/io5";
import homeBanner from "../../../assets/home/homebanner.png";
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div className=' pt-[180px] lg:pt-[210px] mt-[-150px]'>
      <div className='px-[15px]'>
      <h2 className='font-[manrope] font-[600] text-[22px] leading-[22px] md:text-[38px] md:leading-[38px] lg:text-[48px] lg:leading-[48px] text-white text-center mb-[10px] mb-[20px]'>Celebrate like never before</h2>
      <h3 className='font-[manrope] font-[500] text-[17px] leading-[20px] md:text-[18px] mf:leading-[20px] lg:text-[22px] lg:leading-[22px]  text-[#ffffff8a] text-center mb-[30px]'>Everything you need for the perfect event, booked and paid for in one place.</h3>
      </div>
      <div className='relative z-[1] flex justify-center flex-wrap md:flex-nowrap items-center gap-[15px] px-[15px]'>
        <Link to="/askquestion" className='flex items-center gap-[5px] bg-[#EB3465] hover:bg-[#fb3a6e] rounded-[3px] px-[20px] py-[12px] lg:px-[30px] lg:py-[15px] font-[manrope] font-[600] text-[14px] text-white text-center'>Get Started <IoArrowForward size={25} /></Link>
        <Link to="/package" className='flex items-center gap-[5px] bg-[#404040] hover:bg-[#242424] rounded-[3px] px-[20px] py-[12px] lg:px-[30px] lg:py-[15px] font-[manrope] font-[600] text-[14px] text-white text-center'>Explore Packages <IoArrowForward size={25} /></Link>
      </div>

      <div className='relative 1overflow-hidden bg-[#000] pt-[100px] px-[15px]'>
        <div className='flex justify-center absolute top-[-320px] lg:top-[-250px] left-[0] right-[0] m-auto'>
          <svg width="1388" height="708" viewBox="0 0 1388 708" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_51_369)">
              <ellipse cx="884.5" cy="470" rx="260.5" ry="223" fill="#67418A" />
            </g>
            <g filter="url(#filter1_f_51_369)">
              <ellipse cx="539.5" cy="543" rx="260.5" ry="223" fill="#EB3465" />
            </g>
            <defs>
              <filter id="filter0_f_51_369" x="345.6" y="-31.4" width="1077.8" height="1002.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="139.2" result="effect1_foregroundBlur_51_369" />
              </filter>
              <filter id="filter1_f_51_369" x="0.600006" y="41.6" width="1077.8" height="1002.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="139.2" result="effect1_foregroundBlur_51_369" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className='relative z-[5] flex justify-center mt-[-62px]'>
          <img src={homeBanner} alt="img" />
        </div>
      </div>
    </div>
  )
}
