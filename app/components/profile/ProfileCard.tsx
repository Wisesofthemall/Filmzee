import { useAuth } from "@/auth/AuthState";
import { FirebaseUserType } from "@/types/Types";
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

type Props = {};

export default function ProfileCard({}: Props) {
  const loginUser: FirebaseUserType = useAuth();
  return (
    <div className="bg-black absolute h-[24rem] w-[15rem] top-[6.5rem] rounded-lg ml-1 shadow-2xl ">
      <div className="grid place-items-center w-full h-2/5 mt-1">
        {loginUser ? (
          <Image
            className="rounded-full"
            src={loginUser.photoUrl}
            alt="s0me"
            width={80}
            height={80}
          />
        ) : (
          <div className=""></div>
        )}
      </div>
      <div className="font-semibold text-lg flex justify-center my-1">
        {loginUser?.displayName}
      </div>
      <div className="text-gray-800 text-sm flex justify-center my-1">
        {loginUser?.email}
      </div>
      <div className=" text-sm flex justify-center my-1">
        The Developer of this app
      </div>
      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <CiLocationOn />
        </div>{" "}
        Florida
      </div>

      <div className="text-gray-800 flex justify-center">
        <div className="flex items-center mx-1">
          <AiOutlineCalendar />
        </div>{" "}
        Aug 2023
      </div>
      <div className="text-gray-800 flex justify-center hover:text-blue-400">
        <Image
          className="filter brightness-0 invert mx-1"
          src={Logo}
          width={10}
          height={2}
          alt="Logo"
        />{" "}
        7 Filmz
      </div>
    </div>
  );
}
