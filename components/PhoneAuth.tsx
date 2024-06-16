"use client";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import OTPInput from "react-otp-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";

// Extend the Window interface to include the confirmation property.
declare global {
  interface Window {
    confirmation: ConfirmationResult | null;
  }
}

// Initialize the window.confirmation as null
window.confirmation = null;

const PhoneAuth: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const sendOtp = async () => {
    setLoading(true);
    try {
       const recaptchaVerifier = new RecaptchaVerifier(auth ,"recaptcha",{})
       recaptchaVerifier.render()

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        ph,
        recaptchaVerifier
      );
      window.confirmation = confirmationResult;
      setShowOTP(true);

    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const onOTPVerify = async () => {
    setLoading(true);
    try {
      if (!window.confirmation) {
        throw new Error(
          "confirmationResult is not available. Cannot verify OTP."
        );
      }

      // Confirm the OTP using the confirmationResult stored in window
      const result = await window.confirmation.confirm(otp);
      setUser(result.user);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" my-10 ">
    {!showOTP ? (
      <form>
      <div>
      <input type="text" name="username" id="name" placeholder="Enter your name" required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
      />
    </div>
    <div>
      <input type="email" name="email" id="email" placeholder="Enter your email" required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
      />
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder="Enter password" required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5" 
      />
    </div>
     
      <PhoneInput
        country={"in"}
        value={ph}
        onChange={(value: string) => {
          setPh("+" + value);
        }}
        
        
      />
      <button
        onClick={sendOtp}
        className="bg-black  w-full flex gap-1 items-center justify-center py-2.5 text-white rounded my-5"
        disabled={loading}
      >
        <span>Sign in</span>
      </button>
      <br />
      <div className="my-10" id="recaptcha"></div>
      <br />
      </form>
    ):(
        <div>
          <label
            htmlFor="otp"
            className="font-bold text-xl text-black text-center my-5"
          >
            Enter your OTP
          </label>
          <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle={'border border-gray-300 rounded-md text-center mx-1 w-10 h-12 text-lg'}
        skipDefaultStyles={true}
        shouldAutoFocus
        />
      <button
         onClick={onOTPVerify}
         className={`bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded my-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      </div>
    )
  }
    </div>
  );
};

export default PhoneAuth;