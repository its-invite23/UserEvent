import React, { useContext, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVenues } from "../Redux/selectedVenuesSlice";
import { clearData } from "../Redux/formSlice.js";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";
import { CurrencyContext } from "../../../CurrencyContext.js";
import Popup from "../../compontents/Popup.jsx";
import LoginLogic from "../SignUp/LoginLogic.jsx";
import SignUpPopupLogic from "../SignUp/SignUpPopupLogic.jsx";
import VerifyOTP from "../SignUp/VerifyOTP.jsx";

export default function Submit() {

    const token = localStorage && localStorage.getItem("token");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
    const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => {
        setIsPopupOpen(false)
    };
    const closeLoginOpenSignUp = () => {
        setIsSignUpPopupOpen(true);
        setIsPopupOpen(false)
    };
    const closeSignUpPopup = () => setIsSignUpPopupOpen(false);

    const closeSignUpOpenOTPPopup = () => {
        setIsOTPPopupOpen(true);
        setIsSignUpPopupOpen(false);
    }

    const closeOTPPopup = () => setIsOTPPopupOpen(false);
    const dispatch = useDispatch();
    const updatedFormData = useSelector((state) => state.form.updatedFormData);

    const { currency } = useContext(CurrencyContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        const formDataStringify = JSON.stringify(updatedFormData);
        const main = new Listing();
        try {
            const response = await main.addBooking({
                Package: [],
                bookingDate: `${updatedFormData.day}-${updatedFormData.month}-${updatedFormData.year}`,
                formData: formDataStringify || "",
                location: updatedFormData?.area,
                status: "pending",
                package_name: updatedFormData?.event_type,
                attendees: updatedFormData?.people,
                totalPrice: 0,
                CurrencyCode: currency,
                package_data: "google"
            });
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                dispatch(clearData());
                dispatch(clearAllVenues());
                navigate("/book-success");
                setLoading(false);
            } else {
                toast.error(response.data.message);
                setLoading(false);

            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
            // navigate("/login");
            setLoading(false);

        }
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-white text-center font-bold">
                Oops! It looks like we don’t have any suggestions that perfectly match your needs at the moment.
            </p>
            <p className="text-white text-center font-bold">
                But don’t worry! You can still submit your request, and our team will personally get back to you within the next hour with tailored suggestions to make your event exceptional.
            </p>
            <div className="mt-[30px]">
                <button
                    onClick={() => {
                        if (token) {
                            handleSubmit();
                        } else {
                            // Open popup
                            openPopup();
                        }
                    }}
                    className="px-[25px] py-[12px] xl:px-[30px] xl:py-[15px] bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[500] text-[16px] lg:text-[18px] text-white rounded-[5px]"
                >
                    {loading ? "Processing..." : " Request to book"}
                </button>
            </div>
            <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                size="w-full max-w-lg"
                content={<LoginLogic isPopup={true} onClose={closePopup} closeLoginOpenSignUp={closeLoginOpenSignUp} />}
            />
            {/* Sign Up */}
            <Popup
                isOpen={isSignUpPopupOpen}
                size="w-[70%]"
                onClose={closeSignUpPopup}
                content={<SignUpPopupLogic isPopup={true} onClose={closeSignUpOpenOTPPopup} />}
            />

            {/* OTP */}
            <Popup
                isOpen={isOTPPopupOpen}
                onClose={closeOTPPopup}
                // content={<SignUpPopupLogic isPopup={true} onClose={closeSignUpPopup}/>}
                size="max-w-lg"
                content={<VerifyOTP onClose={closeOTPPopup} />}
            />

        </div>
    )
}
