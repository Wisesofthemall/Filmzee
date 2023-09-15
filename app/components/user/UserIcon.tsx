"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
type Props = {};

function UserIcon({}: Props) {
  const login = useLoginModal();
  const OpenModal = () => {
    login.onOpen();
    console.log(login.isOpen);
  };
  return (
    <div onClick={() => OpenModal()}>
      <AiOutlineUser size={26} />
    </div>
  );
}

export default UserIcon;
