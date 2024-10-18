import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function NextPreBtn({ onPrev, onNext, currentStep }) {
  return (
    <div className='flex items-center gap-[40px]'>
      <button
        className="flex items-center justify-center gap-[8px] w-[100%] min-w-[145px] px-[10px] py-[14px] rounded-[60px] border border-[#fff] bg-[#141414] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[16px] text-white text-center"
        onClick={onPrev}  // Attach the onPrev function
      >
        <FaArrowLeft /> Prev
      </button>
      {currentStep !== 10 && (

        <button
          className="flex items-center justify-center gap-[8px] w-[100%] min-w-[145px] px-[10px] py-[14px] border border-[#EB3465] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[16px] text-white text-center"
          onClick={onNext}  // Attach the onNext function
        >
          Next <FaArrowRight />
        </button>
      )}
    </div>
  )
}
