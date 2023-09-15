import ToasterProvider from "@/providers/ToastProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModal />
        <SignupModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
