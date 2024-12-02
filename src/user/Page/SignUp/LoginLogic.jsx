import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";
import FogetLinks from "../../Forgetlink/FogetLinks";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function LoginLogic({ isPopup, onClose }) {
  const navigate = useNavigate();
  const [Regs, setRegs] = useState({
    password: "",
    email: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegs((prevState) => ({ ...prevState, [name]: value }));

    if (name === "password") {
      setPasswordStrength(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) return false;
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.login(Regs);
      if (response?.data?.status === true) {
        localStorage.setItem("token", response?.data?.token);
        if (isPopup) {
          onClose();
        } else {
          navigate("/");
        }
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
    <form
      onSubmit={handleForms}
      className=" w-[90%] max-w-[580px] bg-[#1B1B1B]  rounded-[10px] m-auto py-[15px] md:py-[40px] md:pb-[10px] overflow-auto"
    >
      <h2 className="font-manpore font-[600] text-white text-center text-[25px] lg:text-[30px] md:text-[36px] lg:text-[44px] leading-[28px] md:leading-[40px] lg:leading-[48px] mb-[10px] md:mb-[20px]">
        Log in to your <br /> account
      </h2>
      <div className="pb-[10px] px-[10px] mb-[3px] border-b border-[#ffffff14] text-center font-manrope text-white text-[18px]">
        Don’t have an account?{" "}
        <Link to="/sign-up" className="text-[#EB3465]">
          Sign up
        </Link>
      </div>
      <div className="p-[15px] md:p-[30px] pb-[0]">
        <div className="mb-5">
          <input
            type="email"
            name="email"
            autoComplete="off"
            onChange={handleInputs}
            value={Regs.email}
            placeholder="Enter your email.."
            className=" placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white outline-none"
          />
        </div>
        <div className="mb-5 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autocomplete="off"
            onChange={handleInputs}
            value={Regs.password}
            placeholder="Enter password.."
            className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 pr-[60px] rounded-lg text-base text-white outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[20px] right-5"
          >
            {showPassword ? (
              <IoEyeOff size={24} className="text-[#998e8e]" />
            ) : (
              <IoEye size={24} className="text-[#998e8e]" />
            )}
          </button>
        </div>
        <div className="mb-8 font-manrope text-[400] text-[18px] text-white text-base text-right">
          <FogetLinks />
        </div>
        <div className="text-center">
          <button
            // onClick={handleForms}
            type="submit"
            className="w-full bg-[#ff0062] hover:bg-[#4400c3] px-5 py-4 min-w-52 text-white text-base rounded-md"
          >
            {loading ? "Loading.." : "Login"}
          </button>
        </div>
      </div>
    </form>
    </div>
  );
}
