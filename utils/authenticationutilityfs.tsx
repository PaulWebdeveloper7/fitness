"use client"
import CloseIcon from '@mui/icons-material/Close';
import { auth } from "@/components/FirebaseConfig";
import { Button, IconButton, Typography } from "@mui/material";
import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from 'react'
import Link from 'next/link';
declare global {
    interface Window {
      confirmation: ConfirmationResult | null;
    }
  }

//   const [formValues, setFormValues] = useState("");
//   const [Loading, setLoading] = useState(false)
//   const [showOTP, setShowOTP] = useState(false)
//   const [user, setUser] = useState<any>(null);
//   export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name,value } = e.target;
//       setFormValues((prevValues:any) => ({
//           ...prevValues,
//           [name]: value,
//         }));
//     };
    export const sendOtp = async ({e,ph,formValues , setShowOTP}:any) => {

        e.preventDefault(); // Prevent the form from submitting
        if (!formValues) return; // Stop if form is not valid
        
        try {
            const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
                size: "visible",
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
        } 
    };
    
    export const  onOTPVerify= async ({otp ,formValues , setUser}:any) => {
    try {
            // setLoading(true);
            if (!window.confirmation) {
                throw new Error(
                    "confirmationResult is not available. Cannot verify OTP."
                );
            }
            
            // Confirm the OTP using the confirmationResult stored in window
            const router = useRouter()
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
        } 
    };
    export const  datafetch = async ({Fullname, formValues , phoneNumber , setShowOTP}:any)=>{
    try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname:Fullname ,
            phoneNumber: phoneNumber,
            email: formValues.email,
            password: formValues.password,
            role: formValues.role,
          }),
        });
        if (response.status=== 201) {
          setShowOTP(true);
          console.log(response);
        }
        if (response.status===403) {
          console.log("This is the error message");
          console.log(response)
                 }

      } catch (error: any) {
        console.log("This is the error message");
        console.log(error.name)
        console.log(error.message)
      }
}
const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    // setOpen(false);
  };
export const  action = ()=>{
    return(  <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment> )
    };
export const Copyright = (props: any)=> {
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
   