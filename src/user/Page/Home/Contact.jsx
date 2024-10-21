import React from 'react'

export default function Contact() {
  return (
    <div className='px-[15px]'>
      <div className='w-100 max-w-[1230px] m-auto px-[20px] md:px-[40px] py-[30px] lg:py-[60px] bg-[#6517F3] rounded-[10px] md:rounded-[15px]'>
        <h2 className='mb-[30px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]'>Tailored Event Packages</h2>
        <div className='newsletter w-full max-w-[800px] flex flex-wrap md:flex-nowrap justify-center gap-[20px] m-auto'>
          <input type="text" placeholder='Enter your name' className='w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]' />
          <input type="text" placeholder='Enter your name' className='w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]' />
          <button className='bg-[#EB3465] rounded-[8px] px-[25px] py-[10px] font-manrope font-[600] text-[15px] text-white text-center'>Contact Us</button>
        </div>
      </div>
    </div>
  )
}
