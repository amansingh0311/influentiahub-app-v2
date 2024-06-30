import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgetPassword";

export default function Login() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div className="w-full lg:w-[33.33333333333333%] h-full">
        {isLoginFormVisible ? (
          <div>
            {isForgotPasswordVisible ? (
              <ForgotPassword
                setIsForgotPasswordVisible={setIsForgotPasswordVisible}
                setIsLoginFormVisible={setIsLoginFormVisible}
              />
            ) : (
              <LoginForm
                setIsLoginFormVisible={setIsLoginFormVisible}
                setIsForgotPasswordVisible={setIsForgotPasswordVisible}
              />
            )}
          </div>
        ) : (
          <SignupForm setIsLoginFormVisible={setIsLoginFormVisible} />
        )}
      </div>
      <div className="w-[66.66666666666666%] hidden lg:block relative pt-[6%] h-full bg-cover bg-[url('https://static.buffer.com/login/public/img/ai-assistant-bg.jpg')]">
        <svg
          className="absolute top-[70px] left-[710px] z-[1]"
          width="79"
          height="121"
          viewBox="0 0 79 121"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.7393 45.5798C35.0258 45.245 34.9742 44.8695 34.7042 44.5557C31.4535 40.3664 31.2929 40.3119 33.999 35.5024C34.2342 35.0823 34.2065 34.7273 33.8717 34.4408C33.5608 34.1748 33.2057 34.2025 32.8475 34.4759C28.4502 37.9215 28.3511 37.7952 23.7738 35.205C23.422 34.9869 23.043 34.994 22.7566 35.3289C22.4906 35.6398 22.5422 36.0153 22.7917 36.3531C26.0664 40.5628 26.2713 40.6138 23.4969 45.4063C23.2583 45.782 23.2894 46.1815 23.6003 46.4474C23.9351 46.7339 24.3106 46.6823 24.6484 46.4328C29.0457 42.9873 29.1209 43.093 33.7221 45.7037C34.0739 45.9219 34.4733 45.8908 34.7393 45.5798ZM14.383 13.9696C14.6899 13.6109 14.6518 13.1227 14.334 12.768C10.4306 7.93751 10.1709 7.75682 13.5079 2.1615C13.7635 1.71743 13.7494 1.24973 13.3667 0.922357C12.984 0.594981 12.5198 0.653466 12.1411 0.950846C7.06511 5.14128 6.78502 4.98451 1.53809 1.82137C1.11448 1.54183 0.626321 1.57985 0.319408 1.93862C-0.00796597 2.3213 0.0505182 2.78554 0.3479 3.16421C4.31616 7.96729 4.60317 8.21282 1.17405 13.7707C0.938882 14.1908 0.932528 14.6824 1.31521 15.0098C1.71835 15.3133 2.16214 15.2787 2.56127 14.9574C7.61679 10.7909 7.89689 10.9477 13.1677 14.1313C13.5879 14.3664 14.0556 14.3523 14.383 13.9696ZM28.4631 88.5645C28.7904 88.1818 28.732 87.7176 28.4346 87.3389C24.4493 82.6041 24.2271 82.3312 27.588 76.7564C27.8641 76.2884 27.8295 75.8446 27.4468 75.5172C27.0641 75.1899 26.6203 75.2244 26.2212 75.5457C21.1657 79.7122 20.9061 79.5316 15.6147 76.3719C15.1946 76.1367 14.7269 76.1508 14.3995 76.5335C14.0722 76.9162 14.1306 77.3804 14.4485 77.7352C18.4372 82.5143 18.6354 82.7668 15.2542 88.3656C15.019 88.7857 15.0331 89.2534 15.4158 89.5808C15.7985 89.9082 16.2627 89.8497 16.6414 89.5523C21.6969 85.3858 21.9361 85.5904 27.2683 88.7022C27.668 88.9613 28.1357 88.9472 28.4631 88.5645ZM78.6723 119.311C79.1019 118.809 79.074 118.164 78.5853 117.621C72.8062 111.352 72.8569 110.857 77.4791 103.42C77.8745 102.764 77.8705 102.14 77.3443 101.69C76.8421 101.26 76.2003 101.332 75.6954 101.729C68.7396 107.293 68.501 107.669 61.4124 102.93C60.801 102.532 60.1592 102.604 59.7295 103.106C59.2998 103.608 59.3278 104.254 59.813 104.752C65.6708 111.171 65.6814 111.594 60.8612 119.069C60.5238 119.609 60.5756 120.274 61.0779 120.704C61.5802 121.134 62.2219 121.061 62.7064 120.689C69.7474 115.073 69.9077 114.837 77.0576 119.504C77.6008 119.886 78.263 119.79 78.6723 119.311Z"
            fill="#D7AAFF"
          ></path>
        </svg>
        <section>
          <div className="pl-[10%]">
            <div className="inline-block text-[#645911] font-medium px-[8px] py-[4px] h-[24px] bg-[#f2e2ff] rounded-[17px] mb-[28px] text-[14px] leading-[16px] ">
              New!
            </div>
            <h2 className="font-bold text-white text-left mb-5 text-[35px] leading-[46px] max-w-[540px]">
              Stackk Assistant Becomes Social Media Smart
            </h2>
            <p className="text-white text-left mb-6 text-[18px] leading-[23px] max-w-[480px]">
              Create AI-tailored content, designed specifically for your
              audience and social network. Available to all (for free)!
            </p>
          </div>
        </section>
        <section>
          <div className="relative justify-end flex w-full">
            <div className="bg-cover w-[850px] h-[600px] bg-[url('../../src/assets/Images/LoginImage.png')]"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
