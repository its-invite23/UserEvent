import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { IoMdLogOut } from "react-icons/io";
export default function Header() {
  const navigate = useNavigate()
  const token = localStorage && localStorage?.getItem("token")
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  function handlelogout() {
    localStorage.removeItem('token')
    navigate('/')
    toast.success("Logout Successfully ")
  }


  const scrollToSection = (sectionId) => {
    const section = document && document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path, sectionId) => {
    navigate(path);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };
  return (
    <div className='relative flex items-center justify-between max-w-[1330px] m-auto px-[15px] z-[9] pt-[10px]'>
      <Link to={"/"}>
        <img src={logo} alt="Event Management" className='max-w-[90px] md:max-w-[100px] lg:max-w-[110px] xl:max-w-[130px] ' />

      </Link>
      {/* desktop */}
      <div className='hidden lg:flex items-center gap-[10px] z-[5]'>
        <ul className='  lg:relative flex lg:flex-row items-center gap-[36px] md:gap-[10px] lg:gap-[25px] xl:gap-[30px] font-manrope font-[600] text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white'>
          <li>
            <button onClick={() => handleNavigation('/', '')} >Home</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/event-organiser', '#contact')} > Event Organizer</button>

          </li>

          <li>
            <button onClick={() => handleNavigation('/services-provider', '#contact')} >Service Provider</button>

          </li>
          <li>
            <button onClick={() => handleNavigation('/about', '#contact')} >About</button>

          </li>
          <li>
            <button onClick={() => handleNavigation('/', '#contact')} >Contact Us</button>
          </li>
        </ul>
      </div>
      <div className=' hidden lg:flex items-center gap-[10px]' >
        <Link to={"/askquestion"} className='bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[700] text-[17px] px-[20px] py-[10px] text-white rounded-[5px] text-center'>Get Started</Link>
        {token ? (
          <button onClick={handlelogout} className='bg-red-700 hover:bg-red-500 font-manrope font-[700] text-[17px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>
            <IoMdLogOut size={22} />
          </button>
        ) : (
          <Link to={"/start"} className='bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[17px] px-[20px] py-[10px] text-white rounded-[5px] text-center '>Log In</Link>
        )}
      </div>

      <div className={`flex lg:hidden ${menuOpen ? 'hidden' : ''}`}>
        <button
          type="button"
          className="absolute right-[15px] top-[10px] z-[1] inline-flex items-center justify-center rounded-[3px] w-[48px] h-[45px]bg-[#ff0062] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <RiMenu3Line size={24} />
        </button>
      </div>

      {/* Close Button */}
      <div className={`lg:hidden  ${menuOpen ? 'block' : 'hidden'}`}>
        <button
          type="button"
          className="absolute right-[15px] top-[10px] z-[1] inline-flex items-center justify-center rounded-[3px] w-[48px] h-[45px]bg-[#ff0062] text-white hover:bg-[#EB3465] focus:bg-[#EB3465] focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <IoCloseSharp size={25} />

        </button>

        {/* Mobile Menu */}
        <div id="mobile-menu " className='absolute top-0 right-[15px] 11h-full pt-[60px] '>
          <ul className="relative bg-[#222]  w-[250px] z-[9] h-full flex flex-col gap-[15px] font-manrope font-[600] text-[15px] md:text-[18px] lg:text-[20px] text-white px-[20px] pt-[20px] pb-[30px] rounded-[5px] ">
          <li>
            <button onClick={() => handleNavigation('/', '')} >Home</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/event-organiser', '#contact')} > Event Organizer</button>

          </li>

          <li>
            <button onClick={() => handleNavigation('/services-provider', '#contact')} >Service Provider</button>

          </li>
          <li>
            <button onClick={() => handleNavigation('/about', '#contact')} >About</button>

          </li>
          <li>
            <button onClick={() => handleNavigation('/', '#contact')} >Contact Us</button>
          </li>
            <li>
              {token ? (
                <button onClick={handlelogout} className="block w-full bg-red-700 hover:bg-red-500  font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                >
                  <IoMdLogOut size={22} className='text-center' />
                </button>
              ) : (
                <Link to={"/start"} className="block w-full bg-[#FFFFFF14] hover:bg-[#FFFFFF25] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                >Log In</Link>
              )}
            </li>
            <li>
              <Link
                to={"/askquestion"}
                className="block w-full bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}