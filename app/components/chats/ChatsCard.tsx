"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/router";
import { ChatType } from "@/types/Types";

type Props = {
  user: ChatType;
  setSelected: any;
  selected: any;

  setShowCurrent: any;

  setHide: any;
};

function ChatsCard({
  user,
  setSelected,
  selected,

  setShowCurrent,

  setHide,
}: Props) {
  const [picId, setPicId] = useState(100);
  const router = useRouter();

  const setSelectedAndCurrent = () => {
    setSelected(user);
    setShowCurrent(true);
    setHide(false);
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
      className={`w-10/10 m-2 flex cursor-pointer hover:opacity-60 shadow-xl ${
        user.recepientEmail === selected.recepientEmail
          ? "bg-blue-500"
          : "bg-slate-300"
      } p-1 rounded-lg`}
    >
      <div
        onClick={() => router.push(`/profile/${user.recepientId}`)}
        className=""
      >
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
        <div className="text-xs flex flex-wrap  ">
          {" "}
          <div className="font-bold text-xs mr-1 ">Email:</div>
          {user.recepientEmail}
        </div>
      </div>
    </div>
  );
}

export default ChatsCard;
