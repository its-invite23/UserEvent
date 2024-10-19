import React from 'react'
import planing from "../../../assets/home/planning.png"
import planning2 from "../../../assets/home/planning2.png"
import planning3 from "../../../assets/home/planning3.png"
import planning4 from "../../../assets/home/planning4.png"


export default function Places() {

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
        description: "No more wasted hours on calls or emails – simply input your needs and let our smart algorithm handle the rest, effortlessly."
      },

    ],
  };


  return (
    <div className="event-container  mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#000000]">
      <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">{eventData?.title} {eventData?.subtitle}</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {eventData.features.map((feature, index) => (
          <div key={index} className="p-4 bg-[#1B1B1B] shadow-md rounded-md">
            <img className="w-[24px] h-[24px] object-cover  mt-3 " src={feature.image} alt={feature.heading} />
            <h2 className="text-xl font-semibold text-[#FFFFFF] mt-3 ">{feature.heading}</h2>
            <p className="text-[#A9A4A8] mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
