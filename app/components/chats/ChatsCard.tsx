"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

type Props = {
  user: any;
  setSelected: any;
  selected: any;
};

function ChatsCard({ user, setSelected, selected }: Props) {
  const [picId, setPicId] = useState(100);

  useEffect(() => {
    if (user) {
      const id = parseInt(user.recepientUniq.slice(-3));

      setPicId(id);
    }
  }, [user]);

  const color: any = colorMaker(picId);
  return (
    <div
      onClick={() => setSelected(user)}
      className={`w-full m-2 flex cursor-pointer shadow-xl ${
        user.recepientEmail === selected.recepientEmail
          ? "bg-blue-500"
          : "bg-slate-300"
      } p-1 rounded-lg`}
    >
      <div className="">
        {user.recepientPhoto ? (
          <Image
            className="rounded-full "
            src={user.recepientPhoto}
            alt="profile image"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: color(picId),
            }}
          >
            {user.recepientEmail[0].toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className={`mx-1`}>
        <div className="flex">
          <div className="text-xs ">{user.recepientName}</div>
          {user.email === "foxxydieujuste@gmail.com" ? (
            <div className="text-yellow-300">
              <AiFillStar />
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
        <div className="text-xs flex">
          {" "}
          <div className="font-bold text-xs mr-1">Email:</div>
          {user.recepientEmail}
        </div>
      </div>
    </div>
  );
}

export default ChatsCard;
