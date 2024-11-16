import React, { useEffect, useState } from "react";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryPhoneCodes = data.map((country) => {
          const countryName = country.name.common;
          const rootCode = country.idd?.root || '';
          const suffixes = country.idd?.suffixes || [''];

          // Combine root code with suffixes to get full phone codes
          const phoneCodes = suffixes.map((suffix) => `${rootCode}${suffix}`);

          return { name: countryName, phoneCodes };
        });

        setCountries(countryPhoneCodes);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    phone_code: '',
    phone_number: ''
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handlePhoneCodeChange = (e) => {
    setData((prevState) => ({ ...prevState, phone_code: e.target.value }));
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.contact(data);
      if (response?.data?.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
      setData({
        name: "", email: "", message: "", phone_code: '',
        phone_number: ''
      });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }
  return (
    <div className="px-[15px]">
      <div className="w-100 max-w-[1230px] m-auto px-[15px] md:px-[40px] py-[30px] lg:py-[60px] bg-[#6517F3] rounded-[10px] md:rounded-[15px]">
        <h2 className="mb-[20px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]">
          Contact Us
        </h2>
        <div className="newsletter w-full max-w-[800px] flex flex-wrap justify-center gap-[20px] m-auto">
          <input
            type="text"
            name="name"
            onChange={handleInputs}
            value={data.name}
            required
            placeholder="Enter your name"
            className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]"
          />
          <input
            type="email"
            name="email"
            onChange={handleInputs}
            value={data.email}
            required
            placeholder="Enter your email"
            className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]"
          />
          <select
            onChange={handlePhoneCodeChange}
            value={data.phone_code}
            className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]"
          >
            <option value="">Select a country Code</option>
            {countries.map((country, index) => (
              <option key={index} value={country.phoneCodes[0]}>
              {country?.name}  ({country.phoneCodes[0]} )
              </option>
            ))}
          </select>

          <input
            type="number"
            name="phone_number"
            onChange={handleInputs}
            value={data.phone_number}
            placeholder="Enter your PhoneNumber ..."
            className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000]"
          />
          <textarea
            name="message"
            onChange={handleInputs}
            value={data.message}
            className="w-[100%] max-w-[100%] md:max-w-[68.5%] h-[150px] px-[15px] py-[18px] rounded-[10px] text-[16px] text-![#000]"
            placeholder="enter the message"
          ></textarea>
          <div className="w-full text-center">
            <button
              onClick={handleForms}
              className="bg-[#EB3465] hover:bg-[#fb3a6e] rounded-[8px] px-[30px] py-[18px] font-manrope font-[600] text-[15px] text-white text-center"
            >
              {loading ? "Loading.. " : "Contact Us"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
