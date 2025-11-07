import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Listing from '../../Api/Listing';
import AOS from "aos";
import "aos/dist/aos.css";
export default function ContactForm({ onClose }) {
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
            onClose();
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
        <form
            onSubmit={handleForms}
            className="login-form w-full max-w-[1180px] bg-[#1B1B1B] rounded-[10px] m-auto pt-[5px] pb-[10px]"
        >
            <div className="px-[10px] py-[10px]  md:px-[20px] md:py-[20px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-5 w-full">
                    <div className="mb-2 md:mb-4">
                        <input
                            type="text"
                            name="name"
                            autocomplete="off"
                            onChange={handleInputs}
                            value={data.name}
                            required
                            placeholder="Enter your name"
                            className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"

                        />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <input
                            type="email"
                            name="email"
                            autocomplete="off"
                            onChange={handleInputs}
                            value={data.email}
                            required
                            placeholder="Enter your email"
                            className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"

                        />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <div className="relative w-[100%] md:w-[100%]" ref={dropdownRef}>
                            {/* Search Input */}
                            <input
                                type="text"
                                autocomplete="new-password"
                                name="random-field-123"
                                placeholder="Search for a country..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => setShowDropdown(true)}
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
                            />

                            {/* Dropdown */}
                            {showDropdown && (
                                <ul className="absolute z-10 w-full max-h-[500px] bg-white border border-gray-300 rounded-[10px] shadow-md overflow-y-auto">
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
                                                    className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
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
                    </div>
                    <div className="mb-2 md:mb-4">
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

                            className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"

                        />
                    </div>
                </div>
                <div className="mb-2 md:mb-4">
                    <textarea
                        name="message"
                        autocomplete="off"
                        onChange={handleInputs}
                        value={data.message}
                        required
                        rows={6}
                        cols={6}
                        className="w-[100%] max-w-[100%] h-[150px] placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-3 md:py-5 rounded-lg text-base text-white hover:!outline-none focus:!outline-none"
                        placeholder="Share your thoughts or questions here"
                    ></textarea>
                </div>
                <div className="w-full text-center">
                    <button
                        type="submit"
                        className="bg-[#EB3465] hover:bg-[#4400c3] rounded-[8px] px-[30px] py-[18px] font-manrope font-[600] text-[15px] text-white text-center"
                    >
                        {loading ? "Loading.. " : "Talk To Founder"}
                    </button>
                </div>
            </div>
        </form>
    )
}
