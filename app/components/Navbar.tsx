"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Search from "./Search";
import MessageIcon from "./message/MessageIcon";
import { useRouter } from "next/navigation";
import UserIcon from "./user/UserIcon";
import { useAuth } from "@/auth/AuthState";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";
import { UserType } from "@/types/Types";
import { retrieveUser } from "@/database/usersCRUD/Supabase";

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const user: UserType = useAuth();

  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  const navMessage = () => {
    if (user) {
      router.push("/message");
    } else {
      signupModal.onOpen();
    }
  };

  const navHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      //* If user is login then close auth modals and retrieve the login User Information
      if (user) {
        signupModal.onClose();
        loginModal.onClose();
        retrieveUser(user.createdAt, user);
        //* If user is not login then open signup modal
      } else {
        signupModal.onOpen();
      }
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="p-4 flex flex-row justify-around z-50 bg-black ">
      <div
        onClick={() => navHome()}
        className="flex cursor-pointer hover:text-blue-400 "
      >
        <Image
          className="filter brightness-0 invert hover:text-red-400"
          src={Logo}
          width={20}
          height={20}
          alt="Logo"
        />
        <div className="p-1 hidden md:block  font-semibold">ilmzee</div>
      </div>
      <Search />
      <div onClick={() => navMessage()} className="flex place-items-center">
        <MessageIcon />
      </div>

      <UserIcon />
    </div>
  );
}

export default Navbar;
