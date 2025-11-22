import React from "react";
import "aos/dist/aos.css";

import Founder from "../../compontents/Founder";

export default function Contact() {

  return (
    <div id="contact" className="px-[15px]">
      <div className="w-full max-w-[1230px] mx-auto px-[15px] md:px-[40px] py-[30px] lg:py-[60px] bg-[#6517F3] rounded-[10px] md:rounded-[15px]">
        <div data-aos="zoom-in">
          <h2 className="mb-[10px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]">
            Book A Demo
          </h2>
          <p className="mb-[40px] font-manrope font-[600] text-[#ffffff] text-[16px] leading-[22px] text-center px-[0] md:px-[40px]  lg:px-[160px]">
            Have an event idea or want to join our network of event professionals? <br /> Send us a message : we’d love to hear from you !
          </p>
        </div>
          <Founder />
      </div>
    </div>
  );
}
