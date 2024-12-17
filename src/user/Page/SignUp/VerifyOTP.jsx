import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";

export default function VerifyOTP({ onClose }) {
  const [OTP, setOTP] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Handle input changes
  const handleChange = (element, index) => {
    const value = element.value;

    if (/^[0-9]?$/.test(value)) { // Allow only single-digit integers
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to the next input field
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !OTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [loading, setLoading] = useState(false);

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }

    const combinedOTP = OTP.join(""); // Combine all digits into a single string
    if (combinedOTP.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.OtpVerify({
        email: localStorage?.getItem("email"),
        OTP: combinedOTP,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
        localStorage?.removeItem("email");
        localStorage?.setItem("token", response?.data?.token);
        onClose();
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <h3 className="text-[24px] font-[700] mb-4 pt-[5px] text-white text-center">
          Enter OTP
        </h3>
      </div>
      <form onSubmit={handleForms}>
        <div className="flex justify-center gap-2 mb-4">
          {OTP.map((value, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-12 h-12 text-center text-lg bg-[#1B1B1B] border border-[#ffffff14] text-white rounded-lg outline-none"
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#ff0062] hover:bg-[#4400c3] px-8 py-3 text-white text-base text-center rounded-full"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
