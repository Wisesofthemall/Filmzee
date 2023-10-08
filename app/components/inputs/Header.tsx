"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineLeft } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/navigation";

type Props = {
  photo: string;
  name: string;
  uniq: string;
  showCurrent: any;
  setShowCurrent: any;
  localId: any;
  email: any;
};

export default function Header({
  photo,
  name,
  uniq,
  showCurrent,
  setShowCurrent,
  email,
  localId,
}: Props) {
  const router = useRouter();
  const [picId, setPicId] = useState(200);
  useEffect(() => {
    if (uniq) {
      const id = parseInt(uniq.slice(-3));

      setPicId(id);
    }
  }, [uniq]);

  return (
    <div className="w-full bg-blue-400  flex items-center rounded-lg">
      <div
        onClick={() => {
          setShowCurrent(false);
        }}
        className="left-0 cursor-pointer"
      >
        <AiOutlineLeft size={26} />
      </div>
      <div className="flex w-1/2 mx-auto">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/profile/${localId}`)}
        >
          <DynamicPhoto photoUrl={photo} picId={picId} email={name} />
        </div>
        <div className="">
          <div className="text-2xl mx-2 ">{name}</div>
          <div className=" mx-2 text-gray-800 text-sm ">{email}</div>
        </div>
      </div>
    </div>
  );
}
