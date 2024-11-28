import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Suggestions from "../../../assets/home/tailoredeventimg.png"
import packages from "../../../assets/home/personalizexpbanner.png"

export default function Planning() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);
  const eventData = {
    features: [
      {
        image: Suggestions,
        heading: "Tailored Event Packages",
        description: "Explore handpicked event packages, carefully curated by experts to fit your unique style and needs, making planning a breeze."
      },
      {
        image: packages,
        heading: "Personalize Your Experience",
        description: "Choose your favorite package, then personalize it with ease—swap, add, or adjust services to create an event that’s uniquely yours."
      },


    ],
  };

  return (
    <>



      <div className="event-container   w-100 max-w-[1230px] m-auto pt-[40px] px-[15px] pb-[40px] md:pb-[80px]">
        <div className="grid gap-6 grid-cols-1  md:grid-cols-2 ">
          {eventData.features.map((feature, index) => (
            <div key={index} className="pt-[15px] md:pt-[20px] lg:pt-[50px] px-[15px] md:ps-[20px] lg:px-[50px] bg-[#1B1B1B] rounded-[10px] md:rounded-[20px]">
              <h2 className="font-manrope font-[600] text-[20px] md:text-[24px] lg:text-[32px] leading-[23px] md:leading-[26px] lg:leading-[32px] text-[#FFFFFF] mb-[15px] ">{feature.heading}</h2>
              <p className="pr-[2px] md:pr-[20px] pr-[100px] font-manrope text-[16px] leading-[20px] text-[#A9A4A8] mb-[10px] md:mb-[20px] lg:mb-[40px]">{feature.description}</p>
              <div data-aos="zoom-in-up" data-aos-delay="300" className="">
                <img className="object-cover max-w-[250px] md:max-w-[300px] lg:max-w-[400px] mt-3 mx-auto " src={feature.image} alt={feature.heading} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
