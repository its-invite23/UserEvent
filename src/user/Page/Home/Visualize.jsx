import React from 'react'
import visualimage from "../../../assets/home/visual.png"

export default function Visualize() {

  return (


    <div className="grid grid-cols-1 md:grid-cols-2 w-[100%] max-w-[1200px] m-auto px-[15px] py-[50px] md:py-[100px]">
      {/* Text Section */}
      <div className="flex-col content-center pr-[10px] pb-[30px] md:pb-[0]">
        <h2 className="text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-[manrope] font-bold text-white mb-[12px]">Visualize.</h2>
        <p className="text-[#CCCBCB] mb-[40px] pr-[2px] lg:pr-[40px]">
          Tell us all about your upcoming celebration! Whether it's the event type, location, or guest count, we're all ears.
          Help us help you in bringing your unique event to life.
        </p>
        <button className=" text-white px-6 py-3  border border-[#A9A4A8] rounded-[3px] bg-[#000] hover:bg-[#fff] hover:text-[#000] ">
          Learn More
        </button>
      </div>

      {/* Image Section */}
      <div className=" flex justify-end">
        <img
          src={visualimage}
          alt="Event Visualization"
          className="w-full lg:w-3/4 rounded-lg shadow-md"
        />
      </div>
    </div>
  )
}
