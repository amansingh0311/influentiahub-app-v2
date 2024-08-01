import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StackkAI from "../../assets/icons/stackkailogo.png";
import { Button } from "@tremor/react";
import { Eye, EyeOff } from "react-feather"; // Use Feather icons for the eye button

export default function SignupForm({ setIsLoginFormVisible }) {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill("")); // Assume OTP length is 6 digits
  const [isLoading, setIsLoading] = useState(false); // Loading state for OTP
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [formErrors, setFormErrors] = useState({});
  const otpRefs = useRef([]);
  let navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    // Basic validation
    let errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password || password.length < 8) errors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsLoading(true);
    // Simulate sending signup details and requesting OTP
    setTimeout(() => {
      setIsOtpVisible(true);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1); // Allow only one character
    setOtp(newOtp);

    // Move focus to the next input
    if (e.target.value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Move focus to the previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate OTP verification (replace with real verification logic)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      navigate("/social-connect");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#fff]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-[150px] mr-2" src={StackkAI} alt="logo" />
          </div>
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            {!isOtpVisible ? (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                    />
                    {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full common-button"
                    loading={isLoading}
                  >
                    Sign up
                  </Button>
                  <p className="text-sm font-light text-[#000] flex gap-2">
                    Already have an account?{" "}
                    <div
                      className="font-medium text-[#2C4BFF] hover:underline dark:text-primary-500"
                      onClick={() => setIsLoginFormVisible(true)}
                    >
                      Sign in
                    </div>
                  </p>
                </form>
              </div>
            ) : (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full relative common-button"
                    loading={isLoading}
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

SignupForm.propTypes = {
  setIsLoginFormVisible: PropTypes.func.isRequired,
};
