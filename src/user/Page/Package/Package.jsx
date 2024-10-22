import React from 'react'
import UserLayout from '../../Layout/UserLayout'
import EventForm from './EventForm';

export default function Package() {

  const partyDetails = [
    { type: "Birthday party", description: "Catering" },
    { type: "Birthday party", description: "Activity" },
    { type: "Birthday party", description: "Catering" },
    { type: "Birthday party", description: "Activity" },
    { type: "Birthday party", description: "Catering" },
    { type: "Birthday party", description: "Activity" },
    { type: "Birthday party", description: "Catering" },
    { type: "Birthday party", description: "Activity" },
    { type: "Birthday party", description: "Catering" },
    { type: "Birthday party", description: "Activity" },
  ];
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
    <UserLayout>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Browse our 
          <span className='text-[#EB3465]'>
            event
          </span>
           packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partyDetails.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p className="font-bold text-white">🎉 {item.type}</p>
              <p className='text-white'>{item.description}</p>
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-6 py-2 bg-[#EB3465] text-white rounded hover:bg-[#EB3465] transition duration-300"
        >
          Load More
        </button>
      </div>
      <EventForm />
    </UserLayout>
    </div>
  )
}
