import React, { useState } from 'react'
import Listing from '../../../Api/Listing';
import toast from 'react-hot-toast';

export default function Contact() {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
  })


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
      const response = await main.contact(data);
      console.log("response", response)
      if (response?.data?.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
      setData({ name: "", email: "" });
    } catch (error) {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    }
  }
  return (
    <div className='px-[15px]'>
      <div className='w-100 max-w-[1230px] m-auto px-[15px] md:px-[40px] py-[30px] lg:py-[60px] bg-[#6517F3] rounded-[10px] md:rounded-[15px]'>
        <h2 className='mb-[20px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]'>Tailored Event Packages</h2>
        <div className='newsletter w-full max-w-[800px] flex flex-wrap md:flex-nowrap justify-center gap-[20px] m-auto'>
          <input type="text"
            name="name"
            onChange={handleInputs}
            value={data.name}
            required
            placeholder='Enter your name' className='w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]' />
          <input type="email"
            name="email"
            onChange={handleInputs}
            value={data.email}
            required
            placeholder='Enter your email' className='w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]' />
          <button
            onClick={handleForms}
            className='bg-[#EB3465] rounded-[8px] px-[25px] py-[10px] font-manrope font-[600] text-[15px] text-white text-center'>{loading ? "Loading.. " : "Contact Us"}</button>
        </div>
      </div>
    </div>
  )
}
