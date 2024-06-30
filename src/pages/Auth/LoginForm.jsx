import React from "react";
import StackkAI from "../../assets/icons/stackkailogo.png";

export default function LoginForm({
  setIsLoginFormVisible,
  setIsForgotPasswordVisible,
}) {
  return (
    <div>
      <section className="bg-[#fff]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <img className="w-[150px] mr-2" src={StackkAI} alt="logo" />
          </div>
          <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium">
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
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-[#2C4BFF] dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div
                    className="text-sm font-medium text-[#2C4BFF] cursor-pointer hover:underline dark:text-primary-500"
                    onClick={() => setIsForgotPasswordVisible(true)}
                  >
                    Forgot password?
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-[#fff] bg-[#2C4BFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-[#000] flex gap-2 flex-wrap">
                  Don’t have an account yet?{" "}
                  <div
                    className="font-medium text-[#2C4BFF] cursor-pointer hover:underline dark:text-primary-500"
                    onClick={() => setIsLoginFormVisible(false)}
                  >
                    Sign up
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
