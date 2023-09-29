import useAuth from "@/auth/AuthState";
import { retrieveChat } from "@/database/chatsCRUD/Supabase";
import { getUserByUniq } from "@/database/usersCRUD/Supabase";
import { colorMaker } from "@/functions/profileGenerator";
import { UserType } from "@/types/Types";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

type Props = {
  user: UserType;
  getChat: (userId?: number) => {};
};

export default function UserSearchCard({ user, getChat }: Props) {
  const [picId, setPicId] = useState(100);

  useEffect(() => {
    if (user) {
      const id = parseInt(user.uniq.slice(-3));
      setPicId(id);
    }
  }, [user]);
  console.log(user);

  const color: any = colorMaker(picId);
  return (
    <div
      onClick={() => getChat(user.id)}
      className="w-full m-2 flex cursor-pointer shadow-xl bg-slate-300 p-1 rounded-lg"
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
              bgcolor: color(picId),
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
