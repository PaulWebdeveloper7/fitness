"use client";
import PhoneInput from "react-phone-input-2";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import OTPInput from "react-otp-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useRouter } from "next/navigation";

// Extend the Window interface to include the confirmation property.
declare global {
  interface Window {
    confirmation: ConfirmationResult | null;
  }
}


const PhoneAuth: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  
  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Form validation state
  const [formValid, setFormValid] = useState<boolean>(false);

  const router = useRouter();

  // Check form validity whenever formValues or phone number changes
  useEffect(() => {
    const { name, email, password } = formValues;
    if (name && email && password && ph) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formValues, ph]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting
    if (!formValid) return; // Stop if form is not valid

    setLoading(true);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha',{ size: "invisible" },);
      recaptchaVerifier.render();

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
      router.push('/process');
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      {!showOTP ? (
        <form onSubmit={sendOtp}>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={formValues.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
            />
          </div>

          <PhoneInput
            country={"in"}
            value={ph}
            onChange={(value: string) => {
              setPh("+" + value);
            }}
            inputStyle={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            specialLabel=""
            placeholder="Enter phone number"
            
          />
          <button
            type="submit"
            className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded my-5"
            disabled={!formValid || loading}
          >
            <span>{loading ? "Sending..." : "Sign up"}</span>
          </button>
          <div className="my-10" id="recaptcha"></div>
        {
          !formValid && (
            <div></div>
          )
        }
        </form>
      ) : (
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
      )}
    </div>
  );
};

export default PhoneAuth;
