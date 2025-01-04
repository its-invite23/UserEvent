import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PaymentSuccess from "../../../assets/bro.png"
import LoadingSpinner from "../../compontents/LoadingSpinner"
import Listing from '../../../Api/Listing';
export default function Success() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/');
  };
  const { id } = useParams();

  const fetch = (id) => {
    setLoading(true);
    const main = new Listing();
    main
      .StripeSuccess(id)
      .then((r) => {
        setLoading(false);

      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);

      });
  };

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [])

  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
      {/* <AuthLayout> */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center bg-[#000000] justify-center min-h-screen  p-4">
          <div className="text-center">
            <img
              src={PaymentSuccess}
              alt="Booking Successful"
              className="mb-4 rounded-lg  object-cover mx-auto"
            />
            <h1 className="font-manrope font-[700] text-[25px] leading-[30px] sm:text-[30px] sm:leading-[40px] md:text-[48px] md:leading-[50px] text-white mb-[15px]">Your Payment has been successful</h1>
            <p className="text-[#FFFFFF] m-auto mb-4 w-full max-w-[420px]">
              Congratulations for your booking! 🎉 Your payment has been successfully processed! Thank you for choosing Invite to help bring your event to life.
            </p>
            <button
              onClick={handleBackToHome}
              className="w-[180px] md:w-[96%] max-w-[334px]  mt-4 px-[10px] py-[12px] md:py-[20px] bg-[#ff0062] font-manrope font-[700] text-[15px] md:text-[20px] text-white rounded-[4px] hover:bg-[#4400c3] transition duration-300"
            >Back to home
            </button>
          </div>
        </div>
      )}

      {/* </AuthLayout> */}
    </div>

  )
}
