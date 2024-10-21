import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";
import Listing from '../../Api/Listing';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetLink() {
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
      const response = await main.login(Regs);
      if (response?.data?.status === true) {
        toast.success(response.data.message);
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
        <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[0]">Reset password</h2>
        <button 
          onClick={toggleModal} 
          className='flex items-center gap-[10px] px-[20px] py-[8px] border border-[#ffffff1a] rounded-[80px] font-[manrope] font-[600] text-white text-[18px]'
        >
          Resetpassword
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1B1B1B] rounded-lg p-6 w-11/12 md:w-1/3">
            <div className='flex  flex-wrap justify-between'>
            <h3 className="text-lg font-semibold mb-4 text-white">Add New Package</h3>
              <IoCloseSharp size={24} className='cursor-pointer text-white'  onClick={toggleModal}/>
              </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter package name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">Package Minium  Price</label>
                <input type="email"
                name="email"
                onChange={handleInputs}
                value={Regs.email}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#1B1B1B] text-white" placeholder="Enter package name" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={toggleModal} className="text-white mr-2 px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
                <button
              onClick={handleForms}
              className='w-full bg-[#EB3465] hover:bg-[#fb3a6e]  px-5 py-4 min-w-52 text-white text-base text-center rounded-md'>

              {loading ? ("Laoding") : ("ForgetPassword")}
            </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
