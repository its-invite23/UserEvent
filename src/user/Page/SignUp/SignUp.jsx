import React, { useState } from "react";
import Header from "../../compontents/Header";
import { Link, useNavigate } from "react-router-dom";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5"
export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    country: "",
    city: "",
    username: "",
    email: "",
    password: "",
    phone_number: "", // Fixed initialization
    address: "",
  });

  console.log("data", data);

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.signup(data);
      console.log("response", response);
      if (response?.data?.status === true) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <Header />
      <div className="w-full max-w-[1180px] bg-[#1B1B1B] mt-[40px] mb-[80px] rounded-[10px] m-auto py-[15px] md:py-[40px]">
        <h2 className="font-manpore font-[600] text-white text-center px-[15px] text-[25px] md:text-[40px] lg:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] mb-[8px] md:mb-[20px]">
          Create your account
        </h2>
        <div className="pb-[20px] px-[15px] border-b border-[#ffffff14] text-center font-manrope text-white text-[17px]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#EB3465]">
            Log in
          </Link>
        </div>

        <div className="px-[20px] py-[15px]  md:px-[40px] md:py-[40px]">
          <div className="w-full flex flex-wrap justify-between lg-flex-nowrap">
            <div className="w-[100%] md:w-[48%] mb-5">
              <label
                htmlFor=""
                className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                onChange={handleInputs}
                value={data.username}
                placeholder="Enter your username.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
              />
            </div>

            <div className="w-[100%] md:w-[48%] mb-5">
              <label
                htmlFor=""
                className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleInputs}
                value={data.email}
                placeholder="Enter your email..."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
              />
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between lg-flex-nowrap">
            <div className="w-[100%] md:w-[48%] mb-5">
              <label
                htmlFor=""
                className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                onChange={handleInputs}
                value={data.phone_number}
                placeholder="Enter your number.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
              />
            </div>

            <div className="w-[100%] md:w-[48%] mb-5">
              <label
                htmlFor=""
                className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  onChange={handleInputs}
                  value={data.password}
                  placeholder="Enter your password..."
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white pr-[50px] hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                />
                <button className="absolute top-[20px] right-5 ">
                  <IoEye size={24} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between lg-flex-nowrap">
            <div className="w-[100%] md:w-[48%] mb-5 flex flex-wrap lg:flex-nowrap items-center mb-5 gap-[25px]">
              <div className="w-[100%] lg:w-[48%]">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
                >
                  Country
                </label>
                <select
                  name="country"
                  onChange={handleInputs}
                  value={data.country}
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                >
                  <option value="">Select Country</option>
                  <option value="usa">USA</option>
                </select>
              </div>

              <div className="w-[100%] lg:w-[48%]">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
                >
                  City
                </label>
                <select
                  name="city"
                  onChange={handleInputs}
                  value={data.city}
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                >
                  <option value="">Select City..</option>
                  <option value="Washington">Washington, D.C</option>
                </select>
              </div>
            </div>

            <div className="w-[100%] md:w-[48%] mb-5">
              <label
                htmlFor=""
                className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                onChange={handleInputs}
                value={data.address}
                placeholder="Enter your address..."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="text-center px-[20px]">
          <button
            onClick={handleForms} // Fixed to onClick
            className="w-full max-w-[320px] bg-[#EB3465] hover:bg-[#fb3a6e] px-5 py-4 text-white text-base text-center rounded-md"
          >
            {loading ? "Loading.." : "Sign Up"} {/* Fixed typo */}
          </button>
        </div>
      </div>
    </div>
  );
}
