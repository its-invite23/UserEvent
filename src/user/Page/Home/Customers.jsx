import React from 'react'
import Testinomal from "../../../JSon/Customer.json"
import { RiDoubleQuotesL } from "react-icons/ri";
import Rating from '../../compontents/Rating';

export default function Customers() {



  return (
    <div className="event-container w-[100%] max-w-[1200px] m-auto px-[15px] mb-[50px] lg:mb-[100px] ">
      <h2 className="font-manrope text-center font-[600] text-[25px] leading-[26px] md:text-[35px] lg:text-[40px] mb-[30px] text-white leading-[36px] md:leading-[32px] lg:leading-[43px]">Hear from our customers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Testinomal?.testimonials.map((testimonial, index) => (
          <div key={index} className="relative bg-[#1B1B1B] text-white p-[15px] md:p-[35px] md:pb-[170px] pb-[170px] rounded-[10px] md:rounded-[20px]">
            <div data-aos="fade-down"data-aos-easing="linear"data-aos-duration="1500" >
            <RiDoubleQuotesL className='text-[#454545] size-[30px] md:size-[50px] lg:size-[65px]' />

            <h3 className='mt-[20px] mb-[10px] font-manrope font-[700] font-[bold] text-[17px] md:text-[18px] lg:text-[20px]'>{testimonial?.title}</h3>

            <p className=" mb-4 text-[#A9A4A8]">{testimonial.feedback}</p>
           
            </div>
            <div className='absolute bottom-[40px]'>
              <Rating value={testimonial?.rating} className='text-[#FCD53F] size-[20px] md:size-[50px] lg:size-[65px]' />
              <p className="mt-[25px] mb-[10px] font-bold text-[#A9A4A8] text-[15px]  ">{testimonial.name}</p>
              <p className="text-[15px] text-[#A9A4A8] ">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
