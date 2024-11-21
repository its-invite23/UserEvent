import React, { useState } from "react";
import Listing from "./Api/Listing";
import toast from "react-hot-toast";

const PlayerFAQ = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        amount: 1000,
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

  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
  <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Payment</h1>
    <p className="text-gray-600 mb-6">
      Click the button below to securely process your payment.
    </p>
    <button
      onClick={() => {
        handlePayment();
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring focus:ring-blue-300 focus:outline-none"
    >
      Pay Now
    </button>
  </div>
</div>
};

export default PlayerFAQ;
