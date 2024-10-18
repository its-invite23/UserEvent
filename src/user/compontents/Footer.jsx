import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div className='w-full  bg-[#1B1B1B] mt-[110px]'>
      <div className='max-w-[1180px] m-auto px-[15px]'>
        <div className='py-[10px] flex flex-col md:flex-row  items-center justify-between py-[10px]'>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>

          <ul className='flex items-center gap-[20px] lg:gap-[38px] mt-[10px] lg:mt-[0]'>
            <li>
              <Link to={"/"} className='text-white font-[manrope] font-[700] text-[15px] md:text-[20px]'>About</Link>
            </li>

            <li>
              <Link to={"/"} className='text-white font-[manrope] font-[700]  text-[15px] md:text-[20px]'>Contact Us</Link>
            </li>

            <li>
              <Link to={"/"} className='text-white font-[manrope] font-[700]  text-[15px] md:text-[20px]'>Why Invite?</Link>
            </li>
          </ul>
        </div>


      </div>

      <div className='border-t border-t-[#333] py-[15px]'>
        <div className='max-w-[1180px] m-auto px-[15px]'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='text-white font-[manrope] font-[600] text-[12px] md:text-[16px] mb-[10px] md:mb-[10px]'>2024@ All right reserved</div>

            <ul className='flex items-center gap-[30px] md:gap-[38px]'>
              <li>
                <Link to={"/"} className='text-white font-[manrope] font-[600]  text-[13px] md:text-[16px]'>Terms</Link>
              </li>

              <li>
                <Link to={"/"} className='text-white font-[manrope] font-[600]  text-[13px] md:text-[16px]'>Privacy</Link>
              </li>

              <li>
                <Link to={"/"} className='text-white font-[manrope] font-[600]  text-[13px] md:text-[16px]'>Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}
