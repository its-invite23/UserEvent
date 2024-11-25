import React from 'react'
import { IoArrowForward } from "react-icons/io5";
import homeBanner from "../../../assets/home/homebanner.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearAllVenues } from "../Redux/selectedVenuesSlice.js";
import { clearData } from "../Redux/formSlice.js";

export default function GetStarted() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  return (
    <div className=' pt-[180px] lg:pt-[210px] mt-[-150px]'>
      <div className='px-[15px]'>
      <h2 className='max-w-[1000px] lg:max-w-[800px]  xl:max-w-[1000px]  m-auto font-[manrope] font-[600] text-[35px] leading-[38px] md:text-[38px] md:leading-[38px] lg:text-[4.5em] lg:leading-[1.1em] xl:text-[6em] xl:leading-[1.1em] text-white text-center mb-[10px] mb-[20px]'>Celebrate like never before</h2>
      <h3 className='font-[manrope] font-[500] text-[17px] leading-[20px] md:text-[18px] mf:leading-[20px] lg:text-[22px] lg:leading-[22px]  text-[#ffffff8a] text-center mb-[60px]'>Everything you need for the perfect event, booked and paid for in one place.</h3>
      </div>
      <div className='relative z-[1] flex justify-center flex-wrap md:flex-nowrap items-center gap-[15px] px-[15px]'>
        <button className='flex items-center justify-center min-w-[220px] md:min-w-[160px] gap-[5px] bg-[#ff0062] hover:bg-[#4400c3] rounded-[3px] px-[27px] py-[18px] lg:px-[30px] lg:py-[15px] font-[manrope] font-[600] 
        text-[17px] text-white text-center'
        onClick={()=>{
          dispatch(clearData());
        dispatch(clearAllVenues());
          navigate("/askquestion");
        }}>
        Get Started <IoArrowForward size={25} />
        </button>
        <Link to="/package" className='flex  justify-center min-w-[220px] md:min-w-[160px] items-center gap-[5px] bg-[#404040] hover:bg-[#242424] rounded-[3px] px-[27px] py-[18px] lg:px-[30px] lg:py-[15px] font-[manrope] font-[600] text-[17px] text-white text-center'>Explore Packages <IoArrowForward size={25} /></Link>
      </div>

      
    </div>
  )
}
