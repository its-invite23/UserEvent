import React, { useState } from 'react'
import Popup from './Popup';

export default function Founder() {
    const [isopen, setisOpen] = useState(false);
    const handleOpen = () => {
        setisOpen(true)
    }
    return (
        <>
            <div className="mt-[30px]">
                <button
                    onClick={handleOpen}
                    className="flex items-center justify-center gap-[8px] w-[100%] min-w-[195px] px-[10px] py-[14px] rounded-[60px] bg-[#ff0062] hover:bg-[#4400c3] font-[manrope] font-[600] text-[17px] text-white text-center"
                >
                    Founder
                </button>
            </div>
            <Popup>

            </Popup>
        </>
    )
}
