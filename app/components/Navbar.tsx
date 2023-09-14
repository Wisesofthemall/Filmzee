"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../assets/Logo.png";
import Search from "./Search";
import MessageIcon from "./message/MessageIcon";
import UserIcon from "./user/UserIcon";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="p-4 flex flex-row justify-around">
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
