"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { MemberType } from "@/types/Types";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";

type Props = { mem: MemberType; onRemove: any };

function MemberCard({ mem, onRemove }: Props) {
  return (
    <div className="mx-1 border-[1px] border-white rounded-lg p-1 text-white">
      <div className="flex justify-between">
        {mem.photoUrl ? (
          <Image
            className="rounded-full "
            src={mem.photoUrl}
            alt="profile image"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: colorMaker(parseInt(mem.uniq.slice(-3))),
            }}
          >
            {mem.email[0].toUpperCase()}
          </Avatar>
        )}
        <div
          onClick={() => onRemove(mem)}
          className="text-sm text-white mr-1 cursor-pointer"
        >
          <RxCross2 size={15} />
        </div>
      </div>
      <div className={`mx-1`}>
        <div className="flex">
          <div className="text-xs ">{mem.name}</div>
        </div>
        <div className="text-xs flex">
          {" "}
          <div className="font-bold text-xs mr-1">Email:</div>
          {mem.email}
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
