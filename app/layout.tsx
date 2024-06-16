import Navbar from "@/components/Navbar";
import React from "react";
import { ReactNode } from "react";
export const metadata = {
  title: "YOOM",
  description: "Video calling App",
};
const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html>
      <body className="">
        <Navbar/>
        {children}
        <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
      </body>
    </html>
  );
};

export default layout;
