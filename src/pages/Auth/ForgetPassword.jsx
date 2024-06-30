import React, { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import StackkAI from "../../assets/icons/stackkailogo.png";

export default function ForgotPassword({
  setIsLoginFormVisible,
  setIsForgotPasswordVisible,
}) {
  const [step, setStep] = useState("email"); // email, otp, newPassword
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const otpRefs = useRef([]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add your email submission logic here
    setStep("otp");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numeric input
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    setStep("newPassword");
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else if (!validatePassword(newPassword)) {
      setPasswordError("Please ensure your password meets all the criteria.");
    } else {
      setPasswordError("");
      // Add your new password submission logic here
      // Optionally, switch back to the login form
      setIsLoginFormVisible(true);
    }
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /\d/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    return lengthValid && numberValid && uppercaseValid;
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("email");
    } else if (step === "newPassword") {
      setStep("otp");
    }
  };

  return (
    <div>
      <section className="bg-[#fff] p-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-[150px] mr-2" src={StackkAI} alt="logo" />
          </div>
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
              {step === "email" && (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Forgot your password?
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleEmailSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-[#fff] bg-[#2C4BFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                    >
                      Continue
                    </button>

                    <div className="text-center">
                      <span
                        className="text-[#2C4BFF] cursor-pointer"
                        onClick={() => setIsForgotPasswordVisible(false)}
                      >
                        Back to login
                      </span>
                    </div>
                  </form>
                </>
              )}

              {step === "otp" && (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Enter the OTP
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleOtpSubmit}
                  >
                    <div className="flex justify-between">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="tel"
                          maxLength="1"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] w-12 h-12 text-center"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-[#fff] bg-[#2C4BFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                    >
                      Continue
                    </button>
                  </form>
                </>
              )}
              {step === "newPassword" && (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Set a new password
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleNewPasswordSubmit}
                  >
                    <div className="relative">
                      <label
                        htmlFor="new-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="new-password"
                        id="new-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                        placeholder="••••••••"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {newPassword && (
                        <div
                          className="absolute bottom-[80px] right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      )}
                      <ul className="mt-2 text-sm">
                        <li
                          className={`flex items-center gap-1 ${
                            newPassword.length >= 8
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {newPassword.length >= 8 ? <FaCheck /> : <FaTimes />}{" "}
                          At least 8 characters
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            /\d/.test(newPassword)
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {/\d/.test(newPassword) ? <FaCheck /> : <FaTimes />}{" "}
                          Contains a number
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            /[A-Z]/.test(newPassword)
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {/[A-Z]/.test(newPassword) ? (
                            <FaCheck />
                          ) : (
                            <FaTimes />
                          )}{" "}
                          Contains an uppercase letter
                        </li>
                      </ul>
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm-password"
                        id="confirm-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {confirmPassword && (
                        <div
                          className="absolute inset-y-0  top-[27px] right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      )}
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full text-[#fff] bg-[#2C4BFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                    >
                      Continue
                    </button>
                  </form>
                </>
              )}
              {step !== "email" && (
                <div
                  className="flex items-center justify-center mb-4 cursor-pointer text-[#2C4BFF]"
                  onClick={handleBack}
                >
                  <BiArrowBack className="mr-2" />
                  <span>Back</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
