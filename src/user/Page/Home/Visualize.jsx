import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import visualizeimg from "../../../assets/home/visualizeimg.jpg";
import relaximg from "../../../assets/home/relaximg.jpg";
import celebrateimg from "../../../assets/home/celebrateimg.png";

export default function Visualize() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);
  return (

    <div>
      <div className="flex gap-[10px] flex-wrap flex-row-reverse md:flex-nowrap max-w-[1200px] m-auto px-[15px] pt-[50px] md:pt-[100px]">
       {/* Text Section */}
        <div className="flex flex-col items-center justify-center  w-[100%] md:w-[50%] content-center pt-[20px] md-pt-[0] pb-[30px] md:pb-[0]">
          <div className="max-w-[100%] md:max-w-[80%]">
            <h2 className="text-[20px] leading-[20px] md:text-[50px] md:leading-[55px] lg:text-[80px] lg:leading-[85px] font-[manrope] font-bold text-white mb-[12px]">
              Visualize.
            </h2>
            <p className="text-[#CCCBCB] mb-[20px] md:mb-[40px] text-[16px] md:text-[25px]">
              Tell us all about your upcoming celebration! Whether it's the
              event type, location, or guest count, we're all ears. Help us help
              you in bringing your unique event to life.
            </p>
            <button className=" text-white px-6 py-3  border border-[#A9A4A8] rounded-[3px] bg-[#000] hover:bg-[#fff] hover:text-[#000] ">
              Learn More
            </button>
          </div>
        </div>

         {/* Image Section */}
         <div data-aos="zoom-in" className=" w-[100%] md:w-[50%] flex">
          <img
            src={visualizeimg}
            alt="Event Visualization"
            className="w-full rounded-[10px]"
          />
        </div>
      </div>

      <div className="flex gap-[10px] flex-wrap 1flex-row-reverse md:flex-nowrap max-w-[1200px] m-auto px-[15px] py-[20px] md:py-[100px]">
        {/* Text Section */}
        <div className="flex flex-col items-center justify-center  w-[100%] md:w-[50%]  content-center pt-[20px] md-pt-[0] pb-[30px] md:pb-[0]">
          <div className="max-w-[100%] md:max-w-[80%]">
            <h2 className="text-[20px] leading-[20px] md:text-[50px] md:leading-[55px] lg:text-[80px] lg:leading-[85px] font-[manrope] font-bold text-white mb-[12px]">
              Relax.
            </h2>
            <p className="text-[#CCCBCB] mb-[20px] md:mb-[40px] text-[16px] md:text-[25px]">
              Choose from our tailored suggestions of top-notch service
              providers to bring your event to life. Let our algorithm handle
              the hard work!"
            </p>
            <button className=" text-white px-6 py-3  border border-[#A9A4A8] rounded-[3px] bg-[#000] hover:bg-[#fff] hover:text-[#000] ">
              Learn More
            </button>
          </div>
        </div>

         {/* Image Section */}
         <div data-aos="zoom-in" className=" w-[100%] md:w-[50%] flex">
          <img
            src={relaximg}
            alt="Event Visualization"
            className="w-full rounded-[10px]"
          />
        </div>
      </div>


      <div className="flex gap-[10px] flex-wrap flex-row-reverse md:flex-nowrap max-w-[1200px] m-auto px-[15px] pb-[40px] md:pb-[100px]">
        {/* Text Section */}
        <div className="flex flex-col items-center justify-center  w-[100%] md:w-[50%] content-center pt-[20px] md-pt-[0] pb-[30px] md:pb-[0]">
          <div className="max-w-[100%] md:max-w-[80%]">
            <h2 className="text-[20px] leading-[20px] md:text-[50px] md:leading-[55px] lg:text-[80px] lg:leading-[85px] font-[manrope] font-bold text-white mb-[12px]">
              Celebrate.
            </h2>
            <p className="text-[#CCCBCB] mb-[20px] md:mb-[40px] text-[16px] md:text-[25px]">
              Your event is flawlessly arranged to match your vision. Just sit back, and experience the magic - we've got everything under control!"
            </p>
            <button className=" text-white px-6 py-3  border border-[#A9A4A8] rounded-[3px] bg-[#000] hover:bg-[#fff] hover:text-[#000] ">
              Learn More
            </button>
          </div>
        </div>

         {/* Image Section */}
         <div data-aos="zoom-in" className=" w-[100%] md:w-[50%] flex">
          <img
            src={celebrateimg}
            alt="Event Visualization"
            className="w-full rounded-[10px]"
          />
        </div>
      </div>


    </div>
  );
}
