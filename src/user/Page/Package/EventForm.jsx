import React, { useState } from 'react'
import Header from '../../compontents/Header'
import { Link, useNavigate } from 'react-router-dom'
import Listing from '../../../Api/Listing'
import toast from 'react-hot-toast'

export default function EventForm() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        username: "",
        email: "",
        message: "",
    })

    console.log("data", data);

    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    async function handleForms(e) {
        e.preventDefault();
        if (loading) {
            return false;
        }
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.signup(data);
            console.log("response", response)
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                navigate("/login")
            } else {
                toast.error(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            toast.error("invalid Email/password");
            setLoading(false);
        }
    }
    return (
        <div className='max-w-[1230px] mx-auto'>

            <h2 className='font-manpore font-[600] text-white text-center 
            text-[22px] md:text-[32px] lg:text-[40px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] mb-[8px] md:mb-[20px] lg:px-[50px] xl:px-[60px]'>
                Can’t find what you're looking for? Just let us know what you need for your event.
            </h2>
            <div className='w-full max-w-[1180px] bg-[#1B1B1B] mt-[40px] rounded-[10px] lg:rounded-[20px] m-auto px-[20px] md:px-[50px] 
            py-[20px] md:py-[50px]'>

                <div className=''>
                    <div className='w-full flex flex-wrap justify-between lg-flex-nowrap'>
                        <div className='w-[100%] md:w-[48%] mb-5'>
                            <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>User Name</label>
                            <input type="text"
                                name="username"
                                onChange={handleInputs}
                                value={data.username}
                                placeholder='Enter your username..' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none' />
                        </div>

                        <div className='w-[100%] md:w-[48%] mb-5'>
                            <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Email</label>
                            <input type="email"
                                name="email"
                                onChange={handleInputs}
                                value={data.email}
                                placeholder='Enter your email...' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none' />
                        </div>
                    </div>

                    <div className='w-full '>

                        <label htmlFor="" className='block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]'>Message</label>
                        <textarea type="text"
                            name="message"
                            onChange={handleInputs}
                            value={data.message}
                            placeholder='Enter your message...' className='bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none' >
                        </textarea>
                    </div>
                </div>

                <div className='text-center px-[20px] mt-[30px]'>
                    <button
                        onClick={handleForms}  // Fixed to onClick
                        className='w-full max-w-[200px] bg-[#EB3465] hover:bg-[#fb3a6e] px-5 py-4 text-white text-base text-center rounded-[3px]'>
                        {loading ? "Loading.." : "Submit"}  {/* Fixed typo */}
                    </button>
                </div>
            </div>
        </div>
    )
}
