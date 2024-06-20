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

export default function page() {
  const [otp, setOtp] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  // Form state
  const [formValues, setFormValues] = useState({
 
    password: "",
  });

  // Form validation state
  const [formValid, setFormValid] = useState<boolean>(false);

  const router = useRouter();

  // Check form validity whenever formValues or phone number changes
  useEffect(() => {
    const {password } = formValues;
    if (password && ph) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formValues, ph]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      phoneno: data.get("phoneno"),
      password: data.get("password"),
    });
  };

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
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
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
      router.push("/process");
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
            backgroundImage: "url(/hero1.jpg)",
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={sendOtp} sx={{ mt: 1 }}>
              
              
           
              <PhoneInput
                country={"in"}
                value={ph}
                onChange={(value: string) => {
                  setPh("+" + value);
                }}
                inputStyle={{ width: "100%", padding: "25px" }}

                placeholder="Enter phone number"
              />
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
                    href="/sign-up"
                    variant="body2"
                    className="text-black no-underline"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          </Grid>
      ):(
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
      </Grid>
    </ThemeProvider>
  );
}
