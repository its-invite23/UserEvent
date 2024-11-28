import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";
import { useParams } from "react-router-dom";

const StripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const { id } = useParams();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        amount: data?.totalPrice,
        email: data?.userId?.email,
        userId: data?.userId?._id,
        booking_id: data?._id,
        currency: "INR"
      });
      resp
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during payment");
    }
  };

  const fetch = (id) => {
    setLoading(true);
    const main = new Listing();
    main
      .getBookingByID(id)
      .then((r) => {
        setLoading(false);
        setData(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [])

  return <div className="flex flex-col items-center justify-center min-h-screen bg-black  p-6">
    <div className="bg-black shadow-md  rounded-md  border  border-white-600 text-white rounded-lg p-8 max-w-md text-center">
      <h1 className="text-2xl font-bold  mb-4">Complete Your Payment</h1>
      <p className=" mb-6">
        Click the button below to securely process your payment.
      </p>
      <button
        onClick={() => {
          handlePayment();
        }}
        className=" bg-[#ff0062] hover:bg-[#4400c3] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring focus:ring-blue-300 focus:outline-none"
      >
        Pay Now
      </button>
    </div>
  </div>
};

export default StripePayment;
