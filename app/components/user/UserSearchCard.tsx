"use client";
import { useAuth } from "@/auth/AuthState";
import { retrieveChat } from "@/database/chatsCRUD/Supabase";
import { colorMaker } from "@/functions/profileGenerator";
import { ChatType, FirebaseUserType, UserType } from "@/types/Types";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

type Props = {
  user: UserType;
  getChat: (chat: ChatType[]) => {};
  loginInfo: UserType | null;
};

export default function UserSearchCard({ user, getChat, loginInfo }: Props) {
  const [picId, setPicId] = useState(100);
  const [roomID, setRoomID] = useState("");
  const loginUser: FirebaseUserType = useAuth();

  // userUniq: string,
  // userName: string,
  // userEmail: string,
  // userPhoto: string,

  //* Update the login user's chat list
  const updateChat = async () => {
    if (loginUser.localId === user.localId) {
      toast.error("Cannot create a chat with yourself");
      return;
    }
    //* Creates and retrieve a new chat
    const newChats = await retrieveChat(
      (loginInfo as UserType).localId,
      (loginInfo as UserType).id,
      loginUser.createdAt,
      (loginInfo as UserType).displayName ||
        (loginInfo as UserType).email.split("@")[0],
      (loginInfo as UserType).email,
      (loginInfo as UserType).photoUrl,
      user.id,
      user.uniq,
      user.name,
      user.email,
      user.photoUrl,
      user.localId,
      roomID,
    );
    toast.success("Sucessfully created chat");
    getChat(newChats as ChatType[]);
  };

  useEffect(() => {
    if (user) {
      //* Creating a picID base on the user 'uniq'
      const id = parseInt(user.uniq.slice(-3));
      setPicId(id);
    }
  }, [user]);

  useEffect(() => {
    if (loginUser) {
      //* Creating a roomID base on the user and login user localIDs
      const roomId = [...user.localId, ...loginUser.localId].sort().join("");
      setRoomID(roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  return (
    <div
      onClick={() => updateChat()}
      className="w-6/7 m-2 flex cursor-pointer bg-slate-300 p-1 rounded-lg hover:opacity-60"
    >
      <div className="">
        {user.photoUrl ? (
          <Image
            className="rounded-full "
            src={user.photoUrl}
            alt="profile image"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: colorMaker(picId),
            }}
          >
            {user.email[0].toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className={`mx-1`}>
        <div className="flex">
          <div className="text-xs ">{user.name}</div>
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
          {user.email}
        </div>
      </div>
    </div>
  );
}
