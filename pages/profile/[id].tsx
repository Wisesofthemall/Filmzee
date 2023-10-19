import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import pic from "@/public/ExamplePic.jpg";
import Image from "next/image";
import ProfileCard from "@/app/components/profile/ProfileCard";

import ProfileNavBar from "@/app/components/profile/ProfileNavBar";
import FilmzContainer from "@/app/components/filmz/FilmzContainer";
import { useRouter } from "next/router";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import MobileProfileCard from "@/app/components/profile/MobileProfileCard";
import CommentModal from "@/app/components/modals/CommentModal";

type Props = {};

function ProfileContainer({}: Props) {
  const [Users, setUsers] = useState<any>(null);
  const [filmzId, setFilmzId] = useState(
    "b6098ebe-a596-414a-89d2-e2cfb2c16ea2",
  );
  const router = useRouter();
  const id: any = router.query.id;

  return (
    <div className="h-[100vh] w-[100vw] bg-black">
      <CommentModal filmzId={filmzId} setFilmzId={setFilmzId} />
      <Navbar />
      <EditProfileModal />
      <div className="w-full h-[15rem] relative">
        <div className="">
          <div className="hidden md:block">
            <div className="h-[18rem] w-full">
              <Image
                width={180}
                height={100}
                className="w-full h-full object-fill"
                src={Users?.backgroundImg ? Users.backgroundImg : pic}
                alt="profile pic"
              />
            </div>
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
        <FilmzContainer
          filmzId={filmzId}
          setFilmzId={setFilmzId}
          main={false}
          senderId={id}
        />
      </div>
    </div>
  );
}

export default ProfileContainer;
