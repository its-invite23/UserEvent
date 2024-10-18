import React from 'react'
import Header from '../../compontents/Header'
import { Link } from 'react-router-dom'
import { IoEye } from "react-icons/io5"
import UserLayout from "../../Layout/UserLayout"

export default function Login() {
  return (
    
    <div className='bg-[#000] p-[0] h-full min-h-full'>
      <UserLayout>

      <div className='w-[90%] max-w-[580px] bg-[#1B1B1B] mt-[40px] rounded-[10px] m-auto py-[15px] md:py-[40px]'>
        <h2 className='font-manpore font-[600] text-white text-center text-[20px] lg:text-[30px] md:text-[40px] lg:text-[48px] leading-[24px] md:leading-[40px] lg:leading-[48px] mb-[10px] md:mb-[20px]'>Log in to your <br></br> account</h2>
        <div className='pb-[10px] mb-[3px] border-b border-[#ffffff14] text-center font-manrope text-white text-[18px]  '>Don’t have an account? <Link className="text-[#EB3465]">Sign up</Link></div>
          <div className='p-[15px] md:p-[30px] pb-[0]'>
            <div className='mb-5'>
              <input type="email" placeholder='Enter your email..' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base  text-white' />
            </div>
            <div className='mb-5 relative'>
              <input type="password" placeholder='Enter password..' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 pr-[60px] rounded-lg text-base  text-white' />
              <button className='absolute top-[20px] right-5 '>
                
                <IoEye size={24} className='text-white' />
              </button>
            </div>
            <div className='mb-8 font-manrope text-[400] text-[18px] text-white text-base text-right'>
              <Link to="/forget-password" >
              Forgot your password?
                </Link>
            </div>
            <div className='mb-5 text-center'>
              <button className='w-full bg-[#EB3465] hover:bg-[#fb3a6e]  px-5 py-4 min-w-52 text-white text-base text-center rounded-md'>
                Login
              </button>
            </div>
          </div>
      </div>
      </UserLayout>
      
    </div>
  )
}
