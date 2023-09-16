"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../assets/Logo.png";
import Search from "./Search";
import MessageIcon from "./message/MessageIcon";
import UserIcon from "./user/UserIcon";
import useAuth from "@/auth/AuthState";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";

type Props = {};

function Navbar({}: Props) {
  const user = useAuth();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  useEffect(() => {
    if (user) {
      signupModal.onClose();
      loginModal.onClose();
    } else {
      signupModal.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="p-4 flex flex-row justify-around z-50">
      <div className="flex">
        <Image
          className="filter brightness-0 invert"
          src={Logo}
          width={20}
          height={20}
          alt="Logo"
        />
        <div className="p-1 hidden md:block">ilmzee</div>
      </div>
      <Search />
      <MessageIcon />

      <UserIcon />
    </div>
  );
}

export default Navbar;
