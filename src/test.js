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

  return <div>
    <button onClick={()=>{handlePayment();}}>Pay Now</button>
  </div>;
};

export default PlayerFAQ;
