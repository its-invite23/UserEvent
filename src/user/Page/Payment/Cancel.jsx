import React, { useEffect } from 'react'
import AuthLayout from '../../Layout/AuthLayout'
import { useNavigate, useParams } from 'react-router-dom';
import PaymentSuccess from "../../../assets/bro.png"
import Listing from '../../../Api/Listing';

export default function Cancel() {

  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); 
  };

  const { id } = useParams();

  const fetch = (id) => {
    const main = new Listing();
    main
      .StripeCancel(id)
      .then((r) => {
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(()=>{
    if(id){
        fetch(id);
    }
  },[])



  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>

      <AuthLayout>
        <div className="flex flex-col items-center bg-[#000000] justify-center min-h-screen  p-4">
          <div className=" p-6 text-center">
            <img
              src={PaymentSuccess}
              alt="Booking Successful"
              className="mb-4 rounded-lg  object-cover mx-auto"
            />
            <h1 className="text-4xl font-semibold text-white mb-4">Your Booking has been Successful</h1>
            <p className="text-[#FFFFFF] mb-4">
              Thank you for placing your booking request with us. We’ve received your request and will confirm you shortly.
            </p>
            <button
              onClick={handleBackToHome}
              className="mt-4 px-6 py-2bg-[#ff0062] text-white rounded hover:bg-[#EB3465] transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </AuthLayout>
    </div>
  )
}
