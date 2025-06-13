import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function NextPreBtn({ onPrev, onNext, currentStep }) {
  return (
    <div className='flex items-center gap-[10px] md:gap-[15px] justify-center'>
      <button
        className="flex items-center justify-center gap-[6px] w-[100%] min-w-[100px] md:min-w-[120px] px-[15px] py-[10px] md:py-[12px] rounded-[60px] border border-[#fff] bg-[#141414] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] md:text-[16px] text-white text-center"
        onClick={onPrev}
      >
        <FaArrowLeft size={14} /> Prev
      </button>
      {currentStep === 10 ? (
        <button
          className="flex items-center justify-center gap-[6px] w-[100%] min-w-[100px] md:min-w-[120px] px-[15px] py-[10px] md:py-[12px] border border-[#ff0062] hover:border hover:border-[#4400c3] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] md:text-[16px] text-white text-center"
          onClick={onNext}
        >
          Get Started <FaArrowRight size={14} />
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-[6px] w-[100%] min-w-[100px] md:min-w-[120px] px-[15px] py-[10px] md:py-[12px] border border-[#ff0062] hover:border hover:border-[#4400c3] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[14px] md:text-[16px] text-white text-center"
          onClick={onNext}
        >
          Next <FaArrowRight size={14} />
        </button>
      )}
    </div>
  )
}