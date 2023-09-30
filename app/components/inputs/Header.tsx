"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = { photo: string; name: string; uniq: string };

export default function Header({ photo, name, uniq }: Props) {
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
