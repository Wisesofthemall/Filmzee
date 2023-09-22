import { UserType } from "@/types/Types";
import Image from "next/image";
import React from "react";

type Props = {
  user: UserType;
};

export default function UserSearchCard({ user }: Props) {
  return (
    <div className="w-full m-2 flex cursor-pointer">
      <div className="">
        <Image
          className="rounded-full"
          src={user.photoUrl}
          width={30}
          height={30}
          alt={user.name}
        />
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
