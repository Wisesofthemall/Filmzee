"use client";
import React, { useEffect, useState } from "react";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/router";
import { ChatType } from "@/types/Types";

type Props = {
  user: ChatType;
  setSelected: React.Dispatch<React.SetStateAction<ChatType>>;
  selected: ChatType;
  setShowCurrent: React.Dispatch<React.SetStateAction<boolean>>;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
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

  //* Set the chat for the user and make it visible
  const setSelectedAndCurrent = () => {
    //* Set the chat to the user
    setSelected(user);
    //* Show current chat
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
        onClick={() => {
          if (!user.recepientId) {
            return;
          }
          router.push(`/profile/${user.recepientLocalID}`);
        }}
        className=""
      >
        <DynamicPhoto
          photoUrl={user.recepientPhoto}
          email={user.recepientEmail}
          picId={picId}
        />
      </div>
      <div className={`mx-1 h-full my-auto`}>
        <div className="flex  ">
          <div className="text-xs  font-semibold">{user.recepientName}</div>
        </div>

        {user.recepientEmail.includes("@") && (
          <div className="text-xs flex flex-wrap  ">
            <div className=" font-semibold text-xs mr-1 ">Email:</div>
            {user.recepientEmail}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatsCard;
