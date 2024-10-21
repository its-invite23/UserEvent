import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className='relative flex items-center justify-between max-w-[1180px] m-auto px-[15px] z-[1]'>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      {/* desktop */}
      <div className='hidden lg:flex items-center gap-[10px] z-[5]'>
        <ul className='  lg:relative flex lg:flex-row items-center gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white'>
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/"}>Why Invite?</Link>
          </li>

          <li>
            <Link to={"/about"}>About</Link>
          </li>

          <li>
            <Link to={"/"}>Contact Us</Link>
          </li>


        </ul>
      </div>
      <div className=' hidden lg:flex items-center gap-[10px]' >
        <Link to={"/login"} className='bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>Log In</Link>
        <Link to={"/askquestion"} className='bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center'>Get Started</Link>
      </div>
      <div>
        <div className={`flex lg:hidden ${menuOpen ? 'hidden' : ''}`}>
          <button
            type="button"
            className="absolute right-[15px] top-[10px] z-[1] inline-flex items-center justify-center rounded-[3px] w-[48px] h-[45px] bg-[#EB3465] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <RiMenu3Line size={20} />
          </button>
        </div>

        {/* Close Button */}
        <div className={`lg:hidden  ${menuOpen ? 'block' : 'hidden'}`}>
          <button
            type="button"
            className="absolute right-[15px] top-[10px] z-[1] inline-flex items-center justify-center rounded-[3px] w-[48px] h-[45px] bg-[#EB3465] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <IoCloseSharp size={25}/>

          </button>

          {/* Mobile Menu */}
          <div id="mobile-menu " className='absolute top-0 right-[15px] 11h-full pt-[60px] '>
            <ul className="relative bg-[#222]  w-[250px] z-[5] h-full flex flex-col gap-[15px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white px-[20px] pt-[20px] pb-[30px] rounded-[5px] ">
              <li>
                <Link to={"/"} className="block w-full">Home</Link>
              </li>
              <li>
                <Link to={"/"} className="block w-full">Why Invite?</Link>
              </li>
              <li>
                <Link to={"/"} className="block w-full">About</Link>
              </li>
              <li>
                <Link to={"/"} className="block w-full">Contact Us</Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="block w-full bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="block w-full bg-[#EB3465] hover:bg-[#fb3a6e] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}