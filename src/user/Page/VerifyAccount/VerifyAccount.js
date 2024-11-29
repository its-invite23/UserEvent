import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Listing from "../../../Api/Listing";
import toast from "react-hot-toast";
export default function VerifyAccount() {
    const { token } = useParams();
    const navigate = useNavigate();
    const VerifyToken = async (token) => {
        try {
            const main = new Listing();
            const response = await main.verifyAccount({
                token: token,
            });
            if (response?.data?.status) {
                toast.success("Verification Successful!");
                navigate("/login")
            }
            else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        if (token) {
            VerifyToken(token);
        }
    }, [token]);
    return <div>VerifyAccount</div>;
}
