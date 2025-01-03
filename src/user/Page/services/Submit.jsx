import React, { useContext, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVenues } from "../Redux/selectedVenuesSlice";
import { clearData } from "../Redux/formSlice.js";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";
import { CurrencyContext } from "../../../CurrencyContext.js";
export default function Submit() {
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
                <div
                    onClick={handleSubmit}
                    className={`mt-4 px-[50px] py-[17px] font-[500] text-[18px] rounded transition duration-300 bg-[#ff0062] text-white hover:bg-[#4400c3] 
                          cursor-pointer
                        }`}

                >
                    {loading ? "Loading..." : "Submit"}
                </div>
            </div>
        </div>
    )
}
