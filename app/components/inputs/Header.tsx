"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineLeft } from "react-icons/ai";

type Props = {
  photo: string;
  name: string;
  uniq: string;
  showCurrent: any;
  setShowCurrent: any;
  email: any;
};

export default function Header({
  photo,
  name,
  uniq,
  showCurrent,
  setShowCurrent,
  email,
}: Props) {
  const [picId, setPicId] = useState(200);
  useEffect(() => {
    if (uniq) {
      const id = parseInt(uniq.slice(-3));

      setPicId(id);
    }
  }, [uniq]);

  const color: any = colorMaker(picId);
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
        {photo ? (
          <Image
            className="rounded-full "
            src={photo}
            alt="profile image"
            width={50}
            height={40}
          />
        ) : (
          <div className="">
            <Avatar
              sx={{
                bgcolor: color(picId),
                width: 50,
                height: 50,
              }}
            >
              {name[0].toUpperCase()}
            </Avatar>
          </div>
        )}
        <div className="">
          <div className="text-2xl mx-2 ">{name}</div>
          <div className=" mx-2 text-gray-800 text-sm ">{email}</div>
        </div>
      </div>
    </div>
  );
}
