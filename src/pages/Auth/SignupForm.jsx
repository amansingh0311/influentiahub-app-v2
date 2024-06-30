import React from "react";
import { useNavigate } from "react-router-dom";
import StackkAI from "../../assets/icons/stackkailogo.png";

export default function SignupForm({ setIsLoginFormVisible }) {
  let navigate = useNavigate();

  const handleSignup = () => {
    navigate("/social-connect");
  };

  return (
    <div>
      <section className="bg-[#fff]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <img className="w-[150px] mr-2" src={StackkAI} alt="logo" />
          </div>
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-[#2C4BFF] focus:border-[#2C4BFF] block w-full p-2.5"
                    required=""
                  />
                </div>

                <button
                  onClick={handleSignup}
                  className="w-full text-[#fff] bg-[#2C4BFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center "
                >
                  Sign up
                </button>
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
          </div>
        </div>
      </section>
    </div>
  );
}
