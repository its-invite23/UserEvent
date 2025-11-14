import React, { useState } from 'react'
import Popup from './Popup';
import ContactForm from './ContactForm';
import { FiArrowDownRight } from "react-icons/fi";

export default function Founder() {
    const [isopen, setisOpen] = useState(false);
    const closePopup = () => setisOpen(false);

    return (
        <>
            <div className="flex justify-center items-center mx-auto mt-[10px] z-10">
                <button
                    onClick={() => { setisOpen(true) }}
                    className="flex items-center gap-2 px-[25px] py-[12px] xl:px-[30px] xl:py-[15px] bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[500] text-[16px] lg:text-[18px] text-white rounded-[5px]"
                >
                    <FiArrowDownRight size={24} className="text-white " />
                    Talk To a Founder
                </button>
            </div>
            <div className="!z-[9999]">
                <Popup
                    isOpen={isopen}
                    onClose={closePopup}
                    size="w-full max-w-[650px]"
                    heading={"Talk To a Founder"}
                    content={<ContactForm isPopup={true} onClose={closePopup} />}
                />
            </div>

        </>
    )
}
