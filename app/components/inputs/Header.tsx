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
};

export default function Header({
  photo,
  name,
  uniq,
  showCurrent,
  setShowCurrent,
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
    <div className="w-full bg-slate-600  flex items-center rounded-lg">
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
            width={40}
            height={40}
          />
        ) : (
          <div className="">
            <Avatar
              sx={{
                bgcolor: color(picId),
              }}
            >
              {name[0].toUpperCase()}
            </Avatar>
          </div>
        )}
        <div className="text-3xl mx-2 ">{name}</div>
      </div>
    </div>
  );
}
