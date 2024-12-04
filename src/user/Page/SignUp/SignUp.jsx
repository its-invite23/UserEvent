import React, { useEffect, useState } from "react";
import Header from "../../compontents/Header";
import { Link, useNavigate } from "react-router-dom";
import Listing from "../../../Api/Listing";
import toast, { Toaster } from "react-hot-toast";
import { City } from "country-state-city";

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
    phone_code: "",
    country_code: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const formattedCountries = data
          .map((country) => ({
            name: country.name.common,
            isoCode: country.cca2,
            currency: country.currencies
              ? Object.keys(country.currencies)[0]
              : "N/A",
            phoneCode: country.idd.root
              ? country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : "")
              : "N/A",
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
        setCountries(formattedCountries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    const country = countries.find((c) => c.isoCode === isoCode);
    setSelectedCountry(isoCode);
    setData((prevData) => ({
      ...prevData,
      country: country ? country.name : "",
      phone_code: country ? country.phoneCode : "",
      country_code: country ? country?.currency : " ",
    }));

    setCities(City.getCitiesOfCountry(isoCode) || []);
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
      const response = await main.signup(data);

      if (response?.data?.status === "success") {
        toast.success(response.data.message);
        navigate("/login");
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
    <div className="bg-[#000]  1h-screen min-h-full pb-[100px]">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#000] px-[15px] ">
        <form
          onSubmit={handleForms}
          className="w-full max-w-[1180px] bg-[#1B1B1B] rounded-[10px] m-auto py-[15px] "
        >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
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
                  className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  autocomplete="off"
                  id="email"
                  name="email"
                  required
                  onChange={handleInputs}
                  value={data.email}
                  placeholder="Enter your email..."
                  className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
                />
              </div>

              <div className="mb-5 ">
                <label
                  htmlFor="DOB"
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
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
                  className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none date-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">

              <div className=" mb-5 ">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
                >
                  Country
                </label>
                <select
                  name="country"
                  autocomplete="off"
                  required
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="bg-[#1B1B1B] border border-[#ffffff14] w-full h-[65px] px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" mb-5 ">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
                >
                  City
                </label>
                <select
                  name="city"
                  autocomplete="off"
                  onChange={handleInputs}
                  value={data.city}
                  required
                  className="bg-[#1B1B1B]  h-[65px] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none"
                >
                  <option value="">Select City..</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
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
                  className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full">
              <div className=" mb-5 ">
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

              <div className=" mb-5">
                <label
                  htmlFor=""
                  className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]"
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
                    className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
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
      </div >
    </div >
  );
}