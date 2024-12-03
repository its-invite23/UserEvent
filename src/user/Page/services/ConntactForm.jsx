import { useEffect, useRef, useState } from "react";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";

function ContactForm() {
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

          // Combine root code with suffixes to get full phone codes
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

  const handlePhoneCodeChange = (e) => {
    setData((prevState) => ({ ...prevState, phone_code: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  async function handleForms(e) {
    e.preventDefault();
    if(data.phone_number.length !=10){
      toast.error("Please enter a valid number");
      return;
    }
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
        name: "",
        email: "",
        message: "",
        phone_code: "",
        phone_number: "",
      });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <>
      <form onSubmit={handleForms} className="newsletter w-full max-w-[800px] flex flex-wrap justify-center gap-[20px] m-auto">
        <input
          type="text"
          autocomplete="off"
          name="name"
          onChange={handleInputs}
          value={data.name}
          required
          placeholder="Enter your name"
          className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#fff] bg-[#302f2f] focus:outline-none"
        />
        <input
          type="email"
          autocomplete="off"
          name="email"
          onChange={handleInputs}
          value={data.email}
          required
          placeholder="Enter your email"
          className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#fff] bg-[#302f2f] focus:outline-none"
        />
        <div className="relative w-[100%] md:w-[33%]" ref={dropdownRef}>
          {/* Search Input */}
          <input
            type="text"
            autocomplete="off"
            placeholder="Search for a country..."
            value={searchTerm}
            required
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)} // Show dropdown on focus
            className="w-full px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#fff] bg-[#302f2f] focus:outline-none focus:outline-none"
          />

          {/* Dropdown */}
          {showDropdown && (
            <ul className="absolute z-10 w-full max-h-[200px] bg-white border border-gray-300 rounded-b-[10px] shadow-md overflow-y-auto">
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
          autocomplete="off"
          type="text"
          name="phone_number"
          onChange={(e) => {
            if (
              e.target.value.length <= 10 &&
              /^[0-9]*$/.test(e.target.value)
            ) {
              handleInputs(e);
            }
          }}
          maxLength="10"
          value={data.phone_number}
          required
          placeholder="Enter your Phone Number"
          className="w-[100%] md:w-[33%] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#fff] bg-[#302f2f] focus:outline-none placeholder:text-[#aaa]"
        />
        <textarea
          name="message"
          autocomplete="off"
          onChange={handleInputs}
          value={data.message}
          required
          className="w-[100%] max-w-[100%] md:max-w-[68.5%] h-[150px] px-[15px] py-[18px] rounded-[10px] text-[16px] text-[#fff] bg-[#302f2f] focus:outline-none placeholder:text-[#aaa]"
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
    </>
  );
}

export default ContactForm;
