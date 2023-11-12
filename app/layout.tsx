import ToasterProvider from "@/providers/ToastProvider";
import "./globals.css";
import Head from "next/head";

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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
