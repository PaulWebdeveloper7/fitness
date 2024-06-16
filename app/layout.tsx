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
      <body className=" bg-black h-screen ">
        {children}
        
      </body>
    </html>
  );
};

export default layout;
