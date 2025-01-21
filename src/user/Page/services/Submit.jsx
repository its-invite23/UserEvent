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

export default function Submit({ steps }) {

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
    const selectedVenues = useSelector(
        (state) => state.selectedVenues.selectedVenues
    );

    const totalPrice = selectedVenues.reduce((acc, venue) => {
        const price = parseFloat(
            venue.services_provider_price
                ? venue.services_provider_price
                : venue.price
        );
        return acc + (isNaN(price) ? 0 : price);
    }, 0);
    const handleSubmit = async () => {
        setLoading(true);
        const formDataStringify = JSON.stringify(updatedFormData);
        const main = new Listing();
        try {
            const response = await main.addBooking({
                Package: selectedVenues || [],
                bookingDate: `${updatedFormData.day}-${updatedFormData.month}-${updatedFormData.year}`,
                formData: formDataStringify || "",
                location: updatedFormData?.area,
                status: "pending",
                package_name: updatedFormData?.event_type,
                attendees: updatedFormData?.people,
                totalPrice: totalPrice || 0,
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
        <div className="flex flex-col items-center justify-center mt-5 ">
            {steps === 1 ? (

                <>
                    <p className="text-white text-center font-bold">
                        If any of the suggestions perfectly match your needs, you can still submit your request.
                    </p>
                    <p className="text-white text-center font-bold">
                        Our team will personally get back to you within the next hour with tailored suggestions to make your event exceptional.
                    </p>
                </>
            ) : (<>
                <p className="text-white text-center font-bold">
                    Oops! It looks like we don’t have any suggestions that perfectly match your needs at the moment.
                </p>
                <p className="text-white text-center font-bold">
                    But don’t worry! You can still submit your request, and our team will personally get back to you within the next hour with tailored suggestions to make your event exceptional.
                </p>
            </>
            )}

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
                    className="mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#242424] hover:bg-[#404040] text-white "
                >
                    {loading ? "Processing..." : "Submit"}
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
