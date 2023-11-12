"use client";
import Image from "next/image";
import React from "react";
import MobileCard from "./MobileCard";
import DynamicPhoto from "../DynamicPhoto";

type Props = {
  setUsers: any;
  Users: any;
  pic: any;
  id: any;
};

function MobileProfileCard({ Users, pic, setUsers, id }: Props) {
  return (
    <div>
      <div className="">
        <div className="h-[10rem] w-full">
          <Image
            width={180}
            height={100}
            className="w-full h-full object-fill"
            src={Users?.backgroundImg ? Users.backgroundImg : pic}
            alt="profile pic"
          />
        </div>
        <div className="absolute top-[3.5rem] flex place-items-center w-3/5 h-2/5 mx-3">
          <DynamicPhoto
            photoUrl={Users?.photoUrl}
            picId={parseInt(Users ? Users.uniq.slice(-3) : "100")}
            email={Users?.email}
            size={80}
          />
        </div>
      </div>
      <MobileCard Users={Users} setUsers={setUsers} id={id} />
    </div>
  );
}

export default MobileProfileCard;
