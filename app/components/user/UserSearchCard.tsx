import useAuth from "@/auth/AuthState";
import { colorMaker } from "@/functions/profileGenerator";
import { UserType } from "@/types/Types";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  user: UserType;
};

export default function UserSearchCard({ user }: Props) {
  const [picId, setPicId] = useState(100);
  const userInfo = useAuth();
  console.log(user);

  useEffect(() => {
    if (userInfo) {
      console.log("change");
      const id = parseInt(userInfo.createdAt.slice(-3));
      setPicId(id);
    }
  }, [userInfo]);

  const color: any = colorMaker(picId);
  return (
    <div className="w-full m-2 flex cursor-pointer shadow-xl bg-slate-300 p-1 rounded-lg">
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
      <div className="mx-1">
        <div className="text-xs ">{user.name}</div>
        <div className="text-xs flex">
          {" "}
          <div className="font-bold text-xs mr-1">Email:</div>
          {user.email}
        </div>
      </div>
    </div>
  );
}
