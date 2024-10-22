import React, { useEffect, useState } from 'react'
import productimage from "../../../assets/product.png"
import { IoStar } from "react-icons/io5";

export default function ServicesProvider() {
  const [activeTab, setActiveTab] = useState("Venue");
  const tabs = ["Venue", "Catering", "Activity", "Other"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 2000); // Change tab every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [tabs]);
  const venues = [
    {
      name: 'Skybar Paris',
      rating: '4.8',
      price: '$100/person',
      imageUrl: productimage,
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
    {
      name: 'Elysian Spaces',
      rating: '4.8',
      price: '$200/person',
      imageUrl: productimage,
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
    {
      name: 'Vista Venues',
      rating: '4.8',
      price: '$100/person',
      imageUrl: productimage,
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
    {
      name: 'Eventique Studios',
      rating: '4.8',
      price: '$180/person',
      imageUrl: productimage,
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
    {
      name: 'Aura Arena',
      rating: '4.8',
      price: '$150/person',
      imageUrl: productimage,
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
    {
      name: 'The Venue Vault',
      rating: '4.8',
      imageUrl: productimage,
      price: '$200/person',
      description: 'Located in the Montparnasse area, Skybar Paris offers a chic and modern rooftop experience with breathtaking views of Paris.',
    },
  ];
  return (
    <>
    <h2 className='px-[15px] font-manrope font-[700] text-[30px] leading-[40px]  md:text-[60px] md:leading-[80px] lg:text-[92px] lg:leading-[92px] text-white text-center pt-[100px] pb-[40px] md:pb-[80px] lg:pb-[100px]'>
    Select your service providers
    </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-500'>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`flex-1 p-2 text-lg font-semibold border-b-2 transition-all duration-300 ${activeTab === tab
                ? "bg-[#EB3465] text-[#ffffff] border-[#EB3465]"
                : "border-transparent text-[#ffffff]"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {venues.map((venue, index) => (
          <div className="bg-[#1B1B1B] shadow-md rounded-lg p-4 m-2 flex flex-col">
            <img src={venue.imageUrl} alt={venue.name} className="h-48 w-full object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-semibold text-white">{venue.name}</h2>
            <p className="text-white flex bg-[#000] rounded-lg">
              <IoStar size={24} className='text-[#FCD53F]' />
              {venue.rating}</p>
            <p className="text-white block ">{venue.price}
              <span className='text-[#EB3465]'>
                Estimated Budget:
              </span>

            </p>
            <p className="text-[#FFFFFF] mt-2">{venue.description}</p>
          </div>
        ))}
      </div>
      <div  className='flex justify-center'>

      <button
          className="mt-4 px-6 py-2 bg-[#EB3465] text-white rounded hover:bg-[#EB3465] transition duration-300"
        >
         Book Now
        </button>
      </div>
    </>
  )
}
