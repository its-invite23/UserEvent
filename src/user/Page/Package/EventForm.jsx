import React, { useEffect, useState } from 'react';
import Listing from '../../../Api/Listing';
import toast from 'react-hot-toast';

export default function EventForm() {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
        eventname: '',
        event_type: '',
        attendees: '',
        phone_code: '',
        phone_number: ''
    });

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

    const handleInputs = (e) => {
        const { name, value } = e.target;
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
            const response = await main.Enquiry(data);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                setData({
                    name: '',
                    email: '',
                    message: '',
                    eventname: '',
                    event_type: '',
                    attendees: '',
                    phone_code: '',
                    phone_number: ''
                });
            } else {
                toast.error(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Invalid Email/password');
            setLoading(false);
        }
    }

    return (
        <div className="max-w-[1230px] mx-auto">
            <h2 className="font-manpore font-[600] text-white text-center text-[22px] md:text-[32px] lg:text-[40px] xl:text-[48px] leading-[30px] md:leading-[40px] lg:leading-[48px] mb-[8px] md:mb-[20px] lg:px-[50px] xl:px-[60px]">
                Can’t find what you're looking for? Just let us know what you need for your event.
            </h2>
            <form onSubmit={handleForms} className="w-full max-w-[1180px] bg-[#1B1B1B] mt-[40px] rounded-[10px] lg:rounded-[20px] m-auto px-[20px] md:px-[50px] py-[20px] md:py-[50px]">
                <div className="">
                    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">User Name</label>
                            <input
                                type="text"
                                autocomplete="off"
                                name="name"
                                onChange={handleInputs}
                                value={data.name}
                                required
                                placeholder="Enter your username.."
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>

                        <div className=" mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Email</label>
                            <input
                                type="email"
                                autocomplete="off"
                                name="email"
                                onChange={handleInputs}
                                required
                                value={data.email}
                                placeholder="Enter your email..."
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>

                    </div>
                    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Phone Code</label>
                            <select
                                onChange={handlePhoneCodeChange}
                                value={data.phone_code}
                                autocomplete="off"
                                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-[12px] py-[18px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            >
                                <option value="">Select a country Code</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.phoneCodes[0]}>
                                        {country?.name}  ({country.phoneCodes[0]} )
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className=" mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Phone Number</label>
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
                                required
                                value={data.phone_number}
                                placeholder="Enter your Phone Number"
                                className="placeholder:text-[#998e8e]  bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>

                    </div>
                    {/* Additional Fields */}
                    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Event Name</label>
                            <input
                                type="text"
                                autocomplete="off"
                                name="eventname"
                                onChange={handleInputs}
                                required
                                value={data.eventname}
                                placeholder="Enter your event name.."
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Event Type</label>
                            <input
                                type="text"
                                autocomplete="off"
                                name="event_type"
                                onChange={handleInputs}
                                required
                                value={data.event_type}
                                placeholder="Enter your event type..."
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Attendees</label>
                            <input
                                type="number"
                                autocomplete="off"
                                name="attendees"
                                onChange={handleInputs}
                                required
                                value={data.attendees}
                                placeholder="Enter your attendees..."
                                className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="w-full">
                        <label htmlFor="" className="block w-full font-manrope font-[400] text-white text-[18px] mb-[10px]">Message</label>
                        <textarea
                            name="message"
                            autocomplete="off"
                            onChange={handleInputs}
                            required
                            value={data.message}
                            placeholder="Write your message.."
                            className="placeholder:text-[#998e8e] bg-[#1B1B1B] border border-[#ffffff14] w-full px-[15px] py-[15px] rounded-lg text-base text-white hover:outline-none focus:outline-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-[20px]">
                        <button
                        type="submit"
                            className="bg-[#ff0062] hover:bg-[#4400c3] text-white px-[20px] py-[15px] rounded-[5px] font-bold text-[18px] w-full md:w-[30%]"
                        >
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
