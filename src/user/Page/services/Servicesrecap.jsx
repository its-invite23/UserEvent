import React from 'react'
import UserLayout from '../../Layout/UserLayout'
import ServicesProvider from './ServicesProvider'

export default function Servicesrecap() {
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
      <UserLayout>
        <div className='bg-[#1B1B1B] rounded-lg container mx-auto p-4 '>
          <h1 className="text-2xl font-bold mb-4 text-white"><span className='text-[#EB3465]'>
            Event
          </span>
            recap</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >📅 Date:</p>
              <p className="text-white">July 22, 2024</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >🗺️ Location:</p>
              <p className="text-white">Paris, 75th district</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >🥳 Event Type:</p>
              <p className="text-white">Casual party</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >👥 Number of Attendees:</p>
              <p className="text-white">10</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >🍔 Food:</p>
              <p className="text-white">Burger, Italian</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >💵 Budget:</p>
              <p className="text-white">$100-$200</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >🎳 Activity:</p>
              <p className="text-white">Bowling, DJ</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">


            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >🎉 Vibe and Atmosphere:</p>
              <p className="text-white">Casual and fun with a rooftop/terrace vibe</p>
            </div>
            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >✉️ Email:</p>
              <p className="text-white">Example@gmail.com</p>
            </div>

          </div>
          <div className="grid grid-cols-1 gap-4">

            <div className=" rounded-lg">
              <p className="text-[#EB3465]" >⌛ Duration:</p>
              <p className="text-white">Typically, such events last 4-6 hours, but this can be adjusted based on your preferences.</p>
            </div>
          </div>
      <div  className='flex justify-center'>

          <button
          className="mt-4 px-6 py-2 bg-[#EB3465] text-white rounded hover:bg-[#EB3465] transition duration-300"
        >
         🔓 Unlock your custom-made event
        </button>
        </div>
        </div>
        <ServicesProvider />
      </UserLayout>
    </div>
  )
}
