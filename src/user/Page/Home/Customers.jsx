import React from 'react'
import Testinomal from "../../../JSon/Customer.json"
import { RiDoubleQuotesL } from "react-icons/ri";
import Rating from '../../compontents/Rating';

export default function Customers() {



  return (
    <div className="event-container  mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#000000]">
      <h2 className="font-[manrope] text-center font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px]  ">Hear from our customers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Testinomal?.testimonials.map((testimonial, index) => (
          <div key={index} className="bg-[#1B1B1B] rounded-md text-white p-6 shadow-lg rounded-lg">
            <RiDoubleQuotesL size={48} className='text-[#454545]' />
            <h3> {testimonial?.title}</h3>
            <p className=" mb-4 text-[#A9A4A8]">{testimonial.feedback}</p>
            <Rating value={testimonial?.rating} />
            <p className="font-bold text-[#A9A4A8]  ">{testimonial.name}</p>
            <p className="text-[#A9A4A8] ">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
