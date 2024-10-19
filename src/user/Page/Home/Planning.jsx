import React from 'react'
import Suggestions from "../../../assets/home/Suggestions.png"
import packages from "../../../assets/home/packages.png"

export default function Planning() {

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
  <div className="event-container   mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#000000]">
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {eventData.features.map((feature, index) => (
        <div key={index} className="p-4 bg-[#1B1B1B] shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-[#FFFFFF] mt-3 ">{feature.heading}</h2>
          <p className="text-[#A9A4A8] mt-2">{feature.description}</p>
          <img className="w-[250px] h-[300px] object-cover  mt-3 " src={feature.image} alt={feature.heading} />
        </div>
      ))}
    </div>

  </div>
    </>
  )
}
