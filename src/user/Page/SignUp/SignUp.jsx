import React from 'react'
import Header from '../../compontents/Header'
import { Link } from 'react-router-dom'
import { IoEye } from "react-icons/io5"

export default function SignUp() {
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
      <Header />
      <div className='w-full max-w-[1180px] bg-[#1B1B1B] mt-[40px] rounded-[10px] m-auto py-[15px] md:py-[40px]'>
        <h2 className='font-manpore font-[600] text-white text-center text-[30px] md:text-[40px] lg:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] mb-[8px] md:mb-[20px]'>Create your account</h2>
        <div className='pb-[20px] border-b border-[#ffffff14] text-center font-manrope text-white text-[18px]'>
          Already have an account? <Link className="text-[#EB3465]">Log in</Link>
        </div>

        <div className='px-[20px] py-[15px]  md:px-[40px] md:py-[40px]'>
          <div className='w-full flex flex-wrap justify-between lg-flex-nowrap'>
            <div className='w-[100%] md:w-[48%] mb-5'>
              <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>User Name</label>
              <input type="text" placeholder='Enter your email..' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>

            <div className='w-[100%] md:w-[48%] mb-5'>
              <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Email</label>
              <input type="email" placeholder='Enter your email...' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>
          </div>


          <div className='w-full flex flex-wrap justify-between lg-flex-nowrap'>
            <div className='w-[100%] md:w-[48%] mb-5'>
              <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Phone Number</label>
              <input type="text" placeholder='Enter your number..' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>

            <div className='w-[100%] md:w-[48%] mb-5'>
              <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Password</label>
              <input type="password" placeholder='Enter your password...' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>
          </div>


          <div className='w-full flex flex-wrap justify-between lg-flex-nowrap'>
            <div className='w-[100%] md:w-[48%] mb-5 flex flex-wrap lg:flex-nowrap items-center mb-5 gap-[25px]'>
              <div className='w-[100%] lg:w-[48%]'>
                <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Country</label>
                <select name="" id="" className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white'>
                  <option value="">
                    Select Country
                  </option>
                </select>
              </div>

              <div className='w-[100%] lg:w-[48%]'>
                <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>City</label>
                <select name="" id="" className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white'>
                  <option value="">
                    Select City..
                  </option>
                </select>
              </div>
            </div>

            <div className='w-[100%] md:w-[48%] mb-5'>
              <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Address</label>
              <input type="text" placeholder='Enter your address...' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>
          </div>

        </div>

        <div className='text-center px-[20px]'>
          <button className='w-full max-w-[320px] bg-[#EB3465] hover:bg-[#fb3a6e]  px-5 py-4 text-white text-base text-center rounded-md'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
