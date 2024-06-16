import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness Web app",
  description: "Fitness Web app",
  icons:'https://www.creativefabrica.com/wp-content/uploads/2022/12/01/Sport-Fitness-Gym-Logo-Template-Graphics-49716794-1.jpg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
