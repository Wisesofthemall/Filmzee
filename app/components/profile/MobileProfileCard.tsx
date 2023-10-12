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
        <Image
          width={180}
          height={180}
          className="w-full h-full object-cover"
          src={Users?.backgroundImg ? Users.backgroundImg : pic}
          alt="profile pic"
        />
        <div className="absolute top-2 flex place-items-center w-3/5 h-2/5">
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
