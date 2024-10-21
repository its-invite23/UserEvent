import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function FogetLinks() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const [Regs, setRegs] = useState({
        email: "",
    });
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [loading, setLoading] = useState(false);

    async function handleForms(e) {
        e.preventDefault();
        if (loading) {
            return false;
        }
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.ForgetPasswordLink(Regs);
            if (response?.data?.status === true) {
                toast.success(response.data.message);
                toggleModal();
            } else {
                toast.error("invalid email/password");
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            toast.error("invalid Email/password");
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col">
            <div className='flex items-center justify-between mb-[20px]'>
                <div onClick={toggleModal} className='mb-8 font-manrope text-[400] text-[18px] text-white text-base text-right'>
                    Forget Password
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#1B1B1B] rounded-lg p-6 w-11/12 md:w-1/3">
                        <div className='flex  flex-wrap justify-between'>
                            <h3 className="text-lg font-semibold mb-4 text-white">Reset your password</h3>
                            <p className="text-lg font-semibold mb-4 text-white">
                                Enter your email to receive a link to reset your password
                            </p>
                            <IoCloseSharp size={24} className='cursor-pointer text-white' onClick={toggleModal} />
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-white">Email</label>
                                <input type="email"
                                    name="email"
                                    onChange={handleInputs}
                                    value={Regs.email}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter the Email.." required />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleForms}
                                    className='w-full bg-[#EB3465] hover:bg-[#fb3a6e]  px-5 py-4 min-w-52 text-white text-base text-center rounded-md'>

                                    {loading ? ("Laoding...") : ("Send Link")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
