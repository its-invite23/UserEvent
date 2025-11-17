import React, { useState } from 'react'
import Popup from './Popup';
import ContactForm from './ContactForm';
import { FiArrowDownRight } from "react-icons/fi";

export default function Founder() {
    const [isopen, setisOpen] = useState(false);
    const closePopup = () => setisOpen(false);

    return (
        <>
            <div className="flex justify-center items-center mx-auto mt-[10px] !z-10">
                <button
                    onClick={() => { setisOpen(true) }}
                    className="flex items-center gap-[10px] hover:gap-[15px] transition-all text-[18px] md:text-[16px] xl:text-[18px] font-[600] text-white text-center bg-[#80808033] hover:bg-[#80808059] px-[15px] py-[10px] md:px-[30px] md:py-[15px] lg:px-[15px] lg:py-[13px] xl:px-[30px] xl:py-[15px] rounded-[5px]"
                >
                    <FiArrowDownRight size={24} className="text-[#ff0062]" />
                    Talk to a Founder
                </button>


            </div>
            <div className="z-[99999] relative">
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
