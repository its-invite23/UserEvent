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
        <ul className='  lg:relative flex lg:flex-row items-center gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white'>
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
            <button type="button" className="absoulute right-[0] inline-flex items-center justify-center rounded-md p-3 bg-[#EB3465] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] hover:border-none focus:border-none hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:box-shadow-none" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={toggleMenu}>
            open
             </button>
      </div>
      <div>
      <button type="button" className="absoulute text-white right-[0] z-[1] inline-flex items-center justify-center rounded-md p-3 bg-[#EB3465] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] hover:border-none focus:border-none hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:box-shadow-none" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={toggleMenu}>
      close
        </button>
      <div className={`lg:hidden ${menuOpen ? 'block' : ''}`} id="mobile-menu">
       
        <ul className='absolute bg-black top-[0] right-0 w-[250px] h-full flex flex-col gap-[36px] md:gap-[20px] lg:gap-[36px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white p-[20px] pt-[50px]'>
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
    </div>
  )
}