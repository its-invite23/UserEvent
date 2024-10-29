import React, { useState } from "react";
import Header from "../../compontents/Header";
import { Link, useNavigate } from "react-router-dom";
import Listing from "../../../Api/Listing";
import toast, { Toaster } from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    country: "",
    city: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&#]/.test(password)) {
      return "Strong";
    }
    return "Medium";
  };

  const handleForms = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (passwordStrength !== "Strong") {
      toast.error("Weak password. Use at least 8 characters, with letters, numbers, and special characters.");
      return;
    }

    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.signup(data);

      if (response?.data?.status === "success") {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response?.data?.message || "Signup failed");
      }
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
      } else {
        toast.error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrengthColor = passwordStrength === "Strong"
    ? "text-green-500"
    : passwordStrength === "Medium"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="w-full max-w-[1180px] bg-[#1B1B1B] mt-[40px] mb-[80px] rounded-[10px] m-auto py-[15px] md:py-[40px]">
        <h2 className="font-manpore font-[600] text-white text-center px-[15px] text-[25px] md:text-[40px] lg:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] mb-[8px] md:mb-[20px]">
          Create your account
        </h2>
        <div className="pb-[20px] px-[15px] border-b border-[#ffffff14] text-center font-manrope text-white text-[17px]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#EB3465]">Log in</Link>
        </div>

        <form onSubmit={handleForms} className="px-[20px] py-[15px] md:px-[40px] md:py-[40px]">
          <div className="flex flex-wrap justify-between lg-flex-nowrap">
            {/* Username and Email Fields */}
            <InputField label="User Name" type="text" name="username" value={data.username} onChange={handleInputs} />
            <InputField label="Email" type="email" name="email" value={data.email} onChange={handleInputs} required />
          </div>

          <div className="flex flex-wrap justify-between lg-flex-nowrap">
            {/* Phone Number and Password Fields */}
            <InputField label="Phone Number" type="text" name="phone_number" value={data.phone_number} onChange={handleInputs} required maxLength="10" />
            <div className="w-[100%] md:w-[48%] mb-5">
              <label className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleInputs}
                  placeholder="Enter your password..."
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white pr-[50px] hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[20px] right-5">
                  {showPassword ? <IoEyeOff size={24} className="text-white" /> : <IoEye size={24} className="text-white" />}
                </button>
              </div>
              <p className={`mt-2 text-sm font-semibold ${passwordStrengthColor}`}>{passwordStrength && `${passwordStrength} Password`}</p>
            </div>
          </div>

          {/* Country, City, and Address Fields */}
          {/* Add other form fields similar to above pattern */}

          <div className="text-center px-[20px] mt-6">
            <button type="submit" disabled={loading} className="w-full max-w-[320px] bg-[#EB3465] hover:bg-[#fb3a6e] px-5 py-4 text-white text-base text-center rounded-md">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Field Component
function InputField({ label, type, name, value, onChange, required, maxLength }) {
  return (
    <div className="w-[100%] md:w-[48%] mb-5">
      <label className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
      />
    </div>
  );
}
