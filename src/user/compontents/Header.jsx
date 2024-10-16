import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"

export default function Header() {
  return (
    <div className='flex items-center justify-between max-w-[1180px] m-auto'>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className='flex items-center'>
        <ul className='flex items-center gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white'>
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/"}>Why Invite?</Link>
          </li>

          <li>
            <Link to={"/"}>About</Link>
          </li>

          <li>
            <Link to={"/"}>Contact Us</Link>
          </li>


        </ul>
      </div>

      <div className='flex items-center gap-[10px]'>
        <Link to={"/"} className='bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>Log In</Link>

        <Link to={"/"} className='bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center'>Get Started</Link>
      </div>
    </div>
  )
}
