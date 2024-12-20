import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch data from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryPhoneCodes = data.map((country) => {
          const countryName = country.name.common;
          const rootCode = country.idd?.root || "";
          const suffixes = country.idd?.suffixes || [""];
          const phoneCodes = suffixes.map((suffix) => `${rootCode}${suffix}`);
          return { name: countryName, phoneCodes };
        });
        setCountries(countryPhoneCodes);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    phone_code: "",
    phone_number: "",
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    if (data?.phone_code === "") {
      toast.error("Please select a country from the dropdown!");
      return;
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
        name: "",
        email: "",
        message: "",
        phone_code: "",
        phone_number: "",
      });
      setSearchTerm();
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="contact" className="px-[15px]">
      <div className="w-100 max-w-[1230px] m-auto px-[15px] md:px-[40px] py-[30px] lg:py-[60px] bg-[#6517F3] rounded-[10px] md:rounded-[15px]">
        <div data-aos="zoom-in">
          <h2 className="mb-[10px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]">
            Contact Us
          </h2>
          <p className="mb-[40px] font-manrope font-[600] text-[#ffffff] text-[16px] leading-[22px] text-center px-[0] md:px-[40px]  lg:px-[160px]">
            Got questions, feedback, or need a hand? Want to be part of our
            journey or explore investment opportunities? <br /> Drop us a
            message—we'd love to hear from you!
          </p>

          <form
            onSubmit={handleForms}
            className="newsletter w-full max-w-[800px] flex flex-wrap justify-center gap-[20px] m-auto"
          >
            <input
              type="text"
              name="name"
              autocomplete="off"
              onChange={handleInputs}
              value={data.name}
              required
              placeholder="Enter your name"
              className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              autocomplete="off"
              onChange={handleInputs}
              value={data.email}
              required
              placeholder="Enter your email"
              className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000] focus:outline-none"
            />
            <div className="relative w-[100%] md:w-[33%]" ref={dropdownRef}>
              {/* Search Input */}
              <input
                type="text"
                autocomplete="new-password"
                name="random-field-123"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                className="w-full px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000] focus:outline-none"
              />

              {/* Dropdown */}
              {showDropdown && (
                <ul className="absolute z-10 w-full max-h-[200px] bg-white border border-gray-300 rounded-[10px] shadow-md overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setData((prevState) => ({
                              ...prevState,
                              phone_code: country.phoneCodes[0],
                            }));
                            setSearchTerm(
                              `${country?.name} ${country.phoneCodes[0]}`
                            ); // Set the text input to the selected country name
                            setShowDropdown(false); // Close the dropdown
                          }}
                          className="px-[15px] py-[10px] hover:bg-gray-100 cursor-pointer text-[16px] text-[#000]"
                        >
                          {country?.name} ({country.phoneCodes[0]})
                        </li>
                      ))
                  ) : (
                    <li className="px-[15px] py-[10px] text-[16px] text-gray-500">
                      No countries found
                    </li>
                  )}
                </ul>
              )}
            </div>

            <input
              type="tel"
              name="phone_number"
              onChange={(e) => {
                if (
                  e.target.value.length <= 10 &&
                  /^[0-9]*$/.test(e.target.value)
                ) {
                  handleInputs(e);
                }
              }}
              pattern="\d{10}"
              maxlength="10"
              minlength="10"
              placeholder="Enter your Phone Number"
              className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#000] focus:outline-none"
            />
            <textarea
              name="message"
              autocomplete="off"
              onChange={handleInputs}
              value={data.message}
              required
              className="w-[100%] max-w-[100%] md:max-w-[68.5%] h-[150px] px-[15px] py-[18px] rounded-[10px] text-[16px] text-![#000] focus:outline-none placeholder:text-[#998e8e]"
              placeholder="Share your thoughts or questions here"
            ></textarea>
            <div className="w-full text-center">
              <button
                type="submit"
                className="bg-[#EB3465] hover:bg-[#4400c3] rounded-[8px] px-[30px] py-[18px] font-manrope font-[600] text-[15px] text-white text-center"
              >
                {loading ? "Loading.. " : "Contact Us"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
