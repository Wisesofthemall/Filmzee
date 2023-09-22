"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../assets/Logo.png";
import Search from "./Search";
import MessageIcon from "./message/MessageIcon";
import { useRouter } from "next/navigation";
import UserIcon from "./user/UserIcon";
import useAuth from "@/auth/AuthState";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";
import { retrieveUser } from "@/database/usersCRUD/Supabase";
import { UserType } from "@/types/Types";

type Props = {};

function Navbar({}: Props) {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const user: UserType = useAuth();

  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const getUserInfo = async () => {
    const userInfo = await retrieveUser(user.createdAt, user);
    console.log(userInfo);
    setUserInfo(userInfo);
  };
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
    if (user) {
      console.log(user);
      getUserInfo();
      signupModal.onClose();
      loginModal.onClose();
    } else {
      signupModal.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="p-4 flex flex-row justify-around z-50 ">
      <div onClick={() => navHome()} className="flex">
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
      <div onClick={() => navMessage()}>
        <MessageIcon />
      </div>

      <UserIcon />
    </div>
  );
}

export default Navbar;
