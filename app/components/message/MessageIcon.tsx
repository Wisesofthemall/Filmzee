"use client";
import React from "react";

type Props = {};
import { BiMessageAltDetail } from "react-icons/bi";
function MessageIcon({}: Props) {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <BiMessageAltDetail size={26} />
    </div>
  );
}

export default MessageIcon;
