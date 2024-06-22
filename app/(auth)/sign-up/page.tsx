"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HttpsIcon from "@mui/icons-material/Https";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneInput from "react-phone-input-2";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import OTPInput from "react-otp-input";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/components/FirebaseConfig";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    confirmation: ConfirmationResult | null;
  }
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://fitnesshunder.vercel.app/">
        fitnesshunger.vercel.app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhonenumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  // Form state
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  // Form validation state
  const [formValid, setFormValid] = useState<boolean>(false);

  const router = useRouter();

  // Check form validity whenever formValues or phone number changes
  useEffect(() => {
    const { fullname, email, password } = formValues;
    if (fullname && email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formValues]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
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
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
      recaptchaVerifier.render();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      window.confirmation = confirmationResult;
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: formValues.fullname,
          phoneNumber: phoneNumber,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
        }),
      });
      if (response.ok) {
        console.log(response);
      }
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

      const role = formValues.role;
      const id = crypto.randomUUID();

      if (role == "Trainee") {
        router.push(`/trainee/${id}`);
      } else if (role == "Client") {
        router.push(`/client/${id}`);
      } else if (role == "Super-Admin") {
        router.push(`/super-admin/${id}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/hero7.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {!showOTP ? (
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "dark.main" }}>
                <HttpsIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={sendOtp}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your fullName"
                  value={formValues.fullname}
                  autoComplete="fullname"
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  // required
                  fullWidth
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  autoComplete="current-email"
                />

                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={(value: string) => {
                    setPhonenumber("+" + value);
                  }}
                  inputStyle={{
                    width: "100%",
                    padding: "25px",
                    paddingRight: "30px",
                    paddingLeft: "40px",
                  }}
                  placeholder="Enter phone number"
                />
                <select
                  id="role"
                  name="role"
                  value={formValues.role}
                  onChange={handleInputChange}
                  className="mt-6 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 my-5"
                >
                  <option>Select your role</option>
                  <option value="Trainee">Trainee</option>
                  <option value="Client">Client</option>
                  <option value="Super-admin">Super Admin</option>
                </select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="By continuing i accept privacy policy"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="bg-black"
                >
                  <span>{loading ? "Sending..." : "Sign up"}</span>
                </Button>
                <div className="my-10" id="recaptcha"></div>

                <Grid container>
                  <Grid item>
                    <Link
                      href="/sign-in"
                      variant="body2"
                      className="text-black no-underline"
                    >
                      {"Already have an account ? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        ) : (
          <div className=" m-auto">
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
              inputStyle={
                "border border-gray-300 rounded-md text-center mx-1 w-10 h-12 text-lg"
              }
              skipDefaultStyles={true}
              shouldAutoFocus
            />
            <button
              onClick={onOTPVerify}
              className={`bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded my-5 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </Grid>
    </ThemeProvider>
  );
}
