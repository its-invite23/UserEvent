import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import Listing from "../../Api/Listing";
import UserLayout from "../Layout/UserLayout";

export default function ForgetPassword() {
  const { token } = useParams();

  const [Regs, setRegs] = useState({
    token: token,
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [newPasswordStrength, setNewPasswordStrength] = useState(""); // Separate state for new password strength
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(""); // Separate state for confirm password strength
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));

    if (name === "newPassword") {
      const strength = checkPasswordStrength(value);
      setNewPasswordStrength(strength);
    }

    if (name === "confirmPassword") {
      const strength = checkPasswordStrength(value);
      setConfirmPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&#]/.test(password)
    ) {
      return "Strong";
    }
    return "Medium";
  };

  const [loading, setLoading] = useState(false);

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }

    // Check for password strength and match
    if (newPasswordStrength !== "Strong") {
      toast.error(
        "Weak password. Use at least 6 characters, with letters, numbers, and special characters."
      );
      return;
    }

    if (Regs.newPassword !== Regs.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.ForgetPassword(Regs);
      if (response?.data) {
        toast.success(response.data.message);
        navigate("/login"); // navigate to the success page after resetting
      }
    } catch (error) {
      console.log("error", error?.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  const newPasswordStrengthColor =
    newPasswordStrength === "Strong"
      ? "text-green-500"
      : newPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  const confirmPasswordStrengthColor =
    confirmPasswordStrength === "Strong"
      ? "text-green-500"
      : confirmPasswordStrength === "Medium"
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="bg-[#000] h-full">
      <UserLayout>
        <div className="w-[90%] max-w-[580px] bg-[#1B1B1B]  rounded-[10px] mx-auto mt-[80px] py-[15px] md:py-[40px]">
          <h2 className="font-manpore font-[600] text-white text-center text-[25px] lg:text-[30px] md:text-[40px] lg:text-[48px] leading-[28px] md:leading-[40px] lg:leading-[48px] mb-[10px] md:mb-[20px]">
            Forgot Password
          </h2>
          <form
            onSubmit={handleForms} className="login-form p-[15px] md:p-[30px] pb-[0]">
            <div className="mb-5 relative">
              <input
                type={showNewPassword ? "text" : "password"}
                autocomplete="new-password"
                name="newPassword" // Corrected name
                onChange={handleInputs}
                value={Regs.newPassword}
                placeholder="Enter new password.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 pr-[60px] rounded-lg text-base text-white"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-[20px] right-5"
              >
                {showNewPassword ? (
                  <IoEyeOff size={24} className="text-white" />
                ) : (
                  <IoEye size={24} className="text-white" />
                )}
              </button>
              <p
                className={`mt-2 text-sm font-semibold ${newPasswordStrengthColor}`}
              >
                {newPasswordStrength && `${newPasswordStrength} Password`}
              </p>
            </div>

            <div className="mb-5 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                autocomplete="new-password"
                name="confirmPassword" // Corrected name
                onChange={handleInputs}
                value={Regs.confirmPassword}
                placeholder="Confirm new password.."
                className="bg-[#1B1B1B] border border-[#ffffff14] w-full px-5 py-5 pr-[60px] rounded-lg text-base text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[20px] right-5"
              >
                {showConfirmPassword ? (
                  <IoEyeOff size={24} className="text-white" />
                ) : (
                  <IoEye size={24} className="text-white" />
                )}
              </button>
              <p
                className={`mt-2 text-sm font-semibold ${confirmPasswordStrengthColor}`}
              >
                {confirmPasswordStrength &&
                  `${confirmPasswordStrength} Password`}
              </p>
            </div>
            <div className="mb-5 text-center">
              <button
                type="submit"
                className="w-full bg-[#ff0062] hover:bg-[#4400c3] px-5 py-4 min-w-52 text-white text-[16px] text-center rounded-md"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </UserLayout>
    </div>
  );
}
