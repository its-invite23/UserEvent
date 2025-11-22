import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import planing from "../../../assets/home/planning.png"
import planning2 from "../../../assets/home/planning2.png"
import planning3 from "../../../assets/home/planning3.png"
import planning4 from "../../../assets/home/planning4.png"

export default function Places() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);
  const eventData = {
    title: "All-in-one app for event planning :",
    subtitle: "book everything and pay in one place",
    features: [
      {
        image: planning2,

        heading: "Effortless Planning",
        description: "No more wasted hours on calls or emails – simply input your needs and let our smart algorithm handle the rest, effortlessly."
      },
      {
        image: planing,
        heading: "Personalized recommendations",
        description: "Our AI algorithm curates a tailored list of service providers, ensuring a unique and memorable event experience for you."
      },
      {
        image: planning4,

        heading: "Time-Saving",
        description: "Our platform streamlines the planning process, enabling you to organize the perfect event in record time, with ease."
      },
      {
        image: planning3,

        heading: "All-in-one",
        description: "From venues to caterers to entertainment, INVITE houses all your event planning needs under one simple, digital roof."
      },

    ],
  };


  return (
    <div className="event-container  w-full max-w-[1230px] mx-auto px-[15px]">
      <h2 className="font-[manrope] font-[700] text-[17px] md:text-[36px] lg:text-[40px] leading-[25px]  md:leading-[36px] lg:leading-[45px] 
      mb-[1px] text-white  text-center">{eventData?.title} </h2>

      <h2 className="font-[manrope] font-[700] text-[17px] md:text-[36px] lg:text-[40px] leading-[20px]  md:leading-[36px] lg:leading-[45px] 
      mb-[20px] md:mb-[30px] lg:mb-[50px] text-white  text-center">{eventData?.subtitle} </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {eventData.features.map((feature, index) => (
          <div data-aos="zoom-in" key={index} className="p-[15px] md:p-[20px] lg:p-[30px] pb-[40px] bg-[#1B1B1B] shadow-md rounded-[10px] lg:rounded-[15px]">
            <img className="w-[24px] h-[24px] object-cover  mt-3 " src={feature.image} alt={feature.heading} />
            <h2 className="text-[20px] leading-[22px] font-semibold text-[#FFFFFF] mt-[30px] ">{feature.heading}</h2>
            <p className="text-[#A9A4A8] mt-2 ">{feature.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
