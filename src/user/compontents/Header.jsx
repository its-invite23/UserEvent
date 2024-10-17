import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { RiMenu3Line } from "react-icons/ri";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className='flex items-center justify-between max-w-[1180px] m-auto px-[15px]'>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      {/* desktop */}
      <div className='hidden lg:flex items-center gap-[10px]'>
        <ul className='absolute top-[90px] right-[220px] lg:relative flex lg:flex-row items-center gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white'>
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
      <div className=' hidden lg:flex items-center gap-[10px]' >
        <Link to={"/"} className='bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>Log In</Link>
        <Link to={"/"} className='bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center'>Get Started</Link>
      </div>
      {/* {mobile } */}
      <div className="flex lg:hidden">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={toggleMenu}>
          <svg className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <ul className='absolute z-[99] bg-black top-[90px] right-0 w-[250px] h-full flex flex-col gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white p-[20px]'>
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
          <li>
            <Link to={"/"} className='bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>Log In</Link>
          </li>
          <li>
            <Link to={"/"} className='bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center'>Get Started</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}