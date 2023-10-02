import React from "react";
import ProfileMessageButton from "./ProfileMessageButton";

type Props = {};

function ProfileNavBar({}: Props) {
  return (
    <div className="w-full h-[3rem] bg-black flex items-center  justify-between">
      <div className="text-md text-blue-400 font-bold w-1/2"></div>
      <div className=" mx-1 w-1/2 ">
        <div className="px-4 flex">
          <div className="text-blue-400 font-semibold flex items-center">
            Filmz
          </div>
          <ProfileMessageButton />
        </div>
      </div>
    </div>
  );
}

export default ProfileNavBar;
