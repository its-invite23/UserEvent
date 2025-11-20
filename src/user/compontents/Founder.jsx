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
                    className="flex justify-center min-w-[220px] md:min-w-[160px] items-center gap-[5px] bg-[#000000] hover:bg-[#000000] rounded-[3px] px-[27px] py-[18px] lg:px-[30px] lg:py-[15px] font-[manrope] font-[600] text-[17px] text-white text-center !border !border-[#ff0062]"
                >
                    <FiArrowDownRight size={24} className="!text-[#ffffff]" />
                    Talk to a Founder
                </button>



            </div>
            <div className="z-[99999] ">
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
