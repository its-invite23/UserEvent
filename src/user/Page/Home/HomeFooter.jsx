import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png"
import { Toaster } from 'react-hot-toast';
function Homeooter() {
    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="w-full max-w-[1230px] m-auto pt-[50px] pb-[50px] md:pt-[100px] md:pb-[50px] px-[15px] ">
                <div className="grid grid-cols-1  md:grid-cols-4   gap-6 md:gap-4 ">

                    <div className="col-span-2 flex items-start ]  ">
                        <Link to={'/'}>
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <p className="text-[#A9A4A8] font-manrope font-[600] text-[15px] md:text-[16px] pl-[30px] pr-[20px] md:pr-[40px] lg:pr-[200px]">An all-in-one app for event planning, book everything and pay in one place</p>
                    </div>

                    <div className="w-full">
                        <h2 className="mb-[15px] font-manrope font-[700] text-[16] text-white">General</h2>
                        <ul className='flex flex-col items-start gap-[2px] lg:gap-[5px] mt-[10px] lg:mt-[0]'>
                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500] text-[16px] md:text-[16px]'>Home</Link>
                            </li>

                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500] text-[16px] md:text-[16px]'>About</Link>
                            </li>

                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500]  text-[16px] md:text-[16px]'>Contact Us</Link>
                            </li>

                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500]  text-[16px] md:text-[16px]'>Request a Demo</Link>
                            </li>
                        </ul>
                    </div>


                    <div className="">
                        <h2 className="mb-[15px] font-manrope font-[700] text-[16] text-white">Learn More</h2>
                        <ul className='flex flex-col items-start gap-[2px] lg:gap-[5px] mt-[10px] lg:mt-[0]'>
                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500] text-[16px] md:text-[16px]'>Event Organizer</Link>
                            </li>

                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500] text-[16px] md:text-[16px]'>Service Provider</Link>
                            </li>

                            <li>
                                <Link to={"/"} className='text-[#A9A4A8] font-[manrope] font-[500]  text-[16px] md:text-[16px]'>Terms & Coditions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center border-t border-t-[#a9a4a84a] pt-[20px] pb-[20px] px-[15px] text-center text-[#A9A4A8]">
                <p className="pr-[10px] text-[16px]">© INVITE — Copyright 2024.</p>
                <p className="text-[16px]">All rights reserved</p>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center border-t border-t-[#a9a4a84a] pt-[20px] pb-[20px] px-[15px] text-center text-[#A9A4A8]">

                    {/* Facebook Icon */}
                    <Link to="#" className="link-icons center w-inline-block flex justify-center items-center">
                        <img
                            src="https://cdn.prod.website-files.com/6474916296040b5fe4134122/6474916296040b5fe4134209_ic-facebook-white.svg"
                            loading="lazy"
                            width="10"
                            alt="Facebook"
                            className="icon-social"
                        />
                    </Link>

                    {/* Instagram Icon */}
                    <Link to="#" className="link-icons center w-inline-block flex justify-center items-center">
                        <img
                            src="https://cdn.prod.website-files.com/6474916296040b5fe4134122/6474916296040b5fe413420a_ic-instagram-white.svg"
                            loading="lazy"
                            alt="Instagram"
                            className="icon-social"
                        />
                    </Link>

                    <Link to="#" className="link-icons center w-inline-block flex justify-center items-center">
                        <img
                            src="https://cdn.prod.website-files.com/6474916296040b5fe4134122/6474916296040b5fe413420b_ic-linkedin-white.svg"
                            loading="lazy"
                            alt="LinkedIn"
                            className="icon-social"
                        />
                    </Link>
                </div>
            </div>


        </div>

    );
}

export default Homeooter;