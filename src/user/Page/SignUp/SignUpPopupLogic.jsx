import React, { useEffect, useState } from "react";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";
import { State } from "country-state-city";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignUpPopupLogic({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    country: "",
    city: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    phone_code: "",
    country_code: "",
  });


  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Fetch country data on component mount
    fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const formattedCountries = data
          .map((country) => ({
            name: country.name?.common || "Unknown",
            isoCode: country.cca2 || "N/A",
            phoneCode: country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`
              : "N/A",
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // ✅ Correct sort

        setCountries(formattedCountries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Add this at the beginning with your other useState imports
  const [states, setStates] = useState([]);

  // Update your handleCountryChange function
  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    setSelectedCountry(isoCode);
    setStates([]);
    setCities([]);

    const newStates = State.getStatesOfCountry(isoCode) || [];
    setStates(newStates);

    // Find the selected country's phone code
    const selectedCountryData = countries.find(country => country.isoCode === isoCode);
    const phoneCode = selectedCountryData ? selectedCountryData.phoneCode : "N/A";

    setData((prevData) => ({
      ...prevData,
      country: isoCode,
      country_code: isoCode,
      state: "",
      city: "",
      phone_code: phoneCode, // Add phone code to data
    }));
  };





  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "city" && { city: value }),
    }));
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&#]/.test(password)
    ) {
      return "Strong";
    }
    return "Medium";
  };

  const handleForms = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (passwordStrength !== "Strong") {
      toast.error(
        "Weak password. Use at least 8 characters, with letters, numbers, and special characters."
      );
      return;
    }

    setLoading(true);
    try {
      const main = new Listing();
      localStorage && localStorage.setItem("email", data?.email);
      const response = await main.SignUpOtp(data);
      if (response?.data?.status === "success") {
        toast.success(response.data.message);
        //   navigate("/login");
        onClose();
      } else {
        toast.error(response?.data?.message || "Signup failed");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
      // if (error?.response?.data?.errors) {
      //   Object.entries(error?.response?.data?.errors).forEach(([key, value]) => {
      //     toast.error(`${key}: ${value}`);
      //   });
      // } else {
      //   toast.error(error?.response?.data?.message)
      // }
    } finally {
      setLoading(false);
    }
  };


  const passwordStrengthColor =
    passwordStrength === "Strong"
      ? "text-green-500"
      : passwordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <form
      onSubmit={handleForms}
      className="login-form w-full max-w-[1180px] bg-[#1B1B1B] rounded-[10px] m-auto pt-[5px] pb-[10px]"
    >
      <h2 className="font-manpore font-[600] text-white text-center px-[15px] text-[25px] md:text-[40px] lg:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] ">
        Create your account
      </h2>

      <div className="px-[20px] py-[15px]  md:px-[40px] md:py-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 w-full">
          <div className="mb-2 md:mb-5">
            <label
              htmlFor="username"
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autocomplete="off"
              required
              onChange={handleInputs}
              value={data.username}
              placeholder="Enter your name..."
              className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
            />
          </div>

          <div className="mb-2 md:mb-5">
            <label
              htmlFor="email"
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Email
            </label>
            <input
              type="email"

              id="email"
              name="email"
              required
              onChange={handleInputs}
              value={data.email}
              placeholder="Enter your email..."
              className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
            />
          </div>

          <div className="mb-2 md:mb-5 ">
            <label
              htmlFor="DOB"
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="DOB"
              name="DOB"
              autocomplete="off"
              required
              onChange={handleInputs}
              value={data.DOB}
              placeholder="Enter your DOB..."
              className="placeholder:text-[#998e8e] h-[67px] bg-[#1B1B1B] border border-[#ffffff14] w-full max-w-[400px] px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none date-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-5 w-full">
          <div className=" mb-2 md:mb-5 ">
            <label
              htmlFor=""
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Country
            </label>
            <select
              name="country"
              autocomplete="off"
              required
              value={selectedCountry}
              onChange={handleCountryChange}
              className="drowpdown_icon border border-[#ffffff14] w-full h-[65px] px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 md:mb-5">
            <label
              htmlFor=""
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              autoComplete="off"
              required
              onChange={handleInputs}
              value={data.address}
              placeholder="Enter your address..."
              className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full">


          <div className=" mb-2 md:mb-5 ">
            {/* Phone Number Input */}
            <div className="w-full">
              <label
                htmlFor="phone_number"
                className="block font-manrope font-[400] text-white text-[18px] mb-[10px]"
              >
                Phone Number
              </label>

              <div className="relative">
                <span className="absolute top-5 left-5 text-gray-300">{data.phone_code || ''}</span>
                <input
                  type="text"
                  name="phone_number"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleInputs(e);
                    }
                  }}
                  value={data.phone_number}
                  required
                  maxLength={10}
                  placeholder="Enter your Phone Number"
                  className="placeholder:text-[#998e8e] top-5 left-5  bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none !ps-[70px]"
                />
              </div>
            </div>
          </div>

          <div className=" mb-2 md:mb-5">
            <label
              htmlFor=""
              className="block w-full font-manrope font-[400] text-white text-[18px] mb-[2px]  md:mb-[10px]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autocomplete="off"
                required
                onChange={handleInputs}
                value={data.password}
                placeholder="Enter your password..."
                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[20px] right-5"
              >
                {showPassword ? (
                  <IoEyeOff size={24} className="text-white" />
                ) : (
                  <IoEye size={24} className="text-white" />
                )}
              </button>
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${passwordStrengthColor}`}
            >
              {passwordStrength && `${passwordStrength} Password`}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center px-[20px]">
        <button
          type="submit"
          disabled={loading} //
          className="w-full max-w-[320px] bg-[#ff0062] hover:bg-[#4400c3] px-5 py-4 text-white text-base text-center rounded-md"
        >
          {loading ? "Loading.." : "Sign Up"} {/* Fixed typo */}
        </button>
      </div>
    </form>
  )
}
