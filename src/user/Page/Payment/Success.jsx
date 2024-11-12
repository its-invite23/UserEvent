import React from 'react'
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from "../../../assets/bro.png"
export default function Success() {
  const history = useNavigate();

  const handleBackToHome = () => {
    history.push('/'); // Adjust the path as needed
  };
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
    {/* <AuthLayout> */}
   <div className="flex flex-col items-center bg-[#000000] justify-center min-h-screen  p-4">
      <div className="text-center">
        <img
          src={PaymentSuccess} 
          alt="Booking Successful"
          className="mb-4 rounded-lg  object-cover mx-auto"
        />
        <h1 className="font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[40px] md:text-[48px] md:leading-[50px] text-white mb-[15px]">Your booking has been successful</h1>
        <p className="text-[#FFFFFF] m-auto mb-4 w-full max-w-[420px]">
        Thank you for placing your booking request with us.
        We’ve received your request and will confirm you shortly.
        </p>
        <button
          onClick={handleBackToHome}
          className="w-[180px] md:w-[96%] max-w-[334px]  mt-4 px-[10px] py-[12px] md:py-[20px] bg-[#EB3465] font-manrope font-[700] text-[15px] md:text-[20px] text-white rounded-[4px] hover:bg-[#fb3a6e] transition duration-300"
        >Back to home
        </button>
      </div>
    </div>
    {/* </AuthLayout> */}
    </div>

  )
}
