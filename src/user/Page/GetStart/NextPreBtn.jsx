import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function NextPreBtn({ onPrev, onNext, currentStep }) {
  return (
    <div className='flex items-center gap-[10px] md:gap-[20px]'>
      <button
        className="flex items-center justify-center gap-[8px] w-[100%] min-w-[120px] md:min-w-[140px] px-[10px] py-[12px] md:py-[14px] rounded-[60px] border border-[#fff] bg-[#141414] hover:bg-[#4400c3] font-[manrope] font-[600] text-[13px] md:text-[16px] text-white text-center"
        onClick={onPrev}  // Attach the onPrev function
      >
        <FaArrowLeft /> Prev
      </button>
      {currentStep !== 10 && (

        <button
          className="flex items-center justify-center gap-[8px] w-[100%] min-w-[120px] md:min-w-[140px]  px-[10px] py-[12px] md:py-[14px] border border-[#ff0062]  hover:border hover:border-[#4400c3] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[13px] md:text-[16px] text-white text-center"
          onClick={onNext}  // Attach the onNext function
        >
          Next <FaArrowRight />
        </button>
      )}
    </div>
  )
}
