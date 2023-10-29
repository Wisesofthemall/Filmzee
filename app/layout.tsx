import ToasterProvider from "@/providers/ToastProvider";
import "./globals.css";

import { Inter } from "next/font/google";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import EditProfileModal from "./components/modals/EditProfileModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />

        <EditProfileModal />
        <LoginModal />
        <SignupModal />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
