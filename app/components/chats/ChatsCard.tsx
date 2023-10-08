"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";

type Props = {
  user: any;
  setSelected: any;
  selected: any;
  showCurrent: any;
  setShowCurrent: any;
};

function ChatsCard({
  user,
  setSelected,
  selected,
  showCurrent,
  setShowCurrent,
}: Props) {
  const [picId, setPicId] = useState(100);

  const setSelectedAndCurrent = () => {
    setSelected(user);
    setShowCurrent(true);
  };

  useEffect(() => {
    if (user) {
      const id = parseInt(user.recepientUniq.slice(-3));

      setPicId(id);
    }
  }, [user]);

  return (
    <div
      onClick={() => setSelectedAndCurrent()}
      className={`w-full m-2 flex cursor-pointer shadow-xl ${
        user.recepientEmail === selected.recepientEmail
          ? "bg-blue-500"
          : "bg-slate-300"
      } p-1 rounded-lg`}
    >
      <div className="">
        <DynamicPhoto
          photoUrl={user.recepientPhoto}
          email={user.recepientEmail}
          picId={picId}
        />
      </div>
      <div className={`mx-1`}>
        <div className="flex  ">
          <div className="text-xs ">{user.recepientName}</div>
          {user.recepientEmail === "foxxydieujuste@gmail.com" ? (
            <div className="text-yellow-300">
              <AiFillStar />
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
        <div className="text-xs flex  ">
          {" "}
          <div className="font-bold text-xs mr-1 ">Email:</div>
          {user.recepientEmail}
        </div>
      </div>
    </div>
  );
}

export default ChatsCard;
