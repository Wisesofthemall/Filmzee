import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import pic from "@/public/ExamplePic.jpg";
import Image from "next/image";
import ProfileCard from "@/app/components/profile/ProfileCard";

import ProfileNavBar from "@/app/components/profile/ProfileNavBar";
import FilmzContainer from "@/app/components/profile/FilmzContainer";
import { useRouter } from "next/router";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import MobileProfileCard from "@/app/components/profile/MobileProfileCard";

type Props = {};

function ProfileContainer({}: Props) {
  const [Users, setUsers] = useState<any>(null);
  const router = useRouter();
  const id: any = router.query.id;

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-900">
      <Navbar />
      <EditProfileModal />
      <div className="w-full h-[15rem] relative">
        <div className="">
          <div className="hidden md:block">
            <Image
              width={180}
              height={180}
              className="w-full h-full object-cover"
              src={Users?.backgroundImg ? Users.backgroundImg : pic}
              alt="profile pic"
            />
            <ProfileCard Users={Users} setUsers={setUsers} id={id} />
          </div>
          <div className="block md:hidden">
            <MobileProfileCard
              Users={Users}
              setUsers={setUsers}
              pic={pic}
              id={id}
            />
          </div>
        </div>
        <ProfileNavBar Users={Users} />
        <FilmzContainer main={false} senderId={id} />
      </div>
    </div>
  );
}

export default ProfileContainer;
