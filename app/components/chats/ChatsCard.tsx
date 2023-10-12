"use client";
import { colorMaker } from "@/functions/profileGenerator";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import DynamicPhoto from "../DynamicPhoto";
import { useRouter } from "next/router";
import { ChatType, UserType } from "@/types/Types";
import { getUserByLocalId } from "@/database/usersCRUD/Supabase";

type Props = {
  user: ChatType;
  setSelected: any;
  selected: any;
  showCurrent: any;
  setShowCurrent: any;
  hide: any;
  setHide: any;
};

function ChatsCard({
  user,
  setSelected,
  selected,
  showCurrent,
  setShowCurrent,
  hide,
  setHide,
}: Props) {
  const [picId, setPicId] = useState(100);
  const [currentInfo, setCurrentInfo] = useState<UserType | any>({});
  const router = useRouter();

  const setSelectedAndCurrent = () => {
    setSelected(user);
    setShowCurrent(true);
    setHide(false);
  };

  const getCurrent = async () => {
    const current = await getUserByLocalId(user.recepientLocalID);
    console.log(current);
    setCurrentInfo(current);
  };

  useEffect(() => {
    if (user) {
      getCurrent();

      const id = parseInt(user.recepientUniq.slice(-3));

      setPicId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      onClick={() => setSelectedAndCurrent()}
      className={`w-10/10 m-2 flex cursor-pointer shadow-xl ${
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
          photoUrl={currentInfo ? currentInfo.photoUrl : undefined}
          email={user.recepientEmail}
          picId={picId}
        />
      </div>
      <div className={`mx-1`}>
        <div className="flex  ">
          <div className="text-xs ">{currentInfo ? currentInfo.name : ""}</div>
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
