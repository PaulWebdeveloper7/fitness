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
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/components/FirebaseConfig";
import { useRouter } from "next/navigation";
import { Input } from "postcss";

declare global {
  interface Window {
    confirmation: ConfirmationResult | null;
  }
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://fitnesshunger.vercel.app/">
        fitnesshunger.vercel.app
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Define a theme (Optional)
const defaultTheme = createTheme();

export default function SignInSide() {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store field errors

  // Form state
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneno:""
  });

  // Form validation state
  const [formValid, setFormValid] = useState<boolean>(false);

  const router = useRouter();

  // Check form validity whenever formValues or phone number changes
  useEffect(() => {
    const { fullname, email, password  } = formValues;
    if (fullname && email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
      recaptchaVerifier.render();

      const confirmationResult = await signInWithPhoneNumber(auth, formValues.phoneno, recaptchaVerifier);
      window.confirmation = confirmationResult;
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: data.get("fullname"),
          phoneno: data.get("phoneno"),
          email: data.get("email"),
          password: data.get("password"),
          role: data.get("role"),
        }),
      });
        
      if (response.ok) {
        const role = data.get("role");
        const id = crypto.randomUUID();

        if (role === "Trainee") {
          router.push(`/trainee/${id}`);
        } else if (role === "Super Admin") {
          router.push("/super-admin/${id}");
        } else if (role === "Super-admin") {
          router.push(`/client/${id}`);
        }
        else {
          const data = await response.json();
          if (data.errors) {
            setErrors(data.errors); // Set validation errors from server
          } else {
            console.error('Issue arrise:', data.error); // Log other errors
          }
      }
    }
    console.log('Sucessfullty completed the task')
    setShowOTP(true);
    } catch (error) {
      console.error("There is an error:", error);
    } finally {
      setLoading(false);
    }  
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // const sendOtp = async (e: React.FormEvent) => {
  //   e.preventDefault(); // Prevent the form from submitting
  //   if (!formValid) return; // Stop if form is not valid

  //   setLoading(true);
  //   try {
  //     const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
  //       size: "invisible",
  //     });
  //     recaptchaVerifier.render();

  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneno, recaptchaVerifier);
  //     window.confirmation = confirmationResult;
  //     setShowOTP(true);
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onOTPVerify = async () => {
    setLoading(true);
    try {
      if (!window.confirmation) {
        throw new Error("confirmationResult is not available. Cannot verify OTP.");
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
            backgroundImage: "url(/hero7.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark" ? t.palette.grey[50] : t.palette.grey[900],
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formValues.fullname}
                  autoComplete="fullname"
                  onChange={handleInputChange}
                  autoFocus
                />
                {errors.fullname && <p className="error">{errors.fullname}</p>} 
                </div>
                <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
               {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                </div>
                <div>
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneno"
                  type="number"
                  id="phoneno"
                  placeholder="Enter your phone number"
                  value={formValues.phoneno}
                  onChange={handleInputChange}
                  autoComplete="phoneno"/>
                </div>
                <div>

                <select
                  id="role"
                  name="role" // Correctly name the select input
                  value={formValues.role} // Bind to formValues state
                  onChange={handleInputChange} // Use onChange to handle selection
                  className="mt-6 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 my-5"
                  >
                  <option value="">Select your role</option> {/* Add a default option */}
                  <option value="Trainee">Trainee</option>
                  <option value="Client">Client</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                {errors.role && <p className="error">{errors.role}</p>}
                  </div>
                <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                 {errors.password && <p className=" text-lg">{errors.password}</p>}

                </div>
                <FormControlLabel
                  control={<Checkbox required value="remember" color="primary" />}
                  label="By continuing I accept privacy policy"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="bg-black"
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Sign up"}</span>
                </Button>
                <div className="my-10" id="recaptcha"></div>
               
                <Grid container>
                  <Grid item>
                    <Link href="/sign-in" variant="body2" className="text-black no-underline">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Enter your OTP
            </Typography>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              inputStyle="border border-gray-300 rounded-md text-center mx-1 w-10 h-12 text-lg"
              shouldAutoFocus
            />
            <Button
              onClick={onOTPVerify }
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              disabled={loading}

            
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </Box>
        )}
      </Grid>
    </ThemeProvider>
  );
}
