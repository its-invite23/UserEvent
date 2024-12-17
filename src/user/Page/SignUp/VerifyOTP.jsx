import React, { useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";

export default function VerifyOTP({ onClose }) {
  const [Regs, setRegs] = useState({
    email: localStorage && localStorage?.getItem("email"),
    OTP: "",
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.OtpVerify(Regs);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        localStorage && localStorage?.removeItem("email");
        localStorage && localStorage?.setItem("token", response?.data?.token);
        onClose();
      } else {
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex  flex-wrap justify-center">
        <h3 className="text-[24px] font-[700] mb-4 pt-[5px] text-white text-center">
          Enter OTP
        </h3>
      </div>
      <form>
        <div className="mb-4">
          <input
            type="number"
            name="OTP"
            autocomplete="off"
            onChange={handleInputs}
            value={Regs.OTP}
            className=" placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white outline-none"
            placeholder="Enter the OTP.."
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleForms}
            className="w-full bg-[#ff0062] hover:bg-[#4400c3]  px-5 py-4 min-w-52 text-white text-base text-center rounded-md"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
