import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from "../../../assets/bro.png";

export default function BookingSuccess() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-[#000] p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <img
          src={PaymentSuccess}
          alt="Booking Successful"
          className="mb-4 rounded-lg object-cover max-w-[300px] mx-auto"
        />
        <h1 className="font-manrope font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-4">
          Your booking has been successful
        </h1>
        <p className="text-white max-w-[420px] mx-auto mb-4">
          Thank you for placing your booking request with us.
          We’ve received your request and will confirm you shortly.
        </p>
        <button
          onClick={handleBackToHome}
          className="w-[180px] md:w-[96%] max-w-[334px] mt-4 px-4 py-3 md:py-4 bg-[#ff0062] font-manrope font-bold text-white text-lg md:text-2xl rounded-[4px] hover:bg-[#4400c3] transition duration-300"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
