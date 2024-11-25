import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import UserLayout from "../../Layout/UserLayout";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";
import FogetLinks from "../../Forgetlink/FogetLinks";

export default function Login() {
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
      setPasswordStrength((value));
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
        navigate("/");
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
    <div className="bg-[#000] p-[0] h-full min-h-full">
      <UserLayout>
        <div className="w-[90%] max-w-[580px] bg-[#1B1B1B] mt-[40px] rounded-[10px] m-auto py-[15px] md:py-[40px] md:pb-[10px]">
          <h2 className="font-manpore font-[600] text-white text-center text-[25px] lg:text-[30px] md:text-[40px] lg:text-[48px] leading-[28px] md:leading-[40px] lg:leading-[48px] mb-[10px] md:mb-[20px]">
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
                onChange={handleInputs}
                value={Regs.email}
                placeholder="Enter your email.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white"
              />
            </div>
            <div className="mb-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputs}
                value={Regs.password}
                placeholder="Enter password.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 pr-[60px] rounded-lg text-base text-white"
              />
              <button onClick={togglePasswordVisibility} className="absolute top-[20px] right-5">
                <IoEye size={24} className="text-white" />
              </button>
            </div>
            <div className="mb-8 font-manrope text-[400] text-[18px] text-white text-base text-right">
              <FogetLinks />
            </div>
            <div className="text-center">
              <button
                onClick={handleForms}
                className="w-fullbg-[#ff0062] hover:bg-[#4400c3] px-5 py-4 min-w-52 text-white text-base rounded-md"
              >
                {loading ? "Loading.." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
}
