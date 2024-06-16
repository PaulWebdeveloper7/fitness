"use client";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";

import OtpInput from "react-otp-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./firebase.config";

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

      console.log("Confirmation Result:", confirmationResult);
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
      console.log("OTP verified successfully. User:", result.user);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="" className="font-bold text-xl text-white text-center">
        Verify your phone number
      </label>
      <PhoneInput
        country={"in"}
        value={ph}
        onChange={(value: string) => {
          setPh("+" + value);
        }}
      />
      <button
        onClick={sendOtp}
        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
        disabled={loading}
      >
        <span>Send code via SMS</span>
      </button>
      <br />
      <div className="my-10" id="recaptcha"></div>
      <br />
      {showOTP && (
        <>
          <label
            htmlFor="otp"
            className="font-bold text-xl text-white text-center"
          >
            Enter your OTP
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button
            onClick={onOTPVerify}
            className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            disabled={loading}
          >
            <span>Verify OTP</span>
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
