import React from 'react'
import visualimage from "../../../assets/home/visual.png"

export default function Visualize() {

  return (


    <div className="flex flex-col-reverse lg:flex-row items-center justify-between lg:space-x-8 py-12 bg-black lg:px-20 px-4">
      {/* Text Section */}
      <div className="lg:w-1/2 w-full text-center lg:text-left mb-8 lg:mb-0">
        <h2 className="text-3xl font-bold text-white mb-4">Visualize.</h2>
        <p className="text-[#CCCBCB] mb-6">
          Tell us all about your upcoming celebration! Whether it's the event type, location, or guest count, we're all ears.
          Help us help you in bringing your unique event to life.
        </p>
        <button className=" text-white px-6 py-3  shadow-md border-1 border-[#ffffff] ">
          Learn More
        </button>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <img
          src={visualimage}
          alt="Event Visualization"
          className="w-full lg:w-3/4 rounded-lg shadow-md"
        />
      </div>
    </div>
  )
}
