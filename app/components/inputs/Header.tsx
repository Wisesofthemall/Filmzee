"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineLeft } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/navigation";
import { BiPencil } from "react-icons/bi";

type Props = {
  photo: string;
  name: string;
  uniq: string;
  showCurrent: any;
  setShowCurrent: any;
  localId: any;
  email: any;
  edit: boolean;
  id: number | null;
};

export default function Header({
  photo,
  name,
  uniq,
  showCurrent,
  setShowCurrent,
  email,
  localId,
  edit,
  id,
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
        className="left-0 cursor-pointer hover:opacity-60"
      >
        <AiOutlineLeft size={26} />
      </div>
      <div className="flex w-1/2 mx-auto">
        <div
          className="cursor-pointer hover:opacity-60"
          onClick={() => {
            if (!id) {
              return;
            }
            router.push(`/profile/${localId}`);
          }}
        >
          <DynamicPhoto photoUrl={photo} picId={picId} email={name} />
        </div>
        <div className="">
          <div className="text-2xl mx-2  font-semibold">{name}</div>
          <div className=" mx-2 text-gray-800 text-sm  font-semibold">
            {email}
          </div>
        </div>
      </div>
      <div className="ml-auto cursor-pointer">
        {" "}
        <BiPencil size={25} />
      </div>
    </div>
  );
}
