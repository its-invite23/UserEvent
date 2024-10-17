import React from 'react'
import Header from '../../compontents/Header'

export default function Start() {
  return (
    <div className='bg-black h-screen min-h-full'>
      <Header/>
      <h1 className='px-[15px] font-manrope font-[700] text-[30px] leading-[40px]  md:text-[60px] md:leading-[80px] lg:text-[92px] lg:leading-[92px] text-white text-center pt-[100px] pb-[40px] md:pb-[80px] lg:pb-[100px]'>Sign up and start <br /> celebrating</h1>

      <div className='flex items-center justify-center gap-[10px] px-[15px]'>
        <button className='px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#EB3465] hover:bg-[#fb3a6e] rounded-[3px]'>Sign Up</button>
        <button className='px-[20px] md:px-[40px] lg:px-[50px] py-[13px] font-manrope font-[700] text-[18px] text-white text-center bg-[#1E1E1E] hover:bg-[#323232] rounded-[3px]'>Log In</button>
      </div>
    </div>
  )
}
